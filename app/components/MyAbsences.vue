<template>
  <div class="glass-panel p-6 sm:p-8 animate-fade-in relative z-10">
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-2 flex items-center gap-3">
        <span class="iconify text-pride-blue" data-icon="heroicons:calendar-days" data-inline="false"></span>
        Mis Ausencias
      </h2>
      <p class="text-slate-400 text-sm">Busca tu nombre para ver y gestionar tus reportes futuros.</p>
    </div>

    <!-- Search Section -->
    <div class="space-y-2 relative mb-8 z-20">
      <label class="block text-sm font-medium text-slate-300">Nombre Exacto del Shark</label>
      <div class="relative">
        <input 
          v-model="searchQuery" 
          @focus="showAutocomplete = true"
          @blur="hideAutocompleteDelay"
          @keydown.enter="fetchUserAbsences"
          class="glass-input pl-10" 
          type="text" 
          placeholder="Ej: Carlos Silva..." 
        />
        <span class="iconify absolute left-3 top-3 text-slate-400 text-lg" data-icon="heroicons:magnifying-glass"></span>
        
        <button 
          v-if="searchQuery" 
          @click="fetchUserAbsences"
          class="absolute right-2 top-1.5 px-3 py-1.5 bg-pride-blue text-white rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors"
        >
          Buscar
        </button>
      </div>

      <!-- Autocomplete dropdown -->
      <ul v-if="showAutocomplete && filteredNames.length" class="absolute top-full left-0 w-full mt-1 bg-slate-800 border border-white/10 rounded-xl shadow-xl max-h-48 overflow-y-auto z-30 divide-y divide-white/5">
        <li 
          v-for="name in filteredNames" 
          :key="name" 
          @click="selectName(name)"
          class="px-4 py-2 hover:bg-white/10 cursor-pointer text-slate-200 transition-colors"
        >
          {{ name }}
        </li>
      </ul>
    </div>

    <!-- Results Section -->
    <div v-if="loading" class="flex justify-center py-12">
      <span class="iconify animate-spin text-4xl text-pride-light" data-icon="heroicons:arrow-path"></span>
    </div>

    <div v-else-if="hasSearched">
      <div v-if="userAbsences.length === 0" class="text-center py-10 bg-white/5 rounded-2xl border border-white/10">
        <span class="iconify text-5xl text-slate-500 mb-3 mx-auto" data-icon="heroicons:document-magnifying-glass"></span>
        <p class="text-slate-300">No se encontraron ausencias futuras para <strong class="text-white">"{{ lastSearched }}"</strong>.</p>
      </div>
      
      <div v-else class="space-y-4">
        <p class="text-sm text-pride-light font-medium mb-4">Mostrando {{ userAbsences.length }} ausencias programadas:</p>
        
        <!-- Absence Cards -->
        <TransitionGroup name="list" tag="div" class="space-y-3">
          <div 
            v-for="absence in userAbsences" 
            :key="absence.id" 
            class="bg-slate-800/60 border border-white/10 p-4 rounded-xl hover:border-white/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden group"
          >
            <!-- Date Banner Decoration -->
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-pride-blue"></div>

            <div class="pl-3">
              <div class="flex items-center gap-2 mb-1">
                <span class="iconify text-slate-400" data-icon="heroicons:calendar"></span>
                <span class="font-bold text-white text-lg">{{ formatDate(absence.date) }}</span>
              </div>
              <div class="flex items-center gap-3 text-sm text-slate-300">
                <span class="flex items-center gap-1"><span class="iconify text-pride-purple" data-icon="heroicons:clock"></span> {{ absence.timeSlot }}</span>
                <span class="text-white/20">•</span>
                <span class="flex items-center gap-1"><span class="iconify text-pride-pink" data-icon="heroicons:map-pin"></span> {{ absence.location }}</span>
              </div>
            </div>

            <!-- Action Area / Inline Confirmation -->
            <div class="shrink-0 relative">
              <Transition name="fade" mode="out-in">
                <!-- Delete Button -->
                <button 
                  v-if="deletingId !== absence.id"
                  @click="deletingId = absence.id"
                  class="glass-button !py-2 !px-4 hover:border-pride-red/50 hover:text-pride-red text-slate-400 text-sm group-hover:bg-white/10"
                >
                  <span class="iconify mr-1" data-icon="heroicons:trash"></span>
                  Eliminar
                </button>
                
                <!-- Confirmation Options -->
                <div v-else class="flex items-center gap-2 bg-slate-900 border border-pride-red rounded-xl p-1 shadow-lg pr-3 pl-3 py-1.5">
                  <span class="text-xs font-bold text-pride-red mr-2">¿Seguro?</span>
                  <button @click="confirmDelete(absence.id)" class="px-3 py-1 bg-pride-red text-white text-xs font-bold rounded hover:bg-red-700 transition" :disabled="isDeleting">
                    <span v-if="isDeleting" class="iconify animate-spin" data-icon="heroicons:arrow-path"></span>
                    <span v-else>Sí</span>
                  </button>
                  <button @click="deletingId = null" class="px-3 py-1 bg-slate-700 text-white text-xs font-bold rounded hover:bg-slate-600 transition" :disabled="isDeleting">No</button>
                </div>
              </Transition>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { format, parseISO, isAfter, startOfDay } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { es } from 'date-fns/locale'

