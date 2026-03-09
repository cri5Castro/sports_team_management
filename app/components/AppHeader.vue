<template>
  <header class="fixed top-2 left-0 w-full z-40 px-4 py-2">
    <div class="max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl md:rounded-[2.5rem] flex items-center justify-between px-3 md:px-6 py-2 md:py-3 transition-all duration-500">
      
      <!-- Brand & Home -->
      <NuxtLink to="/" class="flex items-center gap-2 group shrink-0">
        <div class="w-9 h-9 md:w-11 md:h-11 rounded-2xl bg-gradient-to-br from-pride-blue to-pride-purple flex items-center justify-center border border-white/20 group-hover:scale-105 transition-all shadow-xl flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-slate-200 transition-colors">
            <path fill="currentColor" d="M10 2C10 2 12 10 19 14C19 14 11 15 5 21C5 21 7 12 10 2Z" />
          </svg>
        </div>
        <span class="hidden sm:block text-xl md:text-2xl font-black tracking-tighter text-white truncate">Sharkes</span>
      </NuxtLink>

      <!-- Center Segmented Nav -->
      <nav class="flex items-center gap-1 bg-white/5 rounded-2xl md:rounded-full p-1 border border-white/10 shadow-inner">
        <NuxtLink 
          to="/" 
          class="flex items-center gap-2 px-3 md:px-5 py-2 md:py-1.5 rounded-xl md:rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all"
          :class="$route.path === '/' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/10'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
            <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clip-rule="evenodd" />
          </svg>
          <span class="hidden xs:inline">Inicio</span>
        </NuxtLink>
        <NuxtLink 
          to="/comunidad" 
          class="flex items-center gap-2 px-3 md:px-5 py-2 md:py-1.5 rounded-xl md:rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all"
          :class="$route.path === '/comunidad' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/10'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          <span class="hidden xs:inline">Comunidad</span>
        </NuxtLink>
      </nav>

      <!-- Admin Access -->
      <button 
        @click="router.push('/admin')" 
        class="group flex items-center justify-center w-9 h-9 md:w-auto md:h-11 md:px-5 rounded-2xl md:rounded-full bg-slate-800/80 hover:bg-slate-700 text-white backdrop-blur-md border border-white/20 transition-all active:scale-95 shadow-xl flex-shrink-0"
        title="Panel de Admin"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 md:w-5 md:h-5 text-pride-blue group-hover:scale-110 transition-transform">
          <path fill-rule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.961 3.526 11.094 8.595 13.511a.75.75 0 0 0 .655 0c5.069-2.417 8.595-7.55 8.595-13.511 0-.895-.103-1.766-.298-2.605a.75.75 0 0 0-.722-.515 11.207 11.207 0 0 1-7.877-3.08Zm-1.898 9.25a.75.75 0 0 0-1.236.851l.85 1.235c.19.277.55.378.857.24a3.75 3.75 0 1 1 3.923-6.517.75.75 0 1 0 .766-1.288 5.25 5.25 0 1 0-5.16 8.479Z" clip-rule="evenodd" />
        </svg>
        <span class="hidden md:inline ml-2 text-xs font-black uppercase tracking-widest">Admin</span>
      </button>

    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped>
@media (max-width: 380px) {
  .xs\:inline {
    display: none;
  }
}
</style>
