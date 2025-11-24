import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useStorage } from '@vueuse/core'
import SupplierService from '@/services/supplier'

export const useSupplierStore = defineStore('supplier', () => {
  const state = useStorage('supplierStorage', {
    suppliers: [],
    selectedSupplier: null,
    supplierById: null,
    connection: false,
    error: null,
    loading: false,
  })

  // --- COMPUTED PROPERTIES ---
  const suppliers = computed(() => state.value.suppliers)
  const supplierById = computed(() => state.value.supplierById)
  const selectedSupplier = computed(() => state.value.selectedSupplier)
  const isLoading = computed(() => state.value.loading)
  const suppliersCount = computed(() => state.value.suppliers.length)

  // --- ACTIONS ---
  const GetSuppliers = async () => {
    state.value.loading = true
    try {
      const response = await SupplierService.GetSuppliers()
      state.value.suppliers = response
      return response
    } catch (error) {
      state.value.error = error
      throw error
    } finally {
      state.value.loading = false
      state.value.connection = true
    }
  }

  const GetSupplierById = async (supplierId) => {
    state.value.loading = true
    try {
      const response = await SupplierService.GetSupplierById(supplierId)
      state.value.supplierById = response
      return response
    } catch (error) {
      state.value.error = error
      throw error
    } finally {
      state.value.loading = false
      state.value.connection = true
    }
  }

  const CreateSupplier = async (newSupplier) => {
    state.value.loading = true
    try {
      const createdSupplier = await SupplierService.CreateSupplier(newSupplier)
      state.value.suppliers.push(createdSupplier)
      return createdSupplier
    } catch (error) {
      state.value.error = error
      throw error
    } finally {
      state.value.loading = false
    }
  }

  const UpdateSupplier = async (supplier) => {
    state.value.loading = true
    try {
      const index = state.value.suppliers.findIndex((s) => s.id === supplier.id)
      if (index !== -1) {
        state.value.suppliers[index] = await SupplierService.UpdateSupplier(supplier)
      }
    } catch (error) {
      state.value.error = error
      throw error
    } finally {
      state.value.loading = false
    }
  }

  const DeleteSupplier = async (supplierId) => {
    state.value.loading = true
    try {
      const index = state.value.suppliers.findIndex((s) => s.id === supplierId)
      if (index !== -1) {
        await SupplierService.DeleteSupplier(supplierId)
        state.value.suppliers.splice(index, 1)
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
    suppliers,
    supplierById,
    selectedSupplier,
    isLoading,
    suppliersCount,
    GetSuppliers,
    GetSupplierById,
    CreateSupplier,
    UpdateSupplier,
    DeleteSupplier,
  }
})
