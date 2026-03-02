<template>
  <div class="space-y-6 md:space-y-8">
    <!-- Dynamic Header -->
    <div class="text-center space-y-3 mb-8 md:mb-12 transition-all duration-300">
      <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
        {{ pageContent.title }}
      </h1>
      <p class="text-slate-300 text-base md:text-lg max-w-lg mx-auto px-4">
        {{ pageContent.subtitle }}
      </p>
    </div>

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

const currentView = ref('register')
const isMobile = ref(false)

const updateMobileStatus = () => {
  if (import.meta.client) {
    isMobile.value = window.innerWidth < 640
  }
}

onMounted(() => {
  updateMobileStatus()
  window.addEventListener('resize', updateMobileStatus)
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', updateMobileStatus)
  }
})

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
