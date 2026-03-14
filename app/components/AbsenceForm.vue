<template>
  <div class="glass-panel p-6 sm:p-8 animate-fade-in relative z-10 w-full max-w-2xl mx-auto">
    <!-- Success Message Overlay -->
    <div v-if="submitSuccess" class="absolute inset-0 z-20 flex flex-col bg-slate-950 rounded-2xl overflow-hidden animate-fade-in group">
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

        <h3 class="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tighter">¡Todo listo, Sharke!</h3>
        <p class="text-slate-400 text-sm sm:text-lg mb-10 max-w-[280px] sm:max-w-md mx-auto leading-relaxed">
          Hemos registrado tu ausencia con éxito. ¡Nos vemos en el próximo entrenamiento!
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
            class="w-full h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-white font-black text-lg transition-all hover:bg-white/10 active:scale-[0.98] shadow-2xl flex items-center justify-center gap-3 group"
          >
            <span class="uppercase tracking-widest text-sm">Cerrar</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-5 h-5 group-hover:scale-110 transition-transform text-pride-light">
               <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- WhatsApp Disclaimer -->
          <div class="mt-4 p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center gap-3 animate-fade-up" style="animation-delay: 0.2s">
            <div class="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(37,211,102,0.3)]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.635 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <p class="text-[11px] sm:text-xs text-slate-400 text-left leading-relaxed">
              <span class="text-white font-bold block mb-0.5">Contacto de Coordinación</span>
              Por favor contacta al coordinador de tu horario por WhatsApp para proporcionar tus justificantes.
            </p>
          </div>
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
        <label class="block text-sm font-medium text-slate-300 flex items-center justify-between group/label">
          <div class="flex items-center gap-2">
            <span>Nombre del Sharke</span>
            <span class="w-1.5 h-1.5 rounded-full pride-bar inline-block"></span>
          </div>
          <button 
            type="button" 
            @click="showNameHint = !showNameHint"
            class="flex items-center gap-1.5 px-2 py-1 rounded-full bg-pride-light/10 border border-pride-light/20 hover:bg-pride-light/20 transition-all group/hint relative overflow-hidden"
            aria-label="Información sobre el nombre"
          >
            <!-- Pulsing Dot -->
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-pride-light opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-pride-light"></span>
            </span>
            <span class="text-[10px] font-black uppercase tracking-tighter text-pride-light">Instrucciones</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5 text-pride-light group-hover/hint:rotate-12 transition-transform">
              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
          </button>
        </label>
        
        <!-- Premium Name Hint -->
        <Transition
          enter-active-class="transition duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)"
          enter-from-class="transform -translate-y-4 scale-95 opacity-0"
          enter-to-class="transform translate-y-0 scale-100 opacity-100"
          leave-active-class="transition duration-300 ease-in"
          leave-from-class="transform translate-y-0 scale-100 opacity-100"
          leave-to-class="transform -translate-y-4 scale-95 opacity-0"
        >
          <div v-if="showNameHint" class="rounded-2xl bg-slate-900 border-2 border-pride-light/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group/hint-box">
            <!-- Sharke Tip Header -->
            <div class="px-4 py-2 bg-pride-light/10 border-b border-pride-light/20 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-lg">💡</span>
                <span class="text-[11px] font-black uppercase tracking-[0.2em] text-pride-light">Sharke Tip de Inclusión</span>
              </div>
              <button type="button" @click.stop="showNameHint = false" class="text-slate-500 hover:text-white transition-colors p-1 relative z-20" title="Cerrar tip">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div class="p-4 relative z-10">
              <div class="absolute -top-10 -right-10 w-24 h-24 bg-pride-light/10 blur-[40px] rounded-full pointer-events-none"></div>
              <p class="text-xs sm:text-sm text-slate-200 leading-relaxed relative z-10">
                Para que todos nos sintamos cómodes y reconocides: por favor introduce tus <span class="text-white font-black underline decoration-pride-light decoration-2 underline-offset-2">apellidos</span> tal como aparecen en documentos legales, y opcionalmente un <span class="text-white font-black underline decoration-pride-pink decoration-2 underline-offset-2">nombre</span> (puede ser tu nombre elegido o el legal) sin embargo te pedimos usar siempre el mismo nombre para que te podamos reconocer.
              </p>
            </div>
          </div>
        </Transition>
        <input 
          v-model="form.name" 
          @focus="showAutocomplete = true"
          @blur="hideAutocompleteDelay"
          class="glass-input relative z-10" 
          type="text" 
          placeholder="Apellidos - Nombre (elegido ó legal)" 
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
          <div class="flex items-center gap-2">
            <span>Fecha de Ausencia</span>
            <span v-if="!form.isRange" class="text-[10px] text-slate-500 uppercase tracking-wider">{{ form.sport === 'soccer' ? 'Solo Sábados' : 'Solo Sábado o Domingo' }}</span>
          </div>
          
          <!-- Range Toggle -->
          <button 
            type="button"
            @click="toggleRange"
            class="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all hover:bg-white/5 group"
            :class="form.isRange ? 'bg-pride-pink/20 border-pride-pink text-white font-bold' : 'bg-slate-800/40 border-white/10 text-slate-400'"
          >
            <div class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center">
              <div v-if="form.isRange" class="w-1.5 h-1.5 bg-current rounded-full"></div>
            </div>
            <span class="text-[10px] uppercase tracking-wider font-black">Periodo de ausencia</span>
          </button>
        </label>
        
        <div class="flex flex-col gap-4">
          <!-- Start Date Selection -->
          <div class="space-y-2">
            <span v-if="form.isRange" class="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black block ml-2 mb-1">Inicio del periodo</span>
            <div class="flex flex-wrap gap-2">
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
              
              <div class="relative group" v-click-outside="() => closeCalendarPanel('start')">
                <button 
                  type="button"
                  @click="toggleCalendarPanel('start')"
                  class="flex items-center justify-center px-5 py-2.5 rounded-full text-sm transition-all bg-slate-800 text-slate-300 border border-white/10 hover:bg-slate-700 hover:text-white font-medium pride-glow"
                  :class="{'!bg-white !text-slate-900 shadow-md font-bold !border-white': isCustomDateActive && !isEndCustomActive}"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  {{ isCustomDateActive && !isEndCustomActive && form.dateStr ? formatDateMedium(form.dateStr) : 'Elegir otra fecha...' }}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-2 transition-transform" :class="{'rotate-180': isCalendarOpen === 'start'}">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                
                <Teleport to="body" :disabled="!isMobile">
                  <div v-if="isCalendarOpen === 'start' && isMobile" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 animate-fade-in" @click="closeCalendarPanel('start')"></div>
                  <Transition name="fade-slide">
                    <div v-if="isCalendarOpen === 'start'" @click.stop class="z-50 bg-slate-900/90 backdrop-blur-3xl border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-all duration-300 fixed inset-x-0 bottom-0 w-full rounded-t-3xl p-6 max-h-[85vh] flex flex-col sm:absolute sm:inset-auto sm:top-full sm:right-0 sm:bottom-auto sm:mt-3 sm:w-72 sm:rounded-2xl sm:border sm:p-4 sm:block">
                       <div class="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                         <h4 class="font-bold text-white flex items-center gap-2">
                           <span class="w-2 h-2 rounded-full pride-bar inline-block"></span>
                           Inicio del Periodo
                         </h4>
                         <button @click="closeCalendarPanel('start')" type="button" class="text-slate-400 hover:text-white transition-colors p-2 -mr-2" title="Cerrar">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                             <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                           </svg>
                         </button>
                       </div>
                       <div class="space-y-1 overflow-y-auto pr-1 flex-1 custom-scrollbar">
                         <button v-for="date in upcomingYearDates" :key="date.iso" type="button" @click="selectCustomDate(date.iso, 'start')" class="w-full text-left px-4 py-3 sm:py-2.5 rounded-xl text-sm transition-colors flex justify-between items-center group relative overflow-hidden active:bg-white/5" :class="form.dateStr === date.iso ? 'bg-pride-light/20 text-white font-bold border border-pride-light/30' : 'text-slate-300 hover:bg-white/10 border border-transparent'">
                           <div v-if="form.dateStr === date.iso" class="absolute left-0 top-0 bottom-0 w-1 bg-pride-light"></div>
                           <span :class="{'pl-2': form.dateStr === date.iso}">{{ date.labelLong }}</span>
                           <svg v-if="form.dateStr === date.iso" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-pride-light">
                             <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12m13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                           </svg>
                         </button>
                       </div>
                    </div>
                  </Transition>
                </Teleport>
              </div>
            </div>
          </div>

          <!-- End Date Selection (Range only) -->
          <div v-if="form.isRange" class="space-y-2 animate-fade-in">
            <span class="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black block ml-2 mb-1">Fin del periodo</span>
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="date in quickEndDates"
                :key="date.iso"
                type="button"
                @click="selectEndDate(date.iso)"
                class="px-5 py-2.5 rounded-full text-sm transition-all whitespace-nowrap font-medium pride-glow"
                :class="form.endDateStr === date.iso ? 'bg-white text-slate-900 shadow-md scale-105 border border-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-white/10'"
              >
                {{ date.label }}
              </button>

              <div class="relative group" v-click-outside="() => closeCalendarPanel('end')">
                <button 
                  type="button"
                  @click="toggleCalendarPanel('end')"
                  class="flex items-center justify-center px-5 py-2.5 rounded-full text-sm transition-all bg-slate-800 text-slate-300 border border-white/10 hover:bg-slate-700 hover:text-white font-medium pride-glow"
                  :class="{'!bg-white !text-slate-900 shadow-md font-bold !border-white': isEndCustomActive}"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  {{ isEndCustomActive && form.endDateStr ? formatDateMedium(form.endDateStr) : 'Elegir otra fecha...' }}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-2 transition-transform" :class="{'rotate-180': isCalendarOpen === 'end'}">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                
                <Teleport to="body" :disabled="!isMobile">
                  <div v-if="isCalendarOpen === 'end' && isMobile" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 animate-fade-in" @click="closeCalendarPanel('end')"></div>
                  <Transition name="fade-slide">
                    <div v-if="isCalendarOpen === 'end'" @click.stop class="z-50 bg-slate-900/90 backdrop-blur-3xl border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-all duration-300 fixed inset-x-0 bottom-0 w-full rounded-t-3xl p-6 max-h-[85vh] flex flex-col sm:absolute sm:inset-auto sm:top-full sm:right-0 sm:bottom-auto sm:mt-3 sm:w-72 sm:rounded-2xl sm:border sm:p-4 sm:block">
                       <div class="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                         <h4 class="font-bold text-white flex items-center gap-2">
                           <span class="w-2 h-2 rounded-full pride-bar inline-block"></span>
                           Fin del Periodo
                         </h4>
                         <button @click="closeCalendarPanel('end')" type="button" class="text-slate-400 hover:text-white transition-colors p-2 -mr-2" title="Cerrar">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                             <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                           </svg>
                         </button>
                       </div>
                       <div class="space-y-1 overflow-y-auto pr-1 flex-1 custom-scrollbar">
                         <button v-for="date in upcomingYearDates" :key="date.iso" type="button" @click="selectCustomDate(date.iso, 'end')" class="w-full text-left px-4 py-3 sm:py-2.5 rounded-xl text-sm transition-colors flex justify-between items-center group relative overflow-hidden active:bg-white/5" :class="form.endDateStr === date.iso ? 'bg-pride-light/20 text-white font-bold border border-pride-light/30' : 'text-slate-300 hover:bg-white/10 border border-transparent'">
                           <div v-if="form.endDateStr === date.iso" class="absolute left-0 top-0 bottom-0 w-1 bg-pride-light"></div>
                           <span :class="{'pl-2': form.endDateStr === date.iso}">{{ date.labelLong }}</span>
                           <svg v-if="form.endDateStr === date.iso" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-pride-light">
                             <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12m13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                           </svg>
                         </button>
                       </div>
                    </div>
                  </Transition>
                </Teleport>
            </div>
          </div>
        </div>
        <p v-if="dateError" class="text-pride-red text-sm mt-2 font-medium bg-pride-red/10 border border-pride-red/30 rounded-lg px-3 py-2 inline-block shadow-lg">{{ dateError }}</p>
      </div>
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
import { startOfDay, addDays, isSaturday, isSunday, format, parseISO, eachDayOfInterval } from 'date-fns'
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
  endDateStr: '',
  isRange: false,
  timeSlot: '',
  location: '',
  reason: ''
})

