<script setup>
import { DefaultCard } from '@/components';
import GlobalSpin from '@/components/global/dialog/GlobalSpin.vue';
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
    <GlobalSpin />
</template>