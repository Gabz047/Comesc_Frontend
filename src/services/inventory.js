import api from '@/plugins/api'

class InventoryService {

  async GetInventory() {
    try{
      const response = await api.get('/inventory/')
      return response.data
    }catch (error){
      console.log('error in GetInventory', error)
      throw error
    }
  }

  async GetInventoryById(inventoryId) {
    try{
      const response = await api.get(`/inventory/?page=1&id=${inventoryId}`)
      return response.data
    }catch (error){
      console.log('error in GetInventoryById', error)
      throw error
    }
  }

  async CreateInventory(newInventory) {
    try{
      const response = await api.post('/inventory/', newInventory)
      return response.data
    }catch (error){
      console.log('error in CreateInventory', error)
      throw error
    }
  }

  async UpdateInventory(inventory) {
    try{
      const response = await api.put(`/inventory/${inventory.id}/`, inventory)
      return response.data
    }catch (error){
      console.log('error in Updateinventory', error)
      throw error
    }
  }

  async DeleteInventory(inventoryId) {
    try{
      const response = await api.delete(`/inventory/${inventoryId}/`)
      return response.data
    }catch (error){
      console.log('error in DeleteInventory', error)
      throw error
    }
  }
}

export default new InventoryService()
