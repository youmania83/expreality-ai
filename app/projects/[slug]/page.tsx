import Image from "next/image";
import { projects } from "@/data/projects";
import MicroMarketInsights from "@/components/MicroMarketInsights";

// Generate static params for all projects
export async function generateStaticParams() {
  console.log("🔨 generateStaticParams: Generating static params for projects...");
  const params = projects.map((project) => ({
    slug: project.slug,
  }));
  console.log("✅ Generated params:", params);
  return params;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  console.log("📍 ProjectPage received slug:", slug);
  console.log("📚 Available projects:", projects.map(p => p.slug));

  const project = projects.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase()
  );

  console.log("🔍 Found project:", project?.name || "NOT FOUND");

  if (!project) {
    console.warn(`⚠️ Project not found for slug: ${slug}`);
    return (
      <div className="p-20 text-center text-white bg-black min-h-screen">
        <h1 className="text-3xl font-semibold">Project not found</h1>
        <p className="text-gray-400 mt-4">Slug: {slug}</p>
        <p className="text-gray-500 mt-2">Available slugs:</p>
        <ul className="text-gray-500 mt-2">
          {projects.map((p) => (
            <li key={p.slug}>{p.slug}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      {/* HERO - Using next/image for optimization */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src={project.image}
          alt={`${project.name} - ${project.location}`}
          fill
          priority
          sizes="100vw"
          className="object-cover absolute inset-0"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl">
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