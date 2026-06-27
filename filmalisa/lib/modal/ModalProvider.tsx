'use client'

import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { ModalContextProvider, useModal } from '@/lib/modal/ModalContext'

function ModalRenderer() {
  const { state } = useModal()

  // No modals wired yet — modal components are added per resource in Layer 6
  if (!state.isOpen) return null

  return null
}

function PortaledModalRenderer() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(<ModalRenderer />, document.body)
}

export default function ModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <ModalContextProvider>
      {children}
      <PortaledModalRenderer />
    </ModalContextProvider>
  )
}
