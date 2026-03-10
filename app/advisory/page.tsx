import React from "react";

const AdvisoryPage = () => {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-gray-200 px-6 md:px-16 lg:px-24 py-16 md:py-20">
      <section className="max-w-5xl mx-auto space-y-6">
        <header className="space-y-3">
          <p className="uppercase tracking-[0.25em] text-xs text-gray-500">
            Private Advisory
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold">
            Ultra-Luxury Real Estate Advisory
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-2xl">
            Share your acquisition brief and timelines. We respond with a
            curated short-list, transaction intelligence and corridor guidance
            rather than generic listings.
          </p>
        </header>

        <div className="rounded-3xl border border-white/5 bg-[#111111] p-6 md:p-8 text-sm text-gray-300 space-y-4">
          <p>
            This advisory section will host your intake form and explanation of
            how Expreality works with buyers, family offices and capital
            allocators.
          </p>
          <p className="text-xs text-gray-500">
            For now, please use the contact page or email{" "}
            <a
              href="mailto:advisory@expreality.ai"
              className="text-gray-300 hover:text-[#C6A15B]"
            >
              advisory@expreality.ai
            </a>{" "}
            to share your brief.
          </p>
        </div>
      </section>
    </main>
  );
};

export default AdvisoryPage;

