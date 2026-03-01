<template>
  <header class="fixed top-2 left-0 w-full z-40 px-4 py-2">
    <div class="max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0] shadow-black/50 rounded-2xl md:rounded-[2rem] flex items-center justify-between px-3 md:px-6 py-2 md:py-3">
      <!-- Logo & Title -->
      <NuxtLink to="/" class="flex items-center gap-2 md:gap-3 group min-w-0">
        <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:scale-105 transition-all shadow-inner flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-slate-200 transition-colors">
            <!-- Simplified abstract shark fin -->
            <path fill="currentColor" d="M10 2C10 2 12 10 19 14C19 14 11 15 5 21C5 21 7 12 10 2Z" />
          </svg>
        </div>
        <span class="text-xl md:text-2xl font-black tracking-tighter text-white truncate">Sharkes</span>
      </NuxtLink>

      <!-- Admin Access Button -->
      <button 
        @click="goToAdmin" 
        class="bg-slate-800/80 hover:bg-slate-700 text-white backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 md:px-4 md:py-2 text-sm font-bold transition-all active:scale-95 flex items-center gap-2 flex-shrink-0 shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 md:w-5 md:h-5 text-pride-blue">
          <path fill-rule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.961 3.526 11.094 8.595 13.511a.75.75 0 0 0 .655 0c5.069-2.417 8.595-7.55 8.595-13.511 0-.895-.103-1.766-.298-2.605a.75.75 0 0 0-.722-.515 11.207 11.207 0 0 1-7.877-3.08Zm-1.898 9.25a.75.75 0 0 0-1.236.851l.85 1.235c.19.277.55.378.857.24a3.75 3.75 0 1 1 3.923-6.517.75.75 0 1 0 .766-1.288 5.25 5.25 0 1 0-5.16 8.479Z" clip-rule="evenodd" />
        </svg>
        <span class="whitespace-nowrap">Admin</span>
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
