<template>
  <div class="glass-panel p-4 md:p-8 relative min-h-[500px]">
    <!-- Fouita Widget Container -->
    <div class="relative w-full fouita-style-override">
      <div data-key="Carousel Instagram Feed " class="ft" id="ft511lz2f"></div>
    </div>

    <!-- Decorative Pride Accents (Ensuring they are truly in the background) -->
    <div class="absolute bottom-0 right-0 w-24 h-24 bg-pride-purple/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
    <div class="absolute top-0 left-0 w-24 h-24 bg-pride-blue/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Load Fouita script
  if (!document.getElementById('fouita-script')) {
    const script = document.createElement('script')
    script.id = 'fouita-script'
    script.src = 'https://wdg.fouita.com/widgets/0x3f8752.js'
    script.async = true
    document.body.appendChild(script)
  }
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

/* --- Fouita Header Transformation --- */
.fouita-style-override .ft-header {
    display: flex !important;
    align-items: center !important;
    background: rgba(15, 23, 42, 0.4) !important;
    backdrop-filter: blur(12px) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 1.5rem !important;
    padding: 1.5rem !important;
    margin-bottom: 2rem !important;
    gap: 1.5rem !important;
}

.fouita-style-override .ft-header-user-image {
    width: 3.5rem !important;
    height: 3.5rem !important;
    border-radius: 9999px !important;
    border: 2px solid #FF3366 !important;
    padding: 2px !important;
    background: linear-gradient(to tr, #f09433, #dc2743, #bc1888) !important;
}

.fouita-style-override .ft-header-username {
    color: white !important;
    font-size: 1.5rem !important;
    font-weight: 900 !important;
    letter-spacing: -0.05em !important;
}

/* --- Follow button in header transformation --- */
.fouita-style-override .ft-header-button {
    margin-left: auto !important;
    background: rgba(255, 255, 255, 0.05) !important;
    backdrop-filter: blur(8px) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    color: white !important;
    font-weight: 900 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.1em !important;
    padding: 0.625rem 1.5rem !important;
    border-radius: 9999px !important;
    font-size: 0 !important; /* Hide original text safety */
    cursor: pointer !important;
    transition: all 0.3s ease !important;
}

.fouita-style-override .ft-header-button::before {
    content: 'Seguir' !important;
    font-size: 11px !important;
}

.fouita-style-override .ft-header-button:hover,
.fouita-style-override .ft-header-button:active,
.fouita-style-override .ft-header-button:focus {
    background: rgba(255, 255, 255, 0.1) !important;
    transform: scale(1.05) !important;
    border-color: #FF3366 !important;
    outline: none !important;
}

/* --- Card & Component Styling --- */
.fouita-style-override .ft-card {
    background: rgba(15, 23, 42, 0.4) !important;
    backdrop-filter: blur(12px) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 1.25rem !important;
    margin: 10px !important;
}

.fouita-style-override .ft-username {
    color: #5BCEFA !important;
    font-weight: 800 !important;
}

/* --- Load More Button with Pride Glow --- */
.fouita-style-override .ft-load-more-button {
    background: rgba(15, 23, 42, 0.4) !important;
    backdrop-filter: blur(8px) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    color: white !important;
    font-weight: 900 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.1em !important;
    padding: 1rem 3rem !important;
    border-radius: 9999px !important;
    margin: 3rem auto !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transition: all 0.3s ease !important;
    position: relative !important;
    font-size: 0 !important; /* Hide original text to prevent JS loops */
    overflow: visible !important;
    cursor: pointer !important;
}

.fouita-style-override .ft-load-more-button::before {
    content: 'Ver más' !important;
    font-size: 14px !important;
}

/* The Pride Glow effect: Pointer-events none is CRITICAL */
.fouita-style-override .ft-load-more-button::after {
    content: '' !important;
    position: absolute !important;
    inset: -2px !important;
    z-index: -1 !important;
    border-radius: inherit !important;
    background: linear-gradient(90deg, #E40303, #FF8C00, #FFED00, #008026, #24408E, #732982, #5BCEFA, #F5A9B8) !important;
    filter: blur(15px) !important;
    opacity: 0.4 !important;
    transition: opacity 0.3s ease !important;
    pointer-events: none !important;
}

.fouita-style-override .ft-load-more-button:hover::after {
    opacity: 0.8 !important;
}

.fouita-style-override .ft-load-more-button:hover,
.fouita-style-override .ft-load-more-button:active,
.fouita-style-override .ft-load-more-button:focus,
.fouita-style-override .ft-load-more-button.ft-loading {
    background: rgba(15, 23, 42, 0.6) !important;
    transform: translateY(-2px) !important;
    border-color: rgba(255, 255, 255, 0.3) !important;
    color: white !important;
    outline: none !important;
}

/* Ensure pride glow persists and intensifies on click */
.fouita-style-override .ft-load-more-button:active::after {
    opacity: 0.9 !important;
    filter: blur(20px) !important;
}

/* Compact Mobile Header */
@media (max-width: 640px) {
    .fouita-style-override .ft-header {
        flex-direction: row !important;
        justify-content: flex-start !important;
        text-align: left !important;
        gap: 0.75rem !important;
        padding: 0.75rem 1rem !important;
        border-radius: 1rem !important;
    }
    
    .fouita-style-override .ft-header-user-image {
        width: 2.5rem !important;
        height: 2.5rem !important;
    }

    .fouita-style-override .ft-header-username {
        font-size: 1.125rem !important;
    }

    .fouita-style-override .ft-header-bio {
        display: none !important; /* Hide bio on mobile to keep it extra compact */
    }
    
    .fouita-style-override .ft-header-button {
        padding: 0.5rem 1rem !important;
        width: auto !important;
        margin-left: auto !important;
    }
}

/* --- Ensuring Popups/Overlays are Visible --- */
/* We remove any potential clipping and ensure the modal layer is on top */
.fouita-style-override .ft-popup {
    z-index: 9999 !important;
}
</style>
