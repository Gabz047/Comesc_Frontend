import { defineStore } from 'pinia'
import { computed } from 'vue'
import { serviceExample } from '@/services'
import { useStorage } from '@vueuse/core'

/**
 * Store for managing anys data.
 * @typedef {Object} AnyStore
 * @property {Object} state - The state object containing anys data.
 * @property {Array} state.anys - The array of anys.
 * @property {Object|null} state.selectedAny - The currently selected any.
 * @property {boolean} state.loading - Indicates if data is currently being loaded.
 * @property {Error|null} state.error - The error object, if any.
 * @property {boolean} isLoading - Computed property indicating if data is currently being loaded.
 * @property {number} anysCount - Computed property indicating the number of anys.
 * @property {Function} getAnys - Function to fetch anys data.
 * @property {Function} getAnyById - Function to fetch a single any by ID.
 * @property {Function} createAny - Function to create a new any.
 * @property {Function} updateAny - Function to update an existing any.
 * @property {Function} deleteAny - Function to delete a any.
 */

/**
 * Creates a new instance of the any store.
 * @function useAnyStorage
 * @returns {AnyStore} The any store instance.
 */
export const useAnyStore = defineStore('any', () => {
  const state = useStorage('anyStorage', {
    anys: [],
    selectedAny: null,
    anyById: null,
    loading: false,
    error: null,
    connection: false
  })

  const anys = computed(() => state.value.anys)
  const anyById = computed(() => state.value.anyById)
  const selectedAny = computed(() => state.value.selectedAny)
  const isLoading = computed(() => state.value.loading)
  const anysCount = computed(() => state.value.anys.length)

  /**
   * Fetches anys data.
   * @async
   * @function getAnys
   */
  const getAnys = async () => {
    state.value.loading = true
    try {
      state.value.anys = await serviceExample.getAny()
    } catch (error) {
      state.value.error = error
      throw error
    } finally {
      state.value.loading = false
      state.value.connection = true
    }
  }

  /**
   * Fetches a single any by ID.
   * @async
   * @function getAnyById
   * @param {number} anyId - The ID of the any to fetch.
   */
  const getAnyById = async (anyId) => {
    state.value.loading = true
    try {
      const response = await serviceExample.getAnyById(anyId)
      state.value.anyById = response
      return response
    } catch (error) {
      state.value.error = error
      throw error
    } finally {
      state.value.loading = false
      state.value.connection = true
    }
  }

  /**
   * Creates a new any.
   * @async
   * @function createAny
   * @param {Object} newAny - The new any to create.
   */
  const createAny = async (newAny) => {
    state.value.loading = true
    try {
      state.value.anys.push(await serviceExample.createAny(newAny))
    } catch (error) {
      state.value.error = error
      throw error
    } finally {
      state.value.loading = false
    }
  }

  /**
   * Updates an existing any.
   * @async
   * @function updateAny
   * @param {Object} any - The any object to update.
   */
  const updateAny = async (any) => {
    state.value.loading = true
    try {
      const index = state.value.anys.findIndex((s) => s.id === any.id)
      if (index !== -1) {
        state.value.anys[index] = await serviceExample.updateAny(any)
      }
    } catch (error) {
      state.value.error = error
      throw error
    } finally {
      state.value.loading = false
    }
  }

  /**
   * Deletes an any.
   * @async
   * @function deleteAny
   * @param {number} id - The ID of the any to delete.
   */
  const deleteAny = async (id) => {
    state.value.loading = true
    try {
      const index = state.value.anys.findIndex((s) => s.id === id)
      if (index !== -1) {
        state.value.anys.splice(index, 1)
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
    isLoading,
    anysCount,
    anys,
    anyById,
    selectedAny,
    getAnys,
    getAnyById,
    createAny,
    updateAny,
    deleteAny
  }
})
