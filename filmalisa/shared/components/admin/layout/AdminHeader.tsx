'use client'

interface AdminHeaderProps {
  title: string
  onCreateClick?: () => void
}

export default function AdminHeader({ title, onCreateClick }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 h-16 bg-[#141414] border-b border-[#2a2a2a] px-6 flex items-center justify-between">
      <div className="flex flex-col justify-center">
        <span className="text-xs text-[#9a9a9a]">Hi Admin</span>
        <span className="text-lg font-semibold text-white">{title}</span>
      </div>

      <div className="flex items-center gap-4">
        {onCreateClick && (
          <button
            onClick={onCreateClick}
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
          >
            Create
          </button>
        )}
        <div className="w-9 h-9 rounded-full bg-[#7c3aed] flex items-center justify-center text-white text-sm font-medium">
          A
        </div>
      </div>
    </header>
  )
}
