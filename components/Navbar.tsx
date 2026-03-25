"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-8 lg:px-0 py-4 md:py-5">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 group-hover:border-white/20 transition-all">
            <span className="text-white font-bold text-sm">EX</span>
          </div>
          <span className="text-sm md:text-base font-semibold tracking-widest uppercase text-gray-100">
            Expreality
          </span>
        </Link>

        <div className="flex items-center gap-6 text-xs md:text-sm">
          <Link
            href="/search"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/5"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

