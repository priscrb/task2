export interface ViaCEPResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

export interface AddressData extends ViaCEPResponse {
  id: string
  username: string
  addressName: string
  createdAt: number
}
