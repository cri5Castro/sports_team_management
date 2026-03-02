<template>
  <div class="glass-panel p-6 sm:p-8 animate-fade-in relative z-10">
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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 absolute left-3 top-3 text-slate-400">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        
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
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 animate-spin text-pride-light">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    </div>

    <div v-else-if="hasSearched">
      <div v-if="allAbsences.length === 0" class="text-center py-10 bg-white/5 rounded-2xl border border-white/10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-slate-500 mb-3 mx-auto">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
        </svg>
        <p class="text-slate-300">No se encontraron ausencias para <strong class="text-white">"{{ lastSearched }}"</strong>.</p>
      </div>
      
      <div v-else class="space-y-6">
        <!-- History Toggle & Summary -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
          <div>
            <p class="text-sm text-pride-light font-bold flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-pride-light" :class="upcomingAbsences.length > 0 ? 'animate-pulse' : ''"></span>
              {{ upcomingAbsences.length }} ausencias programadas
            </p>
            <p v-if="pastAbsences.length > 0" class="text-[10px] text-slate-500 mt-0.5">
              {{ pastAbsences.length }} registros en el historial
            </p>
          </div>

          <!-- Premium Switch -->
          <div v-if="pastAbsences.length > 0" class="flex items-center gap-3">
            <span class="text-xs font-semibold" :class="showHistory ? 'text-white' : 'text-slate-500'">Ver Historial</span>
            <button 
              @click="showHistory = !showHistory"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none"
              :class="showHistory ? 'bg-pride-purple shadow-[0_0_10px_rgba(168,85,247,0.4)]' : 'bg-slate-700'"
            >
              <span
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-lg"
                :class="showHistory ? 'translate-x-6' : 'translate-x-1'"
              />
            </button>
          </div>
        </div>
        
        <!-- Upcoming Absences -->
        <div class="space-y-3">
          <TransitionGroup name="list" tag="div" class="space-y-3">
            <div 
              v-for="absence in upcomingAbsences" 
              :key="absence.id" 
              class="bg-slate-800/60 border border-white/10 p-4 rounded-xl hover:border-white/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden group"
            >
              <!-- Date Banner Decoration -->
              <div class="absolute left-0 top-0 bottom-0 w-1 bg-pride-light"></div>

              <div class="pl-3">
                <div class="flex items-center gap-2 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-slate-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  <span class="font-bold text-white text-lg">{{ formatDate(absence.date) }}</span>
                </div>
                <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-300">
                  <span class="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 text-[10px] font-bold uppercase tracking-tight"
                    :class="absence.sport === 'soccer' ? 'text-pride-green border border-pride-green/20' : 'text-pride-light border border-pride-light/20'"
                  >
                    <svg v-if="absence.sport === 'soccer'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3">
                      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
                      <path d="M12 7l-3 2v3l3 2 3-2V9zM7 12l2-3-2-3-3 1v4zM17 12l-2-3 2-3 3 1v4zM9 16l3-2 3 2-1 4H10z" fill="currentColor"/>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3">
                      <path d="M4 12c.5-1.5 2.5-1.5 3 0s2.5 1.5 3 0c.5-1.5 2.5-1.5 3 0s2.5 1.5 3 0c.5-1.5 2.5-1.5 3 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      <path d="M4 16c.5-1.5 2.5-1.5 3 0s2.5 1.5 3 0c.5-1.5 2.5-1.5 3 0s2.5 1.5 3 0c.5-1.5 2.5-1.5 3 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
                    </svg>
                    {{ absence.sport === 'soccer' ? 'Fútbol' : 'Natación' }}
                  </span>
                  <span class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-pride-purple">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {{ absence.timeSlot }}
                  </span>
                  <span class="text-white/20 hidden sm:inline">•</span>
                  <span class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-pride-pink">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    {{ absence.location }}
                  </span>
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    Eliminar
                  </button>
                  
                  <!-- Confirmation Options -->
                  <div v-else class="flex items-center gap-2 bg-slate-900 border border-pride-red rounded-xl p-1 shadow-lg pr-3 pl-3 py-1.5">
                    <span class="text-xs font-bold text-pride-red mr-2">¿Seguro?</span>
                    <button @click="confirmDelete(absence.id)" class="px-3 py-1 bg-pride-red text-white text-xs font-bold rounded hover:bg-red-700 transition" :disabled="isDeleting">
                      <svg v-if="isDeleting" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 animate-spin">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                      <span v-else>Sí</span>
                    </button>
                    <button @click="deletingId = null" class="px-3 py-1 bg-slate-700 text-white text-xs font-bold rounded hover:bg-slate-600 transition" :disabled="isDeleting">No</button>
                  </div>
                </Transition>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <!-- History Section (Past Absences) -->
        <Transition name="fade">
          <div v-if="showHistory && pastAbsences.length > 0" class="space-y-4 pt-6 border-t border-white/5">
            <div class="flex items-center gap-2 text-slate-400 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <h3 class="text-xs font-black uppercase tracking-[0.2em]">Historial Pasado · Solo Lectura</h3>
            </div>

            <div class="space-y-3">
            <div 
              v-for="absence in pastAbsences" 
              :key="absence.id" 
              class="bg-slate-900/40 border border-white/10 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-900/60 transition-colors group/history"
            >
              <div class="pl-2">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-bold text-slate-300 text-lg">{{ formatDate(absence.date) }}</span>
                  <span class="text-[8px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-white/10 font-bold uppercase">Sesión Pasada</span>
                </div>
                <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                  <span class="flex items-center gap-1">
                    <svg v-if="absence.sport === 'soccer'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3 text-slate-500">
                      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
                      <path d="M12 7l-3 2v3l3 2 3-2V9zM7 12l2-3-2-3-3 1v4zM17 12l-2-3 2-3 3 1v4zM9 16l3-2 3 2-1 4H10z" fill="currentColor"/>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3 text-slate-500">
                      <path d="M4 12c.5-1.5 2.5-1.5 3 0s2.5 1.5 3 0c.5-1.5 2.5-1.5 3 0s2.5 1.5 3 0c.5-1.5 2.5-1.5 3 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    {{ absence.sport === 'soccer' ? 'Fútbol' : 'Natación' }}
                  </span>
                  <span>•</span>
                  <span>{{ absence.timeSlot }}</span>
                  <span>•</span>
                  <span>{{ absence.location }}</span>
                </div>
              </div>
              <div class="shrink-0 flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 opacity-60 group-hover/history:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3.5 h-3.5 text-slate-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <span class="text-[10px] text-slate-500 font-bold uppercase">Archivado</span>
              </div>
            </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { format, parseISO } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { es } from 'date-fns/locale'
