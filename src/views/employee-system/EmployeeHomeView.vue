<script setup>
import { HeaderDefault, DefaultCard, BatchFilter, DefaultCardContainer } from '@/components';
import { useBatchStore, useRollStore } from '@/stores';
import { onMounted, ref } from 'vue';
import { useBatchUtils } from '@/utils/batch';
import router from '@/router';

const batchStore = useBatchStore()

onMounted(async() => {
    console.log(batchStore.batch)
    await batchStore.GetBatchs()
})

const {
    filterByStatus,
    search
} = useBatchUtils()

const open = ref(false)
</script>

<template>
    <main class="w-full min-h-screen bg-gray-50">
        <HeaderDefault />

        <!-- Mobile Layout -->
        <div class="lg:hidden">
            <!-- Welcome Section -->
            <div class="text-[40px] justify-start font-medium flex w-11/12 mx-auto mt-10">
                <div class="flex flex-col gap-2 animate-fade-in">
                    <h1 class="text-hello text-[#BBBBBB]">Ola</h1>
                    <h1 class="text-[#261D47]">Gabriel!</h1>
                </div>
            </div>

            <!-- Add Batch Button -->
            <div class="w-full flex justify-center mt-6 animate-slide-up" style="animation-delay: 0.1s;">
                <div class="flex gap-3 items-center cursor-pointer hover:scale-105 transition-transform active:scale-95"
                     @click="router.push('/batch/register/')">
                    <span class="w-10 h-10 rounded-xl flex justify-center items-center bg-[#261D47] shadow-lg">
                        <span class="mdi mdi-plus-circle text-white text-2xl"></span>
                    </span>
                    <p class="font-medium text-[#261D47] text-lg">Cadastrar Lote</p>
                </div>
            </div>

            <!-- Filter and List -->
            <div class="w-full flex flex-col p-4 relative animate-slide-up" style="animation-delay: 0.2s;">
                <BatchFilter
                    @search="search"
                    @filterStatus="filterByStatus"
                    @open="open = !open"
                    :open="open"
                />
                <DefaultCardContainer>
                    <div v-if="batchStore.batch && batchStore.batch.length > 0" class="flex flex-col gap-5 w-full">
                        <DefaultCard
                            v-for="(info, index) in batchStore.batch"
                            :key="info.id"
                            :amount="info?.qtd"
                            :invoice="info?.invoice"
                            :image="info?.cover?.url"
                            :material_name="info?.material"
                            :status="info?.status"
                            :is_batch="true"
                            @click="router.push(`/batch/${info.id}/`)"
                            class="animate-fade-in-card"
                            :style="`animation-delay: ${index * 0.05}s`"
                        />
                    </div>
                    <div v-else class="flex flex-col items-center justify-center py-20 text-gray-400">
                        <span class="mdi mdi-package-variant text-6xl mb-4"></span>
                        <p class="text-lg">Lotes não encontrados</p>
                    </div>
                </DefaultCardContainer>
            </div>
        </div>

        <!-- Desktop Layout -->
        <div class="hidden lg:block">
            <div class="max-w-7xl mx-auto px-8 py-10">
                <!-- Header Section with Grid -->
                <div class="grid grid-cols-12 gap-8 mb-8">
                    <!-- Welcome Section -->
                    <div class="col-span-8 animate-fade-in">
                        <div class="flex items-end gap-6">
                            <div class="flex flex-col">
                                <h1 class="text-5xl font-light text-[#BBBBBB]">
                                    Olá<span class="text-[#261D47]">,</span>
                                </h1>
                                <h1 class="text-6xl font-semibold text-[#261D47] mt-2">Gabriel!</h1>
                            </div>
                            <div class="flex flex-col gap-2 mb-2">
                                <p class="text-gray-600">Seja bem-vindo de volta</p>
                                <p class="text-sm text-gray-500">
                                    {{ new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Actions -->
                    <div class="col-span-4 flex items-center justify-end animate-fade-in" style="animation-delay: 0.1s;">
                        <button
                            @click="router.push('/batch/register/')"
                            class="flex items-center gap-3 bg-gradient-to-r from-[#261D47] to-[#3d2d5f] text-white px-6 py-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
                        >
                            <span class="mdi mdi-plus-circle text-2xl"></span>
                            <span class="font-semibold text-lg">Cadastrar Lote</span>
                        </button>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all animate-slide-up" style="animation-delay: 0.2s;">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm font-medium">Total de Lotes</p>
                                <p class="text-3xl font-bold text-[#261D47] mt-2">{{ batchStore.batch?.length || 0 }}</p>
                            </div>
                            <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                                <span class="mdi mdi-package-variant text-blue-600 text-2xl"></span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all animate-slide-up" style="animation-delay: 0.25s;">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm font-medium">Em Produção</p>
                                <p class="text-3xl font-bold text-orange-600 mt-2">
                                    {{ batchStore.batch?.filter(b => b.status === 'em_producao').length || 0 }}
                                </p>
                            </div>
                            <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                                <span class="mdi mdi-cog text-orange-600 text-2xl"></span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all animate-slide-up" style="animation-delay: 0.3s;">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm font-medium">Concluídos</p>
                                <p class="text-3xl font-bold text-green-600 mt-2">
                                    {{ batchStore.batch?.filter(b => b.status === 'concluido').length || 0 }}
                                </p>
                            </div>
                            <div class="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                                <span class="mdi mdi-check-circle text-green-600 text-2xl"></span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all animate-slide-up" style="animation-delay: 0.35s;">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm font-medium">Pendentes</p>
                                <p class="text-3xl font-bold text-yellow-600 mt-2">
                                    {{ batchStore.batch?.filter(b => b.status === 'pendente').length || 0 }}
                                </p>
                            </div>
                            <div class="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <span class="mdi mdi-clock-outline text-yellow-600 text-2xl"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Filter and List -->
                <div class="animate-slide-up" style="animation-delay: 0.4s;">
                    <BatchFilter
                        @search="search"
                        @filterStatus="filterByStatus"
                        @open="open = !open"
                        :open="open"
                    />

                    <div class="mt-6">
                        <DefaultCardContainer>
                            <div v-if="batchStore.batch && batchStore.batch.length > 0"
                                 class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                                <DefaultCard
                                    v-for="(info, index) in batchStore.batch"
                                    :key="info.id"
                                    :amount="info?.qtd"
                                    :invoice="info?.invoice"
                                    :image="info?.cover?.url"
                                    :material_name="info?.material"
                                    :status="info?.status"
                                    :is_batch="true"
                                    @click="router.push(`/batch/${info.id}/`)"
                                    class="animate-fade-in-card hover:scale-105 transition-transform cursor-pointer"
                                    :style="`animation-delay: ${0.5 + (index * 0.05)}s`"
                                />
                            </div>
                            <div v-else class="flex flex-col items-center justify-center py-32 text-gray-400 bg-white rounded-2xl">
                                <span class="mdi mdi-package-variant-closed text-8xl mb-6 opacity-20"></span>
                                <p class="text-2xl font-medium">Nenhum lote encontrado</p>
                                <p class="text-gray-500 mt-2">Comece cadastrando um novo lote</p>
                                <button
                                    @click="router.push('/batch/register/')"
                                    class="mt-6 flex items-center gap-2 bg-[#261D47] text-white px-6 py-3 rounded-xl hover:bg-[#3d2d5f] transition-colors"
                                >
                                    <span class="mdi mdi-plus"></span>
                                    <span>Cadastrar Lote</span>
                                </button>
                            </div>
                        </DefaultCardContainer>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.text-hello::after {
    content: ',';
    color: #261D47;
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

/* Smooth transitions for all interactive elements */
button, .cursor-pointer {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Background pattern for desktop */
@media (min-width: 1024px) {
    main {
        background-image:
            radial-gradient(circle at 20% 20%, rgba(38, 29, 71, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(38, 29, 71, 0.03) 0%, transparent 50%);
    }
}
</style>
