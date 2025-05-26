import { FC, useState, useCallback } from 'react'
import { deleteAddress, updateAddress } from '../../services/storage'
import toast from 'react-hot-toast'
import { useAddresses } from '../../context/AddressContext'
import Modal from '../Modal'
import EditAddressModal from '../EditAddressModal'
import {
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiUser,
  FiMapPin,
  FiMap
} from 'react-icons/fi'
import { AddressData } from '../../types/address'

const AddressList: FC = () => {
  const { addresses, refreshAddresses } = useAddresses()
  const [filters, setFilters] = useState({
    username: '',
    city: '',
    state: '',
    addressName: ''
  })
  const [editingAddress, setEditingAddress] = useState<AddressData | null>(null)
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
      setDeleteModalOpen(false)
      setAddressToDelete(null)
    }
  }, [addressToDelete, refreshAddresses])

  const handleEdit = useCallback((address: AddressData) => {
    setEditingAddress(address)
  }, [])

  const handleSaveEdit = useCallback(
    (data: { username: string; addressName: string }) => {
      if (editingAddress) {
        updateAddress(editingAddress.id, data)
        refreshAddresses()
        toast.success('Address updated successfully!')
        setEditingAddress(null)
      }
    },
    [editingAddress, refreshAddresses]
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
    <div className="mt-8 space-y-6">
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

      <EditAddressModal
        isOpen={editingAddress !== null}
        onClose={() => setEditingAddress(null)}
        address={editingAddress}
        onSave={handleSaveEdit}
      />

      <div
        className="mb-6 grid gap-4 rounded-lg bg-white p-4 shadow-sm sm:grid-cols-2 md:grid-cols-4"
        role="search"
        aria-label="Address filters"
      >
        <div className="relative">
          <label htmlFor="username-filter" className="sr-only">
            Filter by username
          </label>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FiUser className="size-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="username-filter"
            placeholder="Filter by username"
            className="block w-full rounded-lg border-0 py-3 pl-11 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={filters.username}
            onChange={(e) =>
              setFilters({ ...filters, username: e.target.value })
            }
            aria-label="Filter addresses by username"
          />
        </div>

        <div className="relative">
          <label htmlFor="city-filter" className="sr-only">
            Filter by city
          </label>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FiMapPin className="size-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="city-filter"
            placeholder="Filter by city"
            className="block w-full rounded-lg border-0 py-3 pl-11 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            aria-label="Filter addresses by city"
          />
        </div>

        <div className="relative">
          <label htmlFor="state-filter" className="sr-only">
            Filter by state
          </label>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FiMap className="size-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="state-filter"
            placeholder="Filter by state"
            className="block w-full rounded-lg border-0 py-3 pl-11 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
            aria-label="Filter addresses by state"
          />
        </div>

        <div className="relative">
          <label htmlFor="address-name-filter" className="sr-only">
            Search by address name
          </label>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch className="size-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="address-name-filter"
            placeholder="Search by address name"
            className="block w-full rounded-lg border-0 py-3 pl-11 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={filters.addressName}
            onChange={(e) =>
              setFilters({ ...filters, addressName: e.target.value })
            }
            aria-label="Search addresses by name"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow ring-1 ring-black ring-opacity-5">
        <table
          className="min-w-full divide-y divide-gray-300"
          role="grid"
          aria-label="Addresses table"
        >
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Address Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Username
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Street
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                City
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                State
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                CEP
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredAddresses.map((address) => (
              <tr key={address.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {address.addressName}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {address.username}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {address.logradouro}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {address.localidade}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {address.uf}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {address.cep}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <button
                    onClick={() => handleEdit(address)}
                    onKeyPress={(e) =>
                      handleKeyPress(e, () => handleEdit(address))
                    }
                    className="mr-2 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    aria-label={`Edit address ${address.addressName}`}
                    tabIndex={0}
                    role="button"
                  >
                    <FiEdit2 className="mr-1.5 size-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    onKeyPress={(e) =>
                      handleKeyPress(e, () => handleDelete(address.id))
                    }
                    className="inline-flex items-center rounded-md bg-red-50 px-2.5 py-1.5 text-sm font-semibold text-red-700 shadow-sm ring-1 ring-inset ring-red-600/10 hover:bg-red-100"
                    aria-label={`Delete address ${address.addressName}`}
                    tabIndex={0}
                    role="button"
                  >
                    <FiTrash2 className="mr-1.5 size-4" />
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
