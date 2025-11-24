import api from '@/plugins/api'

class MaterialService {

  async GetMaterials() {
    try {
      const response = await api.get('/roll/')
      return response.data
    } catch (error) {
      console.log('error in GetRolls', error)
      throw error
    }
  }

  async GetRollById(rollId) {
    try {
      const response = await api.get(`/roll/${rollId}/`)
      return response.data
    } catch (error) {
      console.log('error in GetRollById', error)
      throw error
    }
  }

  async CreateRoll(newRoll) {
    try {
      const response = await api.post('/roll/', newRoll)
      return response.data
    } catch (error) {
      console.log('error in CreateRoll', error)
      throw error
    }
  }

  async UpdateRoll(roll) {
    try {
      const response = await api.put(`/roll/${roll.production_order}/`, roll)
      return response.data
    } catch (error) {
      console.log('error in UpdateRoll', error)
      throw error
    }
  }

  async DeleteRoll(rollId) {
    try {
      const response = await api.delete(`/roll/${rollId}/`)
      return response.data
    } catch (error) {
      console.log('error in DeleteRoll', error)
      throw error
    }
  }
}

export default new RollService()
