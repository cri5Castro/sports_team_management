// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      insforgeUrl: process.env.NUXT_PUBLIC_INSFORGE_URL || 'https://t3tzpuc3.us-west.insforge.app',
      insforgeAnonKey: process.env.NUXT_PUBLIC_INSFORGE_ANON_KEY || '',
      demoMode: process.env.NUXT_PUBLIC_DEMO_MODE || 'false'
    }
  }
})