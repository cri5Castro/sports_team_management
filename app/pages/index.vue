<template>
  <div class="space-y-6 md:space-y-8">
    <!-- Dynamic Header -->
    <div class="text-center space-y-3 mb-8 md:mb-10 transition-all duration-300">
      <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
        {{ pageContent.title }}
      </h1>
      <p class="text-slate-300 text-base md:text-lg max-w-lg mx-auto px-4">
        {{ pageContent.subtitle }}
      </p>
    </div>

    <!-- Premium Event Hero Banner (Contextual, not floating) -->
    <Transition name="slide-up">
      <div v-if="nextEvent && currentView === 'register'" class="max-w-2xl mx-auto mb-8 px-2">
        <NuxtLink 
          to="/comunidad" 
          class="block relative group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/40 backdrop-blur-xl hover:bg-slate-800/60 transition-all duration-500 shadow-xl"
        >
          <!-- Pride Accent Bar -->
          <div class="h-1 w-full pride-bar"></div>
          
          <div class="px-6 py-5 flex items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-pride-blue to-pride-purple flex items-center justify-center flex-shrink-0 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </div>
              
              <div class="min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                  <span class="text-[10px] font-black uppercase tracking-widest text-pride-light">Próximo Evento</span>
                  <span class="w-1 h-1 rounded-full bg-pride-light animate-ping"></span>
                </div>
                <h4 class="text-base font-bold text-white truncate group-hover:text-pride-light transition-colors">{{ nextEvent.title }}</h4>
                <p class="text-xs text-slate-400 font-medium">{{ formatDate(nextEvent.startDate) }}</p>
              </div>
            </div>

            <div class="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 group-hover:bg-pride-blue/20 group-hover:border-pride-blue/30 group-hover:translate-x-1 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>
    </Transition>

    <!-- Unified Navigation -->
    <div class="flex flex-col sm:flex-row p-1.5 bg-slate-800/60 backdrop-blur-xl rounded-2xl max-w-2xl mx-auto border border-white/10 mb-8 shadow-xl">
      <button 
        @click="currentView = 'register'" 
        class="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
        :class="currentView === 'register' ? 'bg-gradient-to-r from-pride-blue/20 to-pride-purple/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <span class="sm:inline">Reportar Ausencia</span>
      </button>

      <div class="hidden sm:block w-px bg-white/10 mx-2 my-2"></div>
      <div class="block sm:hidden h-px bg-white/10 mx-2 my-1"></div>

      <button 
        @click="currentView = 'my-absences'" 
        class="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
        :class="currentView === 'my-absences' ? 'bg-gradient-to-r from-pride-purple/20 to-pride-pink/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="sm:inline">Mis Ausencias</span>
      </button>

      <div class="hidden sm:block w-px bg-white/10 mx-2 my-2"></div>
      <div class="block sm:hidden h-px bg-white/10 mx-2 my-1"></div>

      <button 
        @click="currentView = 'discounts'" 
        class="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
        :class="currentView === 'discounts' ? 'bg-white/10 text-white shadow-lg border border-white/20' : 'text-slate-400 hover:text-white hover:bg-white/5'"
      >
        <span v-if="currentView === 'discounts'" class="absolute inset-0 bg-gradient-to-r from-pride-blue/20 via-pride-purple/20 to-pride-pink/20 opacity-50"></span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 relative z-10 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
        <span class="relative z-10 sm:inline">Beneficios</span>
      </button>
    </div>

    <!-- Active View -->
    <div class="relative min-h-[400px]">
      <Transition name="slide-fade" mode="out-in">
        <div :key="currentView" class="w-full">
          <AbsenceForm v-if="currentView === 'register'" />
          <MyAbsences v-else-if="currentView === 'my-absences'" />
          <DiscountsList v-else-if="currentView === 'discounts'" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { format, parseISO, isAfter } from 'date-fns'
import { es } from 'date-fns/locale'

const currentView = ref('register')
const isMobile = ref(false)
const events = ref([])

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
  const now = new Date()
  return events.value
    .filter(e => isAfter(parseISO(e.startDate), now) && e.isActive)
    .sort((a, b) => parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime())[0]
})

const formatDate = (dateStr) => {
  const date = parseISO(dateStr)
  return format(date, "EEEE d 'de' MMMM", { locale: es }).replace(/^\w/, c => c.toUpperCase())
}

const pageContent = computed(() => {
  switch(currentView.value) {
    case 'register':
      return {
        title: 'Reportar Ausencia',
        subtitle: 'Notifica si no podrás asistir a tu próximo entrenamiento activo de Sharkes.'
      }
    case 'my-absences':
      return {
        title: 'Mis Ausencias',
        subtitle: 'Revisa el historial de inasistencias que has reportado anteriormente.'
      }
    case 'discounts':
      return {
        title: 'Beneficios Sharkes',
        subtitle: 'Disfruta de descuentos especiales exclusivos para miembros presentando estos cupones.'
      }
    default:
      return {
         title: 'Sharkes',
         subtitle: 'Panel de control de jugador.'
      }
  }
})

// Use Nuxt layout
definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.98);
}
</style>
