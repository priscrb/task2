import { FC, useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { FiMapPin, FiUser } from 'react-icons/fi'
import { AddressData } from '../../types/address'

interface EditAddressModalProps {
  isOpen: boolean
  onClose: () => void
  address: AddressData | null
  onSave: (data: { username: string; addressName: string }) => void
}

const EditAddressModal: FC<EditAddressModalProps> = ({
  isOpen,
  onClose,
  address,
  onSave
}) => {
  const [formData, setFormData] = useState({
    username: '',
    addressName: ''
  })

  useEffect(() => {
    if (address) {
      setFormData({
        username: address.username,
        addressName: address.addressName
      })
    }
  }, [address])

  if (!address) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <Dialog.Title className="flex items-center gap-2 text-xl font-semibold leading-6 text-gray-900">
              <FiMapPin className="size-5" />
              Edit Address
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div>
                <label
                  htmlFor="editUsername"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Username
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <FiUser className="size-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="editUsername"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="block w-full rounded-lg border-0 py-3 pl-11 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="John Doe"
                    minLength={3}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="editAddressName"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Address Name
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <FiMapPin className="size-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="editAddressName"
                    value={formData.addressName}
                    onChange={(e) =>
                      setFormData({ ...formData, addressName: e.target.value })
                    }
                    className="block w-full rounded-lg border-0 py-3 pl-11 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Home"
                    minLength={3}
                    required
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            </form>

            <div className="mt-6 rounded-lg bg-gray-50 p-4">
              <h4 className="text-sm font-medium text-gray-900">
                Address Details
              </h4>
              <dl className="mt-2 divide-y divide-gray-200">
                <div className="flex justify-between py-2">
                  <dt className="text-sm text-gray-600">Street:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {address.logradouro}
                  </dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-sm text-gray-600">City:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {address.localidade}
                  </dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-sm text-gray-600">State:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {address.uf}
                  </dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-sm text-gray-600">CEP:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {address.cep}
                  </dd>
                </div>
              </dl>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}

export default EditAddressModal
