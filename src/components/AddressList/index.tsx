import { FC, useState, useEffect } from 'react'
import {
  getAddresses,
  deleteAddress,
  updateAddress
} from '../../services/storage'
import { AddressData } from '../../types/address'
import toast from 'react-hot-toast'

const AddressList: FC = () => {
  const [addresses, setAddresses] = useState<AddressData[]>([])
  const [filters, setFilters] = useState({
    username: '',
    city: '',
    state: '',
    addressName: ''
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  useEffect(() => {
    setAddresses(getAddresses())
  }, [])

  const handleDelete = (id: string) => {
    deleteAddress(id)
    setAddresses(getAddresses())
    toast.success('Address deleted successfully!')
  }

  const handleEdit = (id: string, currentName: string) => {
    setEditingId(id)
    setEditName(currentName)
  }

  const handleSaveEdit = (id: string) => {
    updateAddress(id, { addressName: editName })
    setAddresses(getAddresses())
    setEditingId(null)
    toast.success('Address name updated successfully!')
  }

  const filteredAddresses = addresses.filter((address) => {
    const matchesUsername = address.username
      .toLowerCase()
      .includes(filters.username.toLowerCase())
    const matchesCity = address.localidade
      .toLowerCase()
      .includes(filters.city.toLowerCase())
    const matchesState = address.uf
      .toLowerCase()
      .includes(filters.state.toLowerCase())
    const matchesAddressName = address.addressName
      .toLowerCase()
      .includes(filters.addressName.toLowerCase())

    return matchesUsername && matchesCity && matchesState && matchesAddressName
  })

  return (
    <div className="mt-8">
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <input
          type="text"
          placeholder="Filter by username"
          className="rounded-md border border-gray-300 px-3 py-2"
          value={filters.username}
          onChange={(e) => setFilters({ ...filters, username: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by city"
          className="rounded-md border border-gray-300 px-3 py-2"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by state"
          className="rounded-md border border-gray-300 px-3 py-2"
          value={filters.state}
          onChange={(e) => setFilters({ ...filters, state: e.target.value })}
        />
        <input
          type="text"
          placeholder="Search by address name"
          className="rounded-md border border-gray-300 px-3 py-2"
          value={filters.addressName}
          onChange={(e) =>
            setFilters({ ...filters, addressName: e.target.value })
          }
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Address Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Street
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                State
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                CEP
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredAddresses.map((address) => (
              <tr key={address.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  {editingId === address.id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="rounded-md border border-gray-300 px-2 py-1"
                      />
                      <button
                        onClick={() => handleSaveEdit(address.id)}
                        className="text-sm text-green-600 hover:text-green-800"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    address.addressName
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {address.username}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {address.logradouro}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {address.localidade}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{address.uf}</td>
                <td className="whitespace-nowrap px-6 py-4">{address.cep}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <button
                    onClick={() => handleEdit(address.id, address.addressName)}
                    className="mr-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AddressList
