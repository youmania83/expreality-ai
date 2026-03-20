import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import MicroMarketInsights from "@/components/MicroMarketInsights";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const project = projects.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
        <h1 className="text-3xl font-semibold text-[#C6A15B] mb-2">Asset Not Found</h1>
        <p className="text-gray-400">The requested property profile ({slug}) is not available.</p>
        <Link href="/projects" className="mt-8 px-6 py-2 border border-[#C6A15B]/50 hover:bg-[#C6A15B]/10 rounded-full transition text-sm">
          Return to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-[#050505] text-white min-h-screen pb-20">
      {/* HERO SECTION */}
      <section className="relative h-[65vh] md:h-[80vh] w-full flex items-end pb-16 md:pb-24">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={`${project.name} - ${project.location}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs uppercase tracking-widest text-black bg-[#C6A15B] rounded-sm font-semibold">
                  {project.status}
                </span>
                <span className="px-3 py-1 text-xs uppercase tracking-widest text-[#C6A15B] border border-[#C6A15B]/30 rounded-sm bg-black/50 backdrop-blur-md">
                  {project.developer}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-4">
                {project.name}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 font-light max-w-xl">
                {project.location}
              </p>
            </div>
            
            <div className="md:text-right bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 md:min-w-[280px]">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                Entry Valuation
              </p>
              <p className="text-3xl md:text-4xl font-semibold text-[#C6A15B]">
                {project.startingPrice}
              </p>
              <div className="mt-6 pt-6 border-t border-white/10">
                <Link 
                  href="/contact"
                  className="block text-center bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition text-sm"
                >
                  Request Dossier
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTELLIGENCE DASHBOARD COMPONENT */}
      <MicroMarketInsights 
        location={project.location}
        intelligence={project.intelligence}
      />

      {/* CTA SECTION */}
      <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-[#111] to-black p-10 md:p-16 rounded-3xl border border-white/10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Secure This Asset
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Access strictly guarded layouts, real-time availability, and structured payment advisories through our private client network.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/contact"
              className="w-full sm:w-auto bg-[#C6A15B] text-black px-8 py-3.5 rounded-full font-semibold hover:bg-[#C6A15B]/90 transition"
            >
              Schedule Private Viewing
            </Link>
            <Link 
              href="/projects"
              className="w-full sm:w-auto px-8 py-3.5 border border-white/20 text-white rounded-full font-medium hover:bg-white/5 transition"
            >
              Explore Portfolio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}