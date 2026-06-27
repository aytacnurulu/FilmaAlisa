'use client'

import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { ModalContextProvider, useModal } from '@/lib/modal/ModalContext'
import CategoryFormModal from '@/shared/components/admin/modals/categories/CategoryFormModal'
import ActorFormModal from '@/shared/components/admin/modals/actors/ActorFormModal'
import MovieFormModal from '@/shared/components/admin/modals/movies/MovieFormModal'
import DeleteModal from '@/shared/components/ui-admin/DeleteModal'
import { useDeleteCategory } from '@/lib/admin/hooks/useAdminCategories'
import { useDeleteActor } from '@/lib/admin/hooks/useAdminActors'
import { useDeleteMovie } from '@/lib/admin/hooks/useAdminMovies'
import type { AdminCategory, AdminActor, AdminMovie } from '@/lib/admin/types/admin'

function ModalRenderer() {
  const { state, closeModal } = useModal()
  const deleteCategory = useDeleteCategory()
  const deleteActor = useDeleteActor()
  const deleteMovie = useDeleteMovie()

  if (!state.isOpen) return null

  switch (state.resource) {
    case 'category':
      if (state.type === 'create' || state.type === 'edit') {
        return (
          <CategoryFormModal
            mode={state.type}
            initialData={state.data as AdminCategory | undefined}
            onClose={closeModal}
          />
        )
      }
      if (state.type === 'delete') {
        return (
          <DeleteModal
            isOpen={state.isOpen}
            onClose={closeModal}
            resourceName="category"
            itemLabel={(state.data as AdminCategory).name}
            onConfirm={() =>
              deleteCategory.mutate((state.data as AdminCategory).id, {
                onSuccess: closeModal,
              })
            }
            isLoading={deleteCategory.isPending}
          />
        )
      }
      return null

    case 'actor':
      if (state.type === 'create' || state.type === 'edit') {
        return (
          <ActorFormModal
            mode={state.type}
            initialData={state.data as AdminActor | undefined}
            onClose={closeModal}
          />
        )
      }
      if (state.type === 'delete') {
        return (
          <DeleteModal
            isOpen={state.isOpen}
            onClose={closeModal}
            resourceName="actor"
            itemLabel={`${(state.data as AdminActor).name} ${(state.data as AdminActor).surname}`}
            onConfirm={() =>
              deleteActor.mutate((state.data as AdminActor).id, {
                onSuccess: closeModal,
              })
            }
            isLoading={deleteActor.isPending}
          />
        )
      }
      return null

    case 'movie':
      if (state.type === 'create' || state.type === 'edit') {
        return (
          <MovieFormModal
            mode={state.type}
            initialData={state.data as AdminMovie | undefined}
            onClose={closeModal}
          />
        )
      }
      if (state.type === 'delete') {
        return (
          <DeleteModal
            isOpen={state.isOpen}
            onClose={closeModal}
            resourceName="movie"
            itemLabel={(state.data as AdminMovie).title}
            onConfirm={() =>
              deleteMovie.mutate((state.data as AdminMovie).id, {
                onSuccess: closeModal,
              })
            }
            isLoading={deleteMovie.isPending}
          />
        )
      }
      return null

    default:
      return null
  }
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
