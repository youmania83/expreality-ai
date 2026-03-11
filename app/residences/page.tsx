import React from "react";
import { residences } from "../../data/residences";
import { ResidenceCard } from "../../components/ResidenceCard";

const ResidencesPage = () => {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-gray-200 px-6 md:px-16 lg:px-24 py-16 md:py-20">
      <section className="max-w-6xl mx-auto">
        <header className="mb-10 md:mb-14">
          <p className="uppercase tracking-[0.25em] text-xs text-gray-500">
            Signature Residences
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold">
            Curated Luxury Residences in Delhi NCR
          </h1>
          <p className="mt-4 text-sm md:text-base text-gray-300 max-w-2xl">
            Explore a focused set of Delhi NCR&apos;s most sought-after luxury
            residences, each selected for its brand, micro-market, and long-term
            value profile.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {residences.map((residence) => (
            <ResidenceCard
              key={residence.slug}
              slug={residence.slug}
              name={residence.name}
              location={residence.location}
              startingPrice={residence.startingPrice}
              imageSrc={residence.image}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ResidencesPage;

