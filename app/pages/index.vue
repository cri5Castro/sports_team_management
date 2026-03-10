<template>
  <div class="space-y-8 md:space-y-12 pb-12">
    <Transition :name="transitionName" mode="out-in">
      <!-- Dashboard View -->
      <div v-if="currentView === 'dashboard'" key="dashboard" class="space-y-12 md:space-y-16">
        <!-- Premium Welcome Hero -->
        <div class="relative group mt-4 md:mt-8">
          <div class="absolute -inset-4 bg-gradient-to-r from-pride-blue/10 via-pride-purple/10 to-pride-pink/10 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div class="relative text-center space-y-4">
            <h1 class="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-2xl">
              ¡Hola,<span class="pride-gradient-text italic">Sharke!&nbsp;</span>
            </h1>
            <p class="text-slate-400 text-lg md:text-xl max-w-xl mx-auto font-medium px-4">
              Te damos la bienvenida a nuestra comunidad deportiva
            </p>
          </div>
        </div>

        <!-- High-Impact Next Event Card -->
        <div v-if="nextEvent" class="max-w-3xl mx-auto px-2">
          <div class="flex items-center gap-3 mb-4 px-4">
            <span class="w-2 h-2 rounded-full bg-pride-light animate-ping"></span>
            <h2 class="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Próxima Parada</h2>
          </div>
          
          <NuxtLink 
            to="/comunidad" 
            class="block relative group overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/40 backdrop-blur-xl hover:bg-slate-800/60 transition-all duration-700 shadow-2xl hover:shadow-pride-pink/10 hover:-translate-y-1 active:shadow-[0_0_30px_rgba(255,51,102,0.3)] active:scale-[0.98]"
          >
            <!-- Active Pink Overlay -->
            <div class="absolute inset-0 bg-pride-pink/20 opacity-0 active:opacity-100 transition-opacity duration-150 pointer-events-none z-10"></div>
            
            <div class="px-5 md:px-10 py-6 md:py-8 flex items-center justify-between gap-4 relative z-20">
              <div class="flex items-center gap-4 md:gap-6 min-w-0">
                <!-- Date Badge (Slightly smaller on mobile for better balance) -->
                <div class="w-14 h-14 md:w-20 md:h-20 rounded-[1.25rem] md:rounded-3xl bg-slate-800 border border-white/10 flex flex-col items-center justify-center group-hover:border-pride-pink/30 transition-colors duration-500 overflow-hidden relative flex-shrink-0">
                   <div class="absolute inset-0 bg-gradient-to-br from-pride-pink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <span class="text-xl md:text-3xl font-black text-white relative z-10 leading-none mb-0.5">{{ getDay(nextEvent.startDate) }}</span>
                   <span class="text-[9px] md:text-xs font-black text-pride-light tracking-tighter uppercase relative z-10">{{ getMonth(nextEvent.startDate) }}</span>
                </div>
                
                <div class="min-w-0 flex-1">
                  <h4 class="text-lg md:text-3xl font-black text-white md:truncate line-clamp-2 group-hover:text-pride-pink transition-colors duration-500 mb-0.5 md:mb-1 leading-tight">{{ nextEvent.title }}</h4>
                  <p class="text-[11px] md:text-sm text-slate-400 font-bold truncate">Toca para ver detalles</p>
                </div>
              </div>

              <!-- Action CTA -->
              <div class="flex items-center gap-4 flex-shrink-0">
                <div class="hidden lg:flex flex-col text-right">
                   <span class="text-[10px] font-black uppercase tracking-widest text-slate-500">¿Vas a ir?</span>
                   <span class="text-sm font-bold text-white">Ver detalles</span>
                </div>
                <div class="flex items-center justify-center w-11 h-11 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 group-hover:bg-pride-pink group-hover:border-transparent group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,51,102,0.3)] transition-all duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" class="w-4 h-4 md:w-6 md:h-6 text-white group-hover:translate-x-0.5 transition-transform">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Quick Actions & Insights Grid -->
        <div class="max-w-4xl mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <!-- Action: Report Absence -->
            <button 
              @click="currentView = 'register'"
              class="group glass-panel p-6 border-white/5 hover:border-pride-blue/30 active:scale-95 transition-all duration-500 text-left relative overflow-hidden h-40 flex flex-col justify-between"
            >
              <div class="absolute top-0 right-0 w-24 h-24 bg-pride-blue/5 blur-3xl group-hover:bg-pride-blue/10 transition-colors"></div>
              <div class="w-12 h-12 rounded-2xl bg-pride-blue/20 flex items-center justify-center text-pride-blue group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h3 class="font-black text-white text-lg tracking-tight">Reportar Ausencia</h3>
                <p class="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Gestión de entrenamientos</p>
              </div>
            </button>

            <!-- Action: History -->
            <button 
              @click="currentView = 'my-absences'"
              class="group glass-panel p-6 border-white/5 hover:border-pride-purple/30 active:scale-95 transition-all duration-500 text-left relative overflow-hidden h-40 flex flex-col justify-between"
            >
              <div class="absolute top-0 right-0 w-24 h-24 bg-pride-purple/5 blur-3xl group-hover:bg-pride-purple/10 transition-colors"></div>
              <div class="w-12 h-12 rounded-2xl bg-pride-purple/20 flex items-center justify-center text-pride-purple group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-black text-white text-lg tracking-tight">Mis Ausencias</h3>
                <p class="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Revisa tu historial</p>
              </div>
            </button>

            <!-- Action: Discounts -->
            <button 
              @click="currentView = 'discounts'"
              class="group glass-panel p-6 border-white/5 hover:border-pride-pink/30 active:scale-95 transition-all duration-500 text-left relative overflow-hidden h-40 flex flex-col justify-between"
            >
              <div class="absolute top-0 right-0 w-24 h-24 bg-pride-pink/5 blur-3xl group-hover:bg-pride-pink/10 transition-colors"></div>
              <div class="w-12 h-12 rounded-2xl bg-pride-pink/20 flex items-center justify-center text-pride-pink group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
              </div>
              <div>
                <h3 class="font-black text-white text-lg tracking-tight">Beneficios</h3>
                <p class="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Exclusivos para ti</p>
              </div>
            </button>
          </div>
        </div>

        <!-- Community "The Vibe" Preview -->
        <div class="max-w-4xl mx-auto px-4 pt-12 border-t border-white/5 space-y-8">
           <div class="flex items-center justify-between">
              <h2 class="text-2xl md:text-3xl font-black text-white italic tracking-tighter group flex items-center gap-3">
                 <span class="pride-gradient-text">#SharkesVibe</span>
                 <span class="w-1 h-1 rounded-full bg-slate-500"></span>
              </h2>
              <NuxtLink to="/comunidad" class="text-xs font-black uppercase tracking-widest text-pride-light hover:underline">Ver todo</NuxtLink>
           </div>
           
           <!-- Mini Instagram Grid/Carousel Preview -->
           <InstagramFeed :limit="3" />
        </div>
      </div>

      <!-- Detail Views (Absence Form, History, etc.) -->
      <div v-else :key="currentView" class="pt-4 sm:pt-0 space-y-6 md:space-y-8 relative z-10">
        <!-- Breadcrumb / Back Button -->
        <div class="max-w-2xl mx-auto px-4 flex items-center justify-between mb-2">
          <button 
            @click="currentView = 'dashboard'" 
            class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 group shadow-lg backdrop-blur-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-4 h-4 text-slate-400 group-hover:text-white group-hover:-translate-x-0.5 transition-all">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white transition-colors">Volver</span>
          </button>
          
          <div class="text-right">
            <h2 class="text-2xl sm:text-3xl font-black text-white leading-tight uppercase tracking-tighter">{{ pageContent.title }}</h2>
            <p class="text-xs sm:text-sm font-bold text-pride-light uppercase tracking-[0.2em]">{{ pageContent.subtitle }}</p>
          </div>
        </div>

        <div class="px-2 sm:px-0">
          <AbsenceForm v-if="currentView === 'register'" />
          <MyAbsences v-else-if="currentView === 'my-absences'" />
          <DiscountsList v-else-if="currentView === 'discounts'" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { format, parseISO, isAfter, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'
import InstagramFeed from '~/components/InstagramFeed.vue'

const currentView = ref('dashboard')
const transitionName = ref('push')
const isMobile = ref(false)
const events = ref([])

// Fix: Coordinate scroll reset with transition for extra smoothness
watch(currentView, (newVal) => {
  // Determine direction: Dashboard is always the "bottom" of the stack
  transitionName.value = newVal === 'dashboard' ? 'pop' : 'push'

  if (import.meta.client) {
    // FIX: Instant scroll is more performant during animations
    // and shorter delay prevents the 'freeze' at the start
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }, 10)
  }
})

