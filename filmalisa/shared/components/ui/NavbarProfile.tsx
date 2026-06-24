"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useGetProfile } from "@/lib/api/profile";

export default function NavbarProfile() {
  const { data, isLoading } = useGetProfile();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  if (isLoading) {
    return <div className="h-8 w-8 rounded-full bg-surface-3 animate-pulse" />;
  }

  const initials = data?.full_name
    ? data.full_name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {data?.img_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.img_url}
            alt={data.full_name}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-semibold text-text-on-accent">
            {initials}
          </div>
        )}
        <span className="text-sm font-medium text-text">{data?.full_name}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-40 rounded-md border border-border bg-surface-2 py-1 shadow-pop">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-text transition-colors duration-[180ms] hover:bg-surface-3"
          >
            <FiUser size={14} />
            Profile
          </Link>
          <div className="my-1 border-t border-border" />
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-danger transition-colors duration-[180ms] hover:bg-surface-3"
          >
            <FiLogOut size={14} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
