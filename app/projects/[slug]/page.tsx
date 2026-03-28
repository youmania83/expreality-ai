import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjects, getProjectBySlug, getLocationBySlug } from '@/lib/data';
import Link from 'next/link';
import { MapPin, Building2, CheckCircle, XCircle, Info, ShieldAlert, Droplets, Zap, Wrench } from 'lucide-react';

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((proj) => ({
    slug: proj.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);
  if (!project) return { title: 'Project Not Found' };
  
  return {
    title: `${project.name} Review, Pros & Cons | Expreality`,
    description: `Read independent ground reality analysis for ${project.name}, including construction quality, amenities, water supply and resident sentiment.`,
    alternates: {
      canonical: `https://exprealty.in/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} Intelligence Report | Exprealty`,
      description: `Read verified, ground-reality insights for ${project.name}.`,
      url: `https://exprealty.in/projects/${project.slug}`,
      type: 'article',
      images: [
        {
          url: 'https://exprealty.in/featured/og-image-default.jpg',
          alt: `${project.name} project image`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} Intelligence Report | Exprealty`,
      description: `Read verified, ground-reality insights for ${project.name}.`,
      images: ['https://exprealty.in/featured/og-image-default.jpg'],
      site: '@Exprealty',
      creator: '@Exprealty',
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const location = getLocationBySlug(project.location_slug);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": project.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] font-sans pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 px-6 md:px-16 lg:px-24 border-b border-white/5 bg-gradient-to-b from-[#0A0A0A] to-[#050505]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-[#C6A15B] uppercase tracking-widest text-xs font-semibold mb-4">
              <Building2 className="w-4 h-4" />
              <span>Project Review & Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4 text-white">
              {project.name}
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10 w-max">
                <span className="text-xs uppercase text-gray-400 font-medium">Pricing</span>
                <span className="font-semibold text-lg">{project.price_range}</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10 w-max">
                <span className="text-xs uppercase text-gray-400 font-medium">Segment</span>
                <span className={`font-semibold text-sm uppercase tracking-wider ${project.segment === 'luxury' ? 'text-[#C6A15B]' : project.segment === 'mid' ? 'text-blue-400' : 'text-green-400'}`}>
                  {project.segment}
                </span>
              </div>
              {location && (
                <Link href={`/locations/${location.slug}`} className="flex items-center gap-2 group px-4 py-3 bg-[#C6A15B]/10 hover:bg-[#C6A15B]/20 text-[#C6A15B] transition-colors rounded-xl border border-[#C6A15B]/20">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium text-sm">View {location.name} Intelligence Report <span className="inline-block transform group-hover:translate-x-1 transition-transform">&rarr;</span></span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* KEY INSIGHTS */}
      <section className="px-6 md:px-16 lg:px-24 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-light tracking-tight mb-8">Verified <span className="font-semibold">Insights</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-white/5 flex flex-col h-full gap-3">
              <div className="flex items-center gap-2 text-[#C6A15B] text-sm font-semibold uppercase tracking-wider mb-2">
                <ShieldAlert className="w-4 h-4" /> Construction
              </div>
              <p className="text-gray-300 font-medium text-lg leading-relaxed">{project.insights.construction_quality}</p>
            </div>
            
            <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-white/5 flex flex-col h-full gap-3">
              <div className="flex items-center gap-2 text-[#C6A15B] text-sm font-semibold uppercase tracking-wider mb-2">
                <Info className="w-4 h-4" /> Amenities
              </div>
              <p className="text-gray-300 font-medium text-lg leading-relaxed">{project.insights.amenities}</p>
            </div>
            
            <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-white/5 flex flex-col h-full gap-3">
              <div className="flex items-center gap-2 text-[#C6A15B] text-sm font-semibold uppercase tracking-wider mb-2">
                <Droplets className="w-4 h-4" /> Water Supply
              </div>
              <p className="text-gray-300 font-medium text-lg leading-relaxed">{project.insights.water}</p>
            </div>

            <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-white/5 flex flex-col h-full gap-3">
              <div className="flex items-center gap-2 text-[#C6A15B] text-sm font-semibold uppercase tracking-wider mb-2">
                <Zap className="w-4 h-4" /> Backup
              </div>
              <p className="text-gray-300 font-medium text-lg leading-relaxed">{project.insights.power_backup}</p>
            </div>

            {project.insights.maintenance && (
              <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-white/5 flex flex-col h-full gap-3 lg:col-span-4">
                <div className="flex items-center gap-2 text-[#C6A15B] text-sm font-semibold uppercase tracking-wider mb-2">
                  <Wrench className="w-4 h-4" /> Maintenance Assessment
                </div>
                <p className="text-gray-300 font-medium text-lg leading-relaxed">{project.insights.maintenance}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PROS AND CONS AND LOCATION SUMMARY */}
      <section className="px-6 md:px-16 lg:px-24 py-12 bg-[#0A0A0A] border-y border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* PROS & CONS */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-light tracking-tight mb-6 text-white">Project: <span className="font-semibold">Pros</span></h2>
              <ul className="space-y-4">
                {project.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 bg-[#111] border border-white/5 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-300">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-light tracking-tight mb-6 text-white">Project: <span className="font-semibold">Cons</span></h2>
              <ul className="space-y-4">
                {project.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 bg-[#111] border border-white/5 rounded-xl">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-gray-300">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* LOCATION SUMMARY */}
          {location && (
            <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 flex flex-col lg:col-span-1">
              <h3 className="text-xl font-medium mb-6">Location Context: <span className="text-[#C6A15B]">{location.name}</span></h3>
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/5">
                <span className="text-gray-400 font-light text-sm uppercase tracking-wider">Livability Score</span>
                <span className={`text-2xl font-bold ${location.livability_score >= 8 ? 'text-green-400' : 'text-yellow-400'}`}>
                  {location.livability_score}<span className="text-sm font-light text-gray-500">/10</span>
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm mb-8 flex-1">
                Before deciding on this project, ensure the surrounding location meets your infrastructure and livability requirements.
              </p>
              <Link href={`/locations/${location.slug}`} className="w-full text-center bg-white text-black py-4 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                Read Location Report
              </Link>
            </div>
          )}
        </div>

        {/* PREMIUM CTA */}
        <div className="max-w-4xl mx-auto mt-16 p-10 md:p-14 text-center rounded-3xl bg-gradient-to-br from-[#111111] to-[#0A0A0A] border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="text-2xl md:text-4xl font-light tracking-tight mb-4 relative z-10 text-gray-300">
            Are you looking to <span className="font-bold text-white">RENT</span> or <span className="font-bold text-white">Buy</span> in <span className="text-[#C6A15B] font-medium">{project.name}</span>?
          </h3>
          <p className="text-lg md:text-xl text-gray-400 mb-10 relative z-10 font-light">
            Call us before making any decision.
          </p>
          <a href="https://wa.me/918368137724" target="_blank" rel="noopener noreferrer" className="inline-block relative z-10 bg-white/5 border border-[#C6A15B]/30 rounded-full py-4 px-8 hover:bg-[#C6A15B]/10 hover:border-[#C6A15B] hover:scale-105 transition-all shadow-[0_0_20px_rgba(198,161,91,0.1)]">
            <span className="text-white font-bold text-lg md:text-xl tracking-wide">
              WhatsApp on +918368137724 for more details
            </span>
          </a>
        </div>
      </section>

      {/* FAQ SECTION (SEO) */}
      <section className="px-6 md:px-16 lg:px-24 py-20">
        <div className="max-w-4xl flex flex-col mx-auto">
          <h2 className="text-2xl font-light tracking-tight mb-10 text-center">Questions about <span className="font-semibold">{project.name}</span></h2>
          <div className="space-y-6">
            {project.faq.map((item, i) => (
              <div key={i} className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors">
                <h3 className="text-lg font-medium text-white mb-4 leading-snug">{item.question}</h3>
                <p className="text-gray-400 font-light leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
