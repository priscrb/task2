import { FC } from 'react'
import { Dialog } from '@headlessui/react'
import { FiCommand } from 'react-icons/fi'

interface ShortcutInfo {
  key: string
  ctrl?: boolean
  description: string
}

interface ShortcutsModalProps {
  isOpen: boolean
  onClose: () => void
  shortcuts: ShortcutInfo[]
}

const ShortcutsModal: FC<ShortcutsModalProps> = ({
  isOpen,
  onClose,
  shortcuts
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
            <Dialog.Title className="flex items-center gap-2 text-xl font-semibold leading-6 text-gray-900 dark:text-white">
              <FiCommand className="size-5" />
              Keyboard Shortcuts
            </Dialog.Title>

            <div className="mt-6">
              <div className="flow-root">
                <ul
                  role="list"
                  className="-my-2 divide-y divide-gray-200 dark:divide-gray-700"
                >
                  {shortcuts.map((shortcut, index) => (
                    <li key={index} className="py-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {shortcut.description}
                        </p>
                        <div className="ml-2 flex items-center gap-1">
                          {shortcut.ctrl && (
                            <>
                              <kbd className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                Ctrl
                              </kbd>
                              <span className="text-gray-400">+</span>
                            </>
                          )}
                          <kbd className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                            {shortcut.key.toUpperCase()}
                          </kbd>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-400"
              >
                Got it
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}

export default ShortcutsModal
