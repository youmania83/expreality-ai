import { Metadata } from 'next';
import Link from 'next/link';
import { getProjects, getLocationBySlug } from '@/lib/data';
import { Building2, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Luxury Apartments on Golf Course Road | Exclusive Real Estate',
  description: 'Explore the most elite luxury apartments and ultra-premium residences on Golf Course Road, Gurgaon. Pricing, livability, and insider insights.',
  alternates: {
    canonical: 'https://exprealty.in/luxury-apartments-golf-course-road',
  },
};

export default function LuxuryGolfCourseRoad() {
  const projects = getProjects().filter(p => p.location_slug === 'golf-course-road');

  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] font-sans pb-24 pt-32">
      <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24">
        {/* HERO */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#C6A15B]/20 rounded-full bg-[#C6A15B]/5 backdrop-blur-md mb-6 relative">
            <Building2 className="w-4 h-4 text-[#C6A15B]" />
            <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-[#C6A15B] font-medium">Billionaire's Row of India</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">
            Luxury Apartments on <br className="hidden md:block"/> <span className="font-semibold text-white">Golf Course Road</span>
          </h1>
          <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">
            The pinnacle of ultra-luxury living in Delhi NCR. Uncover private listings, builder reputations, and actual ground reality before committing to a ₹30Cr+ asset.
          </p>
        </div>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projects.map((proj) => {
            const loc = getLocationBySlug(proj.location_slug);
            return (
              <Link key={proj.slug} href={`/projects/${proj.slug}`} className="group block bg-[#0F0F0F] border border-[#C6A15B]/10 rounded-2xl p-8 hover:border-[#C6A15B]/50 hover:-translate-y-1 transition-all shadow-[0_4px_30px_rgba(198,161,91,0.03)] hover:shadow-[0_4px_40px_rgba(198,161,91,0.1)]">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 text-[#C6A15B] mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-widest">{loc?.name}</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-white transition-colors">{proj.name}</h2>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">Pricing</span>
                    <span className="text-[#C6A15B] font-medium">{proj.price_range}</span>
                  </div>
                </div>
                <div className="bg-[#151515] p-4 rounded-xl mt-4">
                  <span className="text-xs text-gray-400 flex items-center gap-1 mb-1 font-semibold uppercase tracking-wider"> Amenities</span>
                  <span className="text-sm font-light text-gray-300 line-clamp-2">{proj.insights.amenities}</span>
                </div>
                <div className="mt-6 flex justify-end">
                  <span className="text-sm text-[#C6A15B] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Project Details <ArrowRight className="w-4 h-4" />
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
            Are you looking to <span className="font-bold text-white">RENT</span> or <span className="font-bold text-white">Buy</span> on <span className="text-[#C6A15B]">Golf Course Road</span>?
          </h3>
          <p className="text-lg text-gray-400 mb-10 relative z-10 font-light">
            Call us before making any decision. Gain access to off-market inventory and unbiased advisory.
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
