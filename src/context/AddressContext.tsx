import {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
  ReactNode
} from 'react'
import { AddressData } from '../types/address'
import { getAddresses } from '../services/storage'

interface AddressContextType {
  addresses: AddressData[]
  refreshAddresses: () => void
}

const AddressContext = createContext<AddressContextType | undefined>(undefined)

export const AddressProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [addresses, setAddresses] = useState<AddressData[]>([])

  const refreshAddresses = () => {
    setAddresses(getAddresses())
  }

  useEffect(() => {
    refreshAddresses()
  }, [])

  return (
    <AddressContext.Provider value={{ addresses, refreshAddresses }}>
      {children}
    </AddressContext.Provider>
  )
}

export const useAddresses = () => {
  const context = useContext(AddressContext)
  if (context === undefined) {
    throw new Error('useAddresses must be used within an AddressProvider')
  }
  return context
}
