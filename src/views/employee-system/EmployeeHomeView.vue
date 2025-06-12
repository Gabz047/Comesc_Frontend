<script setup>
import { HeaderDefault, DefaultCard, BatchFilter, DefaultCardContainer } from '@/components';
import { useBatchStore, useRollStore } from '@/stores';
import { onMounted, ref } from 'vue';
import { useBatchUtils } from '@/utils/batch';
const batchStore = useBatchStore()
const rollStore = useRollStore()

const findMaterial = (instance) => {
    return rollStore.roll.find((s) => s.batch.id = instance.id).material.name
}

onMounted(async()=> {
    await batchStore.GetBatchs()
})

// function debounce (func, delay) {
//     let timeout;
//     return function(...args) {
//         clearTimeout(timeout);
//         timeout = setTimeout(() => func.apply(this, args), delay);
//     };
// }

// const search = async (search) => {

//     if (search != '') {
//         console.log(search)
//     debounce(await batchStore.GetBatchsBySearch(search), 300)
//     } else {
//         console.log('search is empty')
//         await batchStore.GetBatchs()
//     }	
  
// }

const {
    filterByStatus,
    search
} = useBatchUtils()



const open = ref(false)
</script>
<template>
    <main class="w-full">
        <HeaderDefault />

        <div class="text-[40px] justify-start font-medium flex w-8/12 mx-auto mt-10 ">
            <div class="flex flex-col gap-2">
            <h1 class="text-hello  text-[#BBBBBB]">Ola</h1>
            <h1>Gabriel!</h1>
            </div>
        </div>

        <div class="w-full flex justify-center mt-3">
            <div class="flex gap-3 items-center cursor-pointer ">
                <span class="w-8 h-8 rounded-xl flex justify-center items-center bg-[#261D47]">
                    <span class="mdi mdi-plus-circle text-white text-xl "></span>
                </span>
                <p class="font-medium text-[#261D47]">Cadastrar Lote</p>
            </div>
        </div>

        <div class="w-full flex flex-col p-4 relative">

            <BatchFilter @search="search" @filterStatus="filterByStatus"  @open="open = !open" :open="open" />

            <DefaultCardContainer>
                <DefaultCard v-if="batchStore.batch.length > 0" :invoice="batch.invoice" :material_name="findMaterial(batch)" v-for="batch in batchStore.batch" :status="batch.status" :is_batch="true" :amount="batch.qtd" />
                <div v-else><p>Lotes não encontrados</p></div>
            </DefaultCardContainer>
        </div>
    </main>
</template>

<style scoped>
.text-hello::after {
  content: ',';
  color: #261D47;
}
</style>