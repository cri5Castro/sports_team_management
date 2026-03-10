<template>
  <header class="fixed top-2 left-0 w-full z-40 px-4 py-2">
    <div class="max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl md:rounded-[2.5rem] flex items-center justify-between px-3 md:px-6 py-2 md:py-3 transition-all duration-500">
      
      <!-- Brand & Home -->
      <NuxtLink to="/" class="flex items-center gap-2 group shrink-0">
        <div class="w-9 h-9 md:w-11 md:h-11 rounded-2xl bg-gradient-to-br from-pride-blue to-pride-purple flex items-center justify-center border border-white/20 group-hover:scale-105 transition-all shadow-xl flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-slate-200 transition-colors">
  <path fill="currentColor" d="M484.104,160.959c-0.453-0.172-1-0.391-1.609-0.625l0.328-0.844l-3.859-13.953l-12.344,7.578l-3.875-13.938
    l-12.328,7.594l-3.891-13.969l-12.313,7.594l-3.906-13.953l-8.579,5.266l-7.469-11.156l13.813-4.406l-8.047-12.047l13.797-4.391
    l-8.032-12.047l13.782-4.406l-8.047-12.047l13.797-4.406l-8.047-12.031l13.797-4.406l-8.063-12.031l1.766-13.172
    c2.344-12.094-1.906-33.266-26.657-21.922c-28.641,13.141-185.438,85.094-185.438,85.094c-7.859,3.594-15.313,7.375-22.438,11.25
    c-40.125-2.563-101.063-6.125-109.234-6.859c-10.906-1-22.547,7.906-8.656,23c8.063,8.75,28.828,31.938,40.188,44.625
    C40.493,265.615,87.071,399.709,87.071,399.709s-57.469,79.375-67.328,93.484c-9.734,13.922,0.813,23.25,17.344,16.625
    c10.469-4.188,76.219-29.047,76.219-29.047s61.797,16.828,78.5,21.531c15.344,4.328,23.344-3.25,14.828-15.422
    c-8.531-12.141-66.609-71.953-71.719-91.328c-6.484-43.547,51.359-74.172,115.984-103.031c-0.203,21.125-0.5,45.844-0.875,57.078
    c-0.922,26.094,22.25,21.359,28.766,3.766c4.547-12.203,27.844-62.266,41.719-91.781c30.516-14,152.563-70.016,165.751-76.063
    C501.322,178.6,497.557,166.225,484.104,160.959z M354.165,176.381l-1.453,0.656c-2,0.922-4.375,0.047-5.281-1.969l-12.656-27.578
    c-0.922-2-0.063-4.375,1.953-5.297l1.453-0.656c2.016-0.922,4.375-0.047,5.297,1.953l12.656,27.594
    C357.056,173.084,356.181,175.459,354.165,176.381z M371.587,168.396l-1.438,0.656c-2.016,0.906-4.375,0.047-5.297-1.969
    l-12.656-27.578c-0.922-2.016-0.031-4.375,1.969-5.313l1.453-0.656c1.984-0.922,4.359-0.047,5.281,1.953l12.656,27.594
    C374.478,165.084,373.603,167.459,371.587,168.396z M369.915,79.646c-8.5,3.891-18.547,0.141-22.453-8.344
    c-3.891-8.5-0.156-18.547,8.328-22.453c8.5-3.906,18.578-0.172,22.438,8.328C382.134,65.678,378.415,75.74,369.915,79.646z
    M417.994,134.021l-0.031-0.047l0.219-0.063L417.994,134.021z"/>
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
