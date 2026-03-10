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
          <p class="text-slate-400 mt-1">Gestión completa del equipo Sharkes</p>
        </div>
        
        <div class="flex items-center gap-3 w-full md:w-auto">
          <button @click="handleLogout" class="ml-auto md:ml-0 text-slate-400 hover:text-pride-red p-2 rounded-xl border border-transparent hover:border-pride-red/30 hover:bg-pride-red/10 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Tabbed Navigation -->
      <div class="flex p-1 bg-slate-800/50 backdrop-blur rounded-2xl w-full max-w-sm border border-white/10 mb-8 mx-auto md:mx-0">
        <button 
          @click="adminTab = 'absences'" 
          class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
          :class="adminTab === 'absences' ? 'bg-white/15 text-white shadow-lg' : 'text-slate-400 hover:text-white'"
        >
          Ausencias
        </button>
        <button 
          @click="adminTab = 'events'" 
          class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
          :class="adminTab === 'events' ? 'bg-white/15 text-pride-light shadow-lg' : 'text-slate-400 hover:text-white'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
          Eventos
        </button>
        <button 
          @click="adminTab = 'discounts'" 
          class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
          :class="adminTab === 'discounts' ? 'bg-white/15 text-pride-light shadow-lg' : 'text-slate-400 hover:text-white'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
          </svg>
          Descuentos
        </button>
      </div>

      <Transition name="fade" mode="out-in">
          <!-- Absences View -->
          <div v-if="adminTab === 'absences'" key="absences">
              <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <h2 class="text-xl font-bold flex items-center gap-2">Gestión de Ausencias</h2>
                  <div class="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                      <!-- Switch for past dates -->
                      <label class="flex items-center cursor-pointer p-2.5 bg-slate-900 border border-white/10 rounded-xl hover:border-white/20 transition-all flex-shrink-0 group">
                        <div class="relative">
                          <input type="checkbox" v-model="showPastDates" class="sr-only" />
                          <div class="block w-11 h-6 rounded-full transition-colors duration-300" :class="showPastDates ? 'bg-pride-green shadow-[0_0_15px_rgba(0,128,38,0.4)]' : 'bg-slate-700'"></div>
                          <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-lg" :class="{'translate-x-5': showPastDates, 'scale-110': showPastDates}"></div>
                        </div>
                        <div class="ml-3 text-[10px] font-black uppercase tracking-widest transition-colors duration-300" :class="showPastDates ? 'text-pride-green' : 'text-slate-400 group-hover:text-slate-300'">Pasadas</div>
                      </label>

                      <!-- Switch for next day only -->
                      <label class="flex items-center cursor-pointer p-2.5 bg-slate-900 border border-white/10 rounded-xl hover:border-white/20 transition-all flex-shrink-0 group">
                        <div class="relative">
                          <input type="checkbox" v-model="showNextDayOnly" class="sr-only" />
                          <div class="block w-11 h-6 rounded-full transition-colors duration-300" :class="showNextDayOnly ? 'bg-pride-light shadow-[0_0_15px_rgba(91,206,250,0.4)]' : 'bg-slate-700'"></div>
                          <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-lg" :class="{'translate-x-5': showNextDayOnly, 'scale-110': showNextDayOnly}"></div>
                        </div>
                        <div class="ml-3 text-[10px] font-black uppercase tracking-widest transition-colors duration-300" :class="showNextDayOnly ? 'text-pride-light' : 'text-slate-400 group-hover:text-slate-300'">Próxima Fecha</div>
                      </label>

                      <button @click="exportCSV" class="glass-button !py-2 !px-4 hover:border-pride-green/50 text-xs pride-glow flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-2 text-pride-green">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Exportar
                      </button>
                      
                      <label class="glass-button !py-2 !px-4 hover:border-pride-blue/50 text-xs cursor-pointer pride-glow flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-2 text-pride-blue">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                        Importar
                        <input type="file" accept=".csv" class="hidden" @change="importCSV" />
                      </label>
                  </div>
              </div>

              <!-- Search/Name Filter -->
              <div class="mb-6 relative z-30">
                <div class="relative group">
                  <input 
                    v-model="nameFilter" 
                    @focus="showAutocomplete = true"
                    @blur="hideAutocompleteDelay"
                    class="glass-input pl-10 h-10 text-sm !bg-slate-900/40" 
                    type="text" 
                    placeholder="Filtrar por nombre de Sharke..." 
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 absolute left-3.5 top-3 text-slate-500 group-focus-within:text-pride-blue transition-colors">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <button v-if="nameFilter" @click="nameFilter = ''" class="absolute right-3 top-2.5 text-slate-500 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <!-- Autocomplete dropdown -->
                <ul v-if="showAutocomplete && filteredNames.length" class="absolute top-full left-0 w-full mt-1 bg-slate-800 border border-white/10 rounded-xl shadow-xl max-h-48 overflow-y-auto z-[100] divide-y divide-white/5">
                  <li 
                    v-for="name in filteredNames" 
                    :key="name" 
                    @click="selectName(name)"
                    class="px-4 py-2 hover:bg-white/10 cursor-pointer text-slate-200 text-sm transition-colors"
                  >
                    {{ name }}
                  </li>
                </ul>
                
                <!-- Monthly Stats for Filtered User -->
                <Transition name="fade">
                  <div v-if="nameFilter && filteredAbsences.length > 0" class="mt-2 flex items-center gap-4 px-4 py-2 bg-slate-900/60 border border-white/5 rounded-xl">
                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-500">Este Mes:</p>
                    <div class="flex gap-4">
                      <p class="text-xs font-bold text-slate-300">
                        <span class="text-pride-light mr-1">{{ currentMonthPast }}</span> Pasadas
                      </p>
                      <p class="text-xs font-bold text-slate-300">
                        <span class="text-pride-green mr-1">{{ currentMonthFuture }}</span> Futuras
                      </p>
                      <p v-if="currentMonthTotal >= 3" class="text-xs font-black text-pride-red animate-pulse flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
                        </svg>
                        3+ ausencias detectadas
                      </p>
                    </div>
                  </div>
                </Transition>
              </div>

      <!-- Dashboard Stats - Interactive Filters -->
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <button 
          @click="currentFilter = 'all'"
          class="glass-panel p-4 text-left transition-all active:scale-95 group"
          :class="currentFilter === 'all' ? 'ring-2 ring-white bg-white/10' : 'bg-slate-800/80 hover:bg-slate-800'"
        >
          <p class="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
            Total
            <span v-if="currentFilter === 'all'" class="w-1.5 h-1.5 rounded-full bg-white"></span>
          </p>
          <p class="text-3xl font-black">{{ totalCount }}</p>
        </button>

        <button 
          @click="currentFilter = 'swimming'"
          class="glass-panel p-4 text-left border-t-2 transition-all active:scale-95 group relative overflow-hidden"
          :class="currentFilter === 'swimming' ? 'ring-2 ring-pride-light bg-pride-light/5 border-t-pride-light' : 'bg-slate-800/80 border-t-pride-light hover:bg-slate-800'"
        >
          <div class="absolute -right-2 -top-2 opacity-10 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-16 h-16">
              <path d="M4 12c.5-1.5 2.5-1.5 3 0s2.5 1.5 3 0c.5-1.5 2.5-1.5 3 0s2.5 1.5 3 0c.5-1.5 2.5-1.5 3 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <p class="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center justify-between relative z-10">
            Natación
            <span v-if="currentFilter === 'swimming'" class="w-1.5 h-1.5 rounded-full bg-pride-light"></span>
          </p>
          <p class="text-3xl font-black relative z-10">{{ rawSwimmingCount }}</p>
        </button>

        <button 
          @click="currentFilter = 'soccer'"
          class="glass-panel p-4 text-left border-t-2 transition-all active:scale-95 group relative overflow-hidden"
          :class="currentFilter === 'soccer' ? 'ring-2 ring-pride-green bg-pride-green/5 border-t-pride-green' : 'bg-slate-800/80 border-t-pride-green hover:bg-slate-800'"
        >
          <div class="absolute -right-2 -top-2 opacity-10 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-16 h-16">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
              <path d="M12 7l-3 2v3l3 2 3-2V9zM7 12l2-3-2-3-3 1v4zM17 12l-2-3 2-3 3 1v4zM9 16l3-2 3 2-1 4H10z" fill="currentColor"/>
            </svg>
          </div>
          <p class="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center justify-between relative z-10">
            Fútbol
            <span v-if="currentFilter === 'soccer'" class="w-1.5 h-1.5 rounded-full bg-pride-green"></span>
          </p>
          <p class="text-3xl font-black relative z-10">{{ rawSoccerCount }}</p>
        </button>

        <button 
          @click="currentFilter = 'Tlatelolco'"
          class="glass-panel p-4 text-left border-t-2 transition-all active:scale-95 group"
          :class="currentFilter === 'Tlatelolco' ? 'ring-2 ring-pride-pink bg-pride-pink/5 border-t-pride-pink' : 'bg-slate-800/80 border-t-pride-pink hover:bg-slate-800'"
        >
          <p class="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
            Tlatelolco
            <span v-if="currentFilter === 'Tlatelolco'" class="w-1.5 h-1.5 rounded-full bg-pride-pink"></span>
          </p>
          <p class="text-3xl font-black">{{ rawTlatelolcoCount }}</p>
        </button>

        <button 
          @click="currentFilter = 'Cuauhtemoc'"
          class="glass-panel p-4 text-left border-t-2 transition-all active:scale-95 group"
          :class="currentFilter === 'Cuauhtemoc' ? 'ring-2 ring-pride-purple bg-pride-purple/5 border-t-pride-purple' : 'bg-slate-800/80 border-t-pride-purple hover:bg-slate-800'"
        >
          <p class="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
            Cuauhtémoc
            <span v-if="currentFilter === 'Cuauhtemoc'" class="w-1.5 h-1.5 rounded-full bg-pride-purple"></span>
          </p>
          <p class="text-3xl font-black">{{ rawCuauhtemocCount }}</p>
        </button>
      </div>

      <!-- Table View -->
      <div class="glass-panel overflow-hidden border border-white/10 shadow-2xl">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-900/60 border-b border-white/10 text-xs uppercase tracking-wider text-slate-400 font-semibold">
                <th class="p-4 pl-6">Fecha</th>
                <th class="p-4">Sharke</th>
                <th class="p-4">Deporte</th>
                <th class="p-4">Sede</th>
                <th class="p-4">Horario</th>
                <th class="p-4">Motivo</th>
                <th class="p-4">Fecha de reporte</th>
                <th class="p-4 pr-6 text-right">Acción</th>
              </tr>
            </thead>
            
            <tbody class="divide-y divide-white/5" v-if="filteredAbsences.length">
              <tr v-for="a in filteredAbsences" :key="a.id" class="hover:bg-white/5 transition group">
                <td class="p-4 pl-6 whitespace-nowrap font-medium">{{ formatDate(a.date) }}</td>
                <td class="p-4 font-bold text-pride-light">
                  <button 
                    @click="copyToClipboard(a.name)" 
                    class="hover:underline cursor-pointer flex items-center gap-2 group/name relative"
                    title="Clic para copiar nombre"
                  >
                    {{ a.name }}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 opacity-0 group-hover/name:opacity-100 transition-opacity">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5-1.5M7.875 1.875A3.375 3.375 0 0 1 11.25 5.25v1.5a3.375 3.375 0 0 1-3.375 3.375h-1.5a3.375 3.375 0 0 1-3.375-3.375v-1.5a3.375 3.375 0 0 1 3.375-3.375h1.5Z" />
                    </svg>
                    
                    <!-- Copy Indicator -->
                    <Transition name="fade">
                      <span v-if="copiedName === a.name" class="absolute left-0 -top-6 bg-pride-green text-white text-[9px] px-2 py-0.5 rounded shadow-lg font-black uppercase tracking-tighter z-50">
                        Copiado
                      </span>
                    </Transition>
                  </button>
                </td>
                <td class="p-4">
                  <span class="flex items-center gap-1.5 px-2 py-1 rounded inline-flex text-[10px] font-black uppercase tracking-tight"
                    :class="a.sport === 'soccer' ? 'bg-pride-green/20 text-pride-green' : 'bg-pride-light/20 text-pride-light'"
                  >
                    <svg v-if="a.sport === 'soccer'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3">
                      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
                      <path d="M12 7l-3 2v3l3 2 3-2V9zM7 12l2-3-2-3-3 1v4zM17 12l-2-3 2-3 3 1v4zM9 16l3-2 3 2-1 4H10z" fill="currentColor"/>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3">
                      <path d="M4 12c.5-1.5 2.5-1.5 3 0s2.5 1.5 3 0c.5-1.5 2.5-1.5 3 0s2.5 1.5 3 0c.5-1.5 2.5-1.5 3 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      <path d="M4 16c.5-1.5 2.5-1.5 3 0s2.5 1.5 3 0c.5-1.5 2.5-1.5 3 0s2.5 1.5 3 0c.5-1.5 2.5-1.5 3 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
                    </svg>
                    {{ a.sport === 'soccer' ? 'Fútbol' : 'Natación' }}
                  </span>
                </td>
                <td class="p-4">
                  <span class="px-2 py-1 rounded inline-flex text-xs font-bold"
                    :class="a.location === 'Tlatelolco' ? 'bg-pride-pink/20 text-pride-pink' : 'bg-pride-purple/20 text-pride-purple'"
                  >
                    {{ a.location }}
                  </span>
                </td>
                <td class="p-4 whitespace-nowrap text-sm">{{ a.time_slot }}</td>
                <td class="p-4 text-sm text-slate-300 max-w-xs truncate" :title="a.reason">{{ a.reason || '-' }}</td>
                <td class="p-4 text-[10px] text-slate-400 italic whitespace-nowrap">
                  {{ a.created_at ? format(parseISO(a.created_at), "d MMM, h:mm a", { locale: es }) : '-' }}
                </td>
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
          <!-- End Absences View -->
          </div>

          <!-- Events View -->
          <div v-else-if="adminTab === 'events'" key="events" class="space-y-6">
              <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <h2 class="text-xl font-bold flex items-center gap-2">Gestión de Eventos</h2>
                  <div class="flex items-center gap-3">
                      <button @click="showEventForm = !showEventForm" class="glass-button !py-2 !px-4 hover:border-pride-blue/50 text-xs pride-glow">
                          {{ showEventForm ? 'Cancelar' : 'Nuevo Evento' }}
                      </button>
                      
                      <!-- Inline Bulk Delete Confirmation -->
                      <div v-if="isConfirmingClearPast" class="flex items-center gap-2 bg-slate-900 border border-pride-red/30 rounded-xl p-1 shadow-lg">
                          <span class="text-[10px] font-black uppercase tracking-tight text-pride-red ml-2">¿Limpiar pasados?</span>
                          <button @click="handleClearPastEvents" class="px-3 py-1.5 bg-pride-red text-white text-[10px] font-black uppercase rounded-lg hover:bg-pride-red/80 transition active:scale-95" :disabled="isCleaningPastEvents">Sí</button>
                          <button @click="isConfirmingClearPast = false" class="px-3 py-1.5 bg-slate-800 text-slate-300 text-[10px] font-black uppercase rounded-lg hover:bg-slate-700 transition active:scale-95" :disabled="isCleaningPastEvents">No</button>
                      </div>
                      <button v-else @click="isConfirmingClearPast = true" class="glass-button !py-2 !px-4 hover:border-pride-red/50 text-xs text-pride-red">
                          Limpiar Pasados
                      </button>
                  </div>
              </div>

              <!-- Create Event Form -->
              <Transition name="fade">
                  <form v-if="showEventForm" @submit.prevent="handleCreateEvent" class="glass-panel p-6 space-y-4 border border-pride-blue/20">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div class="space-y-1">
                              <label class="text-[10px] font-black uppercase text-slate-400">Título</label>
                              <input v-model="newEvent.title" required type="text" class="glass-input !py-2" placeholder="Ej: Entrenamiento Especial" />
                          </div>
                          <div class="space-y-1">
                              <label class="text-[10px] font-black uppercase text-slate-400">Banner / Imagen del Evento</label>
                              <div class="mt-1 flex justify-center border-2 border-slate-700 hover:border-pride-blue/50 border-dashed rounded-xl transition-colors cursor-pointer relative group flex-col items-center shadow-inner overflow-hidden min-h-[120px]" :class="{ 'border-solid p-0': eventPreviewImage || newEvent.photoUrl }">
                                  <input type="file" @change="handleEventImageUpload" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" :disabled="isSubmittingEvent" />
                                  
                                  <div v-if="!eventPreviewImage && !newEvent.photoUrl" class="space-y-2 text-center py-4 px-6">
                                      <svg class="h-8 w-8 text-slate-500 mx-auto" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                      </svg>
                                      <p class="text-xs font-bold text-pride-blue">Subir Imagen</p>
                                  </div>
                                  <div v-else class="relative w-full h-full min-h-[120px]">
                                      <img :src="eventPreviewImage || newEvent.photoUrl" class="w-full h-full object-cover" />
                                      <div class="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                          <span class="text-white text-[10px] font-bold uppercase tracking-widest bg-slate-800 px-3 py-1.5 rounded-lg border border-white/10">Cambiar</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="space-y-1">
                          <label class="text-[10px] font-black uppercase text-slate-400">Descripción</label>
                          <textarea v-model="newEvent.description" required class="glass-input !py-2 h-20" placeholder="Detalles del evento..."></textarea>
                      </div>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div class="space-y-1">
                              <label class="text-[10px] font-black uppercase text-slate-400">Fecha Inicio</label>
                              <input v-model="newEvent.startDate" required type="date" style="color-scheme: dark;" class="glass-input !bg-slate-950/80 !p-3 !text-sm w-full" />
                          </div>
                          <div class="space-y-1">
                              <label class="text-[10px] font-black uppercase text-slate-400">Fecha Fin (Opcional)</label>
                              <input v-model="newEvent.endDate" type="date" style="color-scheme: dark;" class="glass-input !bg-slate-950/80 !p-3 !text-sm w-full" />
                          </div>
                      </div>
                      <div class="flex justify-end">
                          <button type="submit" class="glass-button !bg-pride-blue/20 hover:!bg-pride-blue/40 !py-2 !px-8" :disabled="isSubmittingEvent">
                              {{ isSubmittingEvent ? 'Creando...' : 'Crear Evento' }}
                          </button>
                      </div>
                  </form>
              </Transition>

              <!-- Events List Table -->
              <div class="glass-panel overflow-hidden">
                  <div class="overflow-x-auto">
                      <table class="w-full text-left border-collapse">
                          <thead>
                              <tr class="bg-slate-900/60 border-b border-white/10 text-xs uppercase text-slate-400">
                                  <th class="p-4">Fecha</th>
                                  <th class="p-4">Evento</th>
                                  <th class="p-4 text-right">Acción</th>
                              </tr>
                          </thead>
                          <tbody class="divide-y divide-white/5">
                              <tr v-for="e in allEvents" :key="e.id" class="hover:bg-white/5 group">
                                  <td class="p-4 text-sm font-medium">
                                      {{ formatDate(e.startDate) }}
                                      <span v-if="e.endDate" class="text-slate-500 block text-xs">al {{ formatDate(e.endDate) }}</span>
                                  </td>
                                  <td class="p-4">
                                      <div class="font-bold text-white">{{ e.title }}</div>
                                      <div class="text-xs text-slate-500 truncate max-w-xs">{{ e.description }}</div>
                                  </td>
                                   <td class="p-4 text-right relative">
                                       <div class="inline-flex justify-end">
                                           <button 
                                              v-if="deletingEventId !== e.id"
                                              @click="deletingEventId = e.id" 
                                              class="text-slate-500 hover:text-pride-red p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                              title="Eliminar Evento"
                                           >
                                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                 <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                               </svg>
                                           </button>
                                           
                                           <div v-else class="flex items-center bg-slate-900 border border-pride-red rounded p-1 absolute right-6 top-1/2 -translate-y-1/2 shadow-lg z-10 w-[140px] justify-between">
                                             <span class="text-[10px] font-bold text-pride-red ml-2 leading-none">¿Eliminar?</span>
                                             <div class="flex gap-1 pr-1">
                                               <button @click="handleDeleteEvent(e.id)" class="px-2 py-1 bg-pride-red text-white text-[10px] font-bold rounded" :disabled="isSubmittingEvent">Sí</button>
                                               <button @click="deletingEventId = null" class="px-2 py-1 bg-slate-700 text-white text-[10px] font-bold rounded" :disabled="isSubmittingEvent">No</button>
                                             </div>
                                           </div>
                                       </div>
                                   </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>

          <!-- Discounts View -->
          <div v-else-if="adminTab === 'discounts'" key="discounts">
             <AdminDiscounts />
          </div>
      </Transition>
      
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { startOfDay, format, parseISO } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { es } from 'date-fns/locale'
import { isSessionPast } from '~/utils/time'

