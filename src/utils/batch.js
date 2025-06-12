import { ref } from "vue"
import { useBatchStore } from "@/stores"

export const selectStatusIcon = (status) => {
        switch (status) {
            case 'pendente':
                return 'mdi mdi-timer-sand'
            case 'em estoque':
                return 'mdi mdi-check-circle'
            case 'com defeito':
                return 'mdi mdi mdi-alert'
            case 'em transporte':
                return 'mdi mdi-truck-fast'
                
        }
    }

export const options = ref([
    {name: 'Todos', value: ''},
    {name: 'Lotes Pendentes', value: 'pendente'},
    {name: 'Em Estoque', value: 'em estoque'},
    {name: 'Com Defeito', value: 'com defeito'},
    {name: 'Em Transporte', value: 'em transporte'}
])

export function useBatchUtils() {
const batchStore = useBatchStore()
    

 const search = async (search) => {
    if (search.length > 0) {
        const filteredData = batchStore.batch.filter((s) => s.invoice.toString().includes(search)
        )
        console.log(batchStore.batch)
        batchStore.state.batchs = filteredData
    } else {
        await batchStore.GetBatchs()
    }
}

 const filterByStatus = async (status) => {
    
    console.log(status)
    if (status != '') {
    await batchStore.GetBatchs()
    const filteredData = batchStore.batch.filter((s) => s.status == status)
    console.log(filteredData)
    batchStore.state.batchs = filteredData
    } else {    
        await batchStore.GetBatchs()
    }
    

}

return {
    filterByStatus,
    search
}

    
}
