import { FC, useState, useCallback } from 'react'
import { deleteAddress, updateAddress } from '../../services/storage'
import toast from 'react-hot-toast'
import { useAddresses } from '../../context/AddressContext'
import Modal from '../Modal'

const AddressList: FC = () => {
  const { addresses, refreshAddresses } = useAddresses()
  const [filters, setFilters] = useState({
    username: '',
    city: '',
    state: '',
    addressName: ''
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null)

  const handleDelete = useCallback((id: string) => {
    setAddressToDelete(id)
    setDeleteModalOpen(true)
  }, [])

  const confirmDelete = useCallback(() => {
    if (addressToDelete) {
      deleteAddress(addressToDelete)
      refreshAddresses()
      toast.success('Address deleted successfully!')
      setAddressToDelete(null)
    }
  }, [addressToDelete, refreshAddresses])

  const handleEdit = useCallback((id: string, currentName: string) => {
    setEditingId(id)
    setEditName(currentName)
  }, [])

  const handleSaveEdit = useCallback(
    (id: string) => {
      updateAddress(id, { addressName: editName })
      refreshAddresses()
      setEditingId(null)
      toast.success('Address name updated successfully!')
    },
    [editName, refreshAddresses]
  )

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent, action: () => void) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        action()
      }
    },
    []
  )

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
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Address"
        onConfirm={confirmDelete}
        confirmText="Delete"
      >
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this address? This action cannot be
          undone.
        </p>
      </Modal>

      <div
        className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4"
        role="search"
        aria-label="Address filters"
      >
        <div>
          <label htmlFor="username-filter" className="sr-only">
            Filter by username
          </label>
          <input
            type="text"
            id="username-filter"
            placeholder="Filter by username"
            className="rounded-md border border-gray-300 px-3 py-2"
            value={filters.username}
            onChange={(e) =>
              setFilters({ ...filters, username: e.target.value })
            }
            aria-label="Filter addresses by username"
          />
        </div>

        <div>
          <label htmlFor="city-filter" className="sr-only">
            Filter by city
          </label>
          <input
            type="text"
            id="city-filter"
            placeholder="Filter by city"
            className="rounded-md border border-gray-300 px-3 py-2"
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            aria-label="Filter addresses by city"
          />
        </div>

        <div>
          <label htmlFor="state-filter" className="sr-only">
            Filter by state
          </label>
          <input
            type="text"
            id="state-filter"
            placeholder="Filter by state"
            className="rounded-md border border-gray-300 px-3 py-2"
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
            aria-label="Filter addresses by state"
          />
        </div>

        <div>
          <label htmlFor="address-name-filter" className="sr-only">
            Search by address name
          </label>
          <input
            type="text"
            id="address-name-filter"
            placeholder="Search by address name"
            className="rounded-md border border-gray-300 px-3 py-2"
            value={filters.addressName}
            onChange={(e) =>
              setFilters({ ...filters, addressName: e.target.value })
            }
            aria-label="Search addresses by name"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table
          className="min-w-full divide-y divide-gray-200"
          role="grid"
          aria-label="Addresses table"
        >
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Address Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Username
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Street
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                City
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                State
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                CEP
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
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
                        aria-label={`Edit name for address ${address.addressName}`}
                      />
                      <button
                        onClick={() => handleSaveEdit(address.id)}
                        className="text-sm text-green-600 hover:text-green-800"
                        aria-label={`Save new name for address ${address.addressName}`}
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
                    onKeyPress={(e) =>
                      handleKeyPress(e, () =>
                        handleEdit(address.id, address.addressName)
                      )
                    }
                    className="mr-2 text-sm text-blue-600 hover:text-blue-800"
                    aria-label={`Edit address ${address.addressName}`}
                    tabIndex={0}
                    role="button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    onKeyPress={(e) =>
                      handleKeyPress(e, () => handleDelete(address.id))
                    }
                    className="text-sm text-red-600 hover:text-red-800"
                    aria-label={`Delete address ${address.addressName}`}
                    tabIndex={0}
                    role="button"
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
