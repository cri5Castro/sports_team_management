<template>
  <div class="space-y-8 animate-fade-in relative z-10 w-full mb-12">
    <!-- Loading State -->
    <div v-if="loading" class="py-20 flex justify-center">
        <div class="w-10 h-10 rounded-full border-4 border-pride-light border-t-transparent animate-spin"></div>
    </div>
    
    <!-- Empty State -->
    <div v-if="!loading && discounts.length === 0" class="glass-panel p-12 text-center border-t-2 border-slate-700 mx-4 sm:mx-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-20 h-20 text-slate-600 mx-auto mb-4 opacity-50">
           <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        <h3 class="text-xl font-bold text-white mb-2">No hay promociones activas</h3>
        <p class="text-slate-400">Vuelve pronto para descubrir nuevos descuentos especiales para nuestra comunidad.</p>
    </div>

    <!-- Cards Grid -->
    <div v-if="!loading && discounts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 xl:gap-8 px-2 sm:px-0">
        <div v-for="(d, index) in discounts" :key="d.id" 
             @click="selectedDiscount = d"
             class="group relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)] sm:hover:-translate-y-2 cursor-pointer"
             :style="{ animationDelay: `${index * 100}ms` }"
             style="animation: fade-in-up 0.6s ease-out forwards; opacity: 0; transform: translateY(20px);"
        >
            
            <!-- Glowing Border Effect on Hover -->
            <div class="absolute inset-0 bg-gradient-to-br from-pride-light/20 to-pride-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none"></div>
            
            <div class="relative z-10 h-full flex flex-col">
                <!-- Image Section -->
                <div class="relative w-full aspect-[16/9] md:aspect-[2/1] bg-black/50 overflow-hidden border-b border-white/10">
                    <img v-if="d.image_url" :src="d.image_url" class="w-full h-full object-cover transition-transform duration-700 sm:group-hover:scale-105 group-hover:blur-[2px]" alt="Promoción" />
                    <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 group-hover:blur-[2px] transition-all duration-700">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-16 h-16 text-slate-700">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                        </svg>
                    </div>

                    <!-- Hover Action Overlay -->
                    <div class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none backdrop-blur-[1px]">
                        <span class="text-white font-bold bg-pride-light/95 border border-white/20 px-6 py-2.5 rounded-xl shadow-[0_10px_30px_rgba(91,206,250,0.5)] flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 scale-95 group-hover:scale-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
                            Ampliar Código
                        </span>
                    </div>
                    
                    <!-- Top Badges -->
                    <div class="absolute top-4 right-4 flex gap-2">
                        <span class="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold text-pride-light border border-white/10 shadow-lg">
                            Activo
                        </span>
                    </div>
                </div>

                <!-- Content Section -->
                <div class="p-6 md:p-8 flex flex-col flex-grow">
                    
                    <div class="mb-4">
                        <p class="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">{{ d.business_name }}</p>
                        <h3 class="text-2xl font-black text-white leading-tight group-hover:text-pride-light transition-colors">{{ d.title }}</h3>
                    </div>

                    <p class="text-sm sm:text-base text-slate-300 mb-6 flex-grow leading-relaxed">{{ d.description }}</p>

                    <div class="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-white/10 mt-auto gap-4">
                        <div class="flex items-center text-xs text-slate-400 font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-1.5 text-pride-purple">
                              <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                            </svg>
                            {{ d.location || 'Varía' }}
                        </div>

                        <div class="text-xs font-bold px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-center sm:text-left">
                             <span v-if="d.is_indefinite" class="text-pride-green">Vigencia Indefinida</span>
                             <span v-else>Válido hasta {{ formatDate(d.end_date) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- QR / Coupon Modal -->
    <ClientOnly>
      <Teleport to="body">
        <Transition name="modal-fade">
          <div v-if="selectedDiscount" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style="z-index: 999999">
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" @click="selectedDiscount = null"></div>
            
            <!-- Modal Content -->
            <div class="relative w-full max-w-lg bg-slate-900 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] rounded-[2rem] overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">
                
                <!-- Close Button -->
                <button @click="selectedDiscount = null" class="absolute top-4 right-4 z-10 p-2.5 bg-black/60 hover:bg-black/90 border border-white/10 rounded-full text-white transition-all backdrop-blur-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>

                <!-- Image Section (Uncropped) -->
                <div class="w-full bg-black/50 flex items-center justify-center p-6 min-h-[50vh] sm:min-h-[400px] border-b border-white/10 relative overflow-hidden">
                    <!-- Decorative Glow Behind Image -->
                    <div class="absolute inset-0 bg-gradient-to-tr from-pride-light/10 to-pride-purple/10 pointer-events-none"></div>
                    
                    <img v-if="selectedDiscount.image_url" :src="selectedDiscount.image_url" class="relative z-10 max-w-full max-h-[45vh] object-contain drop-shadow-2xl" alt="Código QR / Cupón" />
                    
                    <div v-else class="text-slate-500 flex flex-col items-center relative z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 mb-2 opacity-50"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0Z" /></svg>
                        <span>Sin imagen</span>
                    </div>
                </div>

                <!-- Details Section -->
                <div class="p-6 md:p-8 bg-gradient-to-b from-slate-800 to-slate-900 border-t border-white/5 flex flex-col gap-6 overflow-y-auto">
                    <div class="text-center">
                        <p class="text-[10px] sm:text-xs font-bold text-pride-light uppercase tracking-widest mb-1.5">{{ selectedDiscount.business_name }}</p>
                        <h3 class="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">{{ selectedDiscount.title }}</h3>
                        <p class="text-slate-300 text-sm sm:text-base leading-relaxed max-h-32 overflow-y-auto custom-scrollbar">{{ selectedDiscount.description }}</p>
                    </div>
                    
                    <div class="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 mt-auto shadow-inner">
                        <span class="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Presenta este código</span>
                        <div class="text-sm text-center">
                            <div class="font-bold flex items-center justify-center gap-2">
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 text-pride-green" v-if="selectedDiscount.is_indefinite"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 text-pride-blue" v-else><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                                 <span v-if="selectedDiscount.is_indefinite" class="text-pride-green">Válido Indefinidamente</span>
                                 <span v-else class="text-white">Vigente hasta {{ formatDate(selectedDiscount.end_date) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const insforge = useInsforge()
const loading = ref(true)
const rawDiscounts = ref([])
const selectedDiscount = ref(null)

const discounts = computed(() => {
    const data = rawDiscounts.value || []
    
    // Server-side parsing safe
    const now = new Date()
    now.setHours(0,0,0,0)

    return data.filter(d => {
        if (d.is_indefinite) return true
        if (d.end_date) {
            const endDate = new Date(d.end_date)
            endDate.setMinutes(endDate.getMinutes() + endDate.getTimezoneOffset())
            endDate.setHours(23, 59, 59, 999) 
            if (endDate < now) return false
        }
        return true
    })
})

const fetchDiscounts = async () => {
    loading.value = true
    try {
        const { data, error } = await insforge.database
            .from(getTableName('discounts'))
            .select('*')
            .order('created_at', { ascending: false })
            
        if (error) throw error
        rawDiscounts.value = data || []
    } catch(err) {
        console.error("Error fetching discounts:", err)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchDiscounts()
})

const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const withoutTime = dateStr.split('T')[0]
    const [year, month, day] = withoutTime.split('-')
    if (!year || !month || !day) return dateStr
    
    const d = new Date(year, month - 1, day)
    return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<style>
@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes scale-up {
    0% {
        opacity: 0;
        transform: scale(0.95) translateY(10px);
    }
    100% {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.animate-scale-up {
    animation: scale-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
}
</style>
