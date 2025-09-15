import { ref } from "vue";

export const FormInputs = ref([
    {
        title: 'Material',
        placeholder: 'Nome ou Código', 
        value: '',
    },
    {
        title: 'Cor',
        placeholder: 'Nome ou Código',
        value: ''
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
        placeholder: 'Nome ou Código',
        value: ''
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