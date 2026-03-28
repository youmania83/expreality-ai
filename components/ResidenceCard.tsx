"use client";

import React, { useState } from "react";
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

const DEFAULT_IMAGE = "/projects/default.jpg";

export const ResidenceCard: React.FC<ResidenceCardProps> = ({
  name,
  location,
  startingPrice,
  imageSrc,
  imageAlt,
  slug,
}) => {
  const [imageSrc_, setImageSrc] = useState(imageSrc || "/projects/default.jpg");
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    console.warn(`⚠️ Image failed to load: ${imageSrc}, using fallback`);
    setImageSrc(DEFAULT_IMAGE);
  };

  return (
    <Link
      href={`/projects/${slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-3xl"
    >
      <article className="rounded-3xl bg-[#111111] overflow-hidden border border-white/5 hover:border-[#C6A15B]/70 hover:-translate-y-2 hover:shadow-[0_28px_90px_rgba(0,0,0,0.95)] transition-transform duration-500 ease-out h-full flex flex-col">
        <div className="relative h-56 bg-[#050505] shrink-0">
          <Image
            src={imageSrc_}
            alt={imageAlt ?? name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsLoading(false)}
            onError={(e) => {
              e.currentTarget.srcset = "";
              e.currentTarget.src = "/projects/default.jpg";
              handleImageError();
            }}
          />
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent animate-pulse" />
          )}
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
        <div className="px-6 pt-5 pb-6 flex flex-col flex-grow">
          <div className="mb-auto">
            <h3 className="text-lg md:text-xl font-semibold tracking-wide group-hover:text-[#C6A15B] transition-colors">
              {name}
            </h3>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gray-500">
              Luxury Residence • Delhi NCR / Panipat
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-sm font-semibold text-white group-hover:text-[#C6A15B] transition-colors">View Profile &rarr;</span>
          </div>
        </div>
      </article>
    </Link>
  );
};
