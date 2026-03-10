<template>
  <div class="w-full relative z-10 mb-12">
    
    <!-- ================= LIST VIEW ================= -->
    <div v-if="currentView === 'list'" class="space-y-6 animate-fade-in">
      <!-- Header with Action -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 class="text-2xl font-bold flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-pride-light">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
            </svg>
            Gestión de Descuentos
          </h2>
          <p class="text-sm text-slate-400 mt-1">Ver, añadir y editar los descuentos ofrecidos a los Sharkes</p>
        </div>
        <button @click="openForm()" class="w-full sm:w-auto glass-button !bg-pride-light/20 !border-pride-light hover:!bg-pride-light/30 text-white font-bold pride-glow flex gap-2 items-center justify-center p-3 sm:px-4 sm:py-2.5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nuevo Descuento
        </button>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="glass-panel p-4 text-left border-t-2 border-t-pride-light relative overflow-hidden">
          <div class="absolute -right-4 -bottom-4 opacity-5">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-24 h-24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
          </div>
          <p class="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Total Cupones</p>
          <p class="text-3xl sm:text-4xl font-black text-white">{{ discounts.length }}</p>
        </div>
        <div class="glass-panel p-4 text-left border-t-2 border-t-pride-green relative overflow-hidden">
           <div class="absolute -right-4 -bottom-4 opacity-5">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-24 h-24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
          </div>
          <p class="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Ofertas Activas</p>
          <p class="text-3xl sm:text-4xl font-black text-white">{{ activeCount }}</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="py-16 flex justify-center">
          <div class="w-10 h-10 rounded-full border-4 border-pride-light border-t-transparent animate-spin"></div>
      </div>
      
      <!-- Cards View for Mobile / Tables for Desktop -->
      <div v-else class="glass-panel overflow-hidden border border-white/10 shadow-2xl">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[600px] hidden sm:table">
            <thead>
              <tr class="bg-slate-900/60 border-b border-white/10 text-xs uppercase tracking-wider text-slate-400 font-semibold">
                <th class="p-4 pl-6">Cupón</th>
                <th class="p-4">Negocio</th>
                <th class="p-4">Vigencia</th>
                <th class="p-4">Imagen</th>
                <th class="p-4 pr-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5" v-if="discounts.length">
              <tr v-for="d in discounts" :key="d.id" class="hover:bg-white/5 transition group">
                <td class="p-4 pl-6">
                    <p class="font-bold text-pride-light text-sm">{{ d.title }}</p>
                    <p class="text-xs text-slate-400 mt-1 max-w-[150px] truncate" :title="d.description">{{ d.description }}</p>
                </td>
                <td class="p-4">
                    <p class="font-medium text-sm">{{ d.business_name }}</p>
                    <p v-if="d.location" class="text-xs text-slate-400 mt-0.5">{{ d.location }}</p>
                </td>
                <td class="p-4">
                    <span v-if="d.is_indefinite" class="px-2 py-1 rounded inline-flex text-[10px] font-black uppercase tracking-tight bg-pride-green/20 text-pride-green border border-pride-green/30">
                        Indefinido
                    </span>
                    <div v-else class="text-xs font-medium space-y-0.5">
                        <p v-if="d.start_date" class="text-slate-300">Del: {{ d.start_date }}</p>
                        <p v-if="d.end_date" :class="isExpired(d.end_date) ? 'text-pride-red font-bold' : 'text-slate-300'">Al: {{ d.end_date }} <span v-if="isExpired(d.end_date)">(Expirado)</span></p>
                    </div>
                </td>
                <td class="p-4">
                    <div class="w-12 h-12 rounded-lg overflow-hidden bg-slate-800 border border-white/10 flex items-center justify-center">
                         <img v-if="d.image_url" :src="d.image_url" class="w-full h-full object-cover" />
                         <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-slate-600">
                             <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                         </svg>
                    </div>
                </td>
                <td class="p-4 pr-6 text-right w-36 relative">
                    <div class="flex justify-end gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 transition-opacity">
                        <button @click="openForm(d)" class="p-2.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition" title="Editar">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                             </svg>
                        </button>
                        
                         <button 
                          v-if="deletingId !== d.id"
                          @click="deletingId = d.id"
                          class="p-2.5 text-slate-500 hover:text-pride-red hover:bg-pride-red/10 rounded-xl transition opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
                          title="Eliminar"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                        
                        <div v-else class="flex items-center bg-slate-900 border border-pride-red rounded-xl p-1 absolute right-6 top-1/2 -translate-y-1/2 shadow-lg z-10 w-[150px] justify-between">
                        <span class="text-xs font-bold text-pride-red ml-2 leading-none">¿Seguro?</span>
                        <div class="flex gap-1 pr-1">
                          <button @click="confirmDelete(d.id)" class="px-2.5 py-1.5 bg-pride-red text-white text-xs font-bold rounded-lg" :disabled="isSaving">Sí</button>
                          <button @click="deletingId = null" class="px-2.5 py-1.5 bg-slate-700 text-white text-xs font-bold rounded-lg" :disabled="isSaving">No</button>
                        </div>
                      </div>
                    </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="5" class="p-16 text-center text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 opacity-30 mb-4 mx-auto">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <p class="text-lg">No hay descuentos registrados.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Mobile List View -->
        <div class="sm:hidden block divide-y divide-white/5" v-if="discounts.length">
           <div v-for="d in discounts" :key="d.id" class="p-5 flex flex-col gap-4 group">
              <div class="flex justify-between items-start">
                 <div class="flex gap-4 items-center">
                   <div class="w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-slate-800 border border-white/10 shadow-inner">
                      <img v-if="d.image_url" :src="d.image_url" class="w-full h-full object-cover" />
                      <div v-else class="w-full h-full flex items-center justify-center opacity-30">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
                      </div>
                   </div>
                   <div>
                      <h4 class="font-bold text-pride-light line-clamp-1 text-lg leading-tight">{{ d.title }}</h4>
                      <p class="text-sm text-slate-300 mt-0.5">{{ d.business_name }}</p>
                   </div>
                 </div>
              </div>
              <p class="text-sm text-slate-400 line-clamp-2 leading-relaxed bg-slate-900/40 p-3 rounded-lg border border-white/5">{{ d.description }}</p>
              
              <div class="flex flex-wrap justify-between items-center mt-1 border-t border-white/5 pt-4 gap-4">
                 <div>
                   <span v-if="d.is_indefinite" class="px-2.5 py-1.5 rounded-lg inline-flex text-xs font-black uppercase tracking-tight bg-pride-green/20 text-pride-green border border-pride-green/30">
                        Vigencia Indefinida
                    </span>
                    <div v-else class="text-xs font-medium space-y-1">
                        <p v-if="d.end_date" :class="isExpired(d.end_date) ? 'text-pride-red font-bold' : 'text-slate-300'">
                          Válido hasta: <span class="bg-slate-800 px-2 py-1 rounded">{{ d.end_date }}</span>
                        </p>
                    </div>
                 </div>
                 <div class="flex gap-2 relative w-full sm:w-auto">
                    <button @click="openForm(d)" class="flex-1 sm:flex-none p-3 text-slate-200 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-xl font-bold text-sm transition text-center shadow-md">
                         Editar
                    </button>
                    <button v-if="deletingId !== d.id" @click="deletingId = d.id" class="p-3 text-pride-red bg-pride-red/10 border border-pride-red/20 rounded-xl font-bold text-sm transition px-4">
                         Borrar
                    </button>
                    <div v-else class="w-full sm:w-auto flex items-center bg-slate-900 border border-pride-red rounded-xl p-1 absolute inset-0 z-10 justify-between shadow-xl">
                        <span class="text-xs font-bold text-pride-red ml-3">¿Confirmar?</span>
                        <div class="flex gap-1.5 pr-1">
                          <button @click="confirmDelete(d.id)" class="px-4 py-2 bg-pride-red text-white text-xs font-bold rounded-lg" :disabled="isSaving">Sí</button>
                          <button @click="deletingId = null" class="px-4 py-2 bg-slate-700 text-white text-xs font-bold rounded-lg" :disabled="isSaving">No</button>
                        </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
        <div v-else class="sm:hidden p-12 text-center text-slate-400">
           <p class="text-lg">No hay descuentos.</p>
        </div>
      </div>
    </div>


    <!-- ================= FORM VIEW (Full Screen Sub-View) ================= -->
    <div v-else-if="currentView === 'form'" class="animate-fade-in bg-slate-900/80 backdrop-blur-3xl border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] rounded-[2rem] overflow-hidden mt-6 mb-12 sm:mt-0 max-w-4xl mx-auto">
        
        <!-- Header -->
        <div class="bg-slate-800/80 p-5 sm:p-6 sm:px-8 border-b border-white/10 flex justify-between items-center sticky top-0 z-20 backdrop-blur-xl">
           <div class="flex items-center gap-4">
              <button 
                @click="currentView = 'list'" 
                class="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-white/10 hover:bg-slate-800 hover:border-white/20 transition-all active:scale-95 group shadow-lg"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-4 h-4 text-slate-400 group-hover:text-white group-hover:-translate-x-0.5 transition-all">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                 </svg>
                 <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white whitespace-nowrap">Volver</span>
              </button>
              <h3 class="text-xl sm:text-2xl font-black text-white">{{ editingId ? 'Editar Descuento' : 'Crear Descuento' }}</h3>
           </div>
        </div>
        
        <!-- Form Body -->
        <form @submit.prevent="saveDiscount" class="p-6 sm:p-8 space-y-8">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Left Column: Details -->
              <div class="space-y-6">
                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Atajo o Título del Cupón <span class="text-pride-red">*</span></label>
                  <input v-model="form.title" type="text" required class="glass-input !bg-slate-950/50 !p-4 !text-lg" placeholder="ej. 20% OFF en Llantas" :disabled="isSaving" />
                </div>

                <div class="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
                     <div>
                        <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Negocio Padrino <span class="text-pride-red">*</span></label>
                        <input v-model="form.business_name" type="text" required class="glass-input !bg-slate-950/50 !p-4" placeholder="ej. Ópticas Ver Claro" :disabled="isSaving" />
                     </div>
                     <div>
                        <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Ubicación</label>
                        <input v-model="form.location" type="text" class="glass-input !bg-slate-950/50 !p-4" placeholder="ej. Roma o CDMX" :disabled="isSaving" />
                     </div>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Descripción de la Oferta <span class="text-pride-red">*</span></label>
                  <textarea v-model="form.description" required rows="4" class="glass-input !bg-slate-950/50 !p-4 resize-none !rounded-2xl leading-relaxed" placeholder="Explica detalladamente en qué consiste el descuento y qué se necesita para hacerlo válido." :disabled="isSaving"></textarea>
                </div>
              </div>

              <!-- Right Column: Settings and Image -->
              <div class="space-y-6">
                 <!-- Vigencia Block -->
                 <div class="p-5 bg-slate-800/60 border border-white/5 shadow-inner rounded-3xl space-y-5">
                     <div class="flex items-center justify-between">
                         <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-0 ml-1">Vigencia</label>
                           <label class="flex items-center cursor-pointer p-2.5 bg-slate-900 border border-white/10 rounded-xl hover:border-white/20 transition-all flex-shrink-0 group">
                             <div class="relative">
                               <input type="checkbox" v-model="form.is_indefinite" class="sr-only" :disabled="isSaving" />
                               <div class="block w-11 h-6 rounded-full transition-colors duration-300" :class="form.is_indefinite ? 'bg-pride-green shadow-[0_0_15px_rgba(0,128,38,0.4)]' : 'bg-slate-700'"></div>
                               <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-lg" :class="{'translate-x-5': form.is_indefinite, 'scale-110': form.is_indefinite}"></div>
                             </div>
                             <div class="ml-3 text-[10px] font-black uppercase tracking-widest transition-colors duration-300" :class="form.is_indefinite ? 'text-pride-green' : 'text-slate-400 group-hover:text-slate-300'">Indefinido</div>
                           </label>
                     </div>
                     
                     <Transition name="fade">
                      <div v-show="!form.is_indefinite" class="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                          <div>
                              <label class="block text-xs font-bold text-slate-500 mb-2 ml-1">Fecha Inicio</label>
                              <!-- color-scheme: dark ensures native picker looks great -->
                              <input v-model="form.start_date" type="date" style="color-scheme: dark;" class="glass-input !bg-slate-950/80 !p-3 !text-sm w-full" :required="!form.is_indefinite" :disabled="isSaving" />
                          </div>
                          <div>
                              <label class="block text-xs font-bold text-slate-500 mb-2 ml-1">Fecha Término</label>
                              <input v-model="form.end_date" type="date" style="color-scheme: dark;" class="glass-input !bg-slate-950/80 !p-3 !text-sm w-full" :required="!form.is_indefinite" :disabled="isSaving" />
                          </div>
                      </div>
                     </Transition>
                </div>

                <!-- Image Uploader -->
                <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Banner Principal / Promoción</label>
                    <div class="mt-1 flex justify-center border-2 border-slate-700 hover:border-pride-light border-dashed rounded-[2rem] transition-colors cursor-pointer relative group flex-col items-center shadow-inner overflow-hidden" :class="{ 'bg-slate-800/60 min-h-[180px]': !previewImage && !form.image_url, 'border-solid p-0 aspect-[16/9]': previewImage || form.image_url }">
                       
                       <input type="file" @change="handleImageUpload" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" :disabled="isSaving" />
                       
                       <div v-if="!previewImage && !form.image_url" class="space-y-3 text-center py-8 px-6">
                            <div class="w-16 h-16 mx-auto bg-slate-900 rounded-full flex items-center justify-center border border-white/5 shadow-lg group-hover:scale-110 transition-transform">
                              <svg class="h-8 w-8 text-slate-500 group-hover:text-pride-light transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                            </div>
                            <p class="text-base font-bold text-pride-light">Toca para subir una imagen</p>
                            <p class="text-xs text-slate-400 font-medium">Archivos admitidos: JPG, PNG • Máx 5MB</p>
                       </div>
                       <div v-else class="relative w-full h-full bg-black flex items-center justify-center">
                            <img :src="previewImage || form.image_url" class="w-full h-full object-cover" />
                            <div class="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none backdrop-blur-sm">
                               <span class="text-white font-bold bg-slate-800 border border-white/10 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
                                  Pulse para Cambiar
                               </span>
                            </div>
                       </div>
                    </div>
                </div>
              </div>
            </div>

            <!-- Full-width sticky/fixed action footer for mobile friendliness -->
            <div class="pt-6 sm:pt-8 mt-4 border-t border-white/5 flex flex-col sm:flex-row justify-end gap-4">
                <button type="button" @click="currentView = 'list'" class="w-full sm:w-auto px-6 py-4 sm:py-3.5 rounded-xl text-sm font-bold text-slate-300 bg-slate-800 hover:text-white hover:bg-slate-700 transition" :disabled="isSaving">
                    Cancelar
                </button>
                <button type="submit" class="w-full sm:w-auto glass-button !bg-pride-light text-white font-bold py-4 sm:py-3.5 px-10 shadow-[0_10px_30px_rgba(91,206,250,0.4)] transition flex items-center justify-center uppercase text-sm tracking-widest hover:!bg-pride-light" :disabled="isSaving">
                    <span v-if="!isSaving">{{ editingId ? 'Guardar Cambios' : 'Activar Descuento' }}</span>
                    <div v-else class="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                </button>
            </div>
        </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
