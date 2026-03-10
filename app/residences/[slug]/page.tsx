import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { residences } from "../../../data/residences";

type ResidencePageProps = {
  params: {
    slug: string;
  };
};

const ResidencePage = ({ params }: ResidencePageProps) => {
  const residence = residences.find((r) => r.slug === params.slug);

  if (!residence) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-gray-200">
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={residence.image}
            alt={residence.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0B0B0B]" />
        </div>

        <div className="relative z-10 h-full px-6 md:px-16 lg:px-24 flex items-end pb-10">
          <div className="max-w-3xl space-y-3">
            <p className="uppercase tracking-[0.25em] text-xs text-gray-400">
              Signature Residence • Delhi NCR
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
              {residence.name}
            </h1>
            <p className="text-sm md:text-base text-gray-300">
              {residence.location}
            </p>
            <p className="text-sm md:text-base text-[#C6A15B] font-semibold">
              Price range: {residence.priceRange}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold">
            Residence Overview
          </h2>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            {residence.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-sm text-gray-300">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Location
              </p>
              <p className="mt-2">{residence.location}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Price Range
              </p>
              <p className="mt-2">{residence.priceRange}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Category
              </p>
              <p className="mt-2">Ultra-luxury residence</p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 mt-4 space-y-6">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">Amenities</h3>
              <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300">
                {residence.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#C6A15B]" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <h3 className="text-lg md:text-xl font-semibold">
              Enquire about this residence
            </h3>
            <p className="mt-3 text-sm md:text-base text-gray-300 max-w-xl">
              Share your brief and we will send you a bespoke dossier on{" "}
              {residence.name}, including layout guidance, preferred stacks,
              view analysis and transaction intelligence.
            </p>
            <button className="mt-6 bg-[#C6A15B] text-black px-7 py-3 rounded-full font-semibold tracking-wide hover:bg-[#C6A15B]/90 transition">
              Enquire Now
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResidencePage;

