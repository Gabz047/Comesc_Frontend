<script setup>
import { useBatchStore } from '@/stores';
const batchStore = useBatchStore()
</script>

<template>
  <!-- Mobile -->
  <div class="lg:hidden h-full w-full flex flex-col items-center justify-start pt-8 gap-6 px-4">
    <h2 class="text-2xl font-bold text-center text-[#261D47]">
      Descreva o<br />problema
    </h2>
    <textarea
      class="w-full h-[400px] bg-gray-100 border-2 border-gray-300 rounded-2xl p-4 text-base text-gray-700 resize-none outline-none focus:border-[#261D47] transition-colors"
      placeholder="Descreva em detalhes o problema aqui..."
      v-model="batchStore.stateProblems.description"
    ></textarea>
  </div>

  <!-- Desktop -->
  <div class="hidden lg:flex flex-col items-center justify-center py-12">
    <div class="max-w-3xl w-full">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-[#261D47] mb-2">Descreva o problema</h2>
        <p class="text-gray-600">Forneça o máximo de detalhes possível</p>
      </div>

      <div class="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <textarea
          class="w-full h-[400px] bg-white border-2 border-gray-300 rounded-xl p-6 text-base text-gray-700 resize-none outline-none focus:border-[#261D47] focus:ring-4 focus:ring-[#261D47]/10 transition-all"
          placeholder="Descreva em detalhes o problema identificado...&#10;&#10;Exemplo: Foram encontradas múltiplas manchas de óleo no rolo nº 5, localizadas principalmente na região central do tecido. As manchas variam de 2 a 5cm de diâmetro."
          v-model="batchStore.stateProblems.description"
        ></textarea>

        <div class="flex items-center justify-between mt-4 text-sm text-gray-500">
          <div class="flex items-center gap-2">
            <i class="mdi mdi-information-outline"></i>
            <span>Seja o mais detalhado possível</span>
          </div>
          <span>{{ batchStore.stateProblems.description?.length || 0 }} caracteres</span>
        </div>
      </div>
    </div>
  </div>
</template>
