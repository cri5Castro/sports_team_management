<template>
  <header class="fixed top-2 left-0 w-full z-40 px-4 py-2">
    <div class="max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0] shadow-black/50 rounded-[2rem] flex items-center justify-between px-6 py-3">
      <!-- Logo & Title -->
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:scale-105 transition-all shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 text-white group-hover:text-slate-200 transition-colors">
            <!-- Simplified abstract shark fin -->
            <path fill="currentColor" d="M10 2C10 2 12 10 19 14C19 14 11 15 5 21C5 21 7 12 10 2Z" />
          </svg>
        </div>
        <span class="text-2xl font-black tracking-tighter text-white">Sharkes</span>
      </NuxtLink>

      <!-- Admin Access Button -->
      <button 
        @click="goToAdmin" 
        class="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 rounded-full px-4 py-2 text-sm font-semibold transition-all active:scale-95 flex items-center gap-2"
      >
        <span class="iconify" data-icon="heroicons:shield-check-solid" data-inline="false"></span>
        <span class="hidden sm:inline">Admin</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToAdmin = () => {
  router.push('/admin')
}
</script>
