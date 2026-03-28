import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocations, getLocationBySlug, getProjects } from '@/lib/data';
import Link from 'next/link';
import { ShieldCheck, Activity, Droplets, Car, Cloud, MapPin, Building2, CheckCircle, XCircle } from 'lucide-react';

export async function generateStaticParams() {
  const locations = getLocations();
  return locations.map((loc) => ({
    slug: loc.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const location = getLocationBySlug(resolvedParams.slug);
  if (!location) return { title: 'Location Not Found' };
  
  return {
    title: `${location.name} Livability & Safety Review | Expreality`,
    description: `Is ${location.name} a good place to live? Uncover verified insights on water supply, safety, transport, AQI and nearby projects.`,
    alternates: {
      canonical: `https://exprealty.in/locations/${location.slug}`,
    },
    openGraph: {
      title: `${location.name} Intelligence Report | Exprealty`,
      description: `Read verified, ground-reality insights for ${location.name}.`,
      url: `https://exprealty.in/locations/${location.slug}`,
      type: 'article',
      images: [
        {
          url: 'https://exprealty.in/featured/og-image-default.jpg',
          alt: `${location.name} location image`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${location.name} Intelligence Report | Exprealty`,
      description: `Read verified, ground-reality insights for ${location.name}.`,
      images: ['https://exprealty.in/featured/og-image-default.jpg'],
      site: '@Exprealty',
      creator: '@Exprealty',
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const location = getLocationBySlug(resolvedParams.slug);

  if (!location) {
    notFound();
  }

  const nearbyProjects = getProjects().filter(p => p.location_slug === location.slug);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": location.faq.map(item => ({
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
      <section className="relative pt-32 pb-16 px-6 md:px-16 lg:px-24 border-b border-white/5 bg-gradient-to-b from-neutral-900 to-[#050505]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-[#C6A15B] uppercase tracking-widest text-xs font-semibold mb-4">
              <MapPin className="w-4 h-4" />
              <span>{location.city} Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4">
              {location.name}
            </h1>
            <p className="text-gray-400 font-light max-w-xl text-lg">
              Verified livability insights, ground reality reports, and resident sentiment modeling.
            </p>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col items-center bg-[#0A0A0A] p-6 rounded-2xl border border-white/5">
              <span className="text-xs uppercase tracking-widest text-gray-500 mb-2">Livability</span>
              <span className={`text-4xl font-bold ${location.livability_score >= 8 ? 'text-green-400' : 'text-yellow-400'}`}>
                {location.livability_score}<span className="text-xl text-gray-500 font-light">/10</span>
              </span>
            </div>
            <div className="flex flex-col justify-center gap-3">
              <div className="flex justify-between items-center gap-8 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                <span className="text-xs uppercase text-gray-400">Safety</span>
                <span className="font-semibold">{location.safety_score}</span>
              </div>
              <div className="flex justify-between items-center gap-8 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                <span className="text-xs uppercase text-gray-400">Connectivity</span>
                <span className="font-semibold">{location.connectivity_score}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSIGHTS GRID */}
      <section className="px-6 md:px-16 lg:px-24 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-light tracking-tight mb-8">Area <span className="font-semibold">Insights</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 text-[#C6A15B] mb-4">
                <Droplets className="w-5 h-5" />
                <h3 className="font-semibold tracking-wide uppercase text-sm">Water & Drainage</h3>
              </div>
              <p className="text-gray-300 font-light leading-relaxed">{location.insights.water}</p>
            </div>
            <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 text-[#C6A15B] mb-4">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-semibold tracking-wide uppercase text-sm">Safety</h3>
              </div>
              <p className="text-gray-300 font-light leading-relaxed">{location.insights.safety}</p>
            </div>
            <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 text-[#C6A15B] mb-4">
                <Car className="w-5 h-5" />
                <h3 className="font-semibold tracking-wide uppercase text-sm">Transport & Metro</h3>
              </div>
              <p className="text-gray-300 font-light leading-relaxed">{location.insights.transport}</p>
              <p className="text-gray-500 text-xs mt-3 uppercase tracking-wider">Distance to Metro: {location.insights.metro_distance}</p>
            </div>
            <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 text-[#C6A15B] mb-4">
                <Cloud className="w-5 h-5" />
                <h3 className="font-semibold tracking-wide uppercase text-sm">Air Quality (AQI)</h3>
              </div>
              <p className="text-gray-300 font-light leading-relaxed">{location.insights.aqi}</p>
            </div>
            {location.insights.markets && (
              <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 text-[#C6A15B] mb-4">
                  <Building2 className="w-5 h-5" />
                  <h3 className="font-semibold tracking-wide uppercase text-sm">Local Markets</h3>
                </div>
                <p className="text-gray-300 font-light leading-relaxed">{location.insights.markets}</p>
              </div>
            )}
            {location.insights.schools && (
              <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 text-[#C6A15B] mb-4">
                  <CheckCircle className="w-5 h-5" />
                  <h3 className="font-semibold tracking-wide uppercase text-sm">Top Schools</h3>
                </div>
                <p className="text-gray-300 font-light leading-relaxed">{location.insights.schools}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PROS & CONS */}
      <section className="px-6 md:px-16 lg:px-24 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-light tracking-tight mb-6">Ground Reality: <span className="font-semibold">Pros</span></h2>
            <ul className="space-y-4">
              {location.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-4 p-4 bg-[#0A0A0A] border border-white/5 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-300 font-light">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-light tracking-tight mb-6">Ground Reality: <span className="font-semibold">Cons</span></h2>
            <ul className="space-y-4">
              {location.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-4 p-4 bg-[#0A0A0A] border border-white/5 rounded-xl">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-gray-300 font-light">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* PREMIUM CTA */}
        <div className="max-w-4xl mx-auto mt-16 p-10 md:p-14 text-center rounded-3xl bg-gradient-to-br from-[#111111] to-[#0A0A0A] border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="text-2xl md:text-4xl font-light tracking-tight mb-4 relative z-10 text-gray-300">
            Are you looking to <span className="font-bold text-white">RENT</span> or <span className="font-bold text-white">Buy</span> in <span className="text-[#C6A15B] font-medium">{location.name}</span>?
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

      {/* NEARBY PROJECTS */}
      {nearbyProjects.length > 0 && (
        <section className="px-6 md:px-16 lg:px-24 py-16 bg-[#0A0A0A] border-t border-b border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-light tracking-tight mb-8">
              Analyzed Projects in <span className="font-semibold">{location.name}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nearbyProjects.map(proj => (
                <Link key={proj.slug} href={`/projects/${proj.slug}`} className="group block bg-[#111111] border border-white/5 rounded-2xl p-6 hover:border-[#C6A15B]/40 hover:-translate-y-1 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Building2 className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-widest">Pricing: {proj.price_range}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-[#C6A15B] transition-colors">{proj.name}</h3>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6 border-t border-white/5 pt-4">
                    <span className="text-xs text-gray-500 uppercase tracking-widest">Construction: <span className="text-gray-300">{proj.insights.construction_quality}</span></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ SECTION (SEO) */}
      <section className="px-6 md:px-16 lg:px-24 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-light tracking-tight mb-8">Frequently Asked <span className="font-semibold">Questions</span></h2>
          <div className="space-y-6">
            {location.faq.map((item, i) => (
              <div key={i} className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-3">{item.question}</h3>
                <p className="text-gray-400 font-light leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
