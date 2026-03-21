import React from "react";
import { Metadata } from "next";
import reraData from "@/data/rera-projects.json";

export const metadata: Metadata = {
  title: 'Market Intelligence & Performance | Exprealty',
  description: 'Authoritative market intelligence, pricing benchmarks, and RERA approved inventory across Golf Course Road, Delhi NCR, and ultra-luxury corridors.',
};

export default function MarketsPage() {
  // Slicing top 12 RERA projects to maintain performance and a curated luxury UI (no infinite scrolling tables)
  const displayedReraProjects = reraData.filter(p => p.status === "Registered").slice(0, 12);

  const marketSnapshots = [
    {
      region: "Golf Course Road",
      positioning: "The Prime Artery",
      range: "₹25 Cr – ₹100 Cr+",
      trend: "Highly Supply Constrained",
      desc: "The absolute pinnacle of high-rise luxury in Gurgaon. Characterized by severe supply constraints and massive institutional demand, driving defensive capital protection."
    },
    {
      region: "Golf Course Extension",
      positioning: "The New Luxury Corridor",
      range: "₹6 Cr – ₹25 Cr",
      trend: "High Appreciation",
      desc: "Functioning as the immediate growth vector for luxury developers. Superior upcoming infrastructure makes this the highest yielding capital appreciation zone."
    },
    {
      region: "Central & South Delhi",
      positioning: "Legacy & Heritage",
      range: "₹50 Cr – ₹300 Cr+",
      trend: "Generational Hold",
      desc: "Ultra-low velocity market driven by heritage value and plot sizes. Transactions are heavily guarded, off-market, and primarily executed by legacy family offices."
    }
  ];

  return (
    <main className="bg-[#050505] text-gray-200 min-h-screen pt-24 pb-20">
      
      {/* 1. HEADER SECTION */}
      <section className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto mb-20 animate-fade-in">
        <header className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-[#C6A15B]"></div>
            <p className="uppercase tracking-[0.2em] text-[10px] text-[#C6A15B] font-semibold">
              Proprietary Data
            </p>
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white max-w-3xl">
            Market Intelligence &amp; Analytics
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed pt-4">
            Exclusive macro-level insights, corridor positioning, and verified RERA intelligence for the discerning capital allocator. Skip the noise.
          </p>
        </header>
      </section>

      {/* 2. MARKET SNAPSHOT */}
      <section className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto mb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Corridor Benchmarks</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {marketSnapshots.map((snap) => (
            <div key={snap.region} className="group bg-[#0A0A0A] border border-white/5 p-8 rounded-3xl hover:border-[#C6A15B]/40 transition-colors">
              <p className="text-[10px] uppercase tracking-widest text-[#C6A15B] mb-2">{snap.positioning}</p>
              <h3 className="text-2xl font-semibold text-white mb-6 group-hover:text-[#C6A15B] transition-colors">{snap.region}</h3>
              
              <div className="space-y-4 border-t border-white/5 pt-6">
                <div>
                  <p className="text-[10px] uppercase text-gray-500 tracking-wider">Entry Valuation</p>
                  <p className="text-lg font-medium text-gray-200">{snap.range}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-gray-500 tracking-wider">Market Trend</p>
                  <p className="text-sm text-gray-300">{snap.trend}</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mt-4">
                  {snap.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INSIGHTS / COMMENTARY */}
      <section className="bg-[#0A0A0A] border-y border-white/5 py-20 mb-24">
        <div className="px-6 md:px-16 lg:px-24 max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-xl md:text-2xl font-medium text-white">Advisor's Outlook</h2>
          <p className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed italic">
            "While primary market launches continue to command aggressive premiums, the secondary luxury market is seeing robust, silent absorption by UHNWIs. Absolute capital protection and bespoke amenities remain the driving forces behind the continued consolidation into Tier-1 developer assets."
          </p>
        </div>
      </section>

      {/* 4. RERA APPROVED PROJECTS JSON INTEGRATION */}
      <section className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">Verified RERA Database</h2>
            <p className="text-sm text-gray-400">A live sample of registered institutional developments across the NCR.</p>
          </div>
          <p className="text-xs text-[#C6A15B] uppercase tracking-widest border border-[#C6A15B]/30 px-3 py-1.5 rounded-full bg-[#C6A15B]/10">
            Strictly Regulated
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayedReraProjects.map((project, idx) => (
            <article key={idx} className="group bg-[#111111] border border-white/5 rounded-2xl p-6 hover:border-[#C6A15B]/50 hover:bg-[#151515] transition-all flex flex-col h-full relative overflow-hidden">
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C6A15B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div className="relative z-10 flex-grow">
                <div className="mb-4">
                  <span className="text-[9px] uppercase tracking-widest px-2 py-1 rounded bg-[#C6A15B]/20 text-[#C6A15B] border border-[#C6A15B]/20">
                    {project.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-100 mb-1 line-clamp-2 group-hover:text-white transition-colors">{project.projectName}</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-6 line-clamp-1">{project.location}</p>
              </div>
              
              <div className="relative z-10 mt-auto pt-4 border-t border-white/5">
                <p className="text-[9px] text-gray-600 uppercase tracking-widest mb-1">RERA Number</p>
                <p className="text-xs font-mono text-gray-400 bg-black/50 px-2 py-1 rounded w-max border border-white/5">{project.reraNumber}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-3xl p-10 md:p-16 text-center shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Require Deeper Intelligence?</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Filter through the noise. Request a private advisory session to receive customized property dossiers, off-market targets, and exact psf valuations.
          </p>
          <a 
            href="#open-form"
            className="inline-flex items-center justify-center bg-[#C6A15B] text-black px-8 py-4 rounded-xl font-semibold hover:bg-[#C6A15B]/90 transition-colors uppercase tracking-wide text-sm"
          >
            Request Private Advisory
          </a>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </main>
  );
}
