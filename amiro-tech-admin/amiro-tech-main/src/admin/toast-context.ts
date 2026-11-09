import { createContext, useContext } from 'react'

export const ToastContext = createContext<(message: string, kind?: 'ok' | 'error') => void>(() => {})

export const useToast = () => useContext(ToastContext)
