import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ResidenceCard } from '@/components/ResidenceCard';
import { getProjects } from '@/lib/projects';
import { getMarkets } from '@/lib/markets';

const HomePage = () => {
  const allProjects = getProjects();
  
  // Pick 6 unique cities for Featured Global Projects (using a Map to ensure unique cities)
  const uniqueCitiesMap = new Map();
  for (const project of allProjects) {
    if (!uniqueCitiesMap.has(project.city)) {
      uniqueCitiesMap.set(project.city, project);
    }
    if (uniqueCitiesMap.size >= 6) break;
  }
  const globalProjects = Array.from(uniqueCitiesMap.values());
  
  const markets = getMarkets().slice(0, 4);
  const heroProject = globalProjects[0];

  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] font-sans selection:bg-[#C6A15B] selection:text-black">
      {/* HERO SECTION */}
      <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroProject?.image || "/projects/default.jpg"}
            alt="Luxury global real estate"
            fill
            priority
            className="object-cover scale-105 animate-[kenburns_20s_ease-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/50 to-black/30 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 flex flex-col items-center text-center max-w-5xl mx-auto space-y-6 md:space-y-8 mt-20">
          <div className="inline-block px-3 py-1 mb-2 border border-white/20 rounded-full bg-white/5 backdrop-blur-md">
            <span className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-[#C6A15B] font-medium">Expreality Premium</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1]">
            Global Real Estate
            <span className="block font-semibold mt-2">Intelligence Platform</span>
          </h1>
          
          <p className="text-base md:text-xl text-gray-300 max-w-2xl font-light tracking-wide">
            Discover high-conviction investments across global markets. Institutional-grade analytics combined with private advisory access.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 md:pt-8 w-full sm:w-auto">
            <Link 
              href="/projects"
              className="w-full sm:w-auto bg-[#C6A15B] text-black px-8 py-4 rounded-full font-medium tracking-wide hover:bg-[#A9894C] transition-all transform hover:scale-[1.02]"
            >
              Explore Opportunities
            </Link>
            <Link 
              href="https://wa.me/message/"
              target="_blank"
              className="w-full sm:w-auto border border-white/30 bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded-full font-medium tracking-wide hover:bg-white/10 hover:border-white/50 transition-all transform hover:scale-[1.02]"
            >
              Get Investment Memo
            </Link>
          </div>
        </div>
      </section>

      {/* INVESTOR SIGNALS (TICKER/BANNER STYLE) */}
      <div className="w-full border-y border-white/10 bg-[#0A0A0A] overflow-hidden py-4 select-none">
        <div className="flex space-x-12 animate-[marquee_25s_linear_infinite] whitespace-nowrap text-xs md:text-sm tracking-widest uppercase text-[#C6A15B]/80 font-medium">
          <span>&#x2022; Dubai luxury demand rising</span>
          <span>&#x2022; Gurgaon infra-led growth hitting new peaks</span>
          <span>&#x2022; Mumbai prime yields stabilizing</span>
          <span>&#x2022; London foreign capital influx steady</span>
          <span>&#x2022; Miami high net worth capital migration continues</span>
          <span>&#x2022; Dubai luxury demand rising</span>
        </div>
      </div>

      {/* FEATURED GLOBAL PROJECTS */}
      <section className="px-6 md:px-16 lg:px-24 py-24 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight">
                Featured Global <span className="font-semibold">Projects</span>
              </h2>
              <p className="mt-4 text-gray-400 font-light tracking-wide max-w-xl">
                Exclusive off-market inventory spanning Tier 1 international corridors. Only the most liquid and resilient asset classes.
              </p>
            </div>
            <Link href="/projects" className="group flex items-center gap-2 text-sm uppercase tracking-widest text-[#C6A15B] hover:text-white transition-colors">
              View Complete Ledger
              <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {globalProjects.map((project) => (
              <ResidenceCard
                key={project.slug}
                slug={project.slug}
                name={project.name}
                location={project.location}
                startingPrice={project.startingPrice}
                imageSrc={project.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MARKET INTELLIGENCE */}
      <section className="px-6 md:px-16 lg:px-24 py-24 bg-gradient-to-br from-[#0A0A0A] to-[#050505] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <span className="uppercase tracking-[0.25em] text-xs text-[#C6A15B] font-medium block mb-3">Intelligence Layer</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight">Global Market <span className="font-semibold">Metrics</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {markets.map((market: any, idx: number) => (
              <div key={idx} className="group p-8 rounded-2xl bg-[#0F0F0F] border border-white/5 hover:border-[#C6A15B]/40 hover:-translate-y-2 transition-all duration-500">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold mb-1 group-hover:text-[#C6A15B] transition-colors">{market.city}</h3>
                    <p className="text-xs uppercase tracking-widest text-gray-500">{market.country}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Avg Yield</p>
                    <p className="text-lg font-medium text-[#EDEDED]">{market.avg_rental_yield}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">
                  {market.investor_insight}
                </p>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Growth Drivers</p>
                  <div className="flex flex-wrap gap-2">
                    {market.growth_drivers.slice(0, 2).map((driver: string, i: number) => (
                      <span key={i} className="px-2 py-1 text-[10px] bg-white/5 text-gray-300 rounded border border-white/5 break-words max-w-full truncate">
                        {driver}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-6 md:px-16 lg:px-24 py-32 border-t border-white/10 relative overflow-hidden bg-[#0A0A0A]">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C6A15B]/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
            Elevate Your <span className="font-semibold italic">Portfolio</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Obtain institutional-grade advisory for securing prime global real estate. Discretion guaranteed. Invite-only inventory networks.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/advisory"
              className="px-10 py-4 bg-[#EDEDED] text-[#050505] rounded-full font-medium tracking-wide hover:bg-white transition-colors"
            >
              Request Private Advisory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
