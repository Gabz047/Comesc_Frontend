<script setup>
    import { FormInputs } from '@/utils/registerBatch';
    import { infoRolls } from '@/utils/infoRolls';
    import GlobalButton from '@/components/global/buttons/GlobalButton.vue';
    import GlobalInput from '@/components/global/inputs/GlobalInput.vue';
    import RollCard from './RollCard.vue';
    import { useBatchStore } from '@/stores';
    import { computed, onMounted, ref } from 'vue';

    const BatchStore = useBatchStore()

    const isActive = ref(false)
    const rolls = ref([])
   

    const totalKg = computed(() => { 
        let total = 0
        rolls.value.forEach((el) => {
            total += Number(el.kg.replace(',', '.'))
        }) 
        return total.toFixed(2).replace('.', ',')
    })
    
    function createRoll(){
        const newRoll = {
            kg: infoRolls.value[3].value,
            nonconformity: isActive.value,
        }
        rolls.value.push(newRoll)
        
        infoRolls.value[3].value = ''
        isActive.value = false

        console.log(totalKg.value)
    }

    async function CreateRollBatch(){
        await BatchStore.arrCreate(FormInputs.value, rolls.value)
    }

    onMounted(() => {
        const newArr = [...FormInputs.value.slice(0, 2).map(el => el.value)]
        console.log(BatchStore.selectedbatch)
        infoRolls.value[0].value = newArr[0]
        infoRolls.value[1].value = newArr[1]
    })
</script>
<template>
    <div> 
        <div class="relative w-full h-52">
            <img :src="FormInputs[8].showimg" alt="" class="w-full h-52 absolute" >
            <div class="w-100 flex flex-col relative text-white p-5 gap-5">
                <div class="flex justify-between" v-for="info, i in infoRolls " :key="i">
                    <h1>{{ info.title }}:</h1>
                    <h1 class="me-10" v-if="info.title !== 'Peso'">{{ info.value }}</h1>
                    <div class="flex me-10" v-else>
                        <GlobalInput v-model:value="info.value" class_input="border-b outline-0 w-12 text-center" />
                        <p>kg</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-5 flex items-center w-full justify-between">
            <h1 class="font-bold">Rolo com Defeito:</h1>
            <div :class="!isActive ? 'bg-[#D9D9D9] ' : 'bg-blue-400'" class="rounded-full  w-1/4 h-8 p-1" >
                <div :class="!isActive ? 'translate-x-0' : 'translate-x-12'" class="bg-white h-full w-6 rounded-full transition ease-in-out duration-300" @click="isActive = !isActive"></div>
            </div>
        </div>
        <div class="p-1 ">
            <div class="bg-[#D9D9D9] rounded w-full overflow-auto h-96">
                <div class="flex justify-between p-5">
                    <p>Peso Total: <span :class="totalKg >= Number(FormInputs[6].value) ? 'text-green-400': 'text-red-500'">{{totalKg}}</span>/<span class="text-green-400">{{ FormInputs[6].value }} kg</span></p>
                    <p class="text-[#bbbbbb]"><i class="mdi mdi-delete"></i>Excluir</p>
                </div>
                <div v-if="rolls.length !== 0">
                    <RollCard v-for="info, i in rolls" :key="i" :production_order="info.production_order" :kg="info.kg" :defective="info.nonconformity"/>
                </div>
                <div v-else>
                    <p class="text-center">ainda não há rolos cadastrados</p>
                </div>    
            </div>
        </div>
        <div class="flex flex-col w-full p-4 gap-3 mt-10 justify-center items-center">
            <div class="flex gap-5">
                <div class="w-4 h-4 bg-[#D9D9D9] rounded-4xl"></div>
                <div class="w-4 h-4 bg-[#261D47] rounded-4xl"></div>
            </div>
            <div class="flex w-full  justify-center items-center gap-5">
                <GlobalButton :action="createRoll" :extra-div="false" title="Cadastrar Rolo" btn-style="bg-[#261D47] text-white size-auto rounded-full flex justify-center p-2 w-1/2"/>
                <GlobalButton :action="CreateRollBatch" :extra-div="false" title="Concluir" color_text="text-[#261D47]" btn-style="bg-white border border-[#261D47]  size-auto rounded-full flex justify-center p-2 w-1/2"/>
            </div>    
        </div>    
    </div>
</template>