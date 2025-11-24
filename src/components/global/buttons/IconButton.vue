<script setup>
import { RouterLink } from "vue-router";



const emit = defineEmits(["click"]);
const props = defineProps({
  btnClass: {
    type: String,
    default: "text-white size-auto rounded-full",
  },
  title: {
    type: String,
    default: "text-here",
  },
  titleClass: {
    type: String,
    default: "",
  },
  action: {
    type: Function,
    default: null,
  },
  to: {
    type: String,
    default: null,
  },
});

function handleClick(event) {
  emit("click", event);
  if (props.action) {
    props.action(event);
  }
}
</script>
<template>
  <div class="hover-customize" v-if="props.to">
    <RouterLink v-if="props.to" :to="props.to">
      <button :class="props.btnClass" @click="handleClick">
        <slot>

        </slot>
        <h4 :class="props.titleClass">{{
          props.title
        }}</h4>
      </button>
    </RouterLink>
  </div>

  <div class="hover-customize" v-else>
    <button :class="props.btnClass" @click="handleClick">
      <slot>

      </slot>
      <h4 :class="props.titleClass">{{ props.title }}</h4>
    </button>
  </div>
</template>

<style scoped>
.hover-customize {
  transition: all 0.2s ease;
  cursor: pointer;
}

.hover-customize:hover {
  cursor: pointer;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
