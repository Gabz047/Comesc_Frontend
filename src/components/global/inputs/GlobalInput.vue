<script setup>
    import Image from '@/assets/images/image.png'
    defineProps({
        placeholder: {
            type: String,
            default: ''
        }, 
        label: {
            type: String,
            default: ''
        },
        class_input: {
            type: String,
            default: ''
        },
        showimg: {
            type: String,
            default: ''
        },
        media: {
            type: Boolean,
            default: false
        }
    })

    const model = defineModel('value')
</script>
<template>
    <div class="flex flex-col gap-2" v-if="!media">
        <label for="input" v-if="label" class="text-xl ms-1">{{ label }}</label>
        <input type="text" :placeholder="placeholder" :class="class_input" v-model="model">
    </div>
    <div v-else class="flex flex-col jsutify-center items-center gap-2">
        <label for="media" class="border border-dotted border-[#261D47] flex rounded-2xl w-2/3 gap-3 flex-col justify-center items-center p-5" >
            <img :src="showimg ? showimg : Image" />
            <p class="text-[#261D47]" v-if="!showimg">PNG, JPEG, JPG</p>
        </label>
        <p class="text-[#261D47]">selecionar midia</p>
        <input type="file" id="media" class="hidden " @change="$emit('showImg', $event)" />
    </div>
</template>