<template>
  <div class="glass-panel p-6 sm:p-8 animate-fade-in relative z-10 w-full max-w-2xl mx-auto">
    <!-- Success Message Overlay -->
    <div v-if="submitSuccess" class="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-xl z-20 px-6 text-center rounded-2xl">
      <div class="w-16 h-16 rounded-full bg-pride-green/20 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 text-pride-green">
          <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12m13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
        </svg>
      </div>
      <h3 class="text-2xl font-bold pridetext mb-2">¡Ausencia Registrada!</h3>
      <p class="text-slate-300 mb-6">Gracias, tu reporte nos ayuda a organizar mejor los entrenamientos.</p>
      <button @click="resetForm" class="glass-button w-full sm:w-auto pride-glow">Registrar Otra Ausencia</button>
    </div>

    <!-- Form -->
    <form @submit.prevent="submitForm" class="space-y-6">
      
      <!-- Sport Selection -->
      <div class="space-y-3">
        <label class="block text-sm font-medium text-slate-300 flex items-center gap-2">
          <span>Deporte</span>
          <span class="w-1.5 h-1.5 rounded-full pride-bar inline-block"></span>
        </label>
        <div class="flex gap-4">
          <button 
            type="button"
            @click="selectSport('swimming')"
            class="flex-1 p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 group pride-glow"
            :class="form.sport === 'swimming' ? 'bg-pride-blue/20 border-pride-blue' : 'bg-slate-800/40 border-white/5 hover:border-white/20'"
          >
            <div class="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform" :class="{'!bg-pride-blue/30': form.sport === 'swimming'}">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A11.952 11.952 0 0 1 12 15c-2.998 0-5.74-1.1-7.843-2.918M4.284 14.253A8.957 8.957 0 0 1 3 12c0-.778.099-1.533.284-2.253" />
              </svg>
            </div>
            <span class="font-bold text-sm" :class="form.sport === 'swimming' ? 'text-white' : 'text-slate-400'">Natación</span>
          </button>
          <button 
            type="button"
            @click="selectSport('soccer')"
            class="flex-1 p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 group pride-glow"
            :class="form.sport === 'soccer' ? 'bg-pride-green/20 border-pride-green' : 'bg-slate-800/40 border-white/5 hover:border-white/20'"
          >
            <div class="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform" :class="{'!bg-pride-green/30': form.sport === 'soccer'}">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.048 8.287 8.287 0 0 0 9 9.6a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 3.546 5.974 5.974 0 0 1-2.133-1A3.75 3.75 0 0 0 12 18Z" />
              </svg>
            </div>
            <span class="font-bold text-sm" :class="form.sport === 'soccer' ? 'text-white' : 'text-slate-400'">Fútbol</span>
          </button>
        </div>
      </div>

      <!-- Shark Name with Autocomplete -->
      <div class="space-y-2 relative pride-glow-focus">
        <label class="block text-sm font-medium text-slate-300 flex items-center gap-2">
          <span>Nombre de Shark</span>
          <span class="w-1.5 h-1.5 rounded-full pride-bar inline-block"></span>
        </label>
        <input 
          v-model="form.name" 
          @focus="showAutocomplete = true"
          @blur="hideAutocompleteDelay"
          class="glass-input relative z-10" 
          type="text" 
          placeholder="Escribe tu nombre o apodo..." 
          required 
        />
        <!-- Autocomplete dropdown -->
        <ul v-if="showAutocomplete && filteredNames.length" class="absolute top-full left-0 w-full mt-2 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl max-h-48 overflow-y-auto z-30 divide-y divide-white/5 overflow-hidden">
          <li 
            v-for="name in filteredNames" 
            :key="name" 
            @click="selectName(name)"
            class="px-4 py-3 hover:bg-white/10 cursor-pointer text-slate-200 transition-all flex items-center justify-between group active:bg-white/20 pride-glow"
          >
            <span class="group-hover:translate-x-1 transition-transform">{{ name }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-pride-blue opacity-0 group-hover:opacity-100 transition-opacity">
              <path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd" />
            </svg>
          </li>
        </ul>
        
        <!-- Dynamic Absent Indicator -->
        <p v-if="form.name && form.dateStr" class="text-xs text-pride-light mt-1 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline-block mr-1 align-middle">
            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
          Ausencias en {{ currentSelectedMonthName }}: {{ monthlyAbsencesCount }}
        </p>
      </div>

      <!-- Date Selection -->
      <div class="space-y-3" v-if="form.sport">
        <label class="block text-sm font-medium text-slate-300 flex justify-between items-center">
          <span>Fecha de Ausencia</span>
          <span class="text-xs text-slate-500">{{ form.sport === 'soccer' ? 'Solo Sábados' : 'Solo Sábado o Domingo' }}</span>
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              {{ isCustomDateActive && form.dateStr ? formatDateMedium(form.dateStr) : 'Elegir otra fecha...' }}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-2 transition-transform" :class="{'rotate-180': isCalendarOpen}">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            
            
            <!-- Custom Premium Dropdown Panel -->
            <Teleport to="body" :disabled="!isMobile">
              <!-- Backdrop for mobile -->
              <div v-if="isCalendarOpen && isMobile" 
                   class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 animate-fade-in"
                   @click="closeCalendarPanel">
              </div>

              <Transition name="fade-slide">
                <div v-if="isCalendarOpen" 
                     @click.stop
                     class="z-50 bg-slate-900/90 backdrop-blur-3xl border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-all duration-300
                            fixed inset-x-0 bottom-0 w-full rounded-t-3xl p-6 max-h-[85vh] flex flex-col
                            sm:absolute sm:inset-auto sm:top-full sm:right-0 sm:bottom-auto sm:mt-3 sm:w-72 sm:rounded-2xl sm:border sm:p-4 sm:block"
                >
                   
                   <!-- Header / PRIDE accents -->
                   <div class="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                     <h4 class="font-bold text-white flex items-center gap-2">
                       <span class="w-2 h-2 rounded-full pride-bar inline-block"></span>
                       Fechas Futuras
                     </h4>
                     <button @click="closeCalendarPanel" type="button" class="text-slate-400 hover:text-white transition-colors p-2 -mr-2" title="Cerrar">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                         <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                       </svg>
                     </button>
                   </div>
                   
                   <!-- Date List -->
                   <div class="space-y-1 overflow-y-auto pr-1 flex-1 custom-scrollbar">
                     <button
                       v-for="date in upcomingYearDates"
                       :key="date.iso"
                       type="button"
                       @click="selectCustomDate(date.iso)"
                       class="w-full text-left px-4 py-3 sm:py-2.5 rounded-xl text-sm transition-colors flex justify-between items-center group relative overflow-hidden active:bg-white/5"
                       :class="form.dateStr === date.iso ? 'bg-pride-blue/20 text-white font-bold border border-pride-blue/30' : 'text-slate-300 hover:bg-white/10 border border-transparent'"
                     >
                       <div v-if="form.dateStr === date.iso" class="absolute left-0 top-0 bottom-0 w-1 bg-pride-blue"></div>
                       <span :class="{'pl-2': form.dateStr === date.iso}">{{ date.labelLong }}</span>
                       <svg v-if="form.dateStr === date.iso" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-pride-blue">
                         <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12m13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                       </svg>
                     </button>
                     
                     <div v-if="!upcomingYearDates.length" class="text-center py-8 text-slate-500 text-xs">
                       Cargando fechas...
                     </div>
                   </div>
                </div>
              </Transition>
            </Teleport>
          </div>
        </div>
        <p v-if="dateError" class="text-pride-red text-sm mt-2 font-medium bg-pride-red/10 border border-pride-red/30 rounded-lg px-3 py-2 inline-block shadow-lg">{{ dateError }}</p>
      </div>

      <!-- Time / Location Slots -->
      <div class="space-y-3" v-if="form.sport">
        <label class="block text-sm font-medium text-slate-300">Horario de Entrenamiento</label>
        
        <!-- Swimming Layout -->
        <div v-if="form.sport === 'swimming'" class="grid sm:grid-cols-2 gap-4">
          <!-- Tlatelolco -->
          <div class="space-y-2 p-4 bg-slate-800/40 border border-white/5 rounded-2xl">
            <h4 class="font-medium text-pride-pink flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              Tlatelolco
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              Cuauhtémoc
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

        <!-- Soccer Layout -->
        <div v-else class="space-y-2 p-4 bg-slate-800/40 border border-white/5 rounded-2xl">
          <h4 class="font-medium text-pride-green flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            Tlatelolco (Fútbol)
          </h4>
          <div class="p-4 rounded-xl border border-pride-green bg-pride-green/10 flex items-center">
            <div class="w-4 h-4 rounded-full border border-pride-green mr-3 flex items-center justify-center">
              <div class="w-2 h-2 bg-pride-green rounded-full"></div>
            </div>
            <span class="text-sm text-slate-200">Sábado 10:00 am - 11:00 am</span>
          </div>
          <p class="text-xs text-slate-500 mt-2 px-1">La selección de sede y horario es automática para fútbol.</p>
        </div>
      </div>

      <!-- Reason Textarea -->
      <div class="space-y-2" v-if="form.sport">
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
        v-if="form.sport"
        type="submit" 
        class="w-full bg-slate-800 text-white hover:bg-slate-700 hover:text-white py-4 mt-8 text-lg font-black rounded-2xl border border-white/10 shadow-[0_4px_20px_0_rgba(0,0,0,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 relative overflow-hidden group pride-glow"
        :disabled="loading"
      >
        <div class="absolute bottom-0 left-0 w-full h-1 pride-bar translate-y-full group-hover:translate-y-0 transition-transform"></div>
        <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 animate-spin">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
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
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { startOfDay, addDays, isSaturday, isSunday, format, parseISO } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { es } from 'date-fns/locale'

const TIMEZONE = 'America/Mexico_City'
const tlatelolcoSlots = ['12:00 pm - 1:00 pm', '1:00 pm - 2:00 pm']
const cuauhtemocSlots = ['3:00 pm - 4:00 pm', '4:00 pm - 5:00 pm']

// State
const form = ref({
  sport: '', // 'swimming' or 'soccer'
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


const isMobile = ref(false)

const updateMobileStatus = () => {
  if (import.meta.client) {
    isMobile.value = window.innerWidth < 640
  }
}

// Actions
const selectSport = (sport) => {
  form.value.sport = sport
  form.value.dateStr = ''
  form.value.timeSlot = ''
  form.value.location = ''
  dateError.value = ''
  
  // Auto-set soccer location/slot
  if (sport === 'soccer') {
    form.value.location = 'Tlatelolco'
    form.value.timeSlot = '10:00 am - 11:00 am'
  }
}

// Init Mobile Check
onMounted(() => {
  updateMobileStatus()
  window.addEventListener('resize', updateMobileStatus)
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', updateMobileStatus)
  }
})

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
    const allowed = form.value.sport === 'soccer' 
      ? isSaturday(current) 
      : (isSaturday(current) || isSunday(current))
      
    if (allowed) {
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
  
  while(current < endLimit) {
    const allowed = form.value.sport === 'soccer' 
      ? isSaturday(current) 
      : (isSaturday(current) || isSunday(current))

    if (allowed) {
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
        reason: form.value.reason,
        sport: form.value.sport
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
    sport: '',
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
