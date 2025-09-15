<script setup>
    import GlobalButton from '../global/buttons/GlobalButton.vue';
    import { InfoBtn } from '@/utils/info_buttons';
    import router from '@/router';

    const props = defineProps({
        id_batch: {
            type: String,
            required: true
        }
    })

    function verifyTitle(param){
        if(param === 'Revisar'){
            router.push(`/batch/review_batch/${props.id_batch}`)
        }
    }

</script>
<template>
<div class="fixed bottom-0 w-full p-5 bg-white shadow-[20px_20px_20px_0_black] z-[9999]">
    <div class="flex justify-center align-center gap-7 ">
        <GlobalButton v-for="btn, i in InfoBtn" :key="i" :extraDiv="btn.extra_div" :title="btn.title" :icon="btn.icon" :btnStyle="btn.btn_style" :color_text="btn.text_color" :action="() => verifyTitle(btn.title)"/>
    </div>
</div>
</template>