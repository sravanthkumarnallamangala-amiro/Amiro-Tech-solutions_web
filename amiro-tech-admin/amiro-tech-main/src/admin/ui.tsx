import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ToastContext } from './toast-context'

/* ---------- toasts ---------- */
type Toast = { id: number; message: string; kind: 'ok' | 'error' }
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const notify = useCallback((message: string, kind: Toast['kind'] = 'ok') => {
    const id = Date.now() + Math.random()
    setToasts((current) => [...current, { id, message, kind }])
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 4200)
  }, [])
  return (
    <ToastContext.Provider value={notify}>
      {children}
      <div className="adm-toasts" role="status" aria-live="polite">
        {toasts.map((toast) => <div className={`adm-toast adm-toast--${toast.kind}`} key={toast.id}>{toast.message}</div>)}
      </div>
    </ToastContext.Provider>
  )
}

/* ---------- modal (native <dialog>: focus trap + Esc for free) ---------- */
export function Modal({ title, onClose, children, wide = false }: { title: string; onClose: () => void; children: ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])
  return (
    <dialog
      aria-label={title}
      className={`adm-modal${wide ? ' adm-modal--wide' : ''}`}
      onClick={(event) => { if (event.target === ref.current) onClose() }}
      onClose={onClose}
      ref={ref}
    >
      <div className="adm-modal__head">
        <h2>{title}</h2>
        <button aria-label="Close" className="adm-icon-btn" onClick={onClose} type="button">×</button>
      </div>
      <div className="adm-modal__body">{children}</div>
    </dialog>
  )
}

export function Confirm({ title, message, confirmLabel, onConfirm, onCancel, busy }: { title: string; message: string; confirmLabel: string; onConfirm: () => void; onCancel: () => void; busy?: boolean }) {
  return (
    <Modal onClose={onCancel} title={title}>
      <p className="adm-muted">{message}</p>
      <div className="adm-actions">
        <button className="adm-btn" onClick={onCancel} type="button">Cancel</button>
        <button className="adm-btn adm-btn--danger" disabled={busy} onClick={onConfirm} type="button">{busy ? 'Working…' : confirmLabel}</button>
      </div>
    </Modal>
  )
}

export function Badge({ tone, children }: { tone: 'green' | 'amber' | 'red' | 'grey' | 'blue'; children: ReactNode }) {
  return <span className={`adm-badge adm-badge--${tone}`}>{children}</span>
}

export function Empty({ title, children }: { title: string; children?: ReactNode }) {
  return <div className="adm-empty"><h3>{title}</h3>{children && <p className="adm-muted">{children}</p>}</div>
}
