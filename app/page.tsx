import React from 'react';
import Link from 'next/link';
import { getLocations, getProjects } from '@/lib/data';
import { Search, MapPin, Building2, ShieldCheck, Activity } from 'lucide-react';

export const metadata = {
  title: 'Expreality | Decision Intelligence for Real Estate',
  description: 'Know where to live before you decide. Data-driven insights and real-life living conditions for locations and premium projects.',
  openGraph: {
    title: 'Expreality | Decision Intelligence for Real Estate',
    description: 'Know where to live before you decide. Data-driven insights and real-life living conditions for locations and premium projects.',
    url: 'https://exprealty.in',
    siteName: 'Exprealty',
    type: 'website',
    images: ['https://exprealty.in/featured/og-image-default.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expreality | Decision Intelligence for Real Estate',
    description: 'Know where to live before you decide. Data-driven insights and real-life living conditions for locations and premium projects.',
    images: ['https://exprealty.in/featured/og-image-default.jpg'],
    site: '@Exprealty',
    creator: '@Exprealty',
  },
};

export default function HomePage() {
  const locations = getLocations();
  const projects = getProjects();

  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] font-sans selection:bg-[#C6A15B] selection:text-black">
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-800/20 via-[#050505] to-[#050505]" />
        
        <div className="relative z-10 w-full px-6 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
            <Activity className="w-4 h-4 text-[#C6A15B]" />
            <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-[#C6A15B] font-medium">Delhi NCR & Panipat Intelligence Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.1]">
            Know where to live <br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">before you decide.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-light tracking-wide leading-relaxed">
            Stop scrolling through endless property listings. Get verified, ground-reality insights on livability, safety, water supply, and infrastructure for Gurgaon, Noida, Delhi, and Panipat.
          </p>
          
          <div className="w-full max-w-2xl mt-8">
            <Link href="/search" className="flex items-center gap-4 w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 md:p-6 transition-all group backdrop-blur-xl hover:border-white/20">
              <Search className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
              <div className="flex-1 text-left">
                <p className="text-gray-300 font-medium text-lg">Search a location or project...</p>
                <p className="text-gray-500 text-sm mt-1">e.g. Sector 65 Gurgaon, Model Town Panipat, Noida Extension</p>
              </div>
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg text-xs font-semibold text-gray-400">
                <span>⌘</span>
                <span>K</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED LOCATIONS */}
      <section className="px-6 md:px-16 lg:px-24 py-24 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight">
                Featured <span className="font-semibold">Locations</span>
              </h2>
              <p className="mt-4 text-gray-400 font-light max-w-xl">
                Deep-dive into neighborhood livability scores, ground reality checks, and resident sentiments.
              </p>
            </div>
            <Link href="/search" className="group flex items-center gap-2 text-sm uppercase tracking-widest text-[#C6A15B] hover:text-white transition-colors">
              Explore All
              <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <Link key={loc.slug} href={`/locations/${loc.slug}`} className="group block bg-[#0F0F0F] border border-white/5 rounded-2xl p-8 hover:border-[#C6A15B]/40 hover:-translate-y-1 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-widest">{loc.city}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-[#C6A15B] transition-colors">{loc.name}</h3>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Livability</span>
                    <span className={`text-xl font-bold ${loc.livability_score >= 8 ? 'text-green-400' : 'text-yellow-400'}`}>
                      {loc.livability_score}
                      <span className="text-sm font-light text-gray-500">/10</span>
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-400 font-light line-clamp-2">
                  {loc.pros.join(' • ')}
                </p>
                
                <div className="mt-6 pt-6 border-t border-white/5 flex gap-4 text-xs font-medium text-gray-400">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-gray-500" />
                    Safety: {loc.safety_score}
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="w-4 h-4 text-gray-500" />
                    Conn: {loc.connectivity_score}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="px-6 md:px-16 lg:px-24 py-24 bg-gradient-to-br from-[#0A0A0A] to-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight">
                Analyzed <span className="font-semibold">Projects</span>
              </h2>
              <p className="mt-4 text-gray-400 font-light max-w-xl">
                Unbiased insights on construction quality, water supply, and actual living conditions.
              </p>
            </div>
            <Link href="/search" className="group flex items-center gap-2 text-sm uppercase tracking-widest text-[#C6A15B] hover:text-white transition-colors">
              Search Projects
              <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {projects.map((proj) => {
              const loc = locations.find(l => l.slug === proj.location_slug);
              return (
                <Link key={proj.slug} href={`/projects/${proj.slug}`} className="group block bg-[#0F0F0F] border border-white/5 rounded-2xl p-8 hover:border-[#C6A15B]/40 hover:-translate-y-1 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Building2 className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-widest">{loc?.name || 'Unknown Location'}</span>
                      </div>
                      <h3 className="text-xl md:text-3xl font-semibold text-white group-hover:text-[#C6A15B] transition-colors">{proj.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">Pricing</span>
                      <span className="text-white font-medium">{proj.price_range}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-[#151515] p-4 rounded-xl">
                      <span className="text-xs text-gray-500 block mb-1 uppercase tracking-wider">Quality</span>
                      <span className="text-sm font-medium text-gray-300">{proj.insights.construction_quality}</span>
                    </div>
                    <div className="bg-[#151515] p-4 rounded-xl">
                      <span className="text-xs text-gray-500 block mb-1 uppercase tracking-wider">Water</span>
                      <span className="text-sm font-medium text-gray-300 line-clamp-1">{proj.insights.water}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXCLUSIVE MARKETS & COLLECTIONS */}
      <section className="px-6 md:px-16 lg:px-24 py-24 border-t border-white/5 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight">
              Curated <span className="font-semibold">Collections</span>
            </h2>
            <p className="mt-4 text-gray-400 font-light max-w-xl">
              Explore our highest intent property categories and global investment hubs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/rera-approved-projects-gurgaon" className="group p-8 bg-[#111] rounded-2xl border border-white/5 hover:border-[#C6A15B]/40 transition-all flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[#C6A15B] transition-colors">RERA Approved Projects Gurgaon</h3>
                <p className="text-sm text-gray-400 font-light">100% verified, legal, and risk-free luxury assets.</p>
              </div>
            </Link>
            <Link href="/luxury-apartments-golf-course-road" className="group p-8 bg-[#111] rounded-2xl border border-white/5 hover:border-[#C6A15B]/40 transition-all flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[#C6A15B] transition-colors">Luxury Apartments Golf Course Road</h3>
                <p className="text-sm text-gray-400 font-light">The Billionaire's Row of India.</p>
              </div>
            </Link>
            <Link href="/investment-properties-dubai" className="group p-8 bg-[#111] rounded-2xl border border-white/5 hover:border-[#C6A15B]/40 transition-all flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[#C6A15B] transition-colors">Investment Properties Dubai</h3>
                <p className="text-sm text-gray-400 font-light">Tax-free yields and Golden Visa eligibility.</p>
              </div>
            </Link>
            <Link href="/directory" className="group p-8 bg-[#111] rounded-2xl border border-[#C6A15B]/20 hover:border-[#C6A15B] transition-all flex items-center justify-between col-span-1 md:col-span-3">
              <div>
                <h3 className="text-xl font-semibold mb-1 group-hover:text-[#C6A15B] transition-colors">View Complete Platform Directory</h3>
                <p className="text-sm text-gray-400 font-light">Full index of all cities, projects, and insights.</p>
              </div>
              <span className="text-[#C6A15B] text-xl font-semibold">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY EXPREALITY */}
      <section className="px-6 md:px-16 lg:px-24 py-32 border-t border-white/5 relative bg-[#050505] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C6A15B]/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="uppercase tracking-[0.2em] text-xs text-[#C6A15B] font-medium block mb-4">The Standard of Trust</span>
          <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-tight">
            Decision <span className="font-semibold italic">Intelligence</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            We do not sell properties. We provide you with the unfiltered truth about where you are planning to live. No marketing jargon, just ground reality, verified by real residents and data models.
          </p>
        </div>
      </section>
    </div>
  );
}
