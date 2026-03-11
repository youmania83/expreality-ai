"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

type ResidenceCardProps = {
  name: string;
  location: string;
  startingPrice: string;
  imageSrc: string;
  imageAlt?: string;
  slug: string;
};

export const ResidenceCard: React.FC<ResidenceCardProps> = ({
  name,
  location,
  startingPrice,
  imageSrc,
  imageAlt,
  slug,
}) => {
  return (
    <Link
      href={`/residences/${slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-3xl"
    >
      <article className="rounded-3xl bg-[#111111] overflow-hidden border border-white/5 hover:border-[#C6A15B]/70 hover:-translate-y-2 hover:shadow-[0_28px_90px_rgba(0,0,0,0.95)] transition-transform duration-500 ease-out">
        <div className="relative h-56">
          <Image
            src={imageSrc}
            alt={imageAlt ?? name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-gray-300">
            <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 line-clamp-1">
              {location}
            </span>
            <span className="text-[#C6A15B] font-semibold whitespace-nowrap">
              From {startingPrice}
            </span>
          </div>
        </div>
        <div className="px-6 pt-5 pb-6 md:px-7 md:pt-6 md:pb-7 lg:px-8 lg:pt-7 lg:pb-8 space-y-4">
          <div>
            <h3 className="text-lg md:text-xl font-semibold tracking-wide">
              {name}
            </h3>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gray-500">
              Luxury Residence • Delhi NCR
            </p>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-[#C6A15B]/60 via-[#C6A15B] to-transparent opacity-80" />
        </div>
      </article>
    </Link>
  );
};

