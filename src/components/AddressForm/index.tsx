import { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import { IMaskInput } from 'react-imask'
import { FiSearch, FiUser, FiMapPin, FiHash } from 'react-icons/fi'
import { fetchAddressByCEP } from '../../services/viacep'
import { saveAddress } from '../../services/storage'
import type { AddressData } from '../../types/address'
import { useAddresses } from '../../context/AddressContext'

const formSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  addressName: z.string().min(3, 'Address name must be at least 3 characters'),
  cep: z.string().regex(/^\d{5}-\d{3}$/, 'CEP must be in format: 12345-678')
})

type FormData = z.infer<typeof formSchema>

const AddressForm: FC = () => {
  const { refreshAddresses } = useAddresses()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      const addressData = await fetchAddressByCEP(data.cep)

      const newAddress: AddressData = {
        ...addressData,
        id: uuidv4(),
        username: data.username,
        addressName: data.addressName,
        createdAt: Date.now()
      }

      saveAddress(newAddress)
      refreshAddresses()
      toast.success('Address saved successfully!')
      reset()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An unexpected error occurred')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <label
            htmlFor="username"
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
              id="username"
              {...register('username')}
              className="block w-full rounded-lg border-0 py-3 pl-11 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="John Doe"
            />
          </div>
          {errors.username && (
            <p className="mt-2 text-sm text-red-600">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="addressName"
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
              id="addressName"
              {...register('addressName')}
              className="block w-full rounded-lg border-0 py-3 pl-11 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Home"
            />
          </div>
          {errors.addressName && (
            <p className="mt-2 text-sm text-red-600">
              {errors.addressName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="cep"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            CEP
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <FiHash className="size-5 text-gray-400" />
            </div>
            <Controller
              name="cep"
              control={control}
              render={({ field: { onChange, value } }) => (
                <IMaskInput
                  id="cep"
                  mask="00000-000"
                  value={value}
                  unmask={false}
                  onAccept={(value) => onChange(value)}
                  placeholder="12345-678"
                  className="block w-full rounded-lg border-0 py-3 pl-11 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              )}
            />
          </div>
          {errors.cep && (
            <p className="mt-2 text-sm text-red-600">{errors.cep.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition duration-200 ease-in-out hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
        >
          <FiSearch className="mr-2 size-5" />
          {isSubmitting ? 'Searching...' : 'Search Address'}
        </button>
      </div>
    </form>
  )
}

export default AddressForm
