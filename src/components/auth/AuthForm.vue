<script setup>
    import { GlobalButton, GlobalInput } from '..';
    import { useAuthStore } from '@/stores/auth';
    defineProps({
        inputs_arr: {
            type: Array,
            required: true
        },
    })
    const authStore = useAuthStore()
</script>
<template>
    <div class="flex min-w-2/4 flex-col jusitfy-center items-center p-10 gap-5 mt-2">
        <GlobalInput v-for="info, i in inputs_arr" :key="i" :label="info.label" :placeholder="info.placeholder" v-model:value="info.value" class_input="outline-0 border border-neutral-400 rounded-lg p-4 w-full" class="w-full"/>
        <div class="flex justify-center items-center mt-10 flex-col gap-3">
          <GlobalButton title="Entrar" :action="authStore.Login" :extra-div="false" btn-style="bg-[#2C2149] flex justify-center items-center p-3 w-52 rounded-4xl"/>  
        </div>          
      </div>
</template>