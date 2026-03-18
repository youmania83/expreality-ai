"use client";

import { projects } from "@/data/projects";
import MicroMarketInsights from "@/components/MicroMarketInsights";

export default function ProjectPage({ params }) {
  const project = projects.find(p => p.slug === params.slug);

  if (!project) {
    return <div className="p-10 text-center">Project not found</div>;
  }

  return (
    <div className="bg-white">
      <section
        className="h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${project.image})` }}
      >
        <h1 className="text-white text-4xl">
          {project.name}
        </h1>
      </section>

      <MicroMarketInsights
        location={project.location}
        priceTrend="Stable"
        connectivity="Good"
        futureDevelopments="Upcoming"
      />
    </div>
  );
}