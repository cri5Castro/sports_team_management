<template>
  <div class="space-y-8 animate-fade-in relative z-10 w-full max-w-5xl mx-auto">
    <!-- Unauthenticated View -->
    <div v-if="!isAuthenticated" class="max-w-md mx-auto mt-20">
      <div class="glass-panel p-8 text-center border-t-4 border-t-pride-blue">
        <h2 class="text-3xl font-bold mb-2">Panel Administrativo</h2>
        <p class="text-slate-400 mb-8">Acceso restringido. Inicia sesión para continuar.</p>
        
        <div class="flex justify-center">
          <button @click="loginWithGoogle" class="flex items-center justify-center gap-3 w-full bg-slate-800 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-700 transition shadow-lg w-[260px] pride-glow border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            Iniciar Sesión con Google
          </button>
        </div>
        
        <!-- MOCK LOGIN DEV BYPASS -->
        <button v-if="showBypass" @click="isAuthenticated = true; isAuthorized = true" class="mt-8 text-xs text-slate-600 hover:text-slate-400 underline">
          Desarrollador: Forzar Login (Bypass)
        </button>
      </div>
    </div>

    <!-- Unauthorized View -->
    <div v-else-if="!isAuthorized" class="max-w-md mx-auto mt-20">
      <div class="glass-panel p-8 text-center border-t-4 border-t-pride-red animate-shake">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 text-pride-red mx-auto mb-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        <h2 class="text-3xl font-bold mb-2">Acceso Denegado</h2>
        <p class="text-slate-400 mb-2">Tu correo <strong>{{ userEmail }}</strong> no está en la lista de administradores.</p>
        <p class="text-xs text-slate-500 mb-8">Contacta al administrador para solicitar acceso.</p>
        
        <button @click="handleLogout" class="glass-button !border-pride-red/30 hover:!bg-pride-red/10 text-pride-red w-full py-3">
          Cerrar Sesión
        </button>
      </div>
    </div>

    <!-- Authenticated View -->
    <div v-else>
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-pride-blue">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 13.5h3.86l2.392 4.427a.75.75 0 0 0 1.252.015l3.181-5.257 1.411 2.339A.75.75 0 0 0 15 15.75h4.5M2.25 13.5v7.5c0 1.242 1.008 2.25 2.25 2.25h15c1.242 0 2.25-1.008 2.25-2.25v-7.5M2.25 13.5 4.5 10.5m1.5 6h.008v.008H6V16.5Zm3.75 0h.008v.008h-.008V16.5Zm3.75 0h.008v.008h-.008V16.5Zm3.75 0h.008v.008h-.008V16.5ZM2.25 3.75h19.5M4.5 3.75v16.5M19.5 3.75v16.5" />
            </svg>
            Panel de Administración
          </h1>
          <p class="text-slate-400 mt-1">Gestión completa de ausencias del equipo Sharkes</p>
        </div>
        
        <div class="flex items-center gap-3 w-full md:w-auto">
          <!-- Switch for past dates -->
          <label class="flex items-center cursor-pointer p-2 bg-slate-800/50 border border-white/10 rounded-xl hover:bg-slate-800 transition mr-2">
            <div class="relative">
              <input type="checkbox" v-model="showPastDates" class="sr-only" />
              <div class="block bg-slate-600 w-10 h-6 rounded-full transition" :class="{'bg-pride-green': showPastDates}"></div>
              <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition" :class="{'translate-x-4': showPastDates}"></div>
            </div>
            <div class="ml-3 text-sm font-medium text-slate-300">Mostrar Pasadas</div>
          </label>

          <button @click="exportCSV" class="glass-button !py-2 !px-4 hover:border-pride-green/50 text-sm pride-glow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2 text-pride-green">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Exportar CSV
          </button>
          
          <label class="glass-button !py-2 !px-4 hover:border-pride-blue/50 text-sm cursor-pointer pride-glow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2 text-pride-blue">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            Importar CSV
            <input type="file" accept=".csv" class="hidden" @change="importCSV" />
          </label>

          <button @click="handleLogout" class="ml-auto md:ml-2 text-slate-400 hover:text-pride-red p-2 rounded-xl border border-transparent hover:border-pride-red/30 hover:bg-pride-red/10 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Dashboard Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="glass-panel p-4 bg-gradient-to-br from-slate-800/80 to-slate-900/80">
          <p class="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Ausencias</p>
          <p class="text-3xl font-bold">{{ filteredAbsences.length }}</p>
        </div>
        <div class="glass-panel p-4 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-t-2 border-t-pride-pink">
          <p class="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Tlatelolco</p>
          <p class="text-3xl font-bold">{{ tlatelolcoCount }}</p>
        </div>
        <div class="glass-panel p-4 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-t-2 border-t-pride-purple">
          <p class="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Cuauhtémoc</p>
          <p class="text-3xl font-bold">{{ cuauhtemocCount }}</p>
        </div>
        <div class="glass-panel p-4 bg-gradient-to-br from-slate-800/80 to-slate-900/80">
          <p class="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Próxima Fecha</p>
          <p class="text-xl font-bold pt-1 text-pride-light line-clamp-1">{{ nextDateLabel }}</p>
        </div>
      </div>

      <!-- Table View -->
      <div class="glass-panel overflow-hidden border border-white/10 shadow-2xl">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-900/60 border-b border-white/10 text-xs uppercase tracking-wider text-slate-400 font-semibold">
                <th class="p-4 pl-6">Fecha</th>
                <th class="p-4">Nadador</th>
                <th class="p-4">Sede</th>
                <th class="p-4">Horario</th>
                <th class="p-4">Motivo</th>
                <th class="p-4 pr-6 text-right">Acción</th>
              </tr>
            </thead>
            
            <tbody class="divide-y divide-white/5" v-if="filteredAbsences.length">
              <tr v-for="a in filteredAbsences" :key="a.id" class="hover:bg-white/5 transition group">
                <td class="p-4 pl-6 whitespace-nowrap font-medium">{{ formatDate(a.date) }}</td>
                <td class="p-4 font-bold text-pride-light">{{ a.name }}</td>
                <td class="p-4">
                  <span class="px-2 py-1 rounded inline-flex text-xs font-bold"
                    :class="a.location === 'Tlatelolco' ? 'bg-pride-pink/20 text-pride-pink' : 'bg-pride-purple/20 text-pride-purple'"
                  >
                    {{ a.location }}
                  </span>
                </td>
                <td class="p-4 whitespace-nowrap text-sm">{{ a.timeSlot }}</td>
                <td class="p-4 text-sm text-slate-300 max-w-xs truncate" :title="a.reason">{{ a.reason || '-' }}</td>
                <td class="p-4 pr-6 text-right relative">
                  <!-- Inline Delete for Admin -->
                  <div class="inline-flex justify-end">
                      <button 
                        v-if="deletingId !== a.id"
                        @click="deletingId = a.id"
                        class="p-2 text-slate-500 hover:text-pride-red hover:bg-pride-red/10 rounded-lg transition opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Eliminar Reporte"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    
                    <div v-else class="flex items-center bg-slate-900 border border-pride-red rounded p-1 absolute right-6 top-1/2 -translate-y-1/2 shadow-lg z-10 w-[140px] justify-between">
                      <span class="text-[10px] font-bold text-pride-red ml-2 leading-none">¿Eliminar?</span>
                      <div class="flex gap-1 pr-1">
                        <button @click="confirmDelete(a.id)" class="px-2 py-1 bg-pride-red text-white text-[10px] font-bold rounded" :disabled="isDeleting">Sí</button>
                        <button @click="deletingId = null" class="px-2 py-1 bg-slate-700 text-white text-[10px] font-bold rounded" :disabled="isDeleting">No</button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
            
            <tbody v-else>
              <tr>
                <td colspan="6" class="p-12 text-center text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 opacity-40 mb-3 mx-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                  </svg>
                  <p>No hay ausencias registradas.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { startOfDay, format, parseISO } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { es } from 'date-fns/locale'

