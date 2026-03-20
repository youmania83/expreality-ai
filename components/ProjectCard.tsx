"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleNavigation = () => {
    // Prevent 404 by checking if slug/page exists (using our flag)
    if (project.hasDedicatedPage === false) {
      setShowModal(true);
    } else {
      router.push(`/projects/${project.slug}`);
    }
  };

  return (
    <>
      <div className="group bg-[#0A0A0A] rounded-2xl overflow-hidden border border-white/5 hover:border-[#C6A15B]/40 transition duration-500 relative flex flex-col h-full">
        {/* STATUS BADGE */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <span className="px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#C6A15B] border border-[#C6A15B]/30 rounded-sm bg-black/60 backdrop-blur-md">
            {project.status || "Premium Asset"}
          </span>
        </div>

        {/* IMAGE */}
        <div className="relative w-full h-[280px] overflow-hidden">
          <Image
            src={project.image || "/fallback.jpg"}
            alt={project.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-700 ease-out"
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent pointer-events-none" />
        </div>

        {/* CONTENT */}
        <div className="p-6 flex flex-col flex-grow z-10 -mt-6 bg-[#0A0A0A]/50 backdrop-blur-xl rounded-t-3xl shadow-[0_-15px_30px_rgba(0,0,0,0.5)]">
          <div className="mb-auto">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">
              {project.developer || "Signature Developer"}
            </p>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-100 mb-2">
              {project.name}
            </h3>
            <p className="text-gray-400 text-sm mb-6 line-clamp-2">
              {project.location}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
              Valuation
            </p>
            <p className="text-[#C6A15B] font-semibold text-lg md:text-xl">
              {project.startingPrice}
            </p>
          </div>

          {/* BUTTONS */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleNavigation}
              className="flex-1 bg-[#C6A15B] text-black px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#C6A15B]/90 transition text-center"
            >
              Access Intelligence
            </button>
          </div>
        </div>
      </div>

      {/* FALLBACK MODAL (Zero 404s) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative z-10 w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.8)] overflow-hidden animate-fade-in">
            <div className="relative h-48 w-full">
               <Image src={project.image || "/fallback.jpg"} alt={project.name} fill className="object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
               <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
            </div>
            
            <div className="p-6 md:p-8 relative z-20 -mt-16">
              <span className="px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#C6A15B] border border-[#C6A15B]/30 rounded-sm bg-black/80 backdrop-blur-md mb-3 inline-block">
                {project.status || "Premium Asset"}
              </span>
              <h3 className="text-2xl lg:text-3xl font-semibold text-gray-100 mb-2 leading-tight">{project.name}</h3>
              <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                {project.intelligence?.marketInsights?.priceTrend || "Exclusive off-market opportunity available for private viewing."}
              </p>
              
              <div className="space-y-3">
                <a 
                  href={project.developerUrl || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex justify-center items-center gap-2 bg-white/5 text-white border border-white/10 px-6 py-3.5 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Visit Developer Website
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
                <a 
                  href={project.brochureUrl || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex justify-center items-center gap-2 bg-[#C6A15B] text-black px-6 py-3.5 rounded-xl text-sm font-semibold hover:bg-[#C6A15B]/90 transition-colors"
                >
                  Download Brochure
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                </a>
              </div>
              
              <button onClick={() => setShowModal(false)} className="mt-6 w-full text-center text-[10px] tracking-widest uppercase text-gray-500 hover:text-white transition-colors py-2">
                Back to Portfolio
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
