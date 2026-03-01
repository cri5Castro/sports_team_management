<template>
  <div class="space-y-8">
    <div class="text-center space-y-3 mb-12">
      <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
        Registro de Ausencias
      </h1>
      <p class="text-slate-300 text-lg">Gestiona tus asistencias a los entrenamientos de Sharkes.</p>
    </div>

    <!-- View Toggles -->
    <div class="flex p-1 bg-slate-800/50 backdrop-blur rounded-2xl max-w-sm mx-auto border border-white/10 mb-8">
      <button 
        @click="currentView = 'register'" 
        class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
        :class="currentView === 'register' ? 'bg-white/15 text-white shadow-lg' : 'text-slate-400 hover:text-white'"
      >
        Registrar Ausencia
      </button>
      <button 
        @click="currentView = 'my-absences'" 
        class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
        :class="currentView === 'my-absences' ? 'bg-white/15 text-white shadow-lg' : 'text-slate-400 hover:text-white'"
      >
        Mis Ausencias
      </button>
    </div>

    <!-- Active View -->
    <Transition name="fade" mode="out-in">
      <div :key="currentView">
        <AbsenceForm v-if="currentView === 'register'" />
        <MyAbsences v-else />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentView = ref('register')

// Use Nuxt layout
definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
