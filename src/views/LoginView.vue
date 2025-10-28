<script setup>
import { LoginInput } from '@/utils';
import { AuthForm, GlobalSpin } from '@/components';
import { useAuthStore } from '@/stores';
import { onMounted } from 'vue';

const authStore = useAuthStore()

onMounted(() => {
  authStore.state.loading = false
  authStore.state.error = false
})
</script>

<template>
  <div class="w-full min-h-screen relative">
    <!-- Mobile Header -->
    <div class="lg:hidden flex bg-[#2C2149] p-5 rounded-b-4xl text-white h-56 justify-between items-center flex-col gap-2 animate-slide-down">
      <div class="w-full">
        <h1 class="text-start text-2xl font-semibold">COMESC</h1>
      </div>
      <h2 class="text-4xl font-bold mb-7">Conecte-se</h2>
    </div>

    <!-- Desktop Layout -->
    <div class="hidden lg:grid lg:grid-cols-2 lg:h-screen">
      <!-- Left Side - Branding -->
      <div class="bg-gradient-to-br from-[#2C2149] to-[#4a3570] flex flex-col justify-center items-center p-12 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div class="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div class="relative z-10 text-white text-center space-y-8 animate-fade-in">
          <div class="space-y-4">
            <h1 class="text-7xl font-bold tracking-wider">COMESC</h1>
            <div class="flex items-center justify-center gap-3">
              <div class="w-16 h-1 bg-white"></div>
              <h2 class="text-3xl">MALHAS</h2>
              <div class="w-16 h-1 bg-white"></div>
            </div>
          </div>

          <p class="text-xl text-gray-200 max-w-md mx-auto mt-8">
            Gestão têxtil com eficiência e controle total
          </p>

          <div class="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto">
            <div class="text-center space-y-2 animate-float" style="animation-delay: 0s;">
              <div class="text-4xl"><span class="mdi mdi-factory"></span>
</div>
              <div class="text-sm">Produção</div>
            </div>
            <div class="text-center space-y-2 animate-float" style="animation-delay: 0.2s;">
              <div class="text-4xl"><span class="mdi mdi-chart-box-outline"></span>
</div>
              <div class="text-sm">Gestão</div>
            </div>
            <div class="text-center space-y-2 animate-float" style="animation-delay: 0.4s;">
              <div class="text-4xl"><span class="mdi mdi-creation-outline"></span>
</div>
              <div class="text-sm">Qualidade</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Form -->
      <div class="bg-white flex justify-center items-center p-12 animate-fade-in-right">
        <div class="w-full  flex justify-center items-center flex-col">
          <h2 class="text-4xl font-bold text-[#2C2149] mb-2">Conecte-se</h2>
          <p class="text-gray-600 mb-8">Acesse sua conta para continuar</p>
          <AuthForm :inputs_arr="LoginInput" />
        </div>
      </div>
    </div>

    <!-- Mobile Form -->
    <div class="lg:hidden w-full flex flex-col justify-center items-center">
      <AuthForm :inputs_arr="LoginInput" />
    </div>

    <GlobalSpin v-if="authStore.loading" />
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

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fade-in-right {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-slide-down {
  animation: slide-down 0.6s ease-out;
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-fade-in-right {
  animation: fade-in-right 0.8s ease-out;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
