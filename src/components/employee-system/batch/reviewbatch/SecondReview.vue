<script setup>
import { useBatchStore } from "@/stores";
const batchStore = useBatchStore()

const options = ["Malharia", "Tinturaria", "Ambos"];
function selectOption(option) {
  batchStore.stateProblems.typeProblems = option;
}

const otherOptions = ["quebra de agulha", "manchas de oleo", "tecido rasgado", "cor"];
const mdiList = ["mdi mdi-needle", "mdi mdi-oil", "mdi mdi-scissors-cutting", "mdi mdi-palette"];

function selectOtherOption(option) {
  if (batchStore.stateProblems.problems.includes(option)) {
    const index = batchStore.stateProblems.problems.indexOf(option);
    if (index > -1) {
      batchStore.stateProblems.problems.splice(index, 1);
    }
    return;
  }
  batchStore.stateProblems.problems.push(option)
}
</script>

<template>
  <!-- Mobile -->
  <div class="lg:hidden h-full w-full mt-8">
    <div class="flex flex-col w-full gap-6 mb-8">
      <h2 class="text-2xl font-bold text-center text-[#261D47]">
        Qual o tipo do<br />problema?
      </h2>
      <div class="grid grid-cols-2 gap-3 w-full px-4">
        <button
          v-for="(option, index) in options"
          :key="option"
          @click="selectOption(option)"
          :class="[
            'py-3 rounded-xl border-2 transition-all font-medium',
            batchStore.stateProblems.typeProblems === option
              ? 'bg-[#261D47] text-white border-[#261D47] shadow-lg scale-105'
              : 'bg-white text-gray-700 border-gray-300 hover:border-[#261D47]',
            index === 2 ? 'col-span-2' : '',
          ]"
        >
          {{ option }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3 w-full px-4">
      <button
        v-for="(option, index) in otherOptions"
        :key="option"
        class="flex flex-col justify-center items-center gap-3 h-[140px] rounded-2xl border-2 transition-all"
        @click="selectOtherOption(option)"
        :class="[
          batchStore.stateProblems.problems.includes(option)
            ? 'bg-[#261D47] text-white border-[#261D47] shadow-lg'
            : 'bg-white text-gray-700 border-gray-300 hover:border-[#261D47]',
        ]"
      >
        <i :class="mdiList[index]" class="text-5xl"></i>
        <span class="text-sm font-medium text-center px-2">{{ option }}</span>
      </button>
    </div>
  </div>

  <!-- Desktop -->
  <div class="hidden lg:block w-full py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Type Selection -->
      <div class="mb-12">
        <h2 class="text-3xl font-bold text-center text-[#261D47] mb-8">
          Qual o tipo do problema?
        </h2>
        <div class="flex gap-4 justify-center">
          <button
            v-for="option in options"
            :key="option"
            @click="selectOption(option)"
            :class="[
              'px-8 py-4 rounded-xl border-2 transition-all font-semibold text-lg min-w-[180px]',
              batchStore.stateProblems.typeProblems === option
                ? 'bg-[#261D47] text-white border-[#261D47] shadow-xl scale-105'
                : 'bg-white text-gray-700 border-gray-300 hover:border-[#261D47] hover:scale-102',
            ]"
          >
            {{ option }}
          </button>
        </div>
      </div>

      <!-- Problem Selection -->
      <div>
        <h3 class="text-xl font-semibold text-center text-gray-700 mb-6">
          Selecione os problemas identificados
        </h3>
        <div class="grid grid-cols-4 gap-6">
          <button
            v-for="(option, index) in otherOptions"
            :key="option"
            class="flex flex-col justify-center items-center gap-4 h-[200px] rounded-2xl border-2 transition-all group"
            @click="selectOtherOption(option)"
            :class="[
              batchStore.stateProblems.problems.includes(option)
                ? 'bg-[#261D47] text-white border-[#261D47] shadow-xl scale-105'
                : 'bg-white text-gray-700 border-gray-300 hover:border-[#261D47] hover:shadow-lg hover:scale-102',
            ]"
          >
            <div
              :class="[
                'w-20 h-20 rounded-full flex items-center justify-center transition-all',
                batchStore.stateProblems.problems.includes(option)
                  ? 'bg-white/20'
                  : 'bg-gray-100 group-hover:bg-[#261D47]/10',
              ]"
            >
              <i :class="mdiList[index]" class="text-5xl"></i>
            </div>
            <span class="text-base font-medium text-center px-3 capitalize">{{ option }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
