import api from '@/plugins/api'

class AddressService{

  async GetAddress() {
  try {
    const response = await api.get('/address')
    return response.data
  }
  catch (error) {
    console.log('error in GetAdress', error)
    throw error
  }
}

async GetAddressById(addressId) {
    try {
      const response = await api.get(`/api/?page=1&id=${addressId}`)
      return response.data
    } catch (error) {
      console.log('error in getAddressById', error)
      throw error
    }
  }

async CreateAddress(newAddress) {
    try {
      const response = await api.post(`/api/`, newAddress)
      return response.data
    } catch (error) {
      console.log('error in createAddress', error)
      throw error
    }
  }

  async UpdateAddress(address) {
    try {
      const response = await api.put(`/api/${address.id}/`, address)
      return response.data
    } catch (error) {
      console.log('error in updateAddress', error)
      throw error
    }
  }

  async DeleteAddress(id) {
    try {
      const response = await api.delete(`/api/${id}/`)
      return response.data
    } catch (error) {
      console.log('error in deleteAddress', error)
      throw error
    }
  }

}

export default new AddressService();
