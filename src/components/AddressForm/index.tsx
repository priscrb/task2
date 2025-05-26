import { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import { IMaskInput } from 'react-imask'
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          {...register('username')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="addressName"
          className="block text-sm font-medium text-gray-700"
        >
          Address Name
        </label>
        <input
          type="text"
          id="addressName"
          {...register('addressName')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.addressName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.addressName.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="cep"
          className="block text-sm font-medium text-gray-700"
        >
          CEP
        </label>
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          )}
        />
        {errors.cep && (
          <p className="mt-1 text-sm text-red-600">{errors.cep.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isSubmitting ? 'Searching...' : 'Search Address'}
      </button>
    </form>
  )
}

export default AddressForm
