<template>
  <div class="space-y-12 md:space-y-20 animate-fade-in relative z-10 pb-20">
    <!-- Immersive Community Hero -->
    <div class="relative py-8 md:py-12 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-pride-blue/5 via-transparent to-transparent opacity-50 blur-3xl"></div>
      <div class="relative text-center space-y-6">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-2">
           <span class="relative flex h-2 w-2">
             <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-pride-blue opacity-75"></span>
             <span class="relative inline-flex rounded-full h-2 w-2 bg-pride-blue"></span>
           </span>
           <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Comunidad Activa</span>
        </div>
        
        <h1 class="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.85]">
          EL CORAZÓN DE<br/>
          <span class="pride-gradient-text italic"> SHARKES</span>
        </h1>
        
        <p class="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed px-4">
          Explora nuestros próximos eventos, revive los mejores momentos y conecta con la comunidad en redes sociales.
        </p>
      </div>
    </div>

    <!-- Upcoming Events Section -->
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-xl md:text-2xl font-bold flex items-center gap-2 md:gap-3 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="text-pride-blue w-6 h-6 md:w-7 md:h-7">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            Próximos Eventos
        </h2>
        
        <div v-if="pendingEvents.length > 2" class="flex items-center gap-1.5 md:gap-2 text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
            <span class="whitespace-nowrap">Desliza para ver más</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5 md:w-4 md:h-4 animate-bounce-x">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
        </div>
      </div>

      <!-- Premium Events Display -->
      <div v-if="pendingEvents.length" class="relative group/container">
        <!-- Navigation Arrows (Desktop Only - only if 3+ events) -->
        <div v-if="pendingEvents.length > 2" class="hidden md:block">
          <button 
            @click="scrollCarousel('prev')"
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center shadow-2xl transition-all opacity-0 group-hover/container:opacity-100 group-hover/container:-translate-x-2 hover:bg-slate-800 hover:scale-110 active:scale-95 disabled:opacity-0"
            aria-label="Anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button 
            @click="scrollCarousel('next')"
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center shadow-2xl transition-all opacity-0 group-hover/container:opacity-100 group-hover/container:translate-x-2 hover:bg-slate-800 hover:scale-110 active:scale-95 disabled:opacity-0"
            aria-label="Siguiente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 md:w-6 md:h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        <!-- Hybrid Grid/Carousel Container Wrapper with CSS Masking -->
        <div class="relative w-full">
          <div 
            ref="carouselRef" 
            class="flex gap-4 md:gap-10 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-14 no-scrollbar overscroll-x-contain transform-gpu"
            style="
              -webkit-overflow-scrolling: touch; 
              scroll-padding-left: 9vw; 
              scroll-padding-right: 9vw; 
              will-change: transform;
              mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
              -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            "
            :class="{
              'md:grid md:grid-cols-2 lg:px-0 lg:mx-0': pendingEvents.length <= 2,
              'px-[9vw] -mx-4 md:px-0 md:mx-0': pendingEvents.length > 2
            }"
          >
            <div 
              v-for="(event, index) in pendingEvents" 
              :key="event.id"
              :data-index="index"
              class="carousel-item snap-center shrink-0 glass-panel overflow-hidden border border-white/10 group/card hover:border-white/20 transition-all duration-700 ease-out flex flex-col shadow-2xl relative"
              :class="{
                'w-[82vw]': true,
                'md:w-full': pendingEvents.length <= 2,
                'md:w-[calc(50%-20px)] lg:w-[calc(50%-32px)]': pendingEvents.length > 2,
                'opacity-25 scale-[0.85] blur-[3px] transition-all duration-700': activeIndex !== index && pendingEvents.length > 2,
                'opacity-100 scale-100 blur-0 ring-1 ring-white/30 shadow-pride-blue/20': activeIndex === index && pendingEvents.length > 2
              }"
            >
              <!-- Event Photo -->
              <div class="relative h-48 overflow-hidden bg-slate-800">
                <img 
                  v-if="event.photoUrl" 
                  :src="event.photoUrl" 
                  :alt="event.title"
                  class="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                />
                <div v-else class="w-full h-full flex items-center justify-center opacity-20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 text-slate-400">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </div>
                
                <!-- Floating Date Badge -->
                <div class="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 flex flex-col items-center">
                  <span class="text-lg font-black leading-tight text-white">{{ getDay(event.startDate) }}</span>
                  <span class="text-[10px] uppercase font-bold text-pride-light tracking-tighter">{{ getMonth(event.startDate) }}</span>
                </div>
                
                <!-- Pride Badge -->
                <div class="absolute bottom-4 right-4 pride-bar !h-1 !w-16 rounded-full opacity-70"></div>
              </div>

              <div class="p-6 space-y-4 flex-1 flex flex-col">
                <div class="flex-1">
                    <h3 class="text-xl font-bold text-white mb-2 group-hover/card:text-pride-light transition-colors">{{ event.title }}</h3>
                    <p class="text-slate-400 text-sm leading-relaxed line-clamp-2 md:line-clamp-3">{{ event.description }}</p>
                    
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
        </div>

        <!-- Pagination Dots (Mobile Only) -->
        <div v-if="pendingEvents.length > 1" class="flex justify-center gap-2 mt-2 md:hidden">
          <div 
            v-for="(_, index) in pendingEvents" 
            :key="index"
            class="h-1.5 rounded-full transition-all duration-300"
            :class="activeIndex === index ? 'w-6 bg-pride-light' : 'w-1.5 bg-white/20'"
          ></div>
        </div>
      </div>

      <!-- Compressed "No Events" Banner -->
      <div v-else class="glass-panel py-8 px-6 flex flex-col md:flex-row items-center justify-between gap-6 border-white/5 bg-white/[0.02]">
        <div class="flex items-center gap-4">
          <div class="relative flex items-center justify-center">
            <div class="absolute inset-0 bg-pride-blue/20 blur-xl rounded-full animate-pulse"></div>
            <div class="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center relative z-10 shadow-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-pride-light opacity-80">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
          </div>
          <div class="text-center md:text-left">
            <h3 class="text-lg font-bold text-white leading-tight">Nuevos eventos próximamente</h3>
            <p class="text-slate-500 text-sm font-medium">Estamos preparando grandes sorpresas para la comunidad.</p>
          </div>
        </div>
        
        <div class="flex items-center gap-3 bg-white/5 py-2 px-4 rounded-full border border-white/5">
          <span class="flex h-2 w-2 relative">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-pride-pink opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-pride-pink"></span>
          </span>
          <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">Stay Tuned</span>
        </div>
      </div>
    </section>


    <!-- Instagram Section -->
    <section id="instagram-feed" class="space-y-6 pt-8 md:pt-12 border-t border-white/5">
      <div class="flex items-center justify-between gap-4 flex-wrap">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center p-[2.5px] shadow-lg shadow-pink-500/20">
            <div class="w-full h-full bg-slate-900 rounded-[13px] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="text-white w-6 h-6">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
            </div>
          </div>
          <div class="flex flex-col">
            <h2 class="text-2xl font-bold text-white tracking-tight leading-none mb-1">Comunidad Sharkes</h2>
            <p class="text-slate-500 text-sm font-medium">@sharkeslgbtiq</p>
          </div>
        </div>

        <a 
          href="https://www.instagram.com/sharkeslgbtiq/" 
          target="_blank"
          class="glass-button !px-6 !py-2.5 !rounded-14 !text-[11px] !font-black !tracking-widest !uppercase bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 transition-all active:scale-95 pride-glow"
        >
          Seguir en Instagram
        </a>
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
const carouselRef = ref(null)
const activeIndex = ref(0)
let observer = null

const setupObserver = () => {
    if (observer) observer.disconnect()
    
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = parseInt(entry.target.getAttribute('data-index'))
                activeIndex.value = index
            }
        })
    }, {
        root: carouselRef.value,
        threshold: 0.7,
        rootMargin: '0px'
    })

    const items = carouselRef.value?.querySelectorAll('.carousel-item')
    items?.forEach(item => observer.observe(item))
}

const scrollCarousel = (direction) => {
    if (!carouselRef.value) return
    const scrollAmount = carouselRef.value.offsetWidth * 0.8
    carouselRef.value.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
    })
}

const scrollToFeed = () => {
    document.getElementById('instagram-feed')?.scrollIntoView({ behavior: 'smooth' })
}

const fetchEvents = async () => {
    try {
        const data = await $fetch('/api/events')
        events.value = data || []
    } catch (err) {
        console.error('Error fetching events', err)
    }
}

onMounted(async () => {
    await fetchEvents()
    setTimeout(setupObserver, 100)
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
