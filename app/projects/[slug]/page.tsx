import { Project } from "@/data/projects";
import { useState, useEffect } from "react";
import MicroMarketInsights from "@/components/MicroMarketInsights";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    // Fetch project data based on the slug
    const fetchProject = async () => {
      const response = await fetch(`/api/projects/${params.slug}`);
      const data = await response.json();
      setProject(data);
    };

    fetchProject();
  }, [params.slug]);

  if (!project) return <div>Loading...</div>;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${project.imageSrc})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto flex items-center justify-center h-full">
          <h1 className="text-white text-4xl font-bold">{project.projectName}</h1>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Investment Highlights</h2>
          <ul className="list-disc pl-6">
            {project.highlights.map((highlight, index) => (
              <li key={index} className="mb-4">{highlight}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why This Project Matters */}
      <section className="bg-white py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Why This Project Matters</h2>
          <p className="text-lg">{project.matter}</p>
        </div>
      </section>

      {/* Micro Market Insights */}
      <MicroMarketInsights
        location={project.location}
        priceTrend={project.priceTrend}
        connectivity={project.connectivity}
        futureDevelopments={project.futureDevelopments}
      />

      {/* Sticky CTA Button */}
      <section className="bg-white py-10">
        <div className="container mx-auto text-center">
          <button className="bg-blue-500 text-white px-8 py-4 rounded hover:bg-blue-600">Speak to Advisor</button>
        </div>
      </section>
    </div>
  );
}
