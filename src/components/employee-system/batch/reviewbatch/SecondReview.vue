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
  batchStore.stateProblems.problems.push(option)
}
</script>

<template>
  <div class="h-full w-full mt-12">
    <div class="flex flex-col w-full gap-6 h-[30%]">
      <span
        class="block text-2xl font-medium text-center leading-tight whitespace-normal break-words"
      >
        Qual o tipo do<br />problema?
      </span>
      <div class="grid grid-cols-2 gap-1 w-full justify-items-center place-items-center">
        <button
          v-for="(option, index) in options"
          :key="option"
          @click="selectOption(option)"
          :class="[
            'w-[50px]  py-2 rounded-full border transition min-w-[120px]',
            batchStore.stateProblems.typeProblems === option
              ? 'bg-[#261D47] text-white border-none'
              : 'bg-white text-black border border-[#261D47]',
            index === 2 ? 'col-span-2 justify-self-center' : '',
          ]"
        >
          {{ option }}
        </button>
      </div>
    </div>
    <div
      class="grid grid-cols-2 w-full h-[70%] p-4 justify-items-center place-items-center"
    >
      <button
        v-for="(option, index) in otherOptions"
        :key="option"
        class="flex flex-col justify-around w-[150px] h-[150px] p-2 border-black border-1"
        @click="selectOtherOption(option)"
        :class="[
          'w-[50px] py-2 rounded-xl border text-sm transition min-w-[120px]',
          batchStore.stateProblems.problems.includes(option)
            ? 'bg-[#261D47] text-white border-none'
            : 'bg-white text-black border border-[#261D47]',
        ]"
      >
      <i :class="mdiList[index]" class="text-5xl"></i>
        {{ option }}
      </button>
    </div>
  </div>
</template>
