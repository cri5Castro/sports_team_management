<template>
  <div class="min-h-screen relative font-sans text-slate-200 overflow-x-hidden">
    <div class="pride-bar fixed top-0 left-0 z-50"></div>
    <AppHeader />
    <main class="pt-24 pb-12 px-4 max-w-4xl mx-auto w-full relative z-10">
      <slot />
    </main>
    
    <!-- Decorative background elements -->
    <div class="fixed top-20 -left-20 w-80 h-80 bg-pride-purple/10 rounded-full mix-blend-screen filter blur-[100px] opacity-40 pointer-events-none z-0 animate-blob" style="animation-duration: 10s;"></div>
    <div class="fixed bottom-20 -right-20 w-[30rem] h-[30rem] bg-pride-blue/10 rounded-full mix-blend-screen filter blur-[120px] opacity-40 pointer-events-none z-0 animate-blob" style="animation-duration: 15s; animation-delay: -2s;"></div>
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25rem] h-[25rem] bg-pride-pink/5 rounded-full mix-blend-screen filter blur-[140px] opacity-30 pointer-events-none z-0 animate-blob" style="animation-duration: 12s; animation-delay: -5s;"></div>
  </div>
</template>
