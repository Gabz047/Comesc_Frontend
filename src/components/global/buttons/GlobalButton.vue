<script setup>
defineProps({
  btnStyle: {
    type: String,
    default: "text-white size-auto rounded-full flex justify-center",
  },
  title: {
    type: String,
    default: "text-here",
  },
  extraDiv: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: 'mdi-chevron-right'
  },
  color_text: {
    type: String,
    default: 'text-white'
  },
  action: {
    type: Function,
    default: null,
    required: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
</script>
<template>
  <button
    :class="btnStyle"
    @click="action" 
    :disabled="disabled"
    
  >
    <span :class="`flex-1 font-normal text-md text-center ${color_text} p-1`">{{ title }}</span>
    <i
      v-if="extraDiv"
      :class="`mdi ${icon} flex items-center justify-center w-9 h-9 text-[#261D47] text-xl bg-white rounded-full`"
    ></i>
  </button>
</template>
