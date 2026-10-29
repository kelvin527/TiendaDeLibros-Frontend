import { useCallback, useState } from 'react'

export interface ToastState {
  message: string
  type: 'success' | 'error'
}

export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null)

  const showToast = useCallback((message: string, type: ToastState['type'] = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  return { toast, showToast }
}
