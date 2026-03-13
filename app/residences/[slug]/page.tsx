import React from "react";
import { notFound } from "next/navigation";
import { residences } from "../../../data/residences";

type ResidencePageProps = {
  params: { slug: string };
};

export default function ResidencePage({ params }: ResidencePageProps) {
  const residence = residences.find((r) => r.slug === params.slug);

  if (!residence) return notFound();

  return (
    <main className="min-h-screen bg-black text-gray-100 px-6 md:px-16 lg:px-24 py-16 md:py-20">
      <section className="max-w-5xl mx-auto">
        <p className="uppercase tracking-[0.25em] text-xs text-gray-500">
          Signature Residence Detail
        </p>
        <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold">
          {residence.name}
        </h1>
        <p className="mt-3 text-sm md:text-base text-gray-400">
          {residence.location}
        </p>
        <p className="mt-4 text-base md:text-lg text-[#C6A15B]">
          {residence.priceRange || residence.startingPrice}
        </p>
        <p className="mt-6 text-sm md:text-base text-gray-300 leading-relaxed">
          {residence.description}
        </p>
        {residence.amenities?.length ? (
          <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300">
            {residence.amenities.map((amenity) => (
              <li
                key={amenity}
                className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#C6A15B]" />
                <span>{amenity}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </main>
  );
}

