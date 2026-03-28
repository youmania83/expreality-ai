import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:px-8 lg:px-0 py-8 md:py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
              Exprealty
            </p>
            <p className="mt-2 text-sm text-gray-400 max-w-sm">
              Luxury real estate intelligence for Delhi NCR and Panipat&apos;s discerning
              buyers, with a focus on curated corridors and private deal flow.
            </p>
            <p className="mt-3 text-xs text-gray-500">
              Email:{" "}
              <a
                href="mailto:advisory@expreality.ai"
                className="text-gray-300 hover:text-[#C6A15B]"
              >
                advisory@expreality.ai
              </a>{" "}
              · Delhi NCR & Panipat
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-gray-400">
            <Link href="/residences" className="hover:text-[#C6A15B]">
              Residences
            </Link>
            <Link href="/markets" className="hover:text-[#C6A15B]">
              Markets
            </Link>
            <Link href="/advisory" className="hover:text-[#C6A15B]">
              Advisory
            </Link>
            <Link href="/contact" className="hover:text-[#C6A15B]">
              Contact
            </Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[11px] text-gray-500">
          <p>© {new Date().getFullYear()} Exprealty. All rights reserved.</p>
          <p className="text-gray-600">
            Strictly private advisory. No mass marketing. Invitation-based
            engagements only.
          </p>
        </div>
      </div>
    </footer>
  );
};

