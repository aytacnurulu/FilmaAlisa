"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { Logo } from "@/shared/components/ui/Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/movies", label: "Search" },
  { href: "/favorites", label: "Favorites" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex-shrink-0">
          <Logo size="md" withWordmark />
        </Link>

        <ul className="flex items-center gap-8">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm font-medium transition-colors duration-[180ms] ${
                    isActive
                      ? "text-accent"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-5">
          <Link
            href="/search"
            aria-label="Search"
            className="text-text-muted transition-colors duration-[180ms] hover:text-text"
          >
            <FiSearch size={20} />
          </Link>
          <Link
            href="/profile"
            className={`text-sm font-medium transition-colors duration-[180ms] ${
              pathname === "/profile"
                ? "text-accent"
                : "text-text-muted hover:text-text"
            }`}
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
