import * as Dialog from '@radix-ui/react-dialog'

export default function App() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Dialog.Root>
        <Dialog.Trigger className="px-4 py-2 bg-blue-600 text-white rounded">
          Open Modal
        </Dialog.Trigger>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-80">
          <Dialog.Title className="text-lg font-bold">Hello Radix!</Dialog.Title>
          <Dialog.Description className="mt-2 text-gray-600">
            This modal is powered by Radix + Tailwind v4.
          </Dialog.Description>
          <Dialog.Close className="mt-4 px-3 py-1 bg-gray-200 rounded">
            Close
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  )
}
