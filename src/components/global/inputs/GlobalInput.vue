<script setup>
import Image from '@/assets/images/image.png'

defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  class_input: {
    type: String,
    default: ''
  },
  showimg: {
    type: String,
    default: ''
  },
  media: {
    type: Boolean,
    default: false
  },
  select: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array,
    default: () => []
  },
  type: {
    type: String,
    default: 'text' // 👈 novo aqui
  }
})

const model = defineModel('value')
</script>

<template>
  <!-- Input padrão -->
  <div class="flex flex-col gap-2" v-if="!media && !select">
    <label v-if="label" class="text-xl ms-1">{{ label }}</label>
    <input
      :type="type" 
      :placeholder="placeholder"
      :class="class_input"
      v-model="model"
    />
  </div>

  <!-- Input tipo arquivo -->
  <div v-else-if="media" class="flex flex-col justify-center items-center gap-2">
    <label
      for="media"
      class="border border-dotted border-[#261D47] flex rounded-2xl w-2/3 gap-3 flex-col justify-center items-center p-5 cursor-pointer hover:bg-[#f8f8ff]"
    >
      <img :src="showimg ? showimg : Image" class="max-h-32 object-contain" />
      <p class="text-[#261D47]" v-if="!showimg">PNG, JPEG, JPG</p>
    </label>
    <p class="text-[#261D47] text-sm">Selecionar mídia</p>
    <input
      type="file"
      id="media"
      class="hidden"
      @change="$emit('showImg', $event)"
    />
  </div>

  <!-- Select -->
  <div v-else-if="select" class="flex flex-col gap-2">
    <label v-if="label" class="text-xl ms-1">{{ label }}</label>
    <select
      v-model="model"
      :class="class_input"
      :placeholder="placeholder"
    >
      <option value="" disabled selected hidden>{{ placeholder }}</option>
      <option
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
      >
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>
