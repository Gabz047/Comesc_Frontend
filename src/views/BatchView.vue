<script setup>
import LayoutBarAction from '@/components/layouts/LayoutBarAction.vue';
import DefaultCardContainer from '@/components/employee-system/layouts/containers/DefaultCardContainer.vue';
import DefaultCard from '@/components/global/cards/DefaultCard.vue';
import { HeaderDefault } from '@/components';
import { useBatchStore, useRollStore, useReportStore } from '@/stores';
import { onMounted, ref} from 'vue';
import { useRoute } from 'vue-router';
import GlobalSpin from '@/components/global/dialog/GlobalSpin.vue';

const batchStore = useBatchStore()
const rollStore = useRollStore()
const reportStore = useReportStore()
const infoArr = ref([])
const route = useRoute()
const {id} = route.params

onMounted( async () => {
    await batchStore.GetBatchById(id)
    await rollStore.GetRolls()
    const objValues = Object.values(batchStore.batchById)
    const valuesUncount = [0, 1, 5, 6, 9]
    const filterItems = objValues.filter((el, i) => !valuesUncount.includes(i))
    const newObjects = ['Quantidade de peças', 'Peso', 'Preço', 'Composição', "Status"]
    newObjects.forEach((el, i) => {
      infoArr.value.push({ [el]: filterItems[i] })
    })
})
</script>

