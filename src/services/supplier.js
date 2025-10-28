import api from '@/plugins/api'

class SupplierService {
  async GetSuppliers() {
    try {
      const response = await api.get('/supplier/')
      return response.data
    } catch (error) {
      console.log('error in GetSuppliers', error)
      throw error
    }
  }

  async GetSupplierById(supplierId) {
    try {
      const response = await api.get(`/supplier/${supplierId}/`)
      return response.data
    } catch (error) {
      console.log('error in GetSupplierById', error)
      throw error
    }
  }

  async CreateSupplier(newSupplier) {
    try {
      const response = await api.post('/supplier/', newSupplier)
      return response.data
    } catch (error) {
      console.log('error in CreateSupplier', error)
      throw error
    }
  }

  async UpdateSupplier(supplier) {
    try {
      const response = await api.put(`/supplier/${supplier.id}/`, supplier)
      return response.data
    } catch (error) {
      console.log('error in UpdateSupplier', error)
      throw error
    }
  }

  async DeleteSupplier(supplierId) {
    try {
      const response = await api.delete(`/supplier/${supplierId}/`)
      return response.data
    } catch (error) {
      console.log('error in DeleteSupplier', error)
      throw error
    }
  }
}

export default new SupplierService()
