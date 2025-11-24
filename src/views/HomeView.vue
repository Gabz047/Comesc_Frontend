<script setup>
import { GlobalButton } from '@/components/index'
import LayoutBarAction from '@/components/layouts/LayoutBarAction.vue';
import router from '@/router';

function gotoLogin(){
  router.push('/auth')
}
</script>

<template>
  <div class="min-h-screen flex justify-center ">
    <!-- Mobile Layout -->
    <div class="w-full lg:hidden">
      <div class="flex bg-[#2C2149] p-5 rounded-b-4xl text-white h-80 justify-center items-center flex-col gap-2 animate-slide-down">
        <h1 class="text-5xl font-bold">COMESC</h1>
        <h2 class="text-2xl">MALHAS</h2>
      </div>
      <div class="flex flex-col justify-center items-center gap-24 mt-16">
        <div class="flex flex-col gap-3">
          <h2 class="text-2xl font-semibold pt-3.5 text-center">Bem vindo a Comesc!</h2>
          <p class="text-center text-gray-600">
            Gestão têxtil com eficiência e <br />
            controle total.
          </p>
        </div>
        <GlobalButton
          :action="gotoLogin"
          title="Explore o sistema"
          btn-style="bg-[#2C2149] hover:bg-[#3d2d5f] transition-colors flex justify-center items-center p-3 w-64 text-xl rounded-4xl text-white"
          :extra-div="true"
        />
      </div>
    </div>

    <!-- Desktop Layout -->
    <div class="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:max-w-6xl w-full items-center">
      <!-- Left Side - Content -->
      <div class="flex flex-col gap-8 animate-fade-in-left">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-1 bg-[#2C2149]"></div>
            <h1 class="text-6xl font-bold text-[#2C2149]">COMESC</h1>
          </div>
          <h2 class="text-3xl text-gray-700 ml-16">MALHAS</h2>
        </div>

        <div class="flex flex-col gap-6 ml-16">
          <h2 class="text-4xl font-semibold text-gray-800">
            Bem vindo a Comesc!
          </h2>
          <p class="text-xl text-gray-600 leading-relaxed">
            Gestão têxtil com eficiência e controle total.
            Modernize seus processos e tenha visibilidade
            completa do seu negócio.
          </p>
        </div>

        <div class="ml-16 mt-4">
          <GlobalButton
            :action="gotoLogin"
            title="Explore o sistema"
            btn-style="bg-[#2C2149] hover:bg-[#3d2d5f] transition-all hover:scale-105 flex justify-center items-center px-8 py-4 text-xl rounded-4xl text-white shadow-lg"
            :extra-div="true"
          />
        </div>
      </div>

      <div class="relative h-[600px] animate-slide-in-right">
        <div class="absolute inset-0 bg-gradient-to-br from-[#2C2149] to-[#4a3570] rounded-3xl transform rotate-3 animate-float">
          <div class="absolute inset-0 bg-[#2C2149] rounded-3xl transform -rotate-6 opacity-80"></div>
        </div>
        <div class="relative h-full bg-[#2C2149] rounded-3xl flex flex-col justify-center items-center gap-6 p-12 shadow-2xl">
          <div class="text-center space-y-4">
            <div class="text-7xl font-bold text-white animate-pulse-slow">
              COMESC
            </div>
            <div class="text-3xl text-gray-200">
              MALHAS
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6 mt-12 w-full">
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all">
              <div class="text-3xl font-bold text-white">100%</div>
              <div class="text-sm text-gray-200 mt-2">Controle</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all">
              <div class="text-3xl font-bold text-white">24/7</div>
              <div class="text-sm text-gray-200 mt-2">Acesso</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all">
              <div class="text-3xl font-bold text-white">∞</div>
              <div class="text-sm text-gray-200 mt-2">Eficiência</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all">
              <div class="text-3xl font-bold text-white">+</div>
              <div class="text-sm text-gray-200 mt-2">Inovação</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slide-down {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fade-in-left {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-in-right {
  from {
    transform: translateX(50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes float {
  0%, 100% {
    transform: rotate(3deg) translateY(0px);
  }
  50% {
    transform: rotate(3deg) translateY(-20px);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-slide-down {
  animation: slide-down 0.6s ease-out;
}

.animate-fade-in-left {
  animation: fade-in-left 0.8s ease-out;
}

.animate-slide-in-right {
  animation: slide-in-right 0.8s ease-out;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}
</style>
