import { AddressData } from '../types/address'

const STORAGE_KEY = 'address_book'

export const saveAddress = (address: AddressData): void => {
  const addresses = getAddresses()
  addresses.push(address)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses))
}

export const getAddresses = (): AddressData[] => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export const deleteAddress = (id: string): void => {
  const addresses = getAddresses()
  const filteredAddresses = addresses.filter((address) => address.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredAddresses))
}

export const updateAddress = (
  id: string,
  updates: Partial<AddressData>
): void => {
  const addresses = getAddresses()
  const index = addresses.findIndex((address) => address.id === id)

  if (index !== -1) {
    addresses[index] = { ...addresses[index], ...updates }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses))
  }
}
