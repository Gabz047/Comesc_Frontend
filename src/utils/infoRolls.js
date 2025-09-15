import { ref } from "vue"
import { FormInputs } from "./registerBatch"

export const infoRolls = ref([
    {
        title: 'Material',
        value: FormInputs.value[0].value
    },
    {
        title: 'Cor',
        value: FormInputs.value[1].value
    },
    {
        title: 'Ordem de Produção',
        value: '1'
    },
    {
        title: 'Peso',
        value: ''
    }
])