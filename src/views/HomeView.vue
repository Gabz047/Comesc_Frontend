<script setup>
  import {GlobalButton } from '@/components/index'
  import LayoutBarAction from '@/components/layouts/LayoutBarAction.vue';
  import router from '@/router';

  function gotoLogin(){
    router.push('/auth')
  }
</script>
<template>
<div class="flex justify-center  items-center">
    <div class="w-full">
      <div class="flex bg-[#2C2149] p-5 rounded-b-4xl text-white h-80 justify-center items-center flex-col gap-2">
        <h1 class="text-5xl" >COMESC</h1>
        <h2 class="text-2xl">MALHAS</h2>
      </div>

      <div class="flex flex-col jusitfy-center items-center gap-24 mt-16">
        <div class="flex flex-col gap-3">
        <h2 class="text-2xl font-semibold pt-3.5">Bem vindo a Comesc!</h2>
          <p class="text-center">
            Gestão têxtil com eficiência e <br />
            controle total.
          </p>
        </div>
        <GlobalButton :action="gotoLogin" title="Explore o sistema" btn-style="bg-[#2C2149] flex justify-center items-center p-3 w-64 text-xl rounded-4xl" :extra-div="true" />
      </div>
    </div>
  </div>
</template>
