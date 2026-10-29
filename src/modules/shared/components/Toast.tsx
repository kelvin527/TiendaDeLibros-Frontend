import type { ToastState } from '../hooks/useToast'

interface ToastProps {
  toast: ToastState | null
}

export function Toast({ toast }: ToastProps) {
  if (!toast) return null

  const colors =
    toast.type === 'success'
      ? 'bg-green-600 text-white'
      : 'bg-red-600 text-white'

  return (
    <div className={`fixed bottom-6 right-6 z-50 rounded-md px-4 py-3 text-sm font-medium shadow-lg ${colors}`}>
      {toast.message}
    </div>
  )
}
