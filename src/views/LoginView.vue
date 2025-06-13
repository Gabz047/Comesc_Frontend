<script setup>
    import { LoginInput } from '@/utils';
    import { AuthForm, GlobalSpin } from '@/components';
    import { ref } from 'vue';
    import { useAuthStore } from '@/stores';
    const authStore = useAuthStore()
    const changeForm = ref(false)
</script>
<template>
    <div class="w-full h-screen relative">
      <div class="flex bg-[#2C2149] p-5 rounded-b-4xl text-white h-56 justify-between items-center flex-col gap-2">
          <div class="w-full">
            <h1 class="text-start">COMESC</h1>
          </div>
          <h2 class="text-4xl font-bold mb-7">Conecte-se</h2>
      </div>
      <div class="w-full flex flex-col justify-center items-center">
          <AuthForm :inputs_arr="LoginInput" @createaccount="changeForm = !changeForm"></AuthForm>
      </div>
       <GlobalSpin v-if="authStore.loading"/>
    </div>
</template>
<script setup>

</script>