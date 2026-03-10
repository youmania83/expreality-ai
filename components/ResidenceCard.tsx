import React from "react";
import Image from "next/image";

type ResidenceCardProps = {
  name: string;
  location: string;
  startingPrice: string;
  imageSrc: string;
  imageAlt?: string;
};

export const ResidenceCard: React.FC<ResidenceCardProps> = ({
  name,
  location,
  startingPrice,
  imageSrc,
  imageAlt,
}) => {
  return (
    <article className="group rounded-3xl bg-[#111111] overflow-hidden border border-white/5 hover:border-[#C6A15B]/60 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(0,0,0,0.9)] transition duration-500">
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
      <div className="p-6 space-y-3">
        <div>
          <h3 className="text-lg md:text-xl font-semibold tracking-wide">
            {name}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gray-500">
            Luxury Residence • Delhi NCR
          </p>
        </div>
        <div className="h-px w-10 bg-gradient-to-r from-[#C6A15B] via-[#C6A15B] to-transparent" />
      </div>
    </article>
  );
};

