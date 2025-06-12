
import { defineStore } from 'pinia';
import {computed} from 'vue';
import { AddressService } from '@/services';
import { useStorage } from '@vueuse/core';

export const useAddressStore = defineStore('address', () => {

  const state = useStorage('addressStorage', {
    address: [],
    selectedAddress: null,
    addressById: null,
    error: null,
    conected: false
  })

  const address = computed(() => state.value.address)
  const addressById = computed(() => state.value.addressById)
  const selectedAddress = computed(() => state.value.selectedAddress)
  const conected = computed(() => state.value.loading)

  const  GetAddress = async () => {
    state.value.loading = true
    try {
      const response = await AddressService.GetAddress();
      state.value.address = response;
      return response
    }
    catch (error){
      state.value.error = error
      throw error
    }
    finally {
      state.value.loading = false
      state.value.conected = true
    }
  }

  const GetAddressById = async (addressId) => {
    state.value.loading = true
    try {
      const response = await AddressService.GetAddressById(addressId)
      state.value.addressById = response
      return response
    } catch (error) {
      state.value.error = error
      throw error
    } finally {
      state.value.loading = false
      state.value.conected = true
    }
  }

  const CreateAddress = async (newAddress) => {
    state.value.loading = true
    try{
      const response = await AddressService.CreateAddress(newAddress)
      state.value.addressById = response
      return response
    }catch (error){
      state.value.error = error
      throw error
    }finally{
      state.value.loading = false
    }
  }

    const UpdateAddress = async (address) => {
      state.value.loading = true
      try {
        const index = state.value.address.findIndex((s) => s.id === address.id)
        if (index !== -1) {
          state.value.address[index] = await AddressService.UpdateAddress(address)
        }
      } catch (error) {
        state.value.error = error
        throw error
      } finally {
        state.value.loading = false
      }
    }

    const DeleteAddress = async (id) => {
      state.value.loading = true
      try {
        const index = state.value.address.findIndex((s) => s.id === id)
        if (index !== -1) {
          await AddressService.DeleteAddress(id)
          state.value.address.splice(index, 1)
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
  address,
  addressById,
  selectedAddress,
  conected,
  GetAddress,
  GetAddressById,
  CreateAddress,
  UpdateAddress,
  DeleteAddress
  }

},)



