<script setup>
  defineProps({
    title: {
      type: String,
      default: 'Carregando...'
    }
  })
</script>
<template>
    <div class="fixed inset-0 z-[99999999] bg-[rgba(0,0,0,0.5)] flex flex-col gap-3 justify-center items-center">
        <div class="w-24 h-24 border-6 border-[#0059ff] border-t-transparent rounded-full animate-spin" ></div>
        <p class="text-white text-2xl">{{ title }}</p>
    </div>
</template>