const TIMEZONE = 'America/Mexico_City'

// Admin State
const isAuthenticated = ref(false)
const isAuthorized = ref(false)
const userEmail = ref('')
const allAbsences = ref([])
const showPastDates = ref(false)
const showNextDayOnly = ref(false)
const currentFilter = ref('all')
const nameFilter = ref('')
const showAutocomplete = ref(false)
const copiedName = ref('')
const deletingId = ref(null)
const isDeleting = ref(false)
const adminTab = ref('absences')

// Events State
const allEvents = ref([])
const showEventForm = ref(false)
const isSubmittingEvent = ref(false)
const newEvent = ref({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    photoUrl: '',
    isActive: true
})

const eventPreviewImage = ref(null)
const eventImageFile = ref(null)
const deletingEventId = ref(null)
const isConfirmingClearPast = ref(false)
const isCleaningPastEvents = ref(false)

// InsForge Client
const insforge = useInsforge()
import { getTableName } from '~/utils/insforge'

const showBypass = computed(() => {
  if (import.meta.server) return false
  const config = useRuntimeConfig()
  const isDemoMode = config.public.demoMode === 'true' || config.public.demoMode === true
  return isDemoMode || !window.location.hostname.includes('insforge.site')
})

// Session Handling
const checkSession = async () => {
  const { data } = await insforge.auth.getCurrentSession()
  if (data?.session) {
    isAuthenticated.value = true
    userEmail.value = data.session.user?.email || ''
    
    // Check if email is in whitelist via database
    try {
      const { data: adminData } = await insforge.database
        .from(getTableName('members'))
        .select('is_admin')
        .eq('email', userEmail.value.toLowerCase())
        .maybeSingle()
        
      isAuthorized.value = adminData?.is_admin === true
    } catch (err) {
      console.error('Error verifying authorization', err)
      isAuthorized.value = false
    }
    
    if (isAuthorized.value) {
      fetchAdminData()
      fetchEvents()
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
    const { data, error } = await insforge.database
      .from(getTableName('absences'))
      .select('*')
      .order('date', { ascending: false })
    
    if (error) throw error
    allAbsences.value = data || []
  } catch (err) {
    console.error('Error al obtener datos', err)
  }
}

onMounted(() => {
  checkSession()
})

watch(isAuthenticated, (newVal) => {
  if (newVal) {
    checkSession() // Re-check session to get authorization
  }
})

// Computeds
const filteredAbsences = computed(() => {
  // 1. Filter by Past Dates
  let result = allAbsences.value
  if (!showPastDates.value) {
    result = result.filter(a => !isSessionPast(a.date, a.time_slot))
  }
  
  // 2. Filter by Name
  if (nameFilter.value) {
    const query = nameFilter.value.toLowerCase()
    result = result.filter(a => a.name.toLowerCase().includes(query))
  }

  // 3. Filter by Type (Sport or Location)
  if (currentFilter.value === 'swimming') {
    result = result.filter(a => a.sport === 'swimming' || !a.sport)
  } else if (currentFilter.value === 'soccer') {
    result = result.filter(a => a.sport === 'soccer')
  } else if (currentFilter.value === 'Tlatelolco' || currentFilter.value === 'Cuauhtemoc') {
    result = result.filter(a => a.location === currentFilter.value)
  }

  // 3. Filter by Next Day Only
  if (showNextDayOnly.value && result.length > 0) {
    // Sort to find the earliest date in the current selection
    const sorted = [...result].sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
    const minDate = sorted[0].date
    result = result.filter(a => a.date === minDate)
  }

  return result
})

// Raw counts for the toggle buttons (showing totals for the current Time/Date filter)
const absencesAfterTimeFilters = computed(() => {
  let result = allAbsences.value
  if (!showPastDates.value) {
    result = result.filter(a => !isSessionPast(a.date, a.time_slot))
  }
  
  if (showNextDayOnly.value && result.length > 0) {
    const sorted = [...result].sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
    const minDate = sorted[0].date
    result = result.filter(a => a.date === minDate)
  }
  
  return result
})

const totalCount = computed(() => absencesAfterTimeFilters.value.length)
const rawSwimmingCount = computed(() => absencesAfterTimeFilters.value.filter(a => a.sport === 'swimming' || !a.sport).length)
const rawSoccerCount = computed(() => absencesAfterTimeFilters.value.filter(a => a.sport === 'soccer').length)
const rawTlatelolcoCount = computed(() => absencesAfterTimeFilters.value.filter(a => a.location === 'Tlatelolco').length)
const rawCuauhtemocCount = computed(() => absencesAfterTimeFilters.value.filter(a => a.location === 'Cuauhtemoc').length)

// Autocomplete Logic
const availableNames = computed(() => {
  const names = allAbsences.value.map(a => a.name)
  return [...new Set(names)].sort()
})

const filteredNames = computed(() => {
  if (!nameFilter.value) return []
  const query = nameFilter.value.toLowerCase()
  return availableNames.value.filter(n => n.toLowerCase().includes(query)).slice(0, 10)
})

const selectName = (name) => {
  nameFilter.value = name
  showAutocomplete.value = false
}

const hideAutocompleteDelay = () => {
  setTimeout(() => {
    showAutocomplete.value = false
  }, 200)
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedName.value = text
    nameFilter.value = text // Prefill the filter
    setTimeout(() => {
      if (copiedName.value === text) copiedName.value = ''
    }, 2000)
  } catch (err) {
    console.error('Error al copiar:', err)
  }
}