import { isSessionPast } from '~/utils/time'

const TIMEZONE = 'America/Mexico_City'

// State
const searchQuery = ref('')
const lastSearched = ref('')
const availableNames = ref([])
const showAutocomplete = ref(false)

const allAbsences = ref([])
const showHistory = ref(false)
const hasSearched = ref(false)
const loading = ref(false)

const deletingId = ref(null)
const isDeleting = ref(false)

// Computed
const upcomingAbsences = computed(() => {
  return allAbsences.value.filter(a => !isSessionPast(a.date, a.timeSlot))
})

const pastAbsences = computed(() => {
  return allAbsences.value.filter(a => isSessionPast(a.date, a.timeSlot))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

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
  showHistory.value = false
  
  try {
    const res = await $fetch(`/api/absences?name=${encodeURIComponent(searchQuery.value)}`)
    allAbsences.value = res || []
  } catch (e) {
    console.error('Failed to fetch user absences', e)
    allAbsences.value = []
  } finally {
    loading.value = false
  }
}

// Delete Logic
const confirmDelete = async (id) => {
  isDeleting.value = true
  try {
    // Optimistic UI update
    allAbsences.value = allAbsences.value.filter(a => a.id !== id)
    
    // Perform backend call
    await $fetch(`/api/absences/${id}`, { method: 'DELETE' })
    
  } catch (err) {
    console.error('Delete failed:', err)
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
