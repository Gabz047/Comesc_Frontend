import { ref } from "vue";

export const FormInputs = ref([
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
    options: []
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
    options: []
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
