<script setup>
const props = defineProps({
  btnStyle: {
    type: String,
    default: "text-[#261D47] w-[120px] h-[50px] rounded-xl",
  },

  middleBtnBtnStyle: {
    type: String,
    default: "bg-[#261D47] w-[120px] h-[40px] rounded-2xl text-white",
  },
  middleBtn: {
    type: Function,
    default: null,
  },
  middletitle: {
    type: String,
    default: "Revisar Lote",
  },

  leftIcon: {
    type: String,
    default: "",
  },
  leftBtn: {
    type: Function,
    default: null,
  },
  lefttitle: {
    type: String,
    default: "Salvar",
  },

  rightIcon: {
    type: String,
    default: "",
  },
  rightBtn: {
    type: Function,
    default: null,
  },
  righttitle: {
    type: String,
    default: "Excluir",
  },

});
</script>

<template>
  <div
    class="flex items-center justify-center bottom-0 bg-white fixed w-screen z-10 pb-3"
  >
    <div class="w-[90%] font-light p-2 shadow-lg shadow-black rounded-xl">
      <button :class="btnStyle" @click="props.leftBtn">
        <i :class="leftIcon" />
        {{ lefttitle }}
      </button>
      <button :class="middleBtnBtnStyle" @click="props.middleBtn">
        {{ middletitle }}
      </button>
      <button :class="btnStyle" @click="props.rightBtn">
        <i :class="rightIcon" />
        {{ righttitle }}
      </button>
    </div>
  </div>
</template>
