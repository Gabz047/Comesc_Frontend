<script setup>
import { useBatchStore } from '@/stores';
const batchStore = useBatchStore()
</script>

<template>
  <div class="h-full w-full flex flex-col items-center pt-12 px-4">
    <span class="block text-3xl font-semibold text-center mb-2">Conclusão</span>
    <span class="block text-base text-center text-gray-700 mb-8"
      >Verifique se as informações estão <br>corretas</span
    >
    <div class="w-full max-w-[340px] flex flex-col gap-4">
      <div class="flex flex-row justify-between items-center">
        <span class="font-medium">Tipo do Problema:</span>
        <span class="text-[#261D47]">{{ batchStore.stateProblems.typeProblems }}</span>
      </div>
      <div class="flex flex-row justify-between items-center">
        <span class="font-medium">Problemas:</span>
        <span class="text-[#261D47]" v-for="problem, i in batchStore.stateProblems.problems" :key="i">{{problem}}</span>
      </div>
      <div class="flex flex-col">
        <span class="font-medium mb-2">Descrição:</span>
        <div class="w-full">
          <textarea
            class="w-full h-[220px] bg-gray-200 rounded-xl p-4 text-base text-gray-500 resize-none outline-none"
            placeholder="Rolo com quebra de agulha, porém o dano foi suave."
            readonly
            v-model="batchStore.stateProblems.description"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