const isCustomDateActive = ref(false)
const isEndCustomActive = ref(false)
const isCalendarOpen = ref(null) // null, 'start', or 'end'
const dateError = ref('')
const showNameHint = ref(false)

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
  form.value.endDateStr = ''
  form.value.isRange = false
  form.value.timeSlot = ''
  form.value.location = ''
  dateError.value = ''
  
  // Auto-set soccer location/slot
  if (sport === 'soccer') {
    form.value.location = 'Tlatelolco'
    form.value.timeSlot = '10:00 am - 11:00 am'
  }
}

const toggleRange = () => {
  form.value.isRange = !form.value.isRange
  if (!form.value.isRange) {
    form.value.endDateStr = ''
    isEndCustomActive.value = false
  }
  dateError.value = ''
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
      .select('name, date, end_date, time_slot')
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

const monthlyAbsencesStats = computed(() => {
  if (!form.value.name || !form.value.dateStr) return { past: 0, future: 0, total: 0 }
  
  const selectedDate = parseISO(form.value.dateStr)
  const selectedMonth = selectedDate.getMonth()
  const selectedYear = selectedDate.getFullYear()
  const lowerName = form.value.name.toLowerCase()
  
  let past = 0
  let future = 0
  
  absencesData.value.forEach(a => {
    if (a.name.toLowerCase() !== lowerName) return
    
    try {
      const start = parseISO(a.date)
      const end = a.endDate || a.end_date ? parseISO(a.endDate || a.end_date) : start
      const days = eachDayOfInterval({ start, end })
      
      days.forEach(day => {
        if (day.getMonth() === selectedMonth && day.getFullYear() === selectedYear) {
          if (isSaturday(day) || isSunday(day)) {
            if (isSessionPast(format(day, 'yyyy-MM-dd'), a.time_slot || a.timeSlot || '12:00 pm - 1:00 pm')) {
              past++
            } else {
              future++
            }
          }
        }
      })
    } catch (e) {
      console.error('Error calculating stats for absence:', a, e)
    }
  })
  
  return { past, future, total: past + future }
})

const pastMonthlyAbsencesCount = computed(() => monthlyAbsencesStats.value.past)
const futureMonthlyAbsencesCount = computed(() => monthlyAbsencesStats.value.future)
const totalMonthlyAbsencesCount = computed(() => monthlyAbsencesStats.value.total)

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

const quickEndDates = computed(() => {
  if (!form.value.dateStr) return []
  
  const dates = []
  let current = addDays(parseISO(form.value.dateStr), 1)
  
  while(dates.length < 5) {
    const allowed = form.value.sport === 'soccer' 
      ? isSaturday(current) 
      : (isSaturday(current) || isSunday(current))
      
    if (allowed) {
      const iso = format(current, 'yyyy-MM-dd')
      dates.push({
        iso,
        label: format(current, "EEE d MMM", { locale: es }).replace(/^\w/, c => c.toUpperCase())
      })
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
  isCalendarOpen.value = null
  dateError.value = ''
}

const selectEndDate = (iso) => {
  form.value.endDateStr = iso
  isEndCustomActive.value = false
  isCalendarOpen.value = null
  dateError.value = ''
}

const toggleCalendarPanel = (type) => {
  isCalendarOpen.value = isCalendarOpen.value === type ? null : type
}

const closeCalendarPanel = (type) => {
  if (isCalendarOpen.value === type) {
    isCalendarOpen.value = null
  }
}

const selectCustomDate = (iso, type) => {
  if (type === 'start') {
    form.value.dateStr = iso
    isCustomDateActive.value = true
  } else {
    form.value.endDateStr = iso
    isEndCustomActive.value = true
  }
  isCalendarOpen.value = null
  dateError.value = ''
}

// Form Submission
const submitForm = async () => {
  if (!form.value.dateStr) {
    dateError.value = 'Debes seleccionar una fecha'
    return
  }
  if (form.value.isRange && !form.value.endDateStr) {
    dateError.value = 'Debes seleccionar una fecha de fin'
    return
  }
  if (!form.value.timeSlot) {
    submitError.value = 'Debes seleccionar un horario'
    return
  }
  
  loading.value = true
  submitError.value = ''
  
  try {
    const formattedDate = form.value.isRange 
      ? form.value.dateStr 
      : form.value.dateStr

    const formattedReason = form.value.reason

    const submission = {
      name: form.value.name,
      date: formattedDate,
      endDate: form.value.isRange ? form.value.endDateStr : null,
      time_slot: form.value.timeSlot,
      location: form.value.location,
      reason: formattedReason,
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
    endDateStr: '',
    isRange: false,
    timeSlot: '',
    location: '',
    reason: ''
  }
  isCustomDateActive.value = false
  isEndCustomActive.value = false
  isCalendarOpen.value = null
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
