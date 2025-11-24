<script setup>
import bgImage from '@/assets/images/tecido_sombras.png'

const props = defineProps({
  hex: String,
  cor: String,
  composition: String,
  amount_pieces: Number,
  price: Number,
});

const infoRows = [
  { label: "Cor:", value: props.cor },
  { label: "Composição:", value: props.composition },
  { label: "Quantidade de peças:", value: props.amount_pieces },
  { label: "Preço:", value: `R$ ${props.price?.toFixed(2).replace('.', ',')}` },
];

</script>

<template>
  <div :style="{ backgroundImage: `url(${bgImage})`}" :class="[`bg-[${props.hex}]`, 'text-white', 'w-full', 'h-76']">
    <div class="flex flex-col gap-4 p-4">
      <h1 class="text-3xl text-center">Shine trilobal</h1>
      <h1 class="text-xl text-center">informações</h1>
    </div>
    <div class="flex flex-col justify-between gap-2 p-4">
      <table>
    <tr v-for="row in infoRows" :key="row.label">
      <td>{{ row.label }}</td>
      <td>{{ row.value }}</td>
    </tr>
  </table>
    </div>
  </div>
</template>
