import { defineStore } from "pinia"
import { LoginInput } from "@/utils"
import { computed } from "vue"
import { UserService } from "@/services"
import { useStorage } from "@vueuse/core/index.mjs"
import router from "@/router"
import { showMessage } from "@/utils/toastify"

export const useAuthStore = defineStore('auth', () => {
  const state = useStorage('userStorage', {
    me: {},
    user: {},
    users: [],
    access: '',
    refresh: '',
    connection: true,
    loading: false,
    error: null
  })

  const user = computed(() => state.value.user)
  const me = computed(() => state.value.me)
  const users = computed(() => state.value.users)
  const refresh = computed(() => state.value.refresh)
  const access = computed(() => state.value.access)
  const error = computed(() => state.value.error)
  const loading = computed(() => state.value.loading)
  const connection = computed(() => state.value.connection)

  async function Login() {
    const subtituteFields = ['email', 'password']
    const SplitFields = LoginInput.value.map(obj => {
      let newObj = { ...obj }
      delete newObj.label
      delete newObj.placeholder
      return newObj
    })

    for (let i = 0; i < SplitFields.length; i++) {
      SplitFields[i][subtituteFields[i]] = SplitFields[i]['value']
      delete SplitFields[i]['value']
    }
    state.value.loading = true
    state.value.connection = false
    try {
      const response = await UserService.GetToken(Object.assign({}, ...SplitFields))
      state.value.access = response.access
      state.value.refresh = response.refresh
      console.log(response)
    }
    catch (error) {
      state.value.error = error
      throw error
    }
    finally {
      state.value.loading = false
      state.value.connection = true
      if (access.value && !error.value) {
        showMessage('Logado com sucesso', 'success', 1000, 'top-right', 'light', false)
        setTimeout(() => {router.push('/employee')}, 1000)
      } else if (error.value && !access.value) {
        showMessage('Credenciais inválidas', 'error', 1000, 'top-right', 'light', false)
        state.value.error = null
      }
    }
  }

  const GetUsers = async () => {
    state.value.loading = true
    try {
      const response = await UserService.GetUsers()
      state.value.users = response
      return response
    } catch (error) {
      state.value.error = error
      throw error
    } finally {
      state.value.loading = false
      state.value.connection = true
    }
  }

  const GetUserById = async (userId) => {
    state.value.loading = true
    try {
      const response = await UserService.GetUserById(userId)
      state.value.user = response
      return response
    } catch (error) {
      state.value.error = error
      throw error
    } finally {
      state.value.loading = false
      state.value.connection = true
    }
  }

  const CreateUser = async (newUser) => {
    state.value.loading = true
    try {
      const response = state.value.users.push(await UserService.CreateUser(newUser))
      return response
    } catch (error) {
      state.value.error = error
      throw error
    } finally {
      state.value.loading = false
    }
  }

  const UpdateUser = async (user) => {
    state.value.loading = true
    try {
      const index = state.value.users.findIndex((s) => s.id === user.id)
      if (index !== -1) {
        state.value.users[index] = await UserService.UpdateUser(user)
      }
    } catch (error) {
      state.value.error = error
      throw error
    } finally {
      state.value.loading = false
    }
  }

  const DeleteUser = async (id) => {
    state.value.loading = true
    try {
      const index = state.value.users.findIndex((s) => s.id === id)
      if (index !== -1) {
        await UserService.DeleteUser(id)
        state.value.users.splice(index, 1)
      }
    } catch (error) {
      state.value.error = error
      throw error
    } finally {
      state.value.loading = false
    }

  }
  return { Login, DeleteUser, CreateUser, GetUserById, UpdateUser, GetUsers, me, loading, users, user, error, connection, refresh, access }
})