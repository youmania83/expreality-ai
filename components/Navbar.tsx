"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/residences", label: "Residences" },
  { href: "/markets", label: "Markets" },
  { href: "/advisory", label: "Advisory" },
  { href: "/contact", label: "Contact" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-8 lg:px-0 py-4 md:py-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-full bg-[#C6A15B]" />
          <span className="text-sm md:text-base font-semibold tracking-[0.25em] uppercase text-gray-100">
            Expreality
          </span>
        </Link>

        <div className="flex items-center gap-6 text-xs md:text-sm">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "relative pb-1 transition-colors",
                  isActive
                    ? "text-[#C6A15B]"
                    : "text-gray-300 hover:text-[#C6A15B]",
                ].join(" ")}
              >
                {item.label}
                {isActive && (
                  <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-[#C6A15B] to-transparent" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

