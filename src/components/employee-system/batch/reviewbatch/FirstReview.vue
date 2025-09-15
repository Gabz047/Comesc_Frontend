<script setup>
import { defineEmits } from "vue";

import iconButton from "@/components/global/buttons/IconButton.vue";

const emit = defineEmits(["RelatedProblem", "FinalReview"]);

defineProps({
  nonconformity_rolls: {
    type: Number,
    default: 0
  }
})

function finalReview(){
  emit('FinalReview')
}

function reportProblem() {
  emit("RelatedProblem");
}
</script>

<template>
  <div
    class="flex flex-col gap-12 justify-center items-center"
  >
    <iconButton
      v-if="nonconformity_rolls > 0"
      :title="'Relatar problema'"
      :btnClass="'flex flex-col rounded-xl bg-[#261D47] w-[220px] h-[175px]'"
      :titleClass="'text-white text-lg'"
      @click="reportProblem"
    >
      <i class="mdi mdi-alert-circle text-white text-[75px]" />
    </iconButton>

    <iconButton
      @click="finalReview"
      :title="'Confirmar lote'"
      :btnClass="'flex flex-col rounded-xl bg-[#261D47] w-[220px] h-[175px]'"
      :titleClass="'text-white text-lg'"
    >
      <i class="mdi mdi-check-circle text-white text-[75px]" />
    </iconButton>
  </div>
</template>
