import vue3GoogleLogin from 'vue3-google-login'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(vue3GoogleLogin, {
        clientId: '381944118047-9p2t6j2o7n9d7hg4mjn0edqk1e4m5k1h.apps.googleusercontent.com' // Using a placeholder/mock client ID
    })
})
