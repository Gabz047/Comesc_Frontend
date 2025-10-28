<script setup>
defineEmits(["click"]);

const props = defineProps({
  btnStyle: {
    type: String,
    default: "text-white size-auto rounded-full flex justify-center items-center gap-2",
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
    default: "mdi-chevron-right",
  },
  color_text: {
    type: String,
    default: "text-white",
  },
  action: {
    type: Function,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <!-- botão simples, 100% controlado pelo pai -->
  <button
    :disabled="disabled"
    :class="[
      btnStyle,
      disabled ? 'opacity-50 cursor-not-allowed' : '',
    ]"
    @click="!disabled && action?.()"
  >
    <span :class="`font-normal text-md text-center ${color_text}`">
      {{ title }}
    </span>

    <i
      v-if="extraDiv"
      :class="`mdi ${icon} w-9 h-9 flex items-center justify-center text-[#261D47] text-xl bg-white rounded-full`"
    ></i>
  </button>
</template>
