import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { projects } from "@/data/projects";
import MicroMarketInsights from "@/components/MicroMarketInsights";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug.toLowerCase() === slug.toLowerCase());

  if (!project) {
    return { title: "Asset Not Found | Expreality" };
  }

  return {
    title: `${project.name} | Luxury Apartments in ${project.location} | Expreality`,
    description: `Explore ${project.name} by ${project.developer}. Premium luxury apartments and homes in ${project.location}. Starting at ${project.startingPrice}.`,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: `${project.name} | Luxury Apartments in ${project.location} | Expreality`,
      description: `Explore ${project.name} by ${project.developer}. Premium luxury apartments and homes in ${project.location}. Starting at ${project.startingPrice}.`,
      images: [
        {
          url: project.image || "/projects/default.jpg",
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
    },
  };
}

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["RealEstateListing", "Product"],
    "name": project.name,
    "description": `Luxury project in ${project.location} by ${project.developer}. Starting price: ${project.startingPrice}`,
    "image": project.image ? `https://exprealty.in${project.image}` : `https://exprealty.in/projects/default.jpg`,
    "url": `https://exprealty.in/projects/${slug}`,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": project.startingPrice ? project.startingPrice.replace(/[^0-9.]/g, '') || "0" : "0",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "RealEstateAgent",
        "name": "Expreality"
      }
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://exprealty.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Projects",
        "item": "https://exprealty.in/projects"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": project.name,
        "item": `https://exprealty.in/projects/${slug}`
      }
    ]
  };

  // Graceful handling for stubs / direct navigators
  if (project.hasDedicatedPage === false) {
    return (
      <main className="relative min-h-screen flex items-center justify-center p-4">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        {/* Background */}
        <div className="absolute inset-0">
          <SafeImage src={project.image || "/projects/default.jpg"} alt={project.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
        </div>
        
        <div className="relative z-10 w-full max-w-lg bg-[#0A0A0A]/80 border border-white/10 rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.8)] overflow-hidden animate-fade-in">
          <div className="relative h-48 w-full">
            <SafeImage src={project.image || "/projects/default.jpg"} alt={project.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
          </div>
          
          <div className="p-6 md:p-8 relative z-20 -mt-16">
            <span className="px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#C6A15B] border border-[#C6A15B]/30 rounded-sm bg-black/80 backdrop-blur-md mb-3 inline-block">
              {project.status || "Premium Asset"}
            </span>
            <h3 className="text-3xl font-semibold text-gray-100 mb-2">{project.name}</h3>
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
            
            <Link href="/projects" className="mt-6 w-full flex justify-center text-[10px] tracking-widest uppercase text-gray-500 hover:text-white transition-colors py-2">
              Back to Portfolio
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#050505] text-white min-h-screen pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* HERO SECTION */}
      <section className="relative h-[65vh] md:h-[80vh] w-full flex items-end pb-16 md:pb-24">
        {/* Background Image */}
        <div className="absolute inset-0">
          <SafeImage
            src={project.image || "/projects/default.jpg"}
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
            {project.brochureUrl && (
              <a 
                href={project.brochureUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 border border-white/20 text-white rounded-full font-medium hover:bg-white/5 transition"
              >
                Download Brochure
              </a>
            )}
            {project.developerUrl && (
              <a 
                href={project.developerUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 border border-[#C6A15B]/30 text-[#C6A15B] rounded-full font-medium hover:bg-[#C6A15B]/10 transition"
              >
                Visit Developer Website
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}