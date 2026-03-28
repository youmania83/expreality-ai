import { Metadata } from 'next';
import Link from 'next/link';
import { getProjects, getLocationBySlug } from '@/lib/data';
import { ShieldCheck, Building2, MapPin, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Top RERA Approved Projects in Gurgaon | Verified Luxury Real Estate',
  description: 'Explore the most sought-after, 100% RERA verified luxury residential projects in Gurgaon. Get unbiased ground-reality insights, livability scores, and direct market data.',
  alternates: {
    canonical: 'https://exprealty.in/rera-approved-projects-gurgaon',
  },
};

export default function ReraProjectsGurgaon() {
  const gurgaonSlugs = ['golf-course-road', 'golf-course-extension-road', 'sector-65-gurgaon', 'dlf-phase-5', 'sohna-road', 'new-gurgaon', 'mg-road-gurgaon'];
  const projects = getProjects().filter(p => gurgaonSlugs.includes(p.location_slug));

  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] font-sans pb-24 pt-32">
      <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24">
        {/* HERO */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-green-500/20 rounded-full bg-green-500/5 backdrop-blur-md mb-6 relative">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-green-400 font-medium">100% RERA Verified</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">
            RERA Approved Projects in <span className="font-semibold text-white">Gurgaon</span>
          </h1>
          <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">
            Investing in real estate shouldn't be a gamble. Discover premium, legal, and RERA-approved developments across Gurgaon's top corridors.
          </p>
        </div>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projects.map((proj) => {
            const loc = getLocationBySlug(proj.location_slug);
            return (
              <Link key={proj.slug} href={`/projects/${proj.slug}`} className="group block bg-[#0F0F0F] border border-white/5 rounded-2xl p-8 hover:border-[#C6A15B]/40 hover:-translate-y-1 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-widest">{loc?.name || 'Gurgaon'}</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-white group-hover:text-[#C6A15B] transition-colors">{proj.name}</h2>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">Pricing</span>
                    <span className="text-white font-medium">{proj.price_range}</span>
                  </div>
                </div>
                <div className="bg-[#151515] p-4 rounded-xl mt-4">
                  <span className="text-xs text-green-500 flex items-center gap-1 mb-1 font-semibold uppercase tracking-wider"><ShieldCheck className="w-3 h-3"/> Trust Score</span>
                  <span className="text-sm font-medium text-gray-300 line-clamp-2">{proj.insights.construction_quality}</span>
                </div>
                <div className="mt-6 flex justify-end">
                  <span className="text-sm text-[#C6A15B] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Intelligence Report <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* PREMIUM CTA */}
        <div className="max-w-4xl mx-auto p-10 md:p-14 text-center rounded-3xl bg-gradient-to-br from-[#111111] to-[#0A0A0A] border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-4 relative z-10 text-gray-300">
            Looking to <span className="font-bold text-white">RENT</span> or <span className="font-bold text-white">Buy</span> a verified apartment in Gurgaon?
          </h3>
          <p className="text-lg text-gray-400 mb-10 relative z-10 font-light">
            Skip the marketing noise. Call us before making your decision.
          </p>
          <a href="https://wa.me/918368137724" target="_blank" rel="noopener noreferrer" className="inline-block relative z-10 bg-white/5 border border-[#C6A15B]/30 rounded-full py-4 px-8 hover:bg-[#C6A15B]/10 hover:border-[#C6A15B] hover:scale-105 transition-all">
            <span className="text-white font-bold text-lg md:text-xl tracking-wide">
              WhatsApp on +918368137724 for more details
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
