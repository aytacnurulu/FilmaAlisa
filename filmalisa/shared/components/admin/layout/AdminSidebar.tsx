'use client'

import AdminNav from '@/shared/components/admin/layout/AdminNav'
import LogoutButton from '@/shared/components/LogoutButton'

export default function AdminSidebar() {
  return (
    <aside className="w-[200px] fixed left-0 top-0 h-screen bg-[#141414] border-r border-[#2a2a2a] flex flex-col">
      <div className="h-16 flex items-center px-4 border-b border-[#2a2a2a] flex-shrink-0">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-[#7c3aed]"
        >
          <path d="M6 4l10 6-10 6V4z" />
        </svg>
        <span className="text-white font-semibold text-sm tracking-wide ml-2">
          filmalisa
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <AdminNav />
      </div>

      <div className="mt-auto px-3 py-4 border-t border-[#2a2a2a]">
        <LogoutButton />
      </div>
    </aside>
  )
}
