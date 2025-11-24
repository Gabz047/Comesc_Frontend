<script setup>
import GlobalInput from '@/components/global/inputs/GlobalInput.vue';
import GlobalButton from '@/components/global/buttons/GlobalButton.vue';
import { FormInputs } from '@/utils/registerBatch';
import { computed, onMounted, ref } from 'vue';
import { useSupplierStore } from '@/stores/supplier';
import { useColorStore, useBatchStore } from '@/stores';
const emit = defineEmits(['changeform'])
const supplierStore = useSupplierStore();
const batchStore = useBatchStore();
const colorStore = useColorStore();
function ChangeImg(e) {
  formInputs.value[formInputs.value.length - 1].value = e.target.files[0]
  formInputs.value[formInputs.value.length - 1].showimg = URL.createObjectURL(e.target.files[0])
}

const disabledBtn = computed(() => {
  return formInputs.value.some(el => el.value === '')
})

function ChangeForm() {
  batchStore.state.localFields = formInputs.value
  emit('changeform')
}

onMounted(async () => {
  console.log(disabledBtn.value)
  await supplierStore.GetSuppliers()
  await colorStore.GetColors()
})

const formInputs = ref([
    {
        title: 'Material',
        placeholder: 'Nome ou Código',
        value: '',
    },

     {
    title: 'Cor',
    placeholder: 'Selecione a cor',
    value: '',
    select: true,
    options: colorStore.colors.map(c => ({ value: c.id, label: c.name }))
  },
    {
        title: 'Composição',
        placeholder: 'ex: 80% PA 20% PUE',
        value: ''
    },
    {
        title: 'Nota Fiscal',
        placeholder: 'ex: N 00179',
        value: ''
    },
    {
        title: 'Preço',
        placeholder: 'ex: R$ 25,00',
        value: ''
    },
    {
    title: 'Fornecedor',
    placeholder: 'Selecione o fornecedor',
    value: '',
    select: true,
    options: supplierStore.suppliers.map(s => ({ value: s.id, label: s.name }))
  },
    {
        title: 'Peso',
        placeholder: 'ex: 500kg',
        value: ''
    },
    {
        title: 'Qtd. de Rolos',
        placeholder: 'ex: 12',
        value: ''
    },
    {
        title: 'Imagem da Malha',
        media: true,
        value: '',
        showimg: null
    }
])
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 md:p-8">
    <div class="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-10">
      <!-- Header -->
      <div class="mb-8">
        <h2 class="text-2xl md:text-3xl font-bold text-[#261D47] mb-2">
          Informações do Cadastro
        </h2>
        <p class="text-gray-600">Preencha todos os campos para continuar</p>
      </div>

      <!-- Form Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div v-for="info, i in formInputs" :key="i" :class="info.media ? 'md:col-span-2' : ''"
          class="flex flex-col gap-2">
          <label class="font-semibold text-[#261D47] text-sm md:text-base">
            {{ info.title }}
          </label>
          <GlobalInput :select="info.select" :options="info.options" :placeholder="info.placeholder" :media="info.media" :showimg="info.showimg"
            v-model:value="info.value" @showImg="ChangeImg"
            class_input="bg-gray-100 p-3 rounded-xl outline-none border-2 border-transparent focus:border-[#261D47] transition-colors w-full" />
        </div>
      </div>

      <!-- Progress & Button Section -->
      <div class="flex flex-col items-center gap-6 pt-6 border-t border-gray-200">
        <!-- Progress Dots -->
        <div class="flex gap-3">
          <div class="w-3 h-3 bg-[#261D47] rounded-full transition-all"></div>
          <div class="w-3 h-3 bg-gray-300 rounded-full transition-all"></div>
        </div>

        <!-- Button -->
        <GlobalButton :action="ChangeForm" :disabled="disabledBtn" :extra-div="false" title="Próximo" :btn-style="`
                        bg-[#261D47] text-white rounded-xl px-8 py-3 font-semibold
                        transition-all duration-200 min-w-[200px]
                        ${disabledBtn
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-[#3a2a5f] hover:shadow-lg transform hover:scale-105'
          }
                    `" />
      </div>
    </div>
  </div>
</template>
