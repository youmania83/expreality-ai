"use client";

import React, { useState } from "react";
import Image from "next/image";

type ProjectCardProps = {
  imageSrc: string;
  imageAlt: string;
  projectName: string;
  location: string;
  startingPrice: string;
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1512207736139-6ea0141e3e9d?w=600&h=400&fit=crop&q=80";

export const ProjectCard: React.FC<ProjectCardProps> = ({
  imageSrc,
  imageAlt,
  projectName,
  location,
  startingPrice,
}) => {
  const [imageSrc_, setImageSrc] = useState(imageSrc);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    console.warn(`⚠️ Image failed to load: ${imageSrc}, using fallback`);
    setImageSrc(DEFAULT_IMAGE);
  };

  return (
    <article className="group rounded-3xl bg-[#111111] overflow-hidden border border-white/5 hover:border-[#C6A15B]/60 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.85)] transition duration-500">
      <div className="relative h-56 bg-[#050505]">
        <Image
          src={imageSrc_}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
          onError={handleImageError}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent animate-pulse" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-gray-300">
          <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10">
            {location}
          </span>
          <span className="text-[#C6A15B] font-semibold">
            From {startingPrice}
          </span>
        </div>
      </div>
      <div className="p-6 space-y-2">
        <h3 className="text-lg md:text-xl font-semibold tracking-wide">
          {projectName}
        </h3>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
          Luxury Residences • Delhi NCR
        </p>
      </div>
    </article>
  );
};

