import api from '@/plugins/api'

class UserService{

async GetUsers() {
  try {
    const response = await api.get('/usuarios/')
    return response.data
  }
  catch (error) {
    console.log('error in GetUsers', error)
    throw error
  }
}

async GetToken(user){
    try {
    const response = await api.post('/token/', user)
    return response.data
  }
  catch (error) {
    console.log('error in GetToken', error)
    throw error
  }
}

async GetUserById(UserId) {
    try {
      const response = await api.get(`/usuarios/?page=1&id=${UserId}`)
      return response.data
    } catch (error) {
      console.log('error in getUserById', error)
      throw error
    }
}

async CreateUser(newUser) {
    try {
      const response = await api.post(`/usuarios/`, newUser)
      return response.data
    } catch (error) {
      console.log('error in createUser', error)
      throw error
    }
  }

  async UpdateUser(user) {
    try {
      const response = await api.put(`/usuarios/${user.id}/`, user)
      return response.data
    } catch (error) {
      console.log('error in UpdateUser', error)
      throw error
    }
  }

  async DeleteUser(id) {
    try {
      const response = await api.delete(`/usuarios/${id}/`)
      return response.data
    } catch (error) {
      console.log('error in deleteUser', error)
      throw error
    }
  }

}

export default new UserService();
