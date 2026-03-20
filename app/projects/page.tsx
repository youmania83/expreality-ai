import React from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const ProjectsPage = () => {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-gray-200 px-6 md:px-16 lg:px-24 py-16 md:py-20">
      <section className="max-w-6xl mx-auto">
        <header className="mb-10 md:mb-14 border-b border-white/5 pb-10">
          <p className="uppercase tracking-[0.25em] text-xs text-[#C6A15B] font-semibold">
            Intelligence Platform
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold text-gray-100 mb-6">
            Signature Asset Data Room
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed">
            Gain exclusive access to high-fidelity analytics, quantitative value modeling, 
            and restricted dossier profiles of Delhi NCR's most distinguished developments.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProjectsPage;
