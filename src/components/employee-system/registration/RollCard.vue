<script setup>
    defineProps(
        {
            kg: {
                type: Number,
                required: true
            },
            defective: {
                type: Boolean,
                default: false,
                required: true
            }
        }
        
    )
</script>
<template>
    <div class="p-5">
        <div class="w-full bg-white flex justify-between p-4 rounded-lg">
            <div class="flex items-center justify-center gap-2">
                <div class="w-5 h-5 rounded-full" :class="defective ? 'bg-red-500' : 'bg-[#D9D9D9]'"></div>
            </div>
            <p>{{ kg }} kg</p>
            <p><i class="mdi mdi-pencil"></i>Editar</p>
        </div>
    </div>
</template>