const TIMEZONE = 'America/Mexico_City'

// Admin State
const isAuthenticated = ref(false)
const isAuthorized = ref(false)
const userEmail = ref('')
const allAbsences = ref([])
const showPastDates = ref(false)
const deletingId = ref(null)
const isDeleting = ref(false)

const config = useRuntimeConfig()
const adminEmails = config.public.adminEmails || []

// InsForge Client
const insforge = useInsforge()

const showBypass = computed(() => {
  if (import.meta.server) return false
  return !window.location.hostname.includes('insforge.site')
})

// Session Handling
const checkSession = async () => {
  const { data } = await insforge.auth.getCurrentSession()
  if (data?.session) {
    isAuthenticated.value = true
    userEmail.value = data.session.user?.email || ''
    
    // Check if email is in whitelist
    isAuthorized.value = adminEmails.includes(userEmail.value.toLowerCase())
    
    if (isAuthorized.value) {
      fetchAdminData()
    }
  }
}

// OAuth Handler
const loginWithGoogle = async () => {
  await insforge.auth.signInWithOAuth({
    provider: 'google',
    redirectTo: window.location.href
  })
}

const handleLogout = async () => {
  await insforge.auth.signOut()
  isAuthenticated.value = false
  isAuthorized.value = false
  userEmail.value = ''
}

