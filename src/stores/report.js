import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { reportBatch } from '@/services/report'

export const useReportStore = defineStore('report', () => {
    const state = reactive({
      loading: false,
      error: null,
      connection: true
    })

    const loading = computed(() => state.loading)
    const error = computed(() => state.error)
    const connection = computed(() => state.connection)

  const generateReport = async (batchId) => {
    state.loading = true
    state.error = null
    state.connection = false
    try {
      const response = await reportBatch(batchId)
      return response
    } catch (error) {
      state.error = error
      throw error
    }
    finally {
      state.loading = false
      state.connection = true
    }

  }

  return {
    generateReport,
    loading,
    error,
    connection
  }
})
