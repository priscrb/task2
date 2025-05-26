import { FC, useState, useRef } from 'react'
import { Toaster } from 'react-hot-toast'
import AddressForm from './AddressForm'
import AddressList from './AddressList'
import { AddressProvider } from '../context/AddressContext'
import { ThemeProvider } from '../context/ThemeContext'
import ErrorBoundary from './ErrorBoundary'
import ShortcutsModal from './ShortcutsModal'
import ThemeToggle from './ThemeToggle'
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts'
import { FiBook, FiCommand } from 'react-icons/fi'

const AppContent: FC = () => {
  const [showShortcuts, setShowShortcuts] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const shortcuts = useKeyboardShortcuts([
    {
      key: '/',
      description: 'Focus search',
      action: () => {
        const searchInput = document.getElementById('username-filter')
        if (searchInput) {
          searchInput.focus()
        }
      }
    },
    {
      key: 'n',
      ctrl: true,
      description: 'Focus new address form',
      action: () => {
        const usernameInput = document.getElementById('username')
        if (usernameInput) {
          usernameInput.focus()
        }
      }
    },
    {
      key: '?',
      description: 'Show keyboard shortcuts',
      action: () => setShowShortcuts(true)
    }
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 transition-colors duration-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'dark:bg-gray-800 dark:text-white dark:border-gray-700'
        }}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4">
            <FiBook className="mx-auto size-12 text-indigo-600 dark:text-indigo-400" />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowShortcuts(true)}
                className="rounded-lg bg-white p-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700"
                aria-label="Show keyboard shortcuts"
              >
                <FiCommand className="size-6" />
              </button>
              <ThemeToggle />
            </div>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Address Book
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4 dark:text-gray-400">
            Manage your addresses efficiently and securely
          </p>
        </div>

        <div className="mt-10 space-y-8">
          <div className="overflow-hidden rounded-lg bg-white shadow ring-1 ring-black ring-opacity-5 transition-colors duration-200 dark:bg-gray-800 dark:ring-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <AddressForm ref={formRef} />
            </div>
          </div>

          <AddressList />
        </div>
      </div>

      <ShortcutsModal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
        shortcuts={shortcuts}
      />
    </div>
  )
}

const App: FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AddressProvider>
          <AppContent />
        </AddressProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
