'use client'

import { createContext, useContext, useState } from 'react'

type ModalType = 'create' | 'edit' | 'delete' | 'view'
type ModalResource = 'movie' | 'category' | 'actor' | 'comment' | 'contact'

interface ModalState {
  isOpen: boolean
  type: ModalType | null
  resource: ModalResource | null
  data: unknown | null
}

interface ModalContextValue {
  state: ModalState
  openModal: (type: ModalType, resource: ModalResource, data?: unknown) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function ModalContextProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ModalState>({
    isOpen: false,
    type: null,
    resource: null,
    data: null,
  })

  function openModal(type: ModalType, resource: ModalResource, data?: unknown) {
    setState({ isOpen: true, type, resource, data: data ?? null })
  }

  function closeModal() {
    setState({ isOpen: false, type: null, resource: null, data: null })
  }

  return (
    <ModalContext.Provider value={{ state, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used inside ModalProvider')
  return ctx
}
