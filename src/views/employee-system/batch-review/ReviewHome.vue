<script setup>
import { useBatchStore, useRollStore } from "@/stores";
import {  onMounted } from "vue";

// Components
import Menu from "@/components/employee-system/layouts/HeaderDefault.vue";
import BatchInfo from "@/components/employee-system/batch/batchInfo.vue";
import batchOpt from "@/components/employee-system/batch/batchOpt.vue";

const batchStore = useBatchStore();
const rollStore = useRollStore();

const selectedID = batchStore.selectedbatch;

onMounted(async () => {
  await batchStore.GetBatchs();
  await rollStore.GetRolls();
});

function rollsbatch(){
  return rollStore.roll.filter((r) => r.batch.id === selectedID);
}

function getRollField(id, field) {
  const roll = rollStore.roll.find((r) => r.batch.id === id);
  return roll[field];
}

</script>

<template>
  <div class="flex flex-col gap-4">
    <Menu />

    <div class="flex justify-center items-center flex-col">
      <i class="text-3xl font-medium">Lote</i>
      <i class="text-4xl font-medium">Nº {{ selectedID }}</i>
    </div>

    <BatchInfo
    :hex="getRollField(selectedID, 'hex')"
    :cor="getRollField(selectedID, 'cor')"
    :composition="getRollField(selectedID, 'composition')"
    :amount_pieces="getRollField(selectedID, 'amount_pieces')"
    :price="getRollField(selectedID, 'price')"
    :material_name="getRollField(selectedID, 'material_name')"
    />

    <div class="flex items-center justify-between p-4 w-full">
      <div class="flex gap-2">
        <div class="flex justify-center items-center w-10 h-10 rounded-full bg-[#261D47]">
          <i class="mdi mdi-plus text-xl text-white" />
        </div>
        <div class="flex items-center">
          <i class="text-sm">Informações</i>
        </div>
      </div>
      <div class="flex gap-4">
        <span class="text-sm">Rolos revisados:</span>
        <span>
          <!-- Quantos rolos revisados -->
        </span>
      </div>
    </div>
    <div class="w-full flex flex-2 p-4 relative"></div>
  </div>
  <batchOpt
    :leftBtn="() => {x}"
    leftIcon="mdi mdi-edit-file"
    lefttitle="Editar"
    :middleBtn="() => {x}"
    middletitle="Revisar Lote"
    :rightBtn="() => {x}"
    rightIcon="mdi mdi-delete"
    righttitle="Excluir"
    />
</template>
