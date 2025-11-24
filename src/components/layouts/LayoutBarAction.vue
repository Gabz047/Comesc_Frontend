<script setup>
import GlobalButton from '../global/buttons/GlobalButton.vue';
import { InfoBtn } from '@/utils/info_buttons';
import router from '@/router';
import { onMounted } from 'vue';
import { ref, watch } from 'vue';
import { useReportStore } from '@/stores';
const reportStore = useReportStore()

const props = defineProps({
  id_batch: {
    type: String,
    required: true
  },
  status: {
    type: Object,
    required: true
  }
})
const localstatus = ref(props.status)

watch(() => props.status, (newValue) => {
  localstatus.value = newValue

  if(newValue.Status !== "pendente"){
    InfoBtn.value[1].title = "Gerar Relátorio"
  }
})

async function verifyTitle(param) {
  if (param === 'Revisar') {
    router.push(`/batch/review_batch/${props.id_batch}`)
  }
  else if(param === 'Gerar Relátorio'){
    await reportStore.generateReport(props.id_batch)
  }
}
</script>

<template>
  <!-- Mobile -->
  <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-30 pb-safe">
    <div class="p-4">
      <div class="flex justify-center items-center gap-4">
        <GlobalButton
          v-for="btn, i in InfoBtn"
          :key="i"
          :extraDiv="btn.extra_div"
          :title="btn.title"
          :icon="btn.icon"
          :btnStyle="btn.btn_style"
          :color_text="btn.text_color"
          :action="() => verifyTitle(btn.title)"
        />
      </div>
    </div>
  </div>

  <!-- Desktop -->
  <div class="hidden lg:block fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-30">
    <div class="max-w-7xl mx-auto px-8 py-6">
      <div class="flex justify-center items-center gap-6">
        <GlobalButton
          v-for="btn, i in InfoBtn"
          :key="i"
          :extraDiv="btn.extra_div"
          :title="btn.title"
          :icon="btn.icon"
          :btnStyle="btn.btn_style"
          :color_text="btn.text_color"
          :action="() => verifyTitle(btn.title)"
          class="hover:scale-105 transition-transform active:scale-95"
        />
      </div>
    </div>
  </div>

  <!-- Spacer to prevent content from being hidden behind the fixed bar -->
  <div class="h-24 lg:h-28"></div>
</template>

<style scoped>
/* Safe area padding for devices with notches */
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}

/* Smooth shadow */
.shadow-2xl {
  box-shadow: 0 -10px 25px -5px rgba(0, 0, 0, 0.1), 0 -8px 10px -6px rgba(0, 0, 0, 0.05);
}
</style>
