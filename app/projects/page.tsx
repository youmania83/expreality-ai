import React from "react";
import Link from "next/link";
import { projects } from "../../data/projects";
import { ProjectCard } from "../../components/ProjectCard";

const ProjectsPage = () => {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-gray-200 px-6 md:px-16 lg:px-24 py-16 md:py-20">
      <section className="max-w-6xl mx-auto">
        <header className="mb-10 md:mb-14">
          <p className="uppercase tracking-[0.25em] text-xs text-gray-500">
            Curated Portfolio
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold">
            Signature Luxury Residences in Delhi NCR
          </h1>
          <p className="mt-4 text-sm md:text-base text-gray-300 max-w-2xl">
            A concise selection of Delhi NCR&apos;s most coveted luxury
            developments. Explore projects in depth or request a private brief
            tailored to your acquisition thesis.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0B] rounded-3xl"
            >
              <ProjectCard
                imageSrc={project.image}
                imageAlt={project.name}
                projectName={project.name}
                location={project.location}
                startingPrice={project.startingPrice}
              />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProjectsPage;