// Monthly Stats for the Filtered Result
const currentMonthStats = computed(() => {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  
  // Base it on ALL absences for the filtered name, even if not shown by date filters
  let baseSet = allAbsences.value
  if (nameFilter.value) {
    const query = nameFilter.value.toLowerCase()
    baseSet = baseSet.filter(a => a.name.toLowerCase().includes(query))
  } else {
    return { past: 0, future: 0, total: 0 }
  }

  const thisMonthAbsences = baseSet.filter(a => {
    const d = parseISO(a.date)
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear
  })
  
  const past = thisMonthAbsences.filter(a => isSessionPast(a.date, a.time_slot)).length
  const future = thisMonthAbsences.filter(a => !isSessionPast(a.date, a.time_slot)).length
  
  return { past, future, total: past + future }
})

const currentMonthPast = computed(() => currentMonthStats.value.past)
const currentMonthFuture = computed(() => currentMonthStats.value.future)
const currentMonthTotal = computed(() => currentMonthStats.value.total)

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
    const { error } = await insforge.database
      .from(getTableName('absences'))
      .delete()
      .eq('id', id)
    
    if (error) throw error
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
  
  const headers = ['ID', 'Nombre', 'Deporte', 'Fecha', 'Sede', 'Horario', 'Motivo', 'Reportado']
  const rows = allAbsences.value.map(a => [
    a.id, 
    `"${a.name}"`, 
    `"${a.sport || 'swimming'}"`,
    a.date, 
    a.location, 
    `"${a.time_slot}"`, 
    `"${(a.reason || '').replace(/"/g, '""')}"`,
    `"${a.created_at || ''}"`
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
        if(cols.length >= 7) {
             const clean = str => str ? str.replace(/^"|"$/g, '').trim() : ''
             newItems.push({
                 id: clean(cols[0]) || Date.now().toString() + i, 
                 name: clean(cols[1]),
                 sport: clean(cols[2]) || 'swimming',
                  date: clean(cols[3]),
                  location: clean(cols[4]),
                  time_slot: clean(cols[5]),
                 reason: clean(cols[6]) || '',
                 created_at: clean(cols[7]) || new Date().toISOString()
             })
        }
    }
    
    if (newItems.length > 0) {
      try {
        const { error } = await insforge.database
          .from(getTableName('absences'))
          .insert(newItems)
        
        if (error) throw error
        await fetchAdminData() // refresh from server
        alert(`Se importaron ${newItems.length} registros con éxito.`)
      } catch(err) {
        console.error(err)
        alert("Error al guardar registros en el backend")
      }
    }
  }
  reader.readAsText(file)
  event.target.value = '' // reset input
}

