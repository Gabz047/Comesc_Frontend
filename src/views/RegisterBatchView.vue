<script setup>
    import HeaderDefault from '@/components/employee-system/layouts/HeaderDefault.vue';
    import FormRegistration from '@/components/employee-system/registration/FormRegistration.vue';
    import RollRegistration from '@/components/employee-system/registration/RollRegistration.vue';
    import GlobalSpin from '@/components/global/dialog/GlobalSpin.vue';
    import { useBatchStore } from '@/stores';
    import { ref } from 'vue';

    const BatchRollForm = ref(true)
    const BatchStore = useBatchStore()
    
    function ChangeForm(){
        BatchRollForm.value = !BatchRollForm.value
    }
</script>
<template>
    <HeaderDefault />
    <h1 class="text-center font-bold text-2xl p-5">Cadastro de lote</h1>
    <form-registration @changeform="ChangeForm" v-if="BatchRollForm"/>
    <roll-registration v-else/>
    <GlobalSpin v-if="BatchStore.isLoading"/>
</template>