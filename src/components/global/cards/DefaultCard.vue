<script setup>
import { selectStatusIcon } from '@/utils/batch';
    const props = defineProps({
        invoice: {
            type: [String, Number]
        },
        material_name: {
            type: String
        },
        amount: {
            type: [String, Number]
        },
        is_batch: {
            type: Boolean,
            default: false
        },
        image: {
            type: [String, "@/assets/images/tecido.jpeg"],
            default: null
        },
        status: {
            type: String
        }
    })


</script>

<template>
    <span class="w-[155px] h-[148px] relative flex hover:brightness-75 duration-150 cursor-pointer z-10 text-white flex-col justify-center items-center">
        <div class=" absolute top-2 z-20 text-2xl " v-if="is_batch">
            <span :class="selectStatusIcon(props.status)"></span>
        </div>

        <div class="h-full w-full">
            <img class="w-full h-full rounded-[30px]" :src="image" alt="">
        </div>
        <div class="gradient absolute z-10 h-full w-full rounded-[30px]"></div>


        <div class="absolute font-poppins font-medium z-20 flex w-full flex-col items-center bottom-2">
            <p class="text-md">Nº {{props.invoice}}</p>
            <p class="text-[11px]"> {{ props.material_name }}</p>
            <p class="text-[11px]" v-if="props.amount"> {{ props.amount }} {{ props.amount == 1 ? 'Peça' : 'Peças'}}</p>
        </div>
    </span>
</template>
<style scooped>
.gradient {
background: #000000;
background: linear-gradient(0deg,rgba(0, 0, 0, 1) 30%, rgba(255, 255, 255, 0) 100%);
}
</style>