// Events Actions
const fetchEvents = async () => {
    try {
        const data = await $fetch('/api/events')
        allEvents.value = data || []
    } catch (err) {
        console.error('Error fetching events', err)
    }
}

const handleEventImageUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return
    eventImageFile.value = file

    const reader = new FileReader()
    reader.onload = (e) => {
        eventPreviewImage.value = e.target.result
    }
    reader.readAsDataURL(file)
}

const handleCreateEvent = async () => {
    isSubmittingEvent.value = true
    try {
        // Upload image if selected
        let finalPhotoUrl = newEvent.value.photoUrl
        if (eventImageFile.value) {
            const fileExt = eventImageFile.value.name.split('.').pop()
            const fileName = `event_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
            const safeFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
            
            const { data, error } = await insforge.storage
                .from(getTableName('events'))
                .upload(`images/${safeFileName}`, eventImageFile.value)
                
            if (error) throw error
            finalPhotoUrl = data.url
        }

        const { error } = await insforge.database
            .from(getTableName('events'))
            .insert({
                title: newEvent.value.title,
                description: newEvent.value.description,
                start_date: newEvent.value.startDate,
                end_date: newEvent.value.endDate,
                photo_url: finalPhotoUrl,
                is_active: newEvent.value.isActive
            })
            
        if (error) throw error
        
        await fetchEvents()
        showEventForm.value = false
        // Reset form
        newEvent.value = { title: '', description: '', startDate: '', endDate: '', photoUrl: '', isActive: true }
        eventPreviewImage.value = null
        eventImageFile.value = null
    } catch (err) {
        alert('Error al crear evento: ' + err.message)
    } finally {
        isSubmittingEvent.value = false
    }
}

const handleDeleteEvent = async (id) => {
    try {
        isSubmittingEvent.value = true
        const { error } = await insforge.database
            .from(getTableName('events'))
            .delete()
            .eq('id', id)
            
        if (error) throw error
        await fetchEvents()
        deletingEventId.value = null
    } catch (err) {
        alert('Error al eliminar evento: ' + err.message)
    } finally {
        isSubmittingEvent.value = false
    }
}

const handleClearPastEvents = async () => {
    isCleaningPastEvents.value = true
    try {
        const now = new Date().toISOString().split('T')[0]
        const { error } = await insforge.database
            .from(getTableName('events'))
            .delete()
            .lt('start_date', now)
            
        if (error) throw error
        await fetchEvents()
        isConfirmingClearPast.value = false
    } catch (err) {
        alert('Error al limpiar eventos: ' + err.message)
    } finally {
        isCleaningPastEvents.value = false
    }
}
</script>
