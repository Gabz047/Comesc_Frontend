import { defineStore } from 'pinia'
import { computed } from 'vue'
import { RollService } from '@/services'
import { useStorage } from '@vueuse/core'

export const useRollStore = defineStore('roll', () => {
  const state = useStorage('rollStorage', {
    rolls: [],
    selectedRoll: null,
    rollById: null,
    connection: false,
    error: null,
    loading: false,
  })

  const roll = computed(() => state.value.rolls)
  const rollById = computed(() => state.value.rollById)
  const selectedRoll = computed(() => state.value.selectedRoll)
  const isLoading = computed(() => state.value.loading)
  const rollsCount = computed(() => state.value.rolls.length)

  const GetRolls = async () => {
    state.value.loading = true
    try {
      const response = await RollService.GetRolls()
      state.value.rolls = response
      return response
    } catch (error) {
      state.value.error = error
      throw error
    } finally {
      state.value.loading = false
      state.value.connection = true
    }
  }

  const GetRollById = async (rollId) => {
    state.value.loading = true
    try {
      const response = await RollService.GetRollById(rollId)
      state.value.rollById = response
      return response
    } catch (error) {
      state.value.error = error
      throw error
    } finally {
      state.value.loading = false
      state.value.connection = true
    }
  }

  const CreateRoll = async (newRoll) => {
    state.value.loading = true
    try {
      const createdRoll = await RollService.CreateRoll(newRoll)
      state.value.rolls.push(createdRoll)
      return createdRoll
    } catch (error) {
      state.value.error = error
      throw error
    } finally {
      state.value.loading = false
    }
  }

  const UpdateRoll = async (roll) => {
    state.value.loading = true
    try {
      const index = state.value.rolls.findIndex((r) => r.production_order === roll.production_order)
      if (index !== -1) {
        state.value.rolls[index] = await RollService.UpdateRoll(roll)
      }
    } catch (error) {
      state.value.error = error
      throw error
    } finally {
      state.value.loading = false
    }
  }

  const DeleteRoll = async (productionOrder) => {
    state.value.loading = true
    try {
      const index = state.value.rolls.findIndex((r) => r.production_order === productionOrder)
      if (index !== -1) {
        await RollService.DeleteRoll(productionOrder)
        state.value.rolls.splice(index, 1)
      }
    } catch (error) {
      state.value.error = error
      throw error
    } finally {
      state.value.loading = false
    }
  }

  return {
    state,
    roll,
    rollById,
    selectedRoll,
    isLoading,
    rollsCount,
    GetRolls,
    GetRollById,
    CreateRoll,
    UpdateRoll,
    DeleteRoll,
  }
})
