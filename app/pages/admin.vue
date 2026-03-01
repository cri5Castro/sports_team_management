<template>
  <div class="space-y-8 animate-fade-in relative z-10 w-full max-w-5xl mx-auto">
    <!-- Unauthenticated View -->
    <div v-if="!isAuthenticated" class="max-w-md mx-auto mt-20">
      <div class="glass-panel p-8 text-center border-t-4 border-t-pride-blue">
        <div class="w-20 h-20 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-xl border border-white/5">
          <span class="iconify text-5xl text-pride-light" data-icon="heroicons:shield-check-solid"></span>
        </div>
        <h2 class="text-3xl font-bold mb-2">Panel Administrativo</h2>
        <p class="text-slate-400 mb-8">Acceso restringido. Inicia sesión para continuar.</p>
        
        <div class="flex justify-center">
          <!-- We mock the google login for now if the specific client ID fails, but use the real component if it works -->
          <GoogleLogin :callback="handleGoogleLogin">
            <button class="flex items-center justify-center gap-3 w-full bg-slate-800 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-700 transition shadow-lg w-[260px] pride-glow border border-white/10">
              <span class="iconify text-2xl" data-icon="logos:google-icon"></span>
              Iniciar Sesión con Google
            </button>
          </GoogleLogin>
        </div>
        
        <!-- MOCK LOGIN DEV BYPASS -->
        <button @click="isAuthenticated = true" class="mt-8 text-xs text-slate-600 hover:text-slate-400 underline">
          Desarrollador: Forzar Login (Bypass)
        </button>
      </div>
    </div>

    <!-- Authenticated View -->
    <div v-else>
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold flex items-center gap-3">
            <span class="iconify text-pride-blue" data-icon="heroicons:presentation-chart-line"></span>
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
            <span class="iconify mr-2 text-pride-green" data-icon="heroicons:arrow-down-tray"></span> Exportar CSV
          </button>
          
          <label class="glass-button !py-2 !px-4 hover:border-pride-blue/50 text-sm cursor-pointer pride-glow">
            <span class="iconify mr-2 text-pride-blue" data-icon="heroicons:arrow-up-tray"></span>
            Importar CSV
            <input type="file" accept=".csv" class="hidden" @change="importCSV" />
          </label>

          <button @click="isAuthenticated = false" class="ml-auto md:ml-2 text-slate-400 hover:text-pride-red p-2 rounded-xl border border-transparent hover:border-pride-red/30 hover:bg-pride-red/10 transition">
            <span class="iconify text-xl" data-icon="heroicons:arrow-right-on-rectangle"></span>
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
                      <span class="iconify" data-icon="heroicons:trash"></span>
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
                  <span class="iconify text-5xl opacity-40 mb-3 mx-auto" data-icon="heroicons:inbox"></span>
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
const allAbsences = ref([])
const showPastDates = ref(false)
const deletingId = ref(null)
const isDeleting = ref(false)

// Google OAuth Handler
const handleGoogleLogin = (response) => {
  // In a real app we'd verify response.credential with our backend
  console.log("Ingreso exitoso con Google", response)
  isAuthenticated.value = true
  fetchAdminData()
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
  // If we wanted auto-fetch we could, but let's wait for authentication
  if (isAuthenticated.value) fetchAdminData()
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
