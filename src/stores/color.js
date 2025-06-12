import { defineStore } from 'pinia'
import { computed } from 'vue'
import { ColorService } from '@/services'
import { useStorage } from '@vueuse/core'

export const useColorStore = defineStore('color', () => {
  const state = useStorage( 'colorStorage', {
    colors: [],
    selectedColor: null,
    colorById: null,
    connection: false,
    error: null,
    loading: false,
  })

  const colors = computed(() => state.value.colors)
  const colorById = computed(() => state.value.colorById)
  const selectedColor = computed(() => state.value.selectedColor)
  const isLoading = computed(() => state.value.loading)
  const colorsCount = computed(() => state.value.colors.length)

  const GetColors = async () => {
    state.value.loading = true
    try {
      const response = await ColorService.GetColor()
      state.value.colors = response
      return response
    } catch (error) {
      state.value.error = error
      throw error
    }finally {
      state.value.loading = false
      state.value.connection = true
    }
  }

  const GetColorById = async (colorId) => {
    state.value.loading = true
    try {
      const response = await ColorService.GetColorById(colorId)
      state.value.colorById = response
      return response
    } catch (error) {
      state.value.error = error
      throw error
    }finally {
      state.value.loading = false
      state.value.connection = true
    }
  }

const CreateColor = async (newColor) => {
    state.value.loading = true
    try {
      const response = state.value.colors.push(await ColorService.CreateColor(newColor))
      return response
    } catch (error) {
      state.value.error = error
      throw error
    } finally {
      state.value.loading = false
    }
  }

  const UpdateColor = async (color) => {
    state.value.loading = true
    try {
      const index = state.value.colors.findIndex((s) => s.id === color.id)
      if (index !== -1) {
        state.value.colors[index] = await ColorService.UpdateColor(color)
      }
    } catch (error) {
      state.value.error = error
      throw error
    } finally {
      state.value.loading = false
    }
  }

  const DeleteColor = async (id) => {
    state.value.loading = true
    try {
      const index = state.value.colors.findIndex((s) => s.id === id)
      if (index !== -1) {
        await ColorService.DeleteColor(id)
        state.value.colors.splice(index, 1)
      }
    } catch (error) {
      state.value.error = error
      throw error
    } finally {
      state.value.loading = false
    }
  }

  return{
    state,
    colors,
    colorById,
    selectedColor,
    isLoading,
    colorsCount,
    UpdateColor,
    GetColors,
    GetColorById,
    CreateColor,
    DeleteColor,
  }

})
