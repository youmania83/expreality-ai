import React from "react";
import Image from "next/image";

type ProjectCardProps = {
  imageSrc: string;
  imageAlt: string;
  projectName: string;
  location: string;
  startingPrice: string;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  imageSrc,
  imageAlt,
  projectName,
  location,
  startingPrice,
}) => {
  return (
    <article className="group rounded-3xl bg-[#111111] overflow-hidden border border-white/5 hover:border-[#C6A15B]/60 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.85)] transition duration-500">
      <div className="relative h-56">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
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

