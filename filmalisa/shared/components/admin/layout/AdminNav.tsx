'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Film,
  Star,
  Users,
  User,
  MessageSquare,
  MessageCircle,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard',  href: '/admin/dashboard',  icon: LayoutDashboard },
  { label: 'Movies',     href: '/admin/movies',     icon: Film },
  { label: 'Categories', href: '/admin/categories', icon: Star },
  { label: 'Actors',     href: '/admin/actors',     icon: Users },
  { label: 'Users',      href: '/admin/users',      icon: User },
  { label: 'Comments',   href: '/admin/comments',   icon: MessageSquare },
  { label: 'Contacts',   href: '/admin/contacts',   icon: MessageCircle },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map(({ label, href, icon: Icon }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
              isActive
                ? 'bg-[#7c3aed] text-white'
                : 'text-[#9a9a9a] hover:bg-[#222222] hover:text-white'
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
