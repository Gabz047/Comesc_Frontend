<script setup>

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
        await BatchStore.arrCreate(BatchStore.localFields, rolls.value)
    }

    onMounted(() => {
        const newArr = [...BatchStore.localFields.slice(0, 2).map(el => el.value)]
        console.log(BatchStore.selectedbatch)
        infoRolls.value[0].value = newArr[0]
        infoRolls.value[1].value = newArr[1]
    })
</script>

<template>
    <div class="min-h-screen bg-gray-50 pb-8">
        <!-- Header Image with Info Overlay -->
        <div class="relative w-full h-64 md:h-80 overflow-hidden">
            <img
                :src="BatchStore.localFields[8].showimg"
                alt="Imagem do lote"
                class="w-full h-full object-cover brightness-75"
            >
            <div class="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>

            <div class="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto w-full">
                    <div
                        v-for="info, i in infoRolls"
                        :key="i"
                        class="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3"
                    >
                        <span class="font-semibold text-sm md:text-base">{{ info.title }}:</span>
                        <span v-if="info.title !== 'Peso'" class="font-bold text-sm md:text-base">
                            {{ info.value }}
                        </span>
                        <div v-else class="flex items-center gap-2">
                            <GlobalInput
                                v-model:value="info.value"
                                class_input="bg-white/20 border-b-2 border-white outline-none w-16 text-center text-white font-bold"
                            />
                            <span class="font-semibold">kg</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-6xl mx-auto px-4 md:px-6 mt-6">
            <!-- Defect Toggle -->
            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <div class="flex items-center justify-between">
                    <h2 class="font-bold text-[#261D47] text-lg">Rolo com Defeito:</h2>
                    <button
                        @click="isActive = !isActive"
                        :class="isActive ? 'bg-blue-500' : 'bg-gray-300'"
                        class="relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    >
                        <div
                            :class="isActive ? 'translate-x-8' : 'translate-x-1'"
                            class="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out"
                        ></div>
                    </button>
                </div>
            </div>

            <!-- Rolls List -->
            <div class="bg-white rounded-xl shadow-md overflow-hidden">
                <!-- Header -->
                <div class="bg-gray-100 p-4 md:p-6 flex justify-between items-center border-b">
                    <p class="font-semibold text-gray-700">
                        Peso Total:
                        <span :class="totalKg >= Number(BatchStore.localFields[6].value) ? 'text-green-500 font-bold' : 'text-red-500 font-bold'">
                            {{ totalKg }}
                        </span>
                        /
                        <span class="text-green-500 font-bold">{{ BatchStore.localFields[6].value }} kg</span>
                    </p>
                    <button class="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2">
                        <i class="mdi mdi-delete"></i>
                        <span class="hidden md:inline">Excluir</span>
                    </button>
                </div>

                <!-- Rolls Container -->
                <div class="h-80 md:h-96 overflow-y-auto p-4">
                    <div v-if="rolls.length !== 0" class="space-y-3">
                        <RollCard
                            v-for="info, i in rolls"
                            :key="i"
                            :production_order="info.production_order"
                            :kg="info.kg"
                            :defective="info.nonconformity"
                        />
                    </div>
                    <div v-else class="flex flex-col items-center justify-center h-full text-gray-400">
                        <i class="mdi mdi-package-variant text-6xl mb-4"></i>
                        <p class="text-center">Ainda não há rolos cadastrados</p>
                    </div>
                </div>
            </div>

            <!-- Progress & Actions -->
            <div class="flex flex-col items-center gap-6 mt-8">
                <!-- Progress Dots -->
                <div class="flex gap-3">
                    <div class="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div class="w-3 h-3 bg-[#261D47] rounded-full"></div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col justify-center md:flex-row w-full gap-4">
                    <GlobalButton
                        :action="createRoll"
                        :extra-div="false"
                        title="Cadastrar Rolo"
                        btn-style="bg-[#261D47] hover:bg-[#3a2a5f] text-white rounded-xl px-6 py-3 font-semibold transition-all duration-200 shadow-md hover:shadow-lg w-full md:w-1/2 transform hover:scale-105"
                    />
                    <GlobalButton
                        :action="CreateRollBatch"
                        :extra-div="false"
                        title="Concluir"
                        color_text="text-[#261D47]"
                        btn-style="bg-white border-2 border-[#261D47] hover:bg-[#261D47] hover:text-white rounded-xl px-6 py-3 font-semibold transition-all duration-200 shadow-md hover:shadow-lg w-full md:w-1/2 transform hover:scale-105"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
