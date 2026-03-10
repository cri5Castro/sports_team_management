<template>
  <Transition name="slide-up">
    <div v-if="showBar" class="fixed bottom-4 left-4 right-4 z-[100] md:left-auto md:right-8 md:bottom-8 md:max-w-xs w-auto pointer-events-none">
      <div class="relative pointer-events-auto">
        <!-- Close Button -->
        <button 
          @click="dismissBar"
          class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 border border-white/20 text-white flex items-center justify-center shadow-lg hover:bg-slate-700 transition-colors z-[110]"
          aria-label="Cerrar aviso de evento"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <NuxtLink 
          to="/comunidad" 
          class="flex items-center gap-3 bg-slate-900/90 backdrop-blur-2xl border border-white/20 p-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] group hover:bg-slate-800/95 transition-all active:scale-95"
        >
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-pride-blue to-pride-purple flex items-center justify-center flex-shrink-0 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
          </div>
          
          <div class="min-w-0 flex-1">
            <p class="text-[9px] font-black uppercase tracking-widest text-pride-light mb-0.5">Siguiente Evento</p>
            <h4 class="text-xs font-bold text-white truncate group-hover:text-pride-light transition-colors">{{ nextEvent.title }}</h4>
            <p class="text-[10px] text-slate-400 font-medium">{{ formatDate(nextEvent.startDate) }}</p>
          </div>
          
          <div class="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </NuxtLink>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { format, parseISO, isAfter } from 'date-fns'
import { es } from 'date-fns/locale'
import { useRoute } from 'vue-router'

const route = useRoute()
const events = ref([])
const isDismissed = ref(false)

onMounted(async () => {
  // Check session storage for dismissal
  if (import.meta.client) {
    isDismissed.value = sessionStorage.getItem('event_bar_dismissed') === 'true'
  }

  try {
    const data = await $fetch('/api/events')
    events.value = data || []
  } catch (err) {
    console.error('Error fetching events for bar', err)
  }
})

const dismissBar = () => {
  isDismissed.value = true
  if (import.meta.client) {
    sessionStorage.setItem('event_bar_dismissed', 'true')
  }
}

const nextEvent = computed(() => {
  const now = new Date()
  return events.value
    .filter(e => isAfter(parseISO(e.startDate), now) && e.isActive)
    .sort((a, b) => parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime())[0]
})

const showBar = computed(() => {
  // Hide on admin pages and home page (dashboard already has it)
  if (route.path.startsWith('/admin') || route.path === '/') return false
  
  // Hide if dismissed manually
  if (isDismissed.value) return false
  
  // Show if an event exists
  return !!nextEvent.value
})

const formatDate = (dateStr) => {
  const date = parseISO(dateStr)
  return format(date, "d 'de' MMMM", { locale: es })
}
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from {
  transform: translateY(100px);
  opacity: 0;
}
.slide-up-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
</style>