// Data Fetching
const fetchAdminData = async () => {
  try {
    const res = await $fetch('/api/absences')
    allAbsences.value = res || []
  } catch (err) {
    console.error('Error al obtener datos', err)
  }
}

onMounted(() => {
  checkSession()
})

watch(isAuthenticated, (newVal) => {
  if (newVal) {
    fetchAdminData()
  }
})

// Computeds
const filteredAbsences = computed(() => {
  if (showPastDates.value) return allAbsences.value
  
  const todayCDMX = startOfDay(toZonedTime(new Date(), TIMEZONE))
  return allAbsences.value.filter(a => {
    return parseISO(a.date).getTime() >= todayCDMX.getTime()
  })
})

const tlatelolcoCount = computed(() => filteredAbsences.value.filter(a => a.location === 'Tlatelolco').length)
const cuauhtemocCount = computed(() => filteredAbsences.value.filter(a => a.location === 'Cuauhtemoc').length)

const nextDateLabel = computed(() => {
  if (!filteredAbsences.value.length) return 'N/A'
  const closest = filteredAbsences.value[0].date
  return formatDate(closest)
})

const formatDate = (isoStr) => {
  const d = parseISO(isoStr)
  return format(d, "EEE d MMM", { locale: es }).replace(/^\w/, c => c.toUpperCase())
}

// Actions
const confirmDelete = async (id) => {
  isDeleting.value = true
  try {
    await $fetch(`/api/absences/${id}`, { method: 'DELETE' })
    allAbsences.value = allAbsences.value.filter(a => a.id !== id)
  } catch (err) {
    console.error(err)
    alert("Error eliminando")
  } finally {
    isDeleting.value = false
    deletingId.value = null
  }
}

const exportCSV = () => {
  if (!allAbsences.value.length) return alert('No hay datos para exportar')
  
  const headers = ['ID', 'Nombre', 'Fecha', 'Sede', 'Horario', 'Motivo']
  const rows = allAbsences.value.map(a => [
    a.id, 
    `"${a.name}"`, 
    a.date, 
    a.location, 
    `"${a.timeSlot}"`, 
    `"${(a.reason || '').replace(/"/g, '""')}"`
  ])
  
  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `ausencias_sharkes_${format(new Date(), 'yyyyMMdd')}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const importCSV = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = async (e) => {
    const text = e.target.result
    
    // Very basic CSV parser
    const lines = text.split('\n').filter(l => l.trim())
    if (lines.length < 2) return alert('El CSV está vacío o el formato es incorrecto')
    
    // Skip header for importing, just map by columns strictly assuming standard export format
    // Real implementation would safely parse quotes.
    const newItems = []
    
    for (let i = 1; i < lines.length; i++) {
        // Simple regex to split by commas outside of quotes
        const cols = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || []
        if(cols.length >= 6) {
             const clean = str => str ? str.replace(/^"|"$/g, '').trim() : ''
             newItems.push({
                 id: clean(cols[0]) || Date.now().toString() + i, // Preserve ID or make new if empty
                 name: clean(cols[1]),
                 date: clean(cols[2]),
                 location: clean(cols[3]),
                 timeSlot: clean(cols[4]),
                 reason: clean(cols[5]) || ''
             })
        }
    }
    
    if (newItems.length > 0) {
      // In a real app, send each or bulk to server.
      // We will bulk overwrite here locally via manual mock array push. Wait, the req says "Importar CSV: Allows uploading a .csv file to overwrite or populate the records."
      // Since our mock backend just keeps an array, let's create a POST /api/absences/bulk route
      try {
        await $fetch('/api/absences/bulk', {
          method: 'POST',
          body: { items: newItems }
        })
        await fetchAdminData() // refresh from server
        alert(`Se importaron ${newItems.length} registros con éxito.`)
      } catch(err) {
        alert("Error al guardar registros en el backend")
      }
    }
  }
  reader.readAsText(file)
  event.target.value = '' // reset input
}
</script>
