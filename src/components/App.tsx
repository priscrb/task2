import { FC } from 'react'
import { Toaster } from 'react-hot-toast'
import AddressForm from './AddressForm'
import AddressList from './AddressList'
import { AddressProvider } from '../context/AddressContext'
import ErrorBoundary from './ErrorBoundary'
import { FiBook } from 'react-icons/fi'

const App: FC = () => {
  return (
    <ErrorBoundary>
      <AddressProvider>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
          <Toaster position="top-right" />
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center">
              <FiBook className="mx-auto size-12 text-indigo-600" />
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Address Book
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
                Manage your addresses efficiently and securely
              </p>
            </div>

            <div className="mt-10 space-y-8">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="px-4 py-5 sm:p-6">
                  <AddressForm />
                </div>
              </div>

              <AddressList />
            </div>
          </div>
        </div>
      </AddressProvider>
    </ErrorBoundary>
  )
}

export default App
