<script setup>
import { onMounted, ref } from "vue";
import { useBatchStore } from "@/stores";
import { useRoute } from "vue-router";
const batchStore = useBatchStore();
const route = useRoute()

const {id} = route.params

import Menu from "@/components/employee-system/layouts/HeaderDefault.vue";
import Button from "@/components/global/buttons/GlobalButton.vue";

import FirstReview from "@/components/employee-system/batch/reviewbatch/FirstReview.vue";
import SecondReview from "@/components/employee-system/batch/reviewbatch/SecondReview.vue";
import ThirdReview from "@/components/employee-system/batch/reviewbatch/ThirdReview.vue";
import FourthReview from "@/components/employee-system/batch/reviewbatch/FourthReview.vue";
import Conclusion from "@/components/employee-system/batch/reviewbatch/ReviewConclusion.vue";

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

onMounted(async () => {
  await batchStore.GetBatchById(id * 1)
})
</script>

<template>
  <div class="h-screen flex flex-col">
    <Menu />

    <form @submit.prevent="submitForm" class="w-screen h-full">
      <div class="w-full h-[5vh] flex flex-col items-center justify-center">
        <div class="text-center">
          <div class="text-lg font-medium">
            Rolos com defeito: {{ batchStore.batchById.nonconformity_rolls }}
          </div>
        </div>
      </div>

      <div class="flex flex-col h-[75vh] justify-center items-center">
        <component :is="steps[currentReview]" :nonconformity_rolls="batchStore.batchById.nonconformity_rolls" @RelatedProblem="currentReview++" @FinalReview="FinalReview"/>
      </div>

      <div class="flex justify-center items-center">
        <div
          v-if="currentReview > 0"
          class="w-full h-[12vh] flex flex-col items-center justify-center"
        >
          <div
            v-if="currentReview >= 1 && currentReview <= 3"
            class="w-full flex justify-center items-center gap-2 py-2"
          >
            <div
              v-for="idx in [1, 2, 3]"
              :key="idx"
              :class="[
                'w-5 h-5 rounded-full',
                currentReview === idx ? 'bg-[#261D47]' : 'bg-gray-300',
              ]"
            ></div>
          </div>
          <div v-if="currentReview < 4" class="flex gap-4">
            <Button
              :title="'Voltar'"
              :btnStyle="'bg-[#261D47] w-[150px] h-[50px] rounded-xl'"
              @click="currentReview--"
            />
            <Button
              :title="'Próximo'"
              :btnStyle="'bg-[#261D47] w-[150px] h-[50px] rounded-2xl'"
              @click="currentReview++"
            >
            </Button>
          </div>
          <div v-else class="flex justify-center items-center w-full">
              <Button
                :title="'Concluir revisão'"
                :btnStyle="'bg-[#261D47] w-[220px] h-[48px] rounded-xl text-white text-base font-semibold'"
                type="submit"
                @click="FinalReview('concluir')"
              />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
