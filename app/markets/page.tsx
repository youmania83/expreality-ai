import React from "react";

const MarketsPage = () => {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-gray-200 px-6 md:px-16 lg:px-24 py-16 md:py-20">
      <section className="max-w-5xl mx-auto space-y-6">
        <header className="space-y-3">
          <p className="uppercase tracking-[0.25em] text-xs text-gray-500">
            Market Intelligence
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold">
            Delhi NCR Luxury Markets
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-2xl">
            High-level views on Golf Course Road, Golf Extension, Central Delhi
            and key farmhouse corridors. This section will evolve into a
            full-fledged market intelligence console.
          </p>
        </header>

        <div className="rounded-3xl border border-white/5 bg-[#111111] p-6 md:p-8 text-sm text-gray-300">
          <p>
            Markets content coming soon. Use this space to publish corridor
            benchmarks, psf ranges, absorption trends and commentary that
            informs ultra-luxury acquisition decisions.
          </p>
        </div>
      </section>
    </main>
  );
};

export default MarketsPage;

