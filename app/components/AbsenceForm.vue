<template>
  <div class="glass-panel p-6 sm:p-8 animate-fade-in relative z-10 w-full max-w-2xl mx-auto">
    <!-- Success Message Overlay -->
    <div v-if="submitSuccess" class="absolute inset-0 z-20 flex flex-col bg-slate-950/98 backdrop-blur-3xl rounded-2xl overflow-hidden animate-fade-in group">
      <!-- Animated Background Accents -->
      <div class="absolute -top-24 -right-24 w-64 h-64 bg-pride-light/10 blur-[100px] rounded-full animate-pulse"></div>
      <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-pride-purple/10 blur-[100px] rounded-full animate-pulse" style="animation-delay: 1s"></div>
      
      <!-- Close Button (X) -->
      <button 
        @click="resetForm" 
        class="absolute top-4 right-4 z-30 p-3 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-90"
        aria-label="Cerrar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center overflow-y-auto custom-scrollbar relative z-10 w-full">
        <!-- Success Icon -->
        <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-pride-green/20 flex items-center justify-center mb-8 animate-success-pop shadow-[0_0_50px_rgba(0,128,38,0.3)]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 sm:w-14 sm:h-14 text-pride-green">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12m13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
          </svg>
        </div>

        <h3 class="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tighter">¡Listo, Sharke!</h3>
        <p class="text-slate-400 text-sm sm:text-lg mb-10 max-w-[280px] sm:max-w-md mx-auto leading-relaxed">
          Pudimos registrar tu ausencia con éxito. ¡Nos vemos en el próximo entrenamiento!
        </p>
        
        <!-- Absence Summary Counter Card -->
        <div class="w-full max-w-sm bg-white/5 border border-white/10 rounded-[2.5rem] p-6 mb-10 animate-fade-up shadow-2xl relative overflow-hidden group/card backdrop-blur-sm">
          <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none"></div>
          
          <p class="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black mb-5 flex items-center justify-center gap-2">
            Resumen de {{ currentSelectedMonthName }}
          </p>
          
          <div class="grid grid-cols-2 gap-4 items-center relative z-10">
            <div class="text-center group/stat">
              <span class="block text-4xl font-black text-white group-hover/stat:scale-110 transition-transform duration-300">{{ pastMonthlyAbsencesCount }}</span>
              <span class="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1 block">Pasadas</span>
            </div>
            
            <div class="absolute left-1/2 -ml-px h-12 w-px bg-white/10"></div>
            
            <div class="text-center group/stat">
              <span class="block text-4xl font-black transition-all duration-300 group-hover/stat:scale-110" 
                    :class="totalMonthlyAbsencesCount >= 3 ? 'text-pride-red animate-pulse' : 'text-pride-light'">
                {{ futureMonthlyAbsencesCount }}
              </span>
              <span class="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1 block">Futuras</span>
            </div>
          </div>
          
          <div v-if="totalMonthlyAbsencesCount >= 3" class="mt-6 pt-5 border-t border-white/5 flex items-center justify-center gap-2">
            <p class="text-[10px] text-pride-red font-black uppercase tracking-tight">
              ⚠️ Límite de 3 ausencias alcanzado
            </p>
          </div>
        </div>

        <!-- Action Buttons Area -->
        <div class="w-full max-w-sm space-y-4 animate-fade-up" style="animation-delay: 0.1s">
          <button 
            @click="resetForm" 
            class="w-full h-16 rounded-2xl bg-white text-slate-900 font-black text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3 group"
          >
            <span>Registrar otra falta</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-5 h-5 group-hover:rotate-12 transition-transform">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
          
          <NuxtLink 
            to="/" 
            class="w-full h-16 rounded-2xl bg-slate-800/50 border border-white/10 text-white font-bold text-base transition-all hover:bg-white/10 flex items-center justify-center gap-3 backdrop-blur-xl"
          >
            <span>Volver al Inicio</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Sport Selection -->
      <div class="space-y-3">
        <label class="block text-sm font-medium text-slate-300 flex items-center gap-2">
          <span>Deporte</span>
          <span class="w-1.5 h-1.5 rounded-full pride-bar inline-block"></span>
        </label>
        <div class="flex gap-4">
          <button 
            type="button"
            @click="selectSport('swimming')"
            class="flex-1 p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 group pride-glow"
            :class="form.sport === 'swimming' ? 'bg-pride-light/20 border-pride-light shadow-[0_0_15px_rgba(91,206,250,0.3)]' : 'bg-slate-800/40 border-white/5 hover:border-white/20'"
          >
            <div class="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner" :class="{'!bg-pride-light/40': form.sport === 'swimming'}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 text-white">
                <path d="M4 12c.5-1.5 2.5-1.5 3 0s2.5 1.5 3 0c.5-1.5 2.5-1.5 3 0s2.5 1.5 3 0c.5-1.5 2.5-1.5 3 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M4 16c.5-1.5 2.5-1.5 3 0s2.5 1.5 3 0c.5-1.5 2.5-1.5 3 0s2.5 1.5 3 0c.5-1.5 2.5-1.5 3 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
              </svg>
            </div>
            <span class="font-bold text-sm tracking-wide" :class="form.sport === 'swimming' ? 'text-white' : 'text-slate-400'">Natación</span>
          </button>
          <button 
            type="button"
            @click="selectSport('soccer')"
            class="flex-1 p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 group pride-glow"
            :class="form.sport === 'soccer' ? 'bg-pride-green/20 border-pride-green shadow-[0_0_15px_rgba(0,128,38,0.3)]' : 'bg-slate-800/40 border-white/5 hover:border-white/20'"
          >
            <div class="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner" :class="{'!bg-pride-green/40': form.sport === 'soccer'}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 text-white">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
                <path d="M12 7l-3 2v3l3 2 3-2V9zM7 12l2-3-2-3-3 1v4zM17 12l-2-3 2-3 3 1v4zM9 16l3-2 3 2-1 4H10z" fill="currentColor"/>
              </svg>
            </div>
            <span class="font-bold text-sm tracking-wide" :class="form.sport === 'soccer' ? 'text-white' : 'text-slate-400'">Fútbol</span>
          </button>
        </div>
      </div>

      <!-- Shark Name with Autocomplete -->
      <div class="space-y-2 relative pride-glow-focus">
        <label class="block text-sm font-medium text-slate-300 flex items-center gap-2">
          <span>Nombre del Sharke</span>
          <span class="w-1.5 h-1.5 rounded-full pride-bar inline-block"></span>
        </label>
        <input 
          v-model="form.name" 
          @focus="showAutocomplete = true"
          @blur="hideAutocompleteDelay"
          class="glass-input relative z-10" 
          type="text" 
          placeholder="Escribe tu nombre completo (Apellidos - Nombre)" 
          required 
        />
        <!-- Autocomplete dropdown -->
        <ul v-if="showAutocomplete && filteredNames.length" class="absolute top-full left-0 w-full mt-2 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl max-h-48 overflow-y-auto z-30 divide-y divide-white/5 overflow-hidden">
          <li 
            v-for="name in filteredNames" 
            :key="name" 
            @click="selectName(name)"
            class="px-4 py-3 hover:bg-white/10 cursor-pointer text-slate-200 transition-all flex items-center justify-between group active:bg-white/20 pride-glow"
          >
            <span class="group-hover:translate-x-1 transition-transform">{{ name }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-pride-light opacity-0 group-hover:opacity-100 transition-opacity">
              <path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd" />
            </svg>
          </li>
        </ul>
        
        <!-- Dynamic Absent Indicator -->
        <div v-if="form.name && form.dateStr" class="text-[11px] mt-1 space-y-1">
          <p class="flex items-center gap-1.5 font-medium text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3.5 h-3.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            Resumen de {{ currentSelectedMonthName }}:
          </p>
          <div class="flex flex-wrap gap-x-4 gap-y-1 ml-5">
            <p class="text-slate-500">
              <span class="font-bold">{{ pastMonthlyAbsencesCount }}</span> pasadas
            </p>
            <p :class="totalMonthlyAbsencesCount >= 3 ? 'text-pride-red font-black animate-pulse' : 'text-pride-light font-bold'">
              <span class="font-bold">{{ futureMonthlyAbsencesCount }}</span> futuras
              <span v-if="totalMonthlyAbsencesCount >= 3" class="ml-1 text-[9px] uppercase tracking-tighter">[Límite alcanzado]</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Date Selection -->
      <div class="space-y-3" v-if="form.sport">
        <label class="block text-sm font-medium text-slate-300 flex justify-between items-center">
          <span>Fecha de Ausencia</span>
          <span class="text-xs text-slate-500">{{ form.sport === 'soccer' ? 'Solo Sábados' : 'Solo Sábado o Domingo' }}</span>
        </label>
        
        <div class="flex flex-wrap gap-2">
          <!-- Upcoming weekends pills -->
          <button 
            v-for="date in quickDates"
            :key="date.iso"
            type="button"
            @click="selectDate(date.iso)"
            class="px-5 py-2.5 rounded-full text-sm transition-all whitespace-nowrap font-medium pride-glow"
            :class="form.dateStr === date.iso ? 'bg-white text-slate-900 shadow-md scale-105 border border-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-white/10'"
          >
            {{ date.label }}
          </button>
          
          <!-- Custom Date Input Dropdown -->
          <div class="relative group" v-click-outside="closeCalendarPanel">
            <button 
              type="button"
              @click="toggleCalendarPanel"
              class="flex items-center justify-center px-5 py-2.5 rounded-full text-sm transition-all bg-slate-800 text-slate-300 border border-white/10 hover:bg-slate-700 hover:text-white font-medium pride-glow"
              :class="{'!bg-white !text-slate-900 shadow-md font-bold !border-white': isCustomDateActive}"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              {{ isCustomDateActive && form.dateStr ? formatDateMedium(form.dateStr) : 'Elegir otra fecha...' }}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-2 transition-transform" :class="{'rotate-180': isCalendarOpen}">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            
            
            <!-- Custom Premium Dropdown Panel -->
            <Teleport to="body" :disabled="!isMobile">
              <!-- Backdrop for mobile -->
              <div v-if="isCalendarOpen && isMobile" 
                   class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 animate-fade-in"
                   @click="closeCalendarPanel">
              </div>

              <Transition name="fade-slide">
                <div v-if="isCalendarOpen" 
                     @click.stop
                     class="z-50 bg-slate-900/90 backdrop-blur-3xl border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-all duration-300
                            fixed inset-x-0 bottom-0 w-full rounded-t-3xl p-6 max-h-[85vh] flex flex-col
                            sm:absolute sm:inset-auto sm:top-full sm:right-0 sm:bottom-auto sm:mt-3 sm:w-72 sm:rounded-2xl sm:border sm:p-4 sm:block"
                >
                   
                   <!-- Header / PRIDE accents -->
                   <div class="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                     <h4 class="font-bold text-white flex items-center gap-2">
                       <span class="w-2 h-2 rounded-full pride-bar inline-block"></span>
                       Fechas Futuras
                     </h4>
                     <button @click="closeCalendarPanel" type="button" class="text-slate-400 hover:text-white transition-colors p-2 -mr-2" title="Cerrar">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                         <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                       </svg>
                     </button>
                   </div>
                   
                   <!-- Date List -->
                   <div class="space-y-1 overflow-y-auto pr-1 flex-1 custom-scrollbar">
                     <button
                       v-for="date in upcomingYearDates"
                       :key="date.iso"
                       type="button"
                       @click="selectCustomDate(date.iso)"
                       class="w-full text-left px-4 py-3 sm:py-2.5 rounded-xl text-sm transition-colors flex justify-between items-center group relative overflow-hidden active:bg-white/5"
                       :class="form.dateStr === date.iso ? 'bg-pride-light/20 text-white font-bold border border-pride-light/30' : 'text-slate-300 hover:bg-white/10 border border-transparent'"
                     >
                       <div v-if="form.dateStr === date.iso" class="absolute left-0 top-0 bottom-0 w-1 bg-pride-light"></div>
                       <span :class="{'pl-2': form.dateStr === date.iso}">{{ date.labelLong }}</span>
                       <svg v-if="form.dateStr === date.iso" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-pride-light">
                         <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12m13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                       </svg>
                     </button>
                     
                     <div v-if="!upcomingYearDates.length" class="text-center py-8 text-slate-500 text-xs">
                       Cargando fechas...
                     </div>
                   </div>
                </div>
              </Transition>
            </Teleport>
          </div>
        </div>
        <p v-if="dateError" class="text-pride-red text-sm mt-2 font-medium bg-pride-red/10 border border-pride-red/30 rounded-lg px-3 py-2 inline-block shadow-lg">{{ dateError }}</p>
      </div>

      <!-- Time / Location Slots -->
      <div class="space-y-3" v-if="form.sport">
        <label class="block text-sm font-medium text-slate-300">Horario de Entrenamiento</label>
        
        <!-- Swimming Layout -->
        <div v-if="form.sport === 'swimming'" class="grid sm:grid-cols-2 gap-4">
          <!-- Tlatelolco -->
          <div class="space-y-2 p-4 bg-slate-800/40 border border-white/5 rounded-2xl">
            <h4 class="font-medium text-pride-pink flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              Tlatelolco
            </h4>
            <div class="space-y-2">
              <label 
                v-for="slot in tlatelolcoSlots" 
                :key="slot"
                class="flex items-center p-3 rounded-xl border cursor-pointer hover:bg-white/5 transition-colors"
                :class="form.timeSlot === slot && form.location === 'Tlatelolco' ? 'border-pride-pink bg-pride-pink/10' : 'border-white/10'"
              >
                <input type="radio" v-model="form.timeSlot" :value="slot" @change="form.location = 'Tlatelolco'" class="hidden" />
                <div class="w-4 h-4 rounded-full border border-white/30 mr-3 flex items-center justify-center" :class="{'border-pride-pink': form.timeSlot === slot && form.location === 'Tlatelolco'}">
                  <div v-if="form.timeSlot === slot && form.location === 'Tlatelolco'" class="w-2 h-2 bg-pride-pink rounded-full"></div>
                </div>
                <span class="text-sm text-slate-200">{{ slot }}</span>
              </label>
            </div>
          </div>

          <!-- Cuauhtemoc -->
          <div class="space-y-2 p-4 bg-slate-800/40 border border-white/5 rounded-2xl">
            <h4 class="font-medium text-pride-purple flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              Cuauhtémoc
            </h4>
            <div class="space-y-2">
              <label 
                v-for="slot in cuauhtemocSlots" 
                :key="slot"
                class="flex items-center p-3 rounded-xl border cursor-pointer hover:bg-white/5 transition-colors"
                :class="form.timeSlot === slot && form.location === 'Cuauhtemoc' ? 'border-pride-purple bg-pride-purple/10' : 'border-white/10'"
              >
                <input type="radio" v-model="form.timeSlot" :value="slot" @change="form.location = 'Cuauhtemoc'" class="hidden" />
                <div class="w-4 h-4 rounded-full border border-white/30 mr-3 flex items-center justify-center" :class="{'border-pride-purple': form.timeSlot === slot && form.location === 'Cuauhtemoc'}">
                  <div v-if="form.timeSlot === slot && form.location === 'Cuauhtemoc'" class="w-2 h-2 bg-pride-purple rounded-full"></div>
                </div>
                <span class="text-sm text-slate-200">{{ slot }}</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Soccer Layout -->
        <div v-else class="space-y-2 p-4 bg-slate-800/40 border border-white/5 rounded-2xl">
          <h4 class="font-medium text-pride-green flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
              <path d="M12 7l-3 2v3l3 2 3-2V9zM7 12l2-3-2-3-3 1v4zM17 12l-2-3 2-3 3 1v4zM9 16l3-2 3 2-1 4H10z" fill="currentColor"/>
            </svg>
            Tlatelolco (Fútbol)
          </h4>
          <div class="p-4 rounded-xl border border-pride-green bg-pride-green/10 flex items-center">
            <div class="w-4 h-4 rounded-full border border-pride-green mr-3 flex items-center justify-center">
              <div class="w-2 h-2 bg-pride-green rounded-full"></div>
            </div>
            <span class="text-sm text-slate-200">Sábado 10:00 am - 11:00 am</span>
          </div>
          <p class="text-xs text-slate-500 mt-2 px-1">La selección de sede y horario es automática para fútbol.</p>
        </div>
      </div>

      <!-- Reason Textarea -->
      <div class="space-y-2" v-if="form.sport">
        <label class="block text-sm font-medium text-slate-300">
          Motivo Breve <span class="text-xs text-slate-500 font-normal">(Ej: Enfermedad, viaje, trabajo)</span>
        </label>
        <textarea 
          v-model="form.reason" 
          rows="2" 
          class="glass-input resize-none" 
          placeholder="Escribe el motivo de tu ausencia..."
          required
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button 
        v-if="form.sport"
        type="submit" 
        class="w-full bg-slate-800 text-white hover:bg-slate-700 hover:text-white py-4 mt-8 text-lg font-black rounded-2xl border border-white/10 shadow-[0_4px_20px_0_rgba(0,0,0,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 relative overflow-hidden group pride-glow"
        :disabled="loading"
      >
        <div class="absolute bottom-0 left-0 w-full h-1 pride-bar translate-y-full group-hover:translate-y-0 transition-transform"></div>
        <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 animate-spin">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        <span v-else>Confirmar Ausencia</span>
      </button>

      <!-- Error Message -->
      <div v-if="submitError" class="p-4 rounded-xl bg-pride-red/20 border border-pride-red/50 text-pride-red text-sm mt-4 text-center">
        {{ submitError }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { startOfDay, addDays, isSaturday, isSunday, format, parseISO } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { es } from 'date-fns/locale'
import { isSessionPast } from '~/utils/time'

const insforge = useInsforge()
import { getTableName } from '~/utils/insforge'

const TIMEZONE = 'America/Mexico_City'
const tlatelolcoSlots = ['12:00 pm - 1:00 pm', '1:00 pm - 2:00 pm']
const cuauhtemocSlots = ['4:00 pm - 5:00 pm', '5:00 pm - 6:00 pm']

// State
const form = ref({
  sport: '', // 'swimming' or 'soccer'
  name: '',
  dateStr: '',
  timeSlot: '',
  location: '',
  reason: ''
})

const isCustomDateActive = ref(false)
const isCalendarOpen = ref(false)
const dateError = ref('')

const loading = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

const showAutocomplete = ref(false)
const availableNames = ref([])
const absencesData = ref([])


const isMobile = ref(false)

const updateMobileStatus = () => {
  if (import.meta.client) {
    isMobile.value = window.innerWidth < 640
  }
}

// Actions
const selectSport = (sport) => {
  form.value.sport = sport
  form.value.dateStr = ''
  form.value.timeSlot = ''
  form.value.location = ''
  dateError.value = ''
  
  // Auto-set soccer location/slot
  if (sport === 'soccer') {
    form.value.location = 'Tlatelolco'
    form.value.timeSlot = '10:00 am - 11:00 am'
  }
}

// Init Mobile Check
onMounted(() => {
  updateMobileStatus()
  window.addEventListener('resize', updateMobileStatus)
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', updateMobileStatus)
  }
})

// Fetch Init Data
onMounted(async () => {
  try {
    // 1. Fetch official member names
    const { data: members, error: membersError } = await insforge.database
      .from(getTableName('members'))
      .select('name')
      .order('name', { ascending: true })
    
    if (membersError) throw membersError
    availableNames.value = (members || []).map(m => m.name)

    // 2. Fetch absences for indicator logic
    const { data: absences, error: absencesError } = await insforge.database
      .from(getTableName('absences'))
      .select('name, date')
      .order('date', { ascending: false })
    
    if (absencesError) throw absencesError
    absencesData.value = absences || []
    
  } catch (e) {
    console.error('Error loading initial data', e)
    // Fallback if DB fails
    availableNames.value = ['Castro Maya Cristopher', 'Hernandez Pilar Yasmine']
  }
})

// Autocomplete Logic
const filteredNames = computed(() => {
  if (!form.value.name) return availableNames.value.slice(0, 5)
  const lowerQuery = form.value.name.toLowerCase()
  return availableNames.value.filter(n => n.toLowerCase().includes(lowerQuery)).slice(0, 5)
})

const selectName = (n) => {
  form.value.name = n
  showAutocomplete.value = false
}

const hideAutocompleteDelay = () => {
  setTimeout(() => showAutocomplete.value = false, 200)
}

// Indicator logic
const currentSelectedMonthName = computed(() => {
  if (!form.value.dateStr) return ''
  return format(parseISO(form.value.dateStr), "MMMM", { locale: es })
})

const monthlyAbsences = computed(() => {
  if (!form.value.name || !form.value.dateStr) return []
  const selectedDate = parseISO(form.value.dateStr)
  const selectedMonth = selectedDate.getMonth()
  const selectedYear = selectedDate.getFullYear()
  
  return absencesData.value.filter(a => {
    if (a.name.toLowerCase() !== form.value.name.toLowerCase()) return false
    const d = parseISO(a.date)
    return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear
  })
})

const pastMonthlyAbsencesCount = computed(() => {
  return monthlyAbsences.value.filter(a => isSessionPast(a.date, a.time_slot || '12:00 pm - 1:00 pm')).length
})

const futureMonthlyAbsencesCount = computed(() => {
  return monthlyAbsences.value.filter(a => !isSessionPast(a.date, a.time_slot || '12:00 pm - 1:00 pm')).length
})

const totalMonthlyAbsencesCount = computed(() => monthlyAbsences.value.length)

// Date Logic
const getTodayCDMX = () => startOfDay(toZonedTime(new Date(), TIMEZONE))
const todayISO = format(getTodayCDMX(), 'yyyy-MM-dd')

const quickDates = computed(() => {
  const dates = []
  let current = getTodayCDMX()
  
  while(dates.length < 5) {
    const allowed = form.value.sport === 'soccer' 
      ? isSaturday(current) 
      : (isSaturday(current) || isSunday(current))
      
    if (allowed) {
      const iso = format(current, 'yyyy-MM-dd')
      const isToday = iso === todayISO
      
      let pastAllSlots = false
      if (isToday) {
        // For soccer, last (and only) slot is 10:00 am
        // For swimming, last slot starts at 4:00 pm
        const lastSlot = form.value.sport === 'soccer' ? '10:00 am - 11:00 am' : '4:00 pm - 5:00 pm'
        pastAllSlots = isSessionPast(iso, lastSlot)
      }

      if (!isToday || !pastAllSlots) {
        dates.push({
          iso,
          label: format(current, "EEE d MMM", { locale: es }).replace(/^\w/, c => c.toUpperCase())
        })
      }
    }
    current = addDays(current, 1)
  }
  return dates
})

const upcomingYearDates = computed(() => {
  const dates = []
  let current = getTodayCDMX()
  const endLimit = addDays(current, 180) // 6 months into the future
  
  while(current < endLimit) {
    const allowed = form.value.sport === 'soccer' 
      ? isSaturday(current) 
      : (isSaturday(current) || isSunday(current))

    if (allowed) {
      const iso = format(current, 'yyyy-MM-dd')
      const isToday = iso === todayISO
      
      let pastAllSlots = false
      if (isToday) {
        const lastSlot = form.value.sport === 'soccer' ? '10:00 am - 11:00 am' : '4:00 pm - 5:00 pm'
        pastAllSlots = isSessionPast(iso, lastSlot)
      }

      if (!isToday || !pastAllSlots) {
        dates.push({
          iso,
          labelLong: format(current, "EEEE, d 'de' MMMM", { locale: es }).replace(/^\w/, c => c.toUpperCase())
        })
      }
    }
    current = addDays(current, 1)
  }
  return dates
})

const formatDateMedium = (isoStr) => {
  if(!isoStr) return ''
  return format(parseISO(isoStr), "EEE d MMM", { locale: es }).replace(/^\w/, c => c.toUpperCase())
}

const selectDate = (iso) => {
  form.value.dateStr = iso
  isCustomDateActive.value = false
  isCalendarOpen.value = false
  dateError.value = ''
}

const toggleCalendarPanel = () => {
  isCalendarOpen.value = !isCalendarOpen.value
}

const closeCalendarPanel = () => {
  isCalendarOpen.value = false
}

const selectCustomDate = (iso) => {
  form.value.dateStr = iso
  isCustomDateActive.value = true
  isCalendarOpen.value = false
  dateError.value = ''
}

// Form Submission
const submitForm = async () => {
  if (!form.value.dateStr) {
    dateError.value = 'Debes seleccionar una fecha'
    return
  }
  if (!form.value.timeSlot) {
    submitError.value = 'Debes seleccionar un horario'
    return
  }
  
  loading.value = true
  submitError.value = ''
  
  try {
    const submission = {
      name: form.value.name,
      date: form.value.dateStr,
      time_slot: form.value.timeSlot,
      location: form.value.location,
      reason: form.value.reason,
      sport: form.value.sport
    }

    const data = await $fetch('/api/absences', {
      method: 'POST',
      body: submission
    })
    
    // update local state
    absencesData.value.push(data)
    if (!availableNames.value.includes(form.value.name)) {
      availableNames.value.push(form.value.name)
      availableNames.value.sort()
    }
    
    submitSuccess.value = true
  } catch (err) {
    submitError.value = err.message || 'Error al registrar la ausencia'
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  submitSuccess.value = false
  form.value = {
    sport: '',
    name: '',
    dateStr: '',
    timeSlot: '',
    location: '',
    reason: ''
  }
  isCustomDateActive.value = false
  isCalendarOpen.value = false
}
</script>

<style scoped>
.pridetext {
  background: linear-gradient(90deg, #E40303, #FF8C00, #FFED00, #008026, #24408E, #732982, #5BCEFA, #F5A9B8);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Base custom scrollbar for dropdowns */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}
</style>
