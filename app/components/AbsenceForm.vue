<template>
  <div class="glass-panel p-6 sm:p-8 animate-fade-in relative overflow-hidden">
    <!-- Success Message Overlay -->
    <div v-if="submitSuccess" class="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-xl z-10 px-6 text-center">
      <div class="w-16 h-16 rounded-full bg-pride-green/20 flex items-center justify-center mb-4">
        <span class="iconify text-pride-green text-3xl" data-icon="heroicons:check-circle-solid" data-inline="false"></span>
      </div>
      <h3 class="text-2xl font-bold pridetext mb-2">¡Ausencia Registrada!</h3>
      <p class="text-slate-300 mb-6">Gracias, tu reporte nos ayuda a organizar mejor los entrenamientos.</p>
      <button @click="resetForm" class="glass-button w-full sm:w-auto pride-glow">Registrar Otra Ausencia</button>
    </div>

    <!-- Form -->
    <form @submit.prevent="submitForm" class="space-y-6">
      
      <!-- Shark Name with Autocomplete -->
      <div class="space-y-2 relative">
        <label class="block text-sm font-medium text-slate-300">Nombre de Shark</label>
        <input 
          v-model="form.name" 
          @focus="showAutocomplete = true"
          @blur="hideAutocompleteDelay"
          class="glass-input" 
          type="text" 
          placeholder="Escribe tu nombre o apodo..." 
          required 
        />
        <!-- Autocomplete dropdown -->
        <ul v-if="showAutocomplete && filteredNames.length" class="absolute top-full left-0 w-full mt-1 bg-slate-800 border border-white/10 rounded-xl shadow-xl max-h-48 overflow-y-auto z-20 divide-y divide-white/5">
          <li 
            v-for="name in filteredNames" 
            :key="name" 
            @click="selectName(name)"
            class="px-4 py-2 hover:bg-white/10 cursor-pointer text-slate-200 transition-colors"
          >
            {{ name }}
          </li>
        </ul>
        
        <!-- Dynamic Absent Indicator -->
        <p v-if="form.name && form.dateStr" class="text-xs text-pride-light mt-1 animate-pulse">
          <span class="iconify inline-block mr-1 align-middle" data-icon="heroicons:information-circle" data-inline="false"></span>
          Ausencias en {{ currentSelectedMonthName }}: {{ monthlyAbsencesCount }}
        </p>
      </div>

      <!-- Date Selection -->
      <div class="space-y-3">
        <label class="block text-sm font-medium text-slate-300 flex justify-between items-center">
          <span>Fecha de Ausencia</span>
          <span class="text-xs text-slate-500">Solo Sábado o Domingo</span>
        </label>
        
        <div class="flex flex-wrap gap-2">
          <!-- Upcoming weekends pills -->
          <button 
            type="button"
            v-for="date in quickDates" 
            :key="date.iso"
            @click="selectDate(date.iso)"
            class="px-5 py-2.5 rounded-full text-sm transition-all whitespace-nowrap font-medium pride-glow"
            :class="form.dateStr === date.iso ? 'bg-white text-slate-900 shadow-md scale-105 border border-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-white/10'"
          >
            {{ date.label }}
          </button>
          
          <!-- Custom Date Input Dropdown -->
          <div class="relative group" v-click-outside="closeCalendarPanel">
            <button 
              type="button"
              @click="toggleCalendarPanel"
              class="flex items-center justify-center px-5 py-2.5 rounded-full text-sm transition-all bg-slate-800 text-slate-300 border border-white/10 hover:bg-slate-700 hover:text-white font-medium pride-glow"
              :class="{'!bg-white !text-slate-900 shadow-md font-bold !border-white': isCustomDateActive}"
            >
              <span class="iconify mr-2" data-icon="heroicons:calendar-days"></span>
              {{ isCustomDateActive && form.dateStr ? formatDateMedium(form.dateStr) : 'Elegir otra fecha...' }}
              <span class="iconify ml-2 transition-transform" :class="{'rotate-180': isCalendarOpen}" data-icon="heroicons:chevron-down"></span>
            </button>
            
            <!-- Custom Premium Dropdown Panel -->
            <Transition name="fade-slide">
              <div v-if="isCalendarOpen" class="absolute top-full right-0 mt-3 w-72 bg-slate-900/90 backdrop-blur-3xl border border-white/20 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.5)] z-30 p-4">
                 
                 <!-- Header / PRIDE accents -->
                 <div class="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                   <h4 class="font-bold text-white flex items-center gap-2">
                     <span class="w-2 h-2 rounded-full pride-bar inline-block"></span>
                     Fechas Futuras (Sáb/Dom)
                   </h4>
                   <button @click="closeCalendarPanel" type="button" class="text-slate-400 hover:text-white transition-colors" title="Cerrar">
                     <span class="iconify" data-icon="heroicons:x-mark"></span>
                   </button>
                 </div>
                 
                 <!-- Date List -->
                 <div class="space-y-1 max-h-60 overflow-y-auto pr-1">
                   <button
                     v-for="date in upcomingYearDates"
                     :key="date.iso"
                     type="button"
                     @click="selectCustomDate(date.iso)"
                     class="w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors flex justify-between items-center group relative overflow-hidden"
                     :class="form.dateStr === date.iso ? 'bg-pride-blue/20 text-white font-bold border border-pride-blue/30' : 'text-slate-300 hover:bg-white/10 border border-transparent'"
                   >
                     <div v-if="form.dateStr === date.iso" class="absolute left-0 top-0 bottom-0 w-1 bg-pride-blue"></div>
                     <span :class="{'pl-2': form.dateStr === date.iso}">{{ date.labelLong }}</span>
                     <span v-if="form.dateStr === date.iso" class="iconify text-pride-blue text-lg" data-icon="heroicons:check-circle-solid"></span>
                   </button>
                   
                   <div v-if="!upcomingYearDates.length" class="text-center py-4 text-slate-500 text-xs">
                     Cargando fechas...
                   </div>
                 </div>
              </div>
            </Transition>
          </div>
        </div>
        <p v-if="dateError" class="text-pride-red text-sm mt-2 font-medium bg-pride-red/10 border border-pride-red/30 rounded-lg px-3 py-2 inline-block shadow-lg">{{ dateError }}</p>
      </div>

      <!-- Time / Location Slots -->
      <div class="space-y-3">
        <label class="block text-sm font-medium text-slate-300">Horario de Entrenamiento</label>
        <div class="grid sm:grid-cols-2 gap-4">
          
          <!-- Tlatelolco -->
          <div class="space-y-2 p-4 bg-slate-800/40 border border-white/5 rounded-2xl">
            <h4 class="font-medium text-pride-pink flex items-center gap-2">
              <span class="iconify" data-icon="heroicons:map-pin"></span> Tlatelolco
            </h4>
            <div class="space-y-2">
              <label 
                v-for="slot in tlatelolcoSlots" 
                :key="slot"
                class="flex items-center p-3 rounded-xl border cursor-pointer hover:bg-white/5 transition-colors"
                :class="form.timeSlot === slot && form.location === 'Tlatelolco' ? 'border-pride-pink bg-pride-pink/10' : 'border-white/10'"
              >
                <input type="radio" v-model="form.timeSlot" :value="slot" @change="form.location = 'Tlatelolco'" class="hidden" />
                <div class="w-4 h-4 rounded-full border border-white/30 mr-3 flex items-center justify-center" :class="{'border-pride-pink': form.timeSlot === slot && form.location === 'Tlatelolco'}">
                  <div v-if="form.timeSlot === slot && form.location === 'Tlatelolco'" class="w-2 h-2 bg-pride-pink rounded-full"></div>
                </div>
                <span class="text-sm text-slate-200">{{ slot }}</span>
              </label>
            </div>
          </div>

          <!-- Cuauhtemoc -->
          <div class="space-y-2 p-4 bg-slate-800/40 border border-white/5 rounded-2xl">
            <h4 class="font-medium text-pride-purple flex items-center gap-2">
              <span class="iconify" data-icon="heroicons:map-pin"></span> Cuauhtémoc
            </h4>
            <div class="space-y-2">
              <label 
                v-for="slot in cuauhtemocSlots" 
                :key="slot"
                class="flex items-center p-3 rounded-xl border cursor-pointer hover:bg-white/5 transition-colors"
                :class="form.timeSlot === slot && form.location === 'Cuauhtemoc' ? 'border-pride-purple bg-pride-purple/10' : 'border-white/10'"
              >
                <input type="radio" v-model="form.timeSlot" :value="slot" @change="form.location = 'Cuauhtemoc'" class="hidden" />
                <div class="w-4 h-4 rounded-full border border-white/30 mr-3 flex items-center justify-center" :class="{'border-pride-purple': form.timeSlot === slot && form.location === 'Cuauhtemoc'}">
                  <div v-if="form.timeSlot === slot && form.location === 'Cuauhtemoc'" class="w-2 h-2 bg-pride-purple rounded-full"></div>
                </div>
                <span class="text-sm text-slate-200">{{ slot }}</span>
              </label>
            </div>
          </div>

        </div>
      </div>

      <!-- Reason Textarea -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-slate-300">
          Motivo Breve <span class="text-xs text-slate-500 font-normal">(Ej: Enfermedad, viaje, trabajo)</span>
        </label>
        <textarea 
          v-model="form.reason" 
          rows="2" 
          class="glass-input resize-none" 
          placeholder="Escribe el motivo de tu ausencia..."
          required
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button 
        type="submit" 
        class="w-full bg-slate-800 text-white hover:bg-slate-700 hover:text-white py-4 mt-8 text-lg font-black rounded-2xl border border-white/10 shadow-[0_4px_20px_0_rgba(0,0,0,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 relative overflow-hidden group pride-glow"
        :disabled="loading"
      >
        <div class="absolute bottom-0 left-0 w-full h-1 pride-bar translate-y-full group-hover:translate-y-0 transition-transform"></div>
        <span v-if="loading" class="iconify animate-spin" data-icon="heroicons:arrow-path"></span>
        <span v-else>Confirmar Ausencia</span>
      </button>

      <!-- Error Message -->
      <div v-if="submitError" class="p-4 rounded-xl bg-pride-red/20 border border-pride-red/50 text-pride-red text-sm mt-4 text-center">
        {{ submitError }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { startOfDay, addDays, isSaturday, isSunday, format, parseISO } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { es } from 'date-fns/locale'

const TIMEZONE = 'America/Mexico_City'
const tlatelolcoSlots = ['11:00 am - 12:00 pm', '12:00 pm - 1:00 pm']
const cuauhtemocSlots = ['3:00 pm - 4:00 pm', '4:00 pm - 5:00 pm']

// State
const form = ref({
  name: '',
  dateStr: '',
  timeSlot: '',
  location: '',
  reason: ''
})

const isCustomDateActive = ref(false)
const isCalendarOpen = ref(false)
const dateError = ref('')

const loading = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

const showAutocomplete = ref(false)
const availableNames = ref([])
const absencesData = ref([])

// Fetch Init Data
onMounted(async () => {
  try {
    const [namesRes, absencesRes] = await Promise.all([
      $fetch('/api/names'),
      $fetch('/api/absences')
    ])
    availableNames.value = namesRes || []
    absencesData.value = absencesRes || []
  } catch (e) {
    console.error('Error loading initial data', e)
  }
})

// Autocomplete Logic
const filteredNames = computed(() => {
  if (!form.value.name) return availableNames.value.slice(0, 5)
  const lowerQuery = form.value.name.toLowerCase()
  return availableNames.value.filter(n => n.toLowerCase().includes(lowerQuery)).slice(0, 5)
})

const selectName = (n) => {
  form.value.name = n
  showAutocomplete.value = false
}

const hideAutocompleteDelay = () => {
  setTimeout(() => showAutocomplete.value = false, 200)
}

// Indicator logic
const currentSelectedMonthName = computed(() => {
  if (!form.value.dateStr) return ''
  return format(parseISO(form.value.dateStr), "MMMM", { locale: es })
})

const monthlyAbsencesCount = computed(() => {
  if (!form.value.name || !form.value.dateStr) return 0
  const selectedDate = parseISO(form.value.dateStr)
  const selectedMonth = selectedDate.getMonth()
  const selectedYear = selectedDate.getFullYear()
  
  return absencesData.value.filter(a => {
    if (a.name.toLowerCase() !== form.value.name.toLowerCase()) return false
    const d = parseISO(a.date)
    return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear
  }).length
})

// Date Logic
const getTodayCDMX = () => startOfDay(toZonedTime(new Date(), TIMEZONE))
const todayISO = format(getTodayCDMX(), 'yyyy-MM-dd')

const quickDates = computed(() => {
  const dates = []
  let current = getTodayCDMX()
  
  while(dates.length < 5) {
    if (isSaturday(current) || isSunday(current)) {
      dates.push({
        iso: format(current, 'yyyy-MM-dd'),
        label: format(current, "EEE d MMM", { locale: es }).replace(/^\w/, c => c.toUpperCase())
      })
    }
    current = addDays(current, 1)
  }
  return dates
})

const upcomingYearDates = computed(() => {
  const dates = []
  let current = getTodayCDMX()
  const endLimit = addDays(current, 180) // 6 months into the future
  
  // Skip the first 5 quick dates so we don't duplicate them in the dropdown initially,
  // or just include all of them. Let's include everything for simplicity.
  while(current < endLimit) {
    if (isSaturday(current) || isSunday(current)) {
      dates.push({
        iso: format(current, 'yyyy-MM-dd'),
        labelLong: format(current, "EEEE, d 'de' MMMM", { locale: es }).replace(/^\w/, c => c.toUpperCase())
      })
    }
    current = addDays(current, 1)
  }
  return dates
})

const formatDateMedium = (isoStr) => {
  if(!isoStr) return ''
  return format(parseISO(isoStr), "EEE d MMM", { locale: es }).replace(/^\w/, c => c.toUpperCase())
}

const selectDate = (iso) => {
  form.value.dateStr = iso
  isCustomDateActive.value = false
  isCalendarOpen.value = false
  dateError.value = ''
}

const toggleCalendarPanel = () => {
  isCalendarOpen.value = !isCalendarOpen.value
}

const closeCalendarPanel = () => {
  isCalendarOpen.value = false
}

const selectCustomDate = (iso) => {
  form.value.dateStr = iso
  isCustomDateActive.value = true
  isCalendarOpen.value = false
  dateError.value = ''
}

// Form Submission
const submitForm = async () => {
  if (!form.value.dateStr) {
    dateError.value = 'Debes seleccionar una fecha'
    return
  }
  if (!form.value.timeSlot) {
    submitError.value = 'Debes seleccionar un horario'
    return
  }
  
  loading.value = true
  submitError.value = ''
  
  try {
    const newAbsence = await $fetch('/api/absences', {
      method: 'POST',
      body: {
        name: form.value.name,
        date: form.value.dateStr,
        timeSlot: form.value.timeSlot,
        location: form.value.location,
        reason: form.value.reason
      }
    })
    
    // update local state
    absencesData.value.push(newAbsence)
    if (!availableNames.value.includes(form.value.name)) {
      availableNames.value.push(form.value.name)
    }
    
    submitSuccess.value = true
  } catch (err) {
    submitError.value = err.message || 'Error al registrar la ausencia'
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  submitSuccess.value = false
  form.value = {
    name: '',
    dateStr: '',
    timeSlot: '',
    location: '',
    reason: ''
  }
  isCustomDateActive.value = false
  isCalendarOpen.value = false
}
</script>

<style scoped>
.pridetext {
  background: linear-gradient(90deg, #E40303, #FF8C00, #FFED00, #008026, #24408E, #732982, #5BCEFA, #F5A9B8);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Base custom scrollbar for dropdowns */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}
</style>
