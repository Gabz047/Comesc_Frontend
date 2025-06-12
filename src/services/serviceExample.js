import api from '@/plugins/api'

/**
 * Service class for handling objects related operations.
 */
class ExampleService {
  /**
   * Retrieves all objects.
   * @returns {Promise<Array>} A promise that resolves to an array of objects.
   * @throws {Error} If an error occurs while retrieving the objects.
   */
  async getAny() {
    try {
      const { data } = await api.get(`/url-here`)
      return data.results
    } catch (error) {
      console.log('error in getAny', error)
      throw error
    }
  }

  /**
   * Retrieves all objects.
   * @returns {Promise<Array>} A promise that resolves to an array of objects filtered by systems.
   * @throws {Error} If an error occurs while retrieving the objects.
   */
    async getAnyById(anyId) {
      try {
        const { data } = await api.get(`/url-here/?page=1&id=${anyId}`)
        return data.results
      } catch (error) {
        console.log('error in getAny', error)
        throw error
      }
    }


  /**
   * Creates a new objects.
   * @param {Object} newSpecie - The new objects object to create.
   * @returns {Promise<Object>} A promise that resolves to the created objects object.
   * @throws {Error} If an error occurs while creating the objects.
   */
  async createAny(newAny) {
    try {
      const { data } = await api.post(`/url-here/`, newAny)
      return data.results
    } catch (error) {
      console.log('error in createAny', error)
      throw error
    }
  }

  /**
   * Updates an existing objects.
   * @param {Object} specie - The objects object to update.
   * @returns {Promise<Object>} A promise that resolves to the updated objects object.
   * @throws {Error} If an error occurs while updating the objects.
   */
  async updateAny(any) {
    try {
      const { data } = await api.put(`/url-here/${any.id}/`, any)
      return data.results
    } catch (error) {
      console.log('error in updateAny')
      throw error
    }
  }

  /**
   * Deletes a objects by its ID.
   * @param {number} id - The ID of the objects to delete.
   * @returns {Promise<Object>} A promise that resolves to the deleted objects object.
   * @throws {Error} If an error occurs while deleting the objects.
   */
  async deleteAny(id) {
    try {
      const { data } = await api.delete(`/url-here/${id}/`)
      return data.results
    } catch (error) {
      console.log('error in deleteAny', error)
      throw error
    }
  }
}

export default new ExampleService()
