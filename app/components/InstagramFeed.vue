<template>
  <div class="relative min-h-[600px] w-full">
    <!-- Fouita Widget Container -->
    <div class="relative w-full fouita-style-override">
      <div data-key="Carousel Instagram Feed " class="ft" id="ft511lz2f"></div>
    </div>

    <!-- Double Button Footer Area -->
    <div v-if="mounted" class="flex flex-col md:flex-row items-center justify-center gap-4 mt-8 px-4">
      <!-- 
        Note: The 'Cargar más' button is inside the Fouita widget above. 
        We use CSS to style it to match this row.
      -->
      <a 
        href="https://www.instagram.com/sharkeslgbtiq/" 
        target="_blank"
        class="glass-button !w-full md:!w-auto !px-10 !py-4 !rounded-2xl !text-[13px] !font-black !tracking-[0.15em] !uppercase bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 transition-all active:scale-95 pride-glow flex items-center justify-center gap-2"
      >
        <span>Ver en Instagram</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </a>
    </div>

    <!-- Decorative Pride Accents (Subtle and behind everything) -->
    <div class="absolute -bottom-20 -right-20 w-64 h-64 bg-pride-purple/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
    <div class="absolute -top-20 -left-20 w-64 h-64 bg-pride-blue/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue'

const mounted = ref(false)
let observer = null

onMounted(() => {
  mounted.value = true
  
  // Load Fouita script
  if (!document.getElementById('fouita-script')) {
    const script = document.createElement('script')
    script.id = 'fouita-script'
    script.src = 'https://wdg.fouita.com/widgets/0x3f8752.js'
    script.async = true
    document.body.appendChild(script)
  }

  // Double Button Logic: Move the native 'Load More' button into our custom row
  const moveButton = () => {
    const nativeBtn = document.querySelector('.ft-load-more-button')
    const placeholder = document.querySelector('.load-more-placeholder')
    
    if (nativeBtn && placeholder && nativeBtn.parentElement !== placeholder) {
      placeholder.appendChild(nativeBtn)
      return true
    }
    return false
  }

  // Setup observer to catch the button when it's rendered by the widget
  observer = new MutationObserver((mutations) => {
    if (moveButton()) {
      // We found it and moved it, but don't disconnect immediately 
      // in case the widget re-renders (common for some feed widgets)
    }
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  // Initial attempt
  moveButton()
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style>
/* 
  Global styling to transform the native Fouita widget.
  Safe approach: No JS observers to prevent page freezes.
*/

/* Base container cleanup */
.fouita-style-override .ft-container {
    background: transparent !important;
    font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
    padding: 0 !important;
}

/* --- Fouita Header Transformation - HIDE IT for redundancy --- */
.fouita-style-override .ft-header {
    display: none !important;
}

/* --- Follow button in header transformation --- */
.fouita-style-override .ft-header-button {
    margin-left: auto !important;
    background: rgba(255, 255, 255, 0.05) !important;
    backdrop-filter: blur(12px) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    color: white !important;
    font-weight: 900 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.1em !important;
    padding: 0.625rem 1.5rem !important;
    border-radius: 14px !important;
    font-size: 0 !important;
    cursor: pointer !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.fouita-style-override .ft-header-button::before {
    content: 'Seguir' !important;
    font-size: 10px !important;
}

.fouita-style-override .ft-header-button:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
    border-color: rgba(255, 255, 255, 0.3) !important;
}

/* --- Card & Component Styling --- */
.fouita-style-override .ft-card {
    background: rgba(15, 23, 42, 0.4) !important;
    backdrop-filter: blur(16px) !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    border-radius: 1.5rem !important;
    margin: 8px !important;
    transition: transform 0.3s ease !important;
}

.fouita-style-override .ft-card:hover {
    transform: translateY(-4px) !important;
}

.fouita-style-override .ft-username {
    color: #5BCEFA !important;
    font-weight: 800 !important;
    font-size: 0.875rem !important;
}

/* --- Load More Button with Pride Glow --- */
.fouita-style-override .ft-load-more-button {
    background: rgba(255, 255, 255, 0.03) !important;
    backdrop-filter: blur(12px) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    color: white !important;
    font-weight: 900 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.15em !important;
    padding: 1.25rem 3rem !important;
    border-radius: 1rem !important;
    margin: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transition: all 0.3s ease !important;
    position: relative !important;
    font-size: 0 !important;
    cursor: pointer !important;
    width: auto !important;
    z-index: 1 !important;
}

.fouita-style-override .ft-load-more-button::before {
    content: 'Cargar más' !important;
    font-size: 13px !important;
}

/* 
  Replicating pride-glow for the native button since we can't 
  easily add the utility class to an external script's element.
*/
.fouita-style-override .ft-load-more-button::after {
    content: '' !important;
    position: absolute !important;
    inset: -1px !important;
    z-index: -1 !important;
    border-radius: inherit !important;
    background: linear-gradient(90deg, #E40303, #FF8C00, #FFED00, #008026, #24408E, #732982, #5BCEFA, #F5A9B8) !important;
    filter: blur(10px) !important;
    opacity: 0 !important;
    transition: opacity 0.4s ease, filter 0.4s ease !important;
    pointer-events: none !important;
}

.fouita-style-override .ft-load-more-button:hover::after {
    opacity: 0.5 !important;
    filter: blur(14px) !important;
}

.fouita-style-override .ft-load-more-button:hover {
    background: rgba(255, 255, 255, 0.08) !important;
    transform: scale(1.02) !important;
    border-color: rgba(255, 255, 255, 0.2) !important;
}

/* --- Ensuring Popups/Overlays are Visible --- */
.fouita-style-override .ft-popup {
    z-index: 9999 !important;
    background: rgba(15, 23, 42, 0.8) !important;
    backdrop-filter: blur(24px) !important;
}

/* Mobile Adjustments for native feel */
@media (max-width: 640px) {
    .fouita-style-override .ft-header {
        margin-bottom: 2rem !important;
        padding: 0 0.5rem !important;
    }
    
    .fouita-style-override .ft-header-username {
        font-size: 1.125rem !important;
    }

    .fouita-style-override .ft-header-bio {
        display: none !important;
    }

    /* Make cards slightly larger on mobile for impact */
    .fouita-style-override .ft-card {
        margin: 6px !important;
        border-radius: 1.25rem !important;
    }

    .fouita-style-override .ft-load-more-button {
        width: 100% !important;
        padding: 1.25rem 2rem !important;
        border-radius: 14px !important;
    }
}
</style>
