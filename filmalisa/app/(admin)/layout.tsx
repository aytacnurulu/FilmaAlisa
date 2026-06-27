'use client'

import AdminSidebar from '@/shared/components/admin/layout/AdminSidebar'
import ModalProvider from '@/lib/modal/ModalProvider'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ModalProvider>
      <div className="flex min-h-screen bg-[#0f0f0f]">
        <AdminSidebar />
        <main className="ml-[200px] flex-1 flex flex-col">
          {children}
        </main>
      </div>
    </ModalProvider>
  )
}
