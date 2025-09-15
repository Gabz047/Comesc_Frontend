<script setup>
import GlobalInput from '@/components/global/inputs/GlobalInput.vue';
import GlobalButton from '@/components/global/buttons/GlobalButton.vue';
import { FormInputs } from '@/utils/registerBatch';
import { computed, onMounted } from 'vue';
const emit = defineEmits(['changeform'])

function ChangeImg(e) {
    FormInputs.value[FormInputs.value.length - 1].value = e.target.files[0]
    FormInputs.value[FormInputs.value.length - 1].showimg = URL.createObjectURL(e.target.files[0])
}

const disabledBtn = computed(() => {
    return FormInputs.value.some(el => el.value === '')
})

function ChangeForm() {
    emit('changeform')
}

onMounted(() => {
    console.log(disabledBtn.value)
})
</script>
<template>
    <div class="p-5 flex flex-col gap-5">
        <div v-for="info, i in FormInputs" :key="i" class="flex "
            :class="info.media ? 'flex-col gap-10' : 'justify-between items-center'">
            <span class="font-bold">{{ info.title }}:</span>
            <GlobalInput :placeholder="info.placeholder" :media="info.media" :showimg="info.showimg"
                v-model:value="info.value" @showImg="ChangeImg" class_input="bg-[#D9D9D9] p-2 rounded-full outline-0" />
        </div>
        <div class="flex flex-col gap-3 p-10 justify-center items-center">
            <div class="flex gap-5">
                <div class="w-4 h-4 bg-[#261D47] rounded-4xl"></div>
                <div class="w-4 h-4 bg-[#D9D9D9] rounded-4xl"></div>
            </div>
            <GlobalButton :action="ChangeForm" :disabled="disabledBtn" :extra-div="false" title="Proximo"
                :btn-style="`bg-[#261D47] text-white size-auto rounded-full flex justify-center p-2 w-50 ${disabledBtn ? 'opacity-50 cursor-not-allowed' : ''}`" />

        </div>
    </div>
</template>