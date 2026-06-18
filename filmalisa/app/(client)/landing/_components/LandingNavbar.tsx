"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/shared/components/ui/Logo";
import { Button } from "@/shared/components/ui/Button";

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-bg/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-16 py-4">
        <Logo size="md" withWordmark />
        <Link href="/login">
          <Button variant="primary" size="sm">Sign in</Button>
        </Link>
      </div>
    </nav>
  );
}
