import api from '@/plugins/api'

class ColorService {

  async GetColor() {
    try{
      const response = await api.get('/color/')
      return response.data
    }catch (error){
      console.log('error in GetColor', error)
      throw error
    }
  }

  async GetColorById(colorId) {
    try{
      const response = await api.get(`/color/?page=1&id=${colorId}`)
      return response.data
    }catch (error){
      console.log('error in GetColorById', error)
      throw error
    }
  }

  async CreateColor(newColor) {
    try{
      const response = await api.post('/color/', newColor)
      return response.data
    }catch (error){
      console.log('error in CreateColor', error)
      throw error
    }
  }

  async UpdateColor(color) {
    try{
      const response = await api.put(`/color/${color.id}/`, color)
      return response.data
    }catch (error){
      console.log('error in UpdateColor', error)
      throw error
    }
  }

  async DeleteColor(colorId) {
    try{
      const response = await api.delete(`/color/${colorId}/`)
      return response.data
    }catch (error){
      console.log('error in DeleteColor', error)
      throw error
    }
  }
}

export default new ColorService()
