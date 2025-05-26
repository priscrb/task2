import { FC } from 'react'
import { Toaster } from 'react-hot-toast'
import AddressForm from './AddressForm'
import AddressList from './AddressList'
import { AddressProvider } from '../context/AddressContext'
import ErrorBoundary from './ErrorBoundary'

const App: FC = () => {
  return (
    <ErrorBoundary>
      <AddressProvider>
        <div className="min-h-screen bg-gray-100 p-4">
          <Toaster position="top-right" />
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-8 text-3xl font-bold text-gray-800">
              Address Book
            </h1>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <AddressForm />
              <AddressList />
            </div>
          </div>
        </div>
      </AddressProvider>
    </ErrorBoundary>
  )
}

export default App
