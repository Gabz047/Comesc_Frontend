<script setup>
import { onMounted, ref } from "vue";
import { useBatchStore } from "@/stores";
import { useRoute } from "vue-router";
const batchStore = useBatchStore();
const route = useRoute()

const {id} = route.params

import Menu from "@/components/employee-system/layouts/HeaderDefault.vue";

import FirstReview from "@/components/employee-system/batch/reviewbatch/FirstReview.vue";
import SecondReview from "@/components/employee-system/batch/reviewbatch/SecondReview.vue";
import ThirdReview from "@/components/employee-system/batch/reviewbatch/ThirdReview.vue";
import FourthReview from "@/components/employee-system/batch/reviewbatch/FourthReview.vue";
import Conclusion from "@/components/employee-system/batch/reviewbatch/ReviewConclusion.vue";
import GlobalButton from "@/components/global/buttons/GlobalButton.vue";

const steps = [FirstReview, SecondReview, ThirdReview, FourthReview, Conclusion];
const currentReview = ref(0);

async function FinalReview(param){
  if(param === 'concluir'){
    batchStore.batchById.status = 'com defeito'
  }
  else{
    batchStore.batchById.status = 'em estoque'
  }
  await batchStore.UpdateBatch(batchStore.batchById)
}

const navigateSteps = (type) => {
console.log('chegou')
  console.log(currentReview.value)
  if (type === 'next' && currentReview.value < steps.length - 1) {
    currentReview.value++;
  } else if (type === 'back' && currentReview.value > 0) {
    currentReview.value--;
  }
}

onMounted(async () => {
  await batchStore.GetBatchById(id * 1)
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Menu />

    <!-- Mobile Layout -->
    <div class="lg:hidden flex flex-col h-[calc(100vh-64px)]">
      <div class="w-full py-4 flex flex-col items-center justify-center bg-white shadow-sm">
        <div class="text-center">
          <p class="text-sm text-gray-600 mb-1">Rolos com defeito</p>
          <div class="text-2xl font-bold text-[#261D47]">
            {{ batchStore.batchById.nonconformity_rolls }}
          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-col justify-center items-center p-4 overflow-y-auto">
        <component
          :is="steps[currentReview]"
          :nonconformity_rolls="batchStore.batchById.nonconformity_rolls"
          @RelatedProblem="currentReview++"
          @FinalReview="FinalReview"
        />
      </div>

      <div class="bg-white border-t border-gray-200 shadow-lg pb-safe">
        <div v-if="currentReview > 0" class="p-4">
          <div
            v-if="currentReview >= 1 && currentReview <= 3"
            class="flex justify-center items-center gap-2 mb-4"
          >
            <div
              v-for="idx in [1, 2, 3]"
              :key="idx"
              :class="[
                'w-3 h-3 rounded-full transition-all',
                currentReview === idx ? 'bg-[#261D47] w-8' : 'bg-gray-300',
              ]"
            ></div>
          </div>

          <div v-if="currentReview < 4" class="flex gap-3 w-full justify-center items-center ">
            <GlobalButton
              :title="'Voltar'"
              color_text="text-[#261D47]"
              :btnStyle="'bg-white border-2 w-48 border-[#261D47] text-[#261D47] flex-1 h-12 rounded-xl font-semibold hover:bg-gray-50 transition-colors'"
              :action="() => navigateSteps('back')"
            />
            <GlobalButton
              :title="'Próximo'"
              :btnStyle="'bg-[#261D47] text-white w-48 flex-1 h-12 rounded-xl font-semibold hover:bg-[#3d2d5f] transition-colors'"
              :action="() => navigateSteps('next')"
            />
          </div>

          <div v-else class="flex justify-center items-center w-full">
            <GlobalButton
              :title="'Concluir revisão'"
              :btnStyle="'bg-[#261D47] w-full h-12 rounded-xl text-white text-base font-semibold hover:bg-[#3d2d5f] transition-colors'"
              type="submit"
              :action="FinalReview('concluir')"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop Layout -->
    <div class="hidden lg:flex flex-col flex-1">
      <div class="max-w-5xl mx-auto w-full px-8 py-10">
        <!-- Header Stats -->
        <div class="bg-white rounded-2xl p-6 shadow-md mb-8 animate-fade-in">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-[#261D47] mb-2">Revisão de Lote</h1>
              <p class="text-gray-600">Lote Nº {{ batchStore.batchById?.invoice }}</p>
            </div>
            <div class="bg-red-50 rounded-xl px-6 py-4 text-center">
              <p class="text-sm text-gray-600 mb-1">Rolos com defeito</p>
              <div class="text-4xl font-bold text-red-600">
                {{ batchStore.batchById.nonconformity_rolls }}
              </div>
            </div>
          </div>
        </div>

        <!-- Progress Indicator -->
        <div v-if="currentReview > 0 && currentReview <= 3" class="mb-8 animate-slide-up">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium text-gray-600">Passo {{ currentReview }} de 3</span>
            <span class="text-sm font-medium text-[#261D47]">{{ Math.round((currentReview / 3) * 100) }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div
              class="bg-[#261D47] h-2.5 rounded-full transition-all duration-500"
              :style="`width: ${(currentReview / 3) * 100}%`"
            ></div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="bg-white rounded-2xl shadow-lg p-8 min-h-[500px] animate-slide-up" style="animation-delay: 0.1s;">
          <component
            :is="steps[currentReview]"
            :nonconformity_rolls="batchStore.batchById.nonconformity_rolls"
            @RelatedProblem="currentReview++"
            @FinalReview="FinalReview"
          />
        </div>

        <!-- Navigation Buttons -->
        <div v-if="currentReview > 0" class="mt-8 animate-slide-up" style="animation-delay: 0.2s;">
          <div v-if="currentReview !== 3" class="flex gap-4 justify-center">
            <GlobalButton
              :title="'Voltar'"
              color_text="text-[#261D47]"
              :btnStyle="'bg-white border-2 border-[#261D47] text-[#261D47] w-48 h-14 rounded-xl font-semibold hover:bg-gray-50 transition-all hover:scale-105 active:scale-95'"
              :action="() => navigateSteps('back')"
            />
            <GlobalButton
              :title="'Próximo'"
              :btnStyle="'bg-[#261D47] text-white w-48 h-14 rounded-xl font-semibold hover:bg-[#3d2d5f] transition-all hover:scale-105 active:scale-95'"
              :action="() => navigateSteps('next')"
            />
          </div>

          <div v-else class="flex justify-center items-center">
            <GlobalButton
              :title="'Concluir revisão'"
               :btnStyle="'bg-[#261D47] text-white w-48 h-14 rounded-xl font-semibold hover:bg-[#3d2d5f] transition-all hover:scale-105 active:scale-95'"
              :action="() => FinalReview('concluir')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out;
}
</style>
