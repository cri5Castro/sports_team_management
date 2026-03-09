<template>
  <div class="flex gap-2">
    <div v-for="(unit, index) in timeUnits" :key="unit.label" class="flex flex-col items-center">
      <div 
        class="w-12 h-12 md:w-14 md:h-14 rounded-xl flex flex-col items-center justify-center border border-white/10 shadow-lg transition-transform hover:scale-105"
        :style="{ 
          background: `linear-gradient(135deg, ${unit.color}20, ${unit.color}05)`,
          borderColor: `${unit.color}40`
        }"
      >
        <span class="text-lg md:text-xl font-black text-white leading-tight">{{ unit.value }}</span>
        <span class="text-[8px] md:text-[9px] uppercase font-black tracking-tighter" :style="{ color: unit.color }">{{ unit.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { parseISO, differenceInSeconds } from 'date-fns'

const props = defineProps({
  targetDate: {
    type: String,
    required: true
  }
})

const now = ref(new Date())
let timer = null

const updateNow = () => {
  now.value = new Date()
}

onMounted(() => {
  timer = setInterval(updateNow, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const timeLeft = computed(() => {
  const target = parseISO(props.targetDate)
  const diff = differenceInSeconds(target, now.value)
  
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  
  return {
    days: Math.floor(diff / (24 * 3600)),
    hours: Math.floor((diff % (24 * 3600)) / 3600),
    minutes: Math.floor((diff % 3600) / 60),
    seconds: diff % 60
  }
})

const timeUnits = computed(() => [
  { label: 'Días', value: timeLeft.value.days, color: '#E40303' }, // Pride Red
  { label: 'Hrs', value: timeLeft.value.hours, color: '#FF8C00' }, // Pride Orange
  { label: 'Min', value: timeLeft.value.minutes, color: '#008026' }, // Pride Green
  { label: 'Seg', value: timeLeft.value.seconds, color: '#5BCEFA' }  // Pride Light Blue
])
</script>
