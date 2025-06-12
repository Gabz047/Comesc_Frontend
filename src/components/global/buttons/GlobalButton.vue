<script setup>
defineEmits(["click"]);
defineProps({
  btnStyle: {
    type: String,
    default: "text-white size-auto rounded-full",
  },
  title: {
    type: String,
    default: "text-here",
  },
  extraDiv: {
    type: Boolean,
    default: true,
  },
  action: {
    type: Function,
  }
});
</script>
<template>
  <button
    :class="btnStyle"
    @click="action"
  >
    <span class="flex-1 font-normal text-lg text-center text-white p-1">{{ title }}</span>
    <i
      v-if="extraDiv"
      class="mdi mdi-chevron-right flex items-center justify-center w-9 h-9 text-[#261D47] text-3xl bg-white rounded-full"
    ></i>
  </button>

  <!--
  <GlobalButton :btnStyle="['']" title="Proximo passo" :extraDiv="true" /
  -->
</template>