<template>
    <HeaderDefault />

    <div class="min-h-screen bg-gray-50">
        <!-- Mobile Layout -->
        <div class="lg:hidden">
            <!-- Header Section -->
            <div class="bg-white p-6 shadow-sm animate-fade-in">
                <div class="flex items-center gap-3 mb-4">
                    <button @click="$router.back()" class="mdi mdi-arrow-left text-2xl text-[#261D47] hover:scale-110 transition-transform"></button>
                    <div>
                        <p class="text-sm text-gray-500 font-medium">Lote</p>
                        <h1 class="text-3xl font-bold text-[#261D47]">Nº {{ batchStore.batchById?.invoice }}</h1>
                    </div>
                </div>
            </div>

            <!-- Image and Info Card -->
            <div class="p-4 animate-slide-up" style="animation-delay: 0.1s;">
                <div class="relative rounded-3xl overflow-hidden shadow-xl">
                    <img :src="batchStore.batchById?.cover?.url" alt="" class="w-full h-80 object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                    <div class="absolute bottom-0 left-0 right-0 text-white p-6 space-y-4">
                        <h2 class="text-2xl font-bold">{{ batchStore.batchById?.material }}</h2>

                        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 space-y-3">
                            <p class="text-sm font-semibold opacity-90 mb-3">Informações</p>
                            <div v-for="info, i in infoArr" :key="i" class="flex justify-between items-center text-sm">
                                <span class="opacity-90">{{ Object.keys(info)[0] }}</span>
                                <span class="font-semibold">{{ Object.values(info)[0] }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Rolls Section -->
            <div class="p-4 animate-slide-up" style="animation-delay: 0.2s;">
                <div class="bg-white rounded-2xl p-5 shadow-md mb-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="bg-[#261D47] text-white w-10 h-10 rounded-xl flex justify-center items-center">
                                <i class="mdi mdi-package-variant text-xl"></i>
                            </div>
                            <div>
                                <h3 class="font-semibold text-[#261D47]">Rolos</h3>
                                <p class="text-xs text-gray-500">Revisados: 0/{{ rollStore?.roll.length }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <DefaultCardContainer>
                    <DefaultCard
                        v-for="roll in rollStore.roll.filter((el) => el.batch.id === id * 1)"
                        :key="roll?.production_order"
                        :invoice="roll.production_order"
                        :material_name="`${roll.kg}kg`"
                        :image="batchStore.batchById?.cover?.url"
                        class="animate-fade-in-card"
                    />
                </DefaultCardContainer>
            </div>
        </div>

        <!-- Desktop Layout -->
        <div class="hidden lg:block">
            <div class="max-w-7xl mx-auto px-8 py-10">
                <!-- Header Section -->
                <div class="flex items-center justify-between mb-8 animate-fade-in">
                    <div class="flex items-center gap-4">
                        <button @click="$router.back()"
                                class="w-12 h-12 rounded-xl bg-white shadow-md hover:shadow-lg flex items-center justify-center hover:scale-105 transition-all group">
                            <i class="mdi mdi-arrow-left text-2xl text-[#261D47] group-hover:-translate-x-1 transition-transform"></i>
                        </button>
                        <div>
                            <p class="text-sm text-gray-500 font-medium">Detalhes do Lote</p>
                            <h1 class="text-4xl font-bold text-[#261D47]">Nº {{ batchStore.batchById?.invoice }}</h1>
                        </div>
                    </div>
                </div>

                <!-- Main Content Grid -->
                <div class="grid grid-cols-12 gap-8">
                    <!-- Left Column - Image and Info -->
                    <div class="col-span-5 space-y-6 animate-slide-up" style="animation-delay: 0.1s;">
                        <!-- Image Card -->
                        <div class="relative rounded-3xl overflow-hidden shadow-2xl group">
                            <img :src="batchStore.batchById?.cover?.url" alt=""
                                 class="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                            <div class="absolute top-6 left-6">
                                <h2 class="text-3xl font-bold text-white drop-shadow-lg">
                                    {{ batchStore.batchById?.material }}
                                </h2>
                            </div>
                        </div>

                        <!-- Info Card -->
                        <div class="bg-white rounded-3xl p-8 shadow-lg">
                            <div class="flex items-center gap-3 mb-6">
                                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#261D47] to-[#3d2d5f] flex items-center justify-center">
                                    <i class="mdi mdi-information text-white text-2xl"></i>
                                </div>
                                <h3 class="text-2xl font-bold text-[#261D47]">Informações</h3>
                            </div>

                            <div class="space-y-4">
                                <div v-for="info, i in infoArr" :key="i"
                                     class="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-3 rounded-lg transition-colors">
                                    <span class="text-gray-600 font-medium">{{ Object.keys(info)[0] }}</span>
                                    <span class="text-[#261D47] font-semibold">{{ Object.values(info)[0] }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column - Rolls -->
                    <div class="col-span-7 animate-slide-up" style="animation-delay: 0.2s;">
                        <!-- Stats Card -->
                        <div class="bg-gradient-to-br from-[#261D47] to-[#3d2d5f] rounded-3xl p-8 shadow-2xl mb-8 text-white">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm opacity-90 mb-2">Total de Rolos</p>
                                    <p class="text-5xl font-bold">{{ rollStore?.roll.filter((el) => el.batch.id === id * 1).length }}</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-sm opacity-90 mb-2">Com Defeito</p>
                                    <p class="text-5xl font-bold">{{ rollStore?.roll.filter((el) => el.batch.id === id * 1 && el.nonconformity).length }}</p>
                                </div>
                                <div class="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                    <i class="mdi mdi-package-variant text-5xl"></i>
                                </div>
                            </div>

                            <div class="mt-6 bg-white/10 rounded-xl p-1">
                                <div class="bg-white/20 h-3 rounded-lg" :style="`width: ${((rollStore?.roll.filter((el) => el.batch.id === id * 1 && el.nonconformity).length / rollStore?.roll.filter((el) => el.batch.id === id * 1).length) * 100) || 0}%`"></div>
                            </div>
                            <p class="text-sm opacity-75 mt-2">{{ (rollStore?.roll.filter((el) => el.batch.id === id * 1 && el.nonconformity).length / rollStore?.roll.filter((el) => el.batch.id === id * 1).length * 100) || 0 }}% dos rolos são com defeito</p>
                        </div>

                        <!-- Rolls Grid -->
                        <div class="bg-white rounded-3xl p-8 shadow-lg">
                            <div class="flex items-center gap-3 mb-6">
                                <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <i class="mdi mdi-view-grid text-blue-600 text-2xl"></i>
                                </div>
                                <h3 class="text-2xl font-bold text-[#261D47]">Lista de Rolos</h3>
                            </div>

                            <DefaultCardContainer>
                                <DefaultCard
                                    v-for="(roll, index) in rollStore.roll.filter((el) => el.batch.id === id * 1)"
                                    :key="roll?.production_order"
                                    :invoice="roll.production_order"
                                    :material_name="`${roll.kg}kg`"
                                    :image="batchStore.batchById?.cover?.url"
                                    class="animate-fade-in-card"
                                    :style="`animation-delay: ${0.3 + (index * 0.05)}s`"
                                />
                            </DefaultCardContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <LayoutBarAction :status="infoArr[4]" :id_batch="id"/>
    <GlobalSpin title="Gerando o Relatório..." v-if="reportStore.loading"/>
</template>

<style scoped>
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

@keyframes fade-in-card {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.animate-fade-in {
    animation: fade-in 0.6s ease-out;
}

.animate-slide-up {
    animation: slide-up 0.6s ease-out;
}

.animate-fade-in-card {
    animation: fade-in-card 0.4s ease-out;
    animation-fill-mode: both;
}
</style>
