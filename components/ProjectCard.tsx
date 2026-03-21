"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group bg-[#0A0A0A] rounded-2xl overflow-hidden border border-white/5 hover:border-[#C6A15B]/40 transition duration-500 relative flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]/80"
    >
      {/* STATUS BADGE */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        <span className="px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#C6A15B] border border-[#C6A15B]/30 rounded-sm bg-black/60 backdrop-blur-md">
          {project.status || "Premium Asset"}
        </span>
      </div>

      {/* IMAGE */}
      <div className="relative w-full h-[280px] overflow-hidden">
        <Image
          src={project.image || "/projects/default.jpg"}
          alt={project.name || "Luxury Residence"}
          fill
          className="object-cover group-hover:scale-105 transition duration-700 ease-out"
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            e.currentTarget.srcset = "";
            e.currentTarget.src = "/projects/default.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent pointer-events-none" />
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-grow z-10 -mt-6 bg-[#0A0A0A]/50 backdrop-blur-xl rounded-t-3xl shadow-[0_-15px_30px_rgba(0,0,0,0.5)]">
        <div className="mb-auto">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">
            {project.developer || "Signature Developer"}
          </p>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-100 mb-2 group-hover:text-[#C6A15B] transition-colors">
            {project.name}
          </h3>
          <p className="text-gray-400 text-sm mb-6 line-clamp-2">
            {project.location}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
              Valuation
            </p>
            <p className="text-[#C6A15B] font-semibold text-lg md:text-xl">
              {project.startingPrice}
            </p>
          </div>
          <p className="text-sm font-semibold text-white group-hover:text-[#C6A15B] transition-colors">
            View Project &rarr;
          </p>
        </div>
      </div>
    </Link>
  );
}
