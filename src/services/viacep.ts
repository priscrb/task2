import { ViaCEPResponse } from '../types/address'

class ViaCEPError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ViaCEPError'
  }
}

export const fetchAddressByCEP = async (
  cep: string
): Promise<ViaCEPResponse> => {
  // Remove any non-digit characters from CEP
  const cleanCEP = cep.replace(/\D/g, '')

  if (cleanCEP.length !== 8) {
    throw new ViaCEPError('CEP must have 8 digits')
  }

  const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`)

  if (!response.ok) {
    throw new ViaCEPError('Failed to fetch address')
  }

  const data = await response.json()

  if (data.erro) {
    throw new ViaCEPError('CEP not found')
  }

  return data
}