const insforge = useInsforge()

const discounts = ref([])
const loading = ref(true)
const currentView = ref('list') // View states: 'list' | 'form'
const isSaving = ref(false)
const editingId = ref(null)
const deletingId = ref(null)
const previewImage = ref(null)
const imageFile = ref(null)

const initialForm = {
    title: '',
    business_name: '',
    location: '',
    description: '',
    image_url: null,
    start_date: '',
    end_date: '',
    is_indefinite: true
}

const form = ref({ ...initialForm })

const fetchData = async () => {
    loading.value = true
    try {
        const { data, error } = await insforge.database
           .from(getTableName('discounts'))
           .select('*')
           .order('created_at', { ascending: false })
           
        if (error) throw error
        discounts.value = data || []
    } catch(err) {
        console.error('Fetch error:', err)
    } finally {
        loading.value = false
    }
}

const isExpired = (endDateStr) => {
    if (!endDateStr) return false
    const today = new Date().toISOString().split('T')[0]
    return endDateStr < today
}

const activeCount = computed(() => {
    return discounts.value.filter(d => d.is_indefinite || !isExpired(d.end_date)).length
})

const openForm = (item = null) => {
    if (item) {
        editingId.value = item.id
        form.value = { ...item }
    } else {
        editingId.value = null
        form.value = { ...initialForm }
    }
    previewImage.value = null
    imageFile.value = null
    currentView.value = 'form'
    
    // Auto-scroll to top to ensure clean UX
    if(import.meta.client) {
       window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return
    imageFile.value = file

    const reader = new FileReader()
    reader.onload = (e) => {
        previewImage.value = e.target.result // Create a fast visual preview
    }
    reader.readAsDataURL(file)
}

const saveDiscount = async () => {
    isSaving.value = true
    try {
        if (!editingId.value && !imageFile.value) {
            throw new Error('Debe subir una imagen para el cupón obligatorio.');
        }

        // Upload image if selected
        let finalImageUrl = form.value.image_url
        if (imageFile.value) {
            const fileExt = imageFile.value.name.split('.').pop()
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
            const safeFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
            
            const { data, error } = await insforge.storage
               .from(getTableName('discounts'))
               .upload(`images/${safeFileName}`, imageFile.value)
               
            if (error) throw error
            finalImageUrl = data.url
        } else if (!finalImageUrl) {
            throw new Error('Debe subir una imagen para el cupón obligatorio.');
        }

        const payload = {
            title: form.value.title,
            business_name: form.value.business_name,
            location: form.value.location,
            description: form.value.description,
            start_date: form.value.is_indefinite ? null : form.value.start_date,
            end_date: form.value.is_indefinite ? null : form.value.end_date,
            is_indefinite: form.value.is_indefinite,
            image_url: finalImageUrl
        }

        if (editingId.value) {
            const { error } = await insforge.database
                .from(getTableName('discounts'))
                .update(payload)
                .eq('id', editingId.value)
            if (error) throw error
        } else {
             const { error } = await insforge.database
                .from(getTableName('discounts'))
                .insert(payload)
             if (error) throw error
        }
        await fetchData()
        currentView.value = 'list' // Return to list view
    } catch(err) {
        alert(err.message || 'Error al guardar descuento')
        console.error(err)
    } finally {
        isSaving.value = false
    }
}

const confirmDelete = async (id) => {
    isSaving.value = true
    try {
        const { error } = await insforge.database
            .from(getTableName('discounts'))
            .delete()
            .eq('id', id)
            
        if (error) throw error
        discounts.value = discounts.value.filter(d => d.id !== id)
    } catch(err) {
        console.error(err)
        alert('Error eliminando cupón')
    } finally {
        isSaving.value = false
        deletingId.value = null
    }
}

onMounted(() => {
    fetchData()
})
</script>
