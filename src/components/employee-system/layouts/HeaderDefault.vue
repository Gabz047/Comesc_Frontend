<script setup>
import { ref, computed } from 'vue'
import router from '@/router'
import { useAuthStore } from '@/stores'
const authStore = useAuthStore()
const items = ref([
   { name: 'Tela Inicial', url: '/employee', icon: 'mdi-menu' },
  { name: 'Cadastro Geral', url: '/register', icon: 'mdi-clipboard-text' },
  { name: 'Relatórios', url: '/reports', icon: 'mdi-chart-line' },
  { name: 'Estoque', url: '/stock', icon: 'mdi-package-variant' },
  { name: 'Perfil', url: '/profile', icon: 'mdi-account' }
])

const open = ref(false)
const isClosing = ref(false)
const notifications = ref(3) // Número de notificações

const hasNotifications = computed(() => notifications.value > 0)

const toggleMenu = () => {
  if (open.value) {
    isClosing.value = true
    setTimeout(() => {
      open.value = false
      isClosing.value = false
    }, 300)
  } else {
    open.value = true
  }
}

const navigateTo = (url) => {
  if (url) {
    toggleMenu()
    setTimeout(() => {
      router.push(url)
    }, 300)
  }
}
</script>

<template>
  <!-- Mobile Header -->
  <header class="lg:hidden w-full text-3xl flex justify-between p-5 relative items-center">
    <button
      @click="toggleMenu"
      class="mdi mdi-dots-grid cursor-pointer hover:scale-110 transition-transform active:scale-95 text-[#261D47]"
      aria-label="Menu"
    ></button>

    <button
      class="mdi mdi-bell cursor-pointer hover:scale-110 transition-transform active:scale-95 relative text-[#261D47]"
      aria-label="Notificações"
    >
      <span
        v-if="hasNotifications"
        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse"
      >
        {{ notifications }}
      </span>
    </button>
  </header>

  <!-- Desktop Header -->
  <header class="hidden lg:flex w-full justify-between items-center px-6 py-3 bg-white shadow-sm">
    <div class="flex items-center gap-6">
      <button
        @click="toggleMenu"
        class="flex items-center gap-2 text-[#261D47] hover:text-[#3d2d5f] transition-colors group"
      >
        <i class="mdi mdi-dots-grid text-2xl group-hover:scale-110 transition-transform"></i>
        <span class="font-medium text-sm">Menu</span>
      </button>

      <nav class="flex items-center gap-4">
        <a
          v-for="(item, index) in items"
          :key="index"
          @click="navigateTo(item.url)"
          class="flex items-center gap-2 text-gray-600 hover:text-[#261D47] transition-colors cursor-pointer group"
        >
          <i :class="`mdi ${item.icon} text-lg group-hover:scale-110 transition-transform`"></i>
          <span class="font-medium text-sm">{{ item.name }}</span>
        </a>
      </nav>
    </div>

    <div class="flex items-center gap-4">
      <!-- Search Bar -->
      <div class="relative">
        <input
          type="text"
          placeholder="Buscar..."
          class="pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#261D47] transition-colors w-52"
        />
        <i class="mdi mdi-magnify absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
      </div>

      <!-- Notifications -->
      <button
        class="relative text-gray-600 hover:text-[#261D47] transition-colors"
        aria-label="Notificações"
      >
        <i class="mdi mdi-bell text-xl hover:scale-110 transition-transform"></i>
        <span
          v-if="hasNotifications"
          class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold animate-pulse"
        >
          {{ notifications }}
        </span>
      </button>

      <!-- User Profile -->
      <div class="flex items-center gap-2 cursor-pointer group">
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#261D47] to-[#3d2d5f] flex items-center justify-center text-white text-sm font-semibold group-hover:scale-110 transition-transform">
          G
        </div>
        <div class="flex flex-col">
          <span class="font-medium text-sm text-gray-800">Gabriel</span>
          <span class="text-xs text-gray-500">Administrador</span>
        </div>
        <i class="mdi mdi-chevron-down text-gray-400 group-hover:text-[#261D47] transition-colors"></i>
      </div>
    </div>
  </header>

  <!-- Mobile Menu Overlay -->
  <div
    v-if="open"
    @click="toggleMenu"
    :class="[
      'lg:hidden w-dvw h-dvh fixed top-0 z-50 bg-[rgba(38,29,71,0.3)] backdrop-blur-sm',
      isClosing ? 'close-animate-background' : 'open-animate-background'
    ]"
  >
    <div
      @click.stop
      :class="[
        'w-[150%] h-[80%] items-start justify-start z-40 text-white left-[-140px] flex absolute rounded-b-full flex-col bg-gradient-to-br from-[#261D47] to-[#3d2d5f] shadow-2xl',
        isClosing ? 'close-animate' : 'open-animate'
      ]"
    >
      <div class="flex items-center justify-between w-full px-40 pt-5">
        <span
          @click="toggleMenu"
          class="mdi mdi-close text-3xl cursor-pointer hover:rotate-90 transition-transform duration-300"
        ></span>
        <span class="text-lg font-semibold">Menu</span>
      </div>

      <ul :class="['pl-42 pt-10 flex flex-col gap-6', isClosing ? 'close-animate-list' : 'open-animate-list']">
        <li
          v-for="(item, index) in items"
          :key="index"
          @click="navigateTo(item.url)"
          class="flex items-center gap-3 text-lg cursor-pointer hover:font-semibold hover:ml-2 transition-all duration-200 group"
          :style="`animation-delay: ${index * 0.1}s`"
        >
          <span
            :class="`mdi ${item.icon} text-2xl group-hover:scale-125 transition-transform`"
          ></span>
          <span>{{ item.name }}</span>
          <span class="mdi mdi-chevron-right opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </li>
      </ul>


    </div>
  </div>

  <!-- Desktop Menu Overlay -->
  <div
    v-if="open"
    @click="toggleMenu"
    :class="[
      'hidden lg:block fixed inset-0 z-50 backdrop-blur-sm',
      isClosing ? 'close-animate-background' : 'open-animate-background'
    ]"
  >
    <div
      @click.stop
      :class="[
        'fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50',
        isClosing ? 'close-animate-desktop' : 'open-animate-desktop'
      ]"
    >
      <div class="p-6 border-b border-gray-200 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#261D47] to-[#3d2d5f] flex items-center justify-center text-white font-bold text-xl">
            C
          </div>
          <div>
            <h3 class="font-bold text-lg text-[#261D47]">COMESC</h3>
            <p class="text-xs text-gray-500">Malhas</p>
          </div>
        </div>
        <button
          @click="toggleMenu"
          class="mdi mdi-close text-2xl text-gray-400 hover:text-[#261D47] hover:rotate-90 transition-all"
        ></button>
      </div>

      <nav class="p-6">
        <ul class="flex flex-col gap-2">
          <li
            v-for="(item, index) in items"
            :key="index"
            @click="navigateTo(item.url)"
            class="flex items-center gap-3 p-4 rounded-xl cursor-pointer hover:bg-gray-100 transition-all group"
            :class="isClosing ? 'close-animate-list' : 'open-animate-list'"
            :style="`animation-delay: ${index * 0.05}s`"
          >
            <div class="w-10 h-10 rounded-lg bg-[#261D47] text-white bg-opacity-10 flex items-center justify-center group-hover:bg-opacity-20 transition-colors">
              <span
                :class="`mdi ${item.icon} text-xl text-[#fff]`"
              ></span>
            </div>
            <span class="font-medium text-gray-700 group-hover:text-[#261D47] transition-colors">
              {{ item.name }}
            </span>
            <span class="mdi mdi-chevron-right ml-auto text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </li>
        </ul>
      </nav>

      <div class="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#261D47] to-[#3d2d5f] flex items-center justify-center text-white font-semibold">
            G
          </div>
          <div>
            <p class="font-medium text-gray-800">Gabriel</p>
            <p class="text-sm text-gray-500">gabriel@comesc.com</p>
          </div>
        </div>
        <button class="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-colors">
          <span class="mdi mdi-logout"></span>
          <span class="font-medium">Sair</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes open-background {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes close-background {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes open-menu {
  from {
    transform: translateY(-0%) scale(0.8);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

@keyframes close-menu {
  from {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.8);
    opacity: 0;
  }
}

@keyframes open-desktop {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes close-desktop {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes open-list {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes close-list {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-20px);
  }
}

.open-animate-background {
  animation: open-background 0.3s ease-out;
}

.close-animate-background {
  animation: close-background 0.3s ease-out;
}

.open-animate {
  animation: open-menu 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.close-animate {
  animation: close-menu 0.3s ease-in;
}

.open-animate-desktop {
  animation: open-desktop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.close-animate-desktop {
  animation: close-desktop 0.3s ease-in;
}

.open-animate-list {
  animation: open-list 0.5s ease-out;
  animation-fill-mode: both;
}

.close-animate-list {
  animation: close-list 0.2s ease-in;
  animation-fill-mode: both;
}
</style>