const TIMEZONE = 'America/Mexico_City'

// State
const searchQuery = ref('')
const lastSearched = ref('')
const availableNames = ref([])
const showAutocomplete = ref(false)

const userAbsences = ref([])
const hasSearched = ref(false)
const loading = ref(false)

const deletingId = ref(null)
const isDeleting = ref(false)

// Fetch Init Data
onMounted(async () => {
  try {
    const namesRes = await $fetch('/api/names')
    availableNames.value = namesRes || []
  } catch (e) {
    console.error('Error loading names', e)
  }
})

// Autocomplete Logic
const filteredNames = computed(() => {
  if (!searchQuery.value) return availableNames.value.slice(0, 5)
  const lowerQuery = searchQuery.value.toLowerCase()
  return availableNames.value.filter(n => n.toLowerCase().includes(lowerQuery)).slice(0, 5)
})

const selectName = (n) => {
  searchQuery.value = n
  showAutocomplete.value = false
  fetchUserAbsences()
}

const hideAutocompleteDelay = () => {
  setTimeout(() => showAutocomplete.value = false, 200)
}

// Search Logic
const fetchUserAbsences = async () => {
  if (!searchQuery.value.trim()) return
  
  loading.value = true
  hasSearched.value = true
  lastSearched.value = searchQuery.value
  deletingId.value = null
  
  try {
    const res = await $fetch(`/api/absences?name=${encodeURIComponent(searchQuery.value)}`)
    
    // Filter out past dates based on CDMX timezone
    const todayCDMX = startOfDay(toZonedTime(new Date(), TIMEZONE))
    
    userAbsences.value = res.filter(a => {
      // isAfter or isSameDay (inclusive)
      const absenceDate = parseISO(a.date)
      // Check if absence date is >= todayCDMX
      return absenceDate.getTime() >= todayCDMX.getTime()
    })
  } catch (e) {
    console.error('Failed to fetch user absences', e)
  } finally {
    loading.value = false
  }
}

// Delete Logic
const confirmDelete = async (id) => {
  isDeleting.value = true
  try {
    // Optimistic UI update for speed (since it's a FAANG requirement to feel snappy)
    userAbsences.value = userAbsences.value.filter(a => a.id !== id)
    
    // Perform backend call
    await $fetch(`/api/absences/${id}`, { method: 'DELETE' })
    
  } catch (err) {
    console.error('Delete failed:', err)
    // Could optionally rollback here if deleting fails
  } finally {
    isDeleting.value = false
    deletingId.value = null
  }
}

// Helpers
const formatDate = (isoStr) => {
  const d = parseISO(isoStr)
  return format(d, "EEEE, d 'de' MMMM", { locale: es }).replace(/^\w/, c => c.toUpperCase())
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
