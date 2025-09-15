<script setup>
import { useBatchStore } from '@/stores';

const batchStore = useBatchStore()
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-start pt-12 gap-12">
    <span class="block text-2xl font-semibold text-center leading-tight"
      >Descreva o<br />problema</span
    >
    <textarea
      class="w-full max-w-[340px] h-[500px] bg-gray-200 rounded-xl p-4 text-base text-gray-500 resize-none outline-none"
      placeholder="Descreva em detalhes o problema aqui..."
      v-model="batchStore.stateProblems.description"
    ></textarea>
  </div>
</template>