const updateMobileStatus = () => {
  if (import.meta.client) {
    isMobile.value = window.innerWidth < 640
  }
}

onMounted(async () => {
  updateMobileStatus()
  window.addEventListener('resize', updateMobileStatus)
  
  try {
    const data = await $fetch('/api/events')
    events.value = data || []
  } catch (err) {
    console.error('Error fetching events for index', err)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', updateMobileStatus)
  }
})

const nextEvent = computed(() => {
  const today = startOfDay(new Date())
  return events.value
    .filter(e => e.isActive && (isAfter(parseISO(e.startDate), today) || e.startDate === format(today, 'yyyy-MM-dd')))
    .sort((a, b) => parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime())[0]
})

const getDay = (dateStr) => format(parseISO(dateStr), 'd')
const getMonth = (dateStr) => format(parseISO(dateStr), 'MMM', { locale: es }).toUpperCase()

const pageContent = computed(() => {
  switch(currentView.value) {
    case 'register':
      return {
        title: 'Reportar Ausencia',
        subtitle: 'Notifica tu inasistencia'
      }
    case 'my-absences':
      return {
        title: 'Mis Ausencias',
        subtitle: 'Historial de reportes'
      }
    case 'discounts':
      return {
        title: 'Beneficios Sharkes',
        subtitle: 'Cupones exclusivos'
      }
    default:
      return {
        title: 'Sharkes',
        subtitle: 'Player Hub'
      }
  }
})

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
/* Premium iOS-style Transitions (FAANG Level) */
.push-enter-active, .push-leave-active,
.pop-enter-active, .pop-leave-active {
  transition: all 0.4s cubic-bezier(0.32, 0.72, 0, 1);
  will-change: transform, opacity;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* Push: Entering from right, exiting to left */
.push-enter-from {
  opacity: 0;
  transform: translateX(30px);
  filter: blur(4px);
}
.push-leave-to {
  opacity: 0;
  transform: translateX(-30px);
  filter: blur(4px);
}

/* Pop: Entering from left, exiting to right */
.pop-enter-from {
  opacity: 0;
  transform: translateX(-30px);
  filter: blur(4px);
}
.pop-leave-to {
  opacity: 0;
  transform: translateX(30px);
  filter: blur(4px);
}

/* Ensure the container doesn't jump during horizontal move */
.Transition-wrapper {
  position: relative;
  width: 100%;
}
</style>
