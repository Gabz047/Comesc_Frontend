<script setup>
import { DefaultCard } from '@/components';
import { useBatchStore, useRollStore, useColorStore, useInventoryStore, useAddressStore } from '@/stores';
import { onMounted } from 'vue';

const batchStore = useBatchStore()
const rollStore = useRollStore()
const colorStore = useColorStore()
const inventoryStore = useInventoryStore()
const addressStore = useAddressStore()

onMounted(async ()=> {
    await batchStore.GetBatchs()
    await rollStore.GetRolls()
})
</script>
<template>
    <DefaultCard :batch_invoice="batchStore.batch[0].invoice" :material_name="rollStore.roll.find((s) => s.batch.id == batchStore.batch[0].id).material.name" :amount="batchStore.batch[0].qtd" :is_batch="true" :status="batchStore.batch[0].status" />
</template>