import LogoutButton from '@/components/LogoutButton'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="flex items-center justify-end px-6 py-3 border-b border-gray-200">
        <LogoutButton />
      </header>
      {children}
    </>
  )
}
