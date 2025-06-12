<script setup>
import { computed, ref } from 'vue';
import { options } from '@/utils/batch';

const props = defineProps({
    open: {
        type: Boolean
    },
})

const emits = defineEmits([
    'open', 'filterStatus', 'search'
])

const search = ref('')

const selectedOption = ref('')

const openRef = computed(()=>props.open)
</script>
<template>
    
    <div class="w-full">
    <p class="text-[#A4A4A4] font-medium text-[12px]">Visualizar:</p>
    </div>
      <div class="w-full flex justify-between relative items-center">
            <div class="w-[180px] py-2 rounded-lg px-1 bg-[#F0F0F0]">
                <select :value="selectedOption" @change="emits('filterStatus', $event.target.value)" class="w-full outline-0 h-full" id="">
                    <option v-for="(option, index) in options" :key="index" :value="option.value" >{{ option.name }}</option>
                </select>
            </div>

           
            <span @click="emits('open')" class="mdi mdi-magnify absolute right-3 text-2xl z-20 text-[#A4A4A4]"></span>
             <transition :name="openRef ? 'slide-enter' : 'slide-leave'">
            <div :class="['absolute z-20 w-full bg-[#EAEAEA] h-10 rounded-lg flex p-3', openRef ? 'slide-enter' : 'slide-leave']">
                <input @keyup="emits('search', search)" v-model="search" type="text"  id="" class="w-10/12 outline-0" placeholder="Pesquise aqui...">
            </div>
            
            </transition>
            <div v-if="openRef" @click="emits('open')" class="w-dvw h-dvh z-10 absolute"></div>

            </div>

</template>

<style scoped>
.slide-enter {
  animation: slideIn 0.3s forwards;
}

.slide-leave {
  animation: slideOut 0.3s forwards;
}

@keyframes slideIn {
  from {
    width: 10%;
    opacity: 0;
  }
  to {
    width: 100%;
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    width: 100%;
    opacity: 1;
  }
  to {
    width: 10%;
    opacity: 0;
  }
}
</style>