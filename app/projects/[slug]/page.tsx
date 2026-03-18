import { projects } from "@/data/projects";
import MicroMarketInsights from "@/components/MicroMarketInsights";

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  const project = projects.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!project) {
    return (
      <div className="p-20 text-center text-white bg-black min-h-screen">
        <h1 className="text-3xl font-semibold">Project not found</h1>
        <p className="text-gray-400 mt-4">Slug: {slug}</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${project.image})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {project.name}
          </h1>
          <p className="text-lg text-gray-300">{project.location}</p>
          <p className="mt-2 text-xl font-medium">
            Starting from {project.startingPrice}
          </p>
        </div>
      </section>

      {/* MICRO MARKET */}
      <MicroMarketInsights
        location={project.location}
        priceTrend="Stable growth"
        connectivity="Strong connectivity"
        futureDevelopments="Upcoming infrastructure"
      />

      {/* CTA */}
      <section className="py-16 text-center">
        <button className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200">
          Speak to Advisor
        </button>
      </section>
    </div>
  );
}