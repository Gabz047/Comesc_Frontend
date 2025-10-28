import { ref } from 'vue'
export const
InfoBtn = ref([
    {
        title: 'Editar',
        icon: 'mdi-pencil',
        text_color: 'text-black',
        btn_style: 'text-white size-auto rounded-full flex flex-row-reverse justify-center',
    },
    {
        title: 'Revisar',
        extra_div: false,
        btn_style: 'bg-[#2C2149] p-1 w-48 rounded-xl',
        action: function(param){
            () => param
        },
        to: '/batch/review_batch'
    },
    {
        title: 'Excluir',
        icon: 'mdi-folder-remove',
        text_color: 'text-black',
        btn_style: 'text-white size-auto rounded-full flex flex-row-reverse justify-center'
    }
])
