<script setup>
import { ref } from 'vue'

const items = ref([
  { name: 'Cadastro Geral', url: '' },
  { name: 'Relatórios', url: '' },
  { name: 'Estoque', url: '' },
  { name: 'Perfil', url: '' }
])

const open = ref(false)
const isClosing = ref(false)

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
</script>
<template>
  <header class="w-full text-3xl flex justify-between p-5 relative">
    <span @click="toggleMenu" class="mdi mdi-dots-grid cursor-pointer"></span>
    <span class="mdi mdi-bell cursor-pointer"></span>
  </header>

  <div v-if="open" :class="['w-dvw h-dvh fixed top-0 z-30 bg-[rgba(38,29,71,0.3)]', isClosing ? 'close-animate-background' : 'open-animate-background']">
    <div
      :class="[
        'w-[150%] h-[80%] items-start justify-start z-40 text-white left-[-140px] flex absolute rounded-b-full flex-col bg-[#261D47]',
        isClosing ? 'close-animate' : 'open-animate'
      ]"
    >
      <span @click="toggleMenu" class="mdi mdi-dots-grid text-3xl px-40 pt-5 cursor-pointer"></span>
      <ul :class="['pl-42 pt-5 flex flex-col gap-5', isClosing ? 'close-animate-list' : 'open-animate-list']">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="text-lg cursor-pointer hover:font-semibold hover:ml-2 before-option duration-150"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped> 
@import url('@/assets/styles/employeeMenu.css');
</style>