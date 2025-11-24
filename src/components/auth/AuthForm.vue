<script setup>
import { GlobalButton, GlobalInput } from '..';
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref, computed } from 'vue';

const props = defineProps({
  inputs_arr: {
    type: Array,
    required: true
  },
})

const authStore = useAuthStore()
const showPassword = ref(false)
const errors = ref({})
const touched = ref({})

onMounted(() => {
  authStore.state.loading = false
})

// Validação de email
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validação de senha
const validatePassword = (password) => {
  return password && password.length >= 6
}

// Validar campo específico
const validateField = (field) => {
  touched.value[field.label] = true

  if (field.label.toLowerCase().includes('email') || field.label.toLowerCase().includes('e-mail')) {
    if (!field.value) {
      errors.value[field.label] = 'Email é obrigatório'
    } else if (!validateEmail(field.value)) {
      errors.value[field.label] = 'Email inválido'
    } else {
      delete errors.value[field.label]
    }
  } else if (field.label.toLowerCase().includes('senha')) {
    if (!field.value) {
      errors.value[field.label] = 'Senha é obrigatória'
    } else if (!validatePassword(field.value)) {
      errors.value[field.label] = 'Senha deve ter no mínimo 6 caracteres'
    } else {
      delete errors.value[field.label]
    }
  } else {
    if (!field.value) {
      errors.value[field.label] = `${field.label} é obrigatório`
    } else {
      delete errors.value[field.label]
    }
  }
}

// Verifica se o formulário é válido
const isFormValid = computed(() => {
  return Object.keys(errors.value).length === 0 &&
         props.inputs_arr.every(input => input.value && input.value.trim() !== '')
})

// Manipular login com validação
const handleLogin = () => {
  // Validar todos os campos
  props.inputs_arr.forEach(field => validateField(field))

  if (isFormValid.value) {
    authStore.Login()
  }
}

// Alternar visibilidade da senha
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="flex min-w-2/4 flex-col justify-center items-center p-10 gap-5 mt-2">
    <div v-for="(info, i) in inputs_arr" :key="i" class="w-full relative">
      <label
        :for="`input-${i}`"
        class="block text-sm font-medium text-gray-700 mb-2"
      >
        {{ info.label }}
      </label>

      <div class="relative">
        <GlobalInput
          :id="`input-${i}`"
          :label="''"
          :placeholder="info.placeholder"
          v-model:value="info.value"
          :type="info.label.toLowerCase().includes('senha') && !showPassword ? 'password' : 'text'"
          :class_input="`outline-0 border ${
            touched[info.label] && errors[info.label]
              ? 'border-red-500 focus:border-red-500'
              : 'border-neutral-400 focus:border-[#2C2149]'
          } rounded-lg p-4 w-full pr-12 transition-colors`"
          class="w-full"
          @blur="validateField(info)"
          @input="validateField(info)"
        />

        <!-- Ícone de olho para senha -->
        <button
          v-if="info.label.toLowerCase().includes('senha')"
          type="button"
          @click="togglePasswordVisibility"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#2C2149] transition-colors focus:outline-none"
          tabindex="-1"
        >
          <svg
            v-if="!showPassword"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
          </svg>
        </button>

        <!-- Ícone de validação -->
        <div
          v-if="touched[info.label] && info.value"
          class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          :class="info.label.toLowerCase().includes('senha') ? 'right-12' : 'right-3'"
        >
          <svg
            v-if="!errors[info.label]"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-green-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>

      <!-- Mensagem de erro -->
      <transition name="error">
        <p
          v-if="touched[info.label] && errors[info.label]"
          class="text-red-500 text-sm mt-1 flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          {{ errors[info.label] }}
        </p>
      </transition>
    </div>

    <div class="flex justify-center items-center mt-10 flex-col gap-3 w-full">
      <GlobalButton
        title="Entrar"
        :action="handleLogin"
        :extra-div="false"
        :btn-style="`${
          isFormValid
            ? 'bg-[#2C2149] hover:bg-[#3d2d5f] cursor-pointer'
            : 'bg-gray-400 cursor-not-allowed'
        } transition-all flex justify-center items-center p-3 w-64 text-xl rounded-4xl text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95`"
      />

      <a
        href="#"
        class="text-sm text-gray-600 hover:text-[#2C2149] transition-colors mt-2"
      >
        Esqueceu sua senha?
      </a>
    </div>
  </div>
</template>

<style scoped>
.error-enter-active, .error-leave-active {
  transition: all 0.3s ease;
}

.error-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.error-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Animação de shake para erro */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.shake {
  animation: shake 0.5s ease-in-out;
}
</style>
