<template>
  <div class="space-y-12 animate-fade-in relative z-10">
    <!-- Hero Section -->
    <div class="text-center space-y-4">
      <h1 class="text-4xl md:text-6xl font-black tracking-tighter text-white">
        <span class="pride-gradient-text"> Eventos </span> y Comunidad 
      </h1>
      <p class="text-slate-400 text-lg max-w-2xl mx-auto">
        Entérate de nuestras próximas fechas, entrenamientos especiales y lo mejor de Sharkes en redes sociales.
      </p>
    </div>

    <!-- Upcoming Events Section -->
    <section class="space-y-8">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold flex items-center gap-3 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="text-pride-blue w-7 h-7">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            Próximos Eventos
        </h2>
      </div>

      <div v-if="pendingEvents.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="event in pendingEvents" 
          :key="event.id"
          class="glass-panel overflow-hidden border border-white/10 group hover:border-white/20 transition-all flex flex-col"
        >
          <!-- Event Photo -->
          <div class="relative h-48 overflow-hidden bg-slate-800">
            <img 
              v-if="event.photoUrl" 
              :src="event.photoUrl" 
              :alt="event.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div v-else class="w-full h-full flex items-center justify-center opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 text-slate-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
            </div>
            
            <!-- Floating Date Badge -->
            <div class="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 flex flex-col items-center">
              <span class="text-lg font-black leading-tight">{{ getDay(event.startDate) }}</span>
              <span class="text-[10px] uppercase font-bold text-pride-light tracking-tighter">{{ getMonth(event.startDate) }}</span>
            </div>
            
            <!-- Pride Badge -->
            <div class="absolute bottom-4 right-4 pride-bar !h-1 !w-16 rounded-full opacity-70"></div>
          </div>

          <div class="p-6 space-y-4 flex-1 flex flex-col">
            <div class="flex-1">
                <h3 class="text-xl font-bold text-white mb-2 group-hover:text-pride-light transition-colors">{{ event.title }}</h3>
                <p class="text-slate-400 text-sm leading-relaxed">{{ event.description }}</p>
                
                <div v-if="event.endDate" class="mt-4 flex items-center gap-2 text-xs font-bold text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Del {{ formatDate(event.startDate) }} al {{ formatDate(event.endDate) }}
                </div>
            </div>

            <!-- Pride Countdown -->
            <div class="pt-6 border-t border-white/5 mt-auto">
               <p class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Comienza en:</p>
               <EventCountdown :targetDate="event.startDate + 'T00:00:00'" />
            </div>
          </div>
        </div>
      </div>

      <div v-else class="glass-panel p-12 text-center text-slate-500">
          <p>No hay eventos próximos en este momento. ¡Vuelve pronto!</p>
      </div>
    </section>

    <!-- Instagram Section -->
    <section class="space-y-8">
      <div class="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-pride-pink w-6 h-6">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
        <h2 class="text-2xl font-bold text-white">Nuestro Feed</h2>
      </div>
      
      <InstagramFeed />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { format, parseISO, isAfter, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'
import EventCountdown from '~/components/EventCountdown.vue'
import InstagramFeed from '~/components/InstagramFeed.vue'

const events = ref([])

const fetchEvents = async () => {
    try {
        const data = await $fetch('/api/events')
        events.value = data || []
    } catch (err) {
        console.error('Error fetching events', err)
    }
}

onMounted(() => {
    fetchEvents()
})

const pendingEvents = computed(() => {
    const today = startOfDay(new Date())
    return events.value
        .filter(e => e.isActive && (isAfter(parseISO(e.startDate), today) || e.startDate === format(today, 'yyyy-MM-dd')))
        .sort((a, b) => parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime())
})

const formatDate = (dateStr) => {
    return format(parseISO(dateStr), "d 'de' MMMM", { locale: es })
}

const getDay = (dateStr) => format(parseISO(dateStr), 'd')
const getMonth = (dateStr) => format(parseISO(dateStr), 'MMM', { locale: es }).toUpperCase()

definePageMeta({
    layout: 'default'
})
</script>
