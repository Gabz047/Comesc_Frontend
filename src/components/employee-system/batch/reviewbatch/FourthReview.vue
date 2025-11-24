<script setup>
import { useBatchStore } from '@/stores';
const batchStore = useBatchStore()
</script>

<template>
  <!-- Mobile -->
  <div class="lg:hidden h-full w-full flex flex-col items-center pt-12 px-4">
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

  <!-- Desktop -->
  <div class="hidden lg:flex flex-col items-center justify-center py-12">
    <div class="max-w-4xl w-full">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold text-[#261D47] mb-2">Conclusão</h2>
        <p class="text-gray-600">Verifique se todas as informações estão corretas antes de prosseguir</p>
      </div>

      <div class="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <!-- Tipo do Problema -->
        <div class="mb-6">
          <label class="block text-sm font-semibold text-gray-700 mb-3">Tipo do Problema</label>
          <div class="bg-white rounded-xl p-4 border-2 border-[#261D47]/20">
            <span class="text-lg font-medium text-[#261D47]">
              {{ batchStore.stateProblems.typeProblems || 'Não informado' }}
            </span>
          </div>
        </div>

        <!-- Problemas Identificados -->
        <div class="mb-6">
          <label class="block text-sm font-semibold text-gray-700 mb-3">Problemas Identificados</label>
          <div class="bg-white rounded-xl p-4 border-2 border-[#261D47]/20">
            <div v-if="batchStore.stateProblems.problems.length > 0" class="flex flex-wrap gap-2">
              <span
                v-for="problem, i in batchStore.stateProblems.problems"
                :key="i"
                class="inline-flex items-center px-4 py-2 bg-[#261D47] text-white rounded-lg font-medium text-sm capitalize"
              >
                {{ problem }}
              </span>
            </div>
            <span v-else class="text-gray-500">Nenhum problema selecionado</span>
          </div>
        </div>

        <!-- Descrição -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-3">Descrição Detalhada</label>
          <div class="bg-white rounded-xl border-2 border-[#261D47]/20 overflow-hidden">
            <textarea
              class="w-full h-[280px] p-6 text-base text-gray-700 resize-none outline-none bg-transparent"
              placeholder="Rolo com quebra de agulha, porém o dano foi suave."
              readonly
              v-model="batchStore.stateProblems.description"
            ></textarea>
          </div>
          <div class="flex items-center justify-between mt-3 text-sm text-gray-500">
            <div class="flex items-center gap-2">
              <i class="mdi mdi-check-circle-outline"></i>
              <span>Informações prontas para confirmação</span>
            </div>
            <span>{{ batchStore.stateProblems.description?.length || 0 }} caracteres</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
