<script setup>
    import { LoginInput, createAccount } from '@/utils';
    import { AuthForm } from '@/components';
    import { useRoute } from 'vue-router';
    import { computed, ref } from 'vue';
    const route = useRoute()
    const ChangeFormComputed = computed(() => {
      if(changeForm.value){
        return createAccount.value
      }
      return LoginInput.value
    })
    const changeForm = ref(false)
</script>
<template>
    <div class="w-full">
      <div class="flex bg-[#2C2149] p-5 rounded-b-4xl text-white h-56 justify-between items-center flex-col gap-2">
          <div class="w-full">
            <h1 class="text-start">COMESC</h1>
          </div>
          <h2 class="text-4xl font-bold mb-7">Conecte-se</h2>
      </div>
      <div class="w-full flex flex-col justify-center items-center">
          <AuthForm :type_user="route.params.type" :form-changed="changeForm" :inputs_arr="ChangeFormComputed" @createaccount="changeForm = !changeForm"></AuthForm>
      </div>
    </div>
</template>
<script setup>

</script>