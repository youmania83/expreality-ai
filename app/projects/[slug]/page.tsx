"use client";


import { projects } from "@/data/projects";
import MicroMarketInsights from "@/components/MicroMarketInsights";
type ExtendedProject = Project & {
  highlights?: string[];
  matter?: string;
  priceTrend?: string;
  connectivity?: string;
  futureDevelopments?: string;
};

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const [project, setProject] = useState<ExtendedProject | null>(null);

  
  if (!project) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${project.image})` }}  // ✅ fixed
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto flex items-center justify-center h-full">
          <h1 className="text-white text-4xl font-bold">
            {project.name} {/* ✅ fixed */}
          </h1>
        </div>
      </section>

      {/* Investment Highlights */}
      {project.highlights && (
        <section className="bg-gray-100 py-20">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              Investment Highlights
            </h2>
            <ul className="list-disc pl-6">
              {project.highlights.map((highlight, index) => (
                <li key={index} className="mb-4">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Why This Project Matters */}
      {project.matter && (
        <section className="bg-white py-20">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              Why This Project Matters
            </h2>
            <p className="text-lg">{project.matter}</p>
          </div>
        </section>
      )}

      {/* Micro Market Insights */}
      <MicroMarketInsights
        location={project.location}
        priceTrend={project.priceTrend || "Stable growth"}
        connectivity={project.connectivity || "Strong connectivity"}
        futureDevelopments={
          project.futureDevelopments || "Upcoming infrastructure projects"
        }
      />

      {/* CTA */}
      <section className="bg-white py-10">
        <div className="container mx-auto text-center">
          <button className="bg-blue-500 text-white px-8 py-4 rounded hover:bg-blue-600">
            Speak to Advisor
          </button>
        </div>
      </section>
    </div>
  );
}