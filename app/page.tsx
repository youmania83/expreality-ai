"use client";

import React from 'react';
import Image from 'next/image';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-gray-200">
      {/* Hero Section */}
      <section className="w-full px-6 md:px-16 lg:px-24 py-12 md:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left column: copy */}
          <div className="space-y-6">
            <p className="uppercase tracking-[0.3em] text-xs md:text-sm text-gray-400">
              Delhi NCR • Curated Residences
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
              Bespoke Luxury Real Estate
              <span className="block text-[#C6A15B]">
                for the Discerning Few.
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-300 max-w-xl">
              Access a handpicked portfolio of penthouses, golf-course villas, and private residences across Delhi NCR, guided by private advisory rather than listings.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 md:pt-4">
              <button className="bg-[#C6A15B] text-black px-7 py-3 rounded-full font-semibold tracking-wide hover:bg-[#C6A15B]/90 transition">
                Request Private Briefing
              </button>
              <button className="border border-[#C6A15B]/60 text-gray-200 px-7 py-3 rounded-full font-medium hover:bg-[#C6A15B]/10 transition">
                View Signature Collection
              </button>
            </div>
            <div className="flex flex-wrap gap-6 pt-4 text-xs md:text-sm text-gray-400">
              <div>
                <p className="font-semibold text-gray-200">₹15 Cr+</p>
                <p>Average transaction size</p>
              </div>
              <div>
                <p className="font-semibold text-gray-200">20+ Years</p>
                <p>Ultra-luxury expertise</p>
              </div>
              <div>
                <p className="font-semibold text-gray-200">Strictly by invite</p>
                <p>Private buyer network</p>
              </div>
            </div>
          </div>

          {/* Right column: hero image */}
          <div className="relative h-64 md:h-80 lg:h-[420px] rounded-3xl overflow-hidden border border-white/10 bg-[#050505] shadow-[0_24px_70px_rgba(0,0,0,0.8)] hero-image">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
              alt="Luxury residence with pool and palm trees"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent" />
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-image {
          opacity: 0;
          transform: translateY(12px);
          animation: heroFadeIn 0.9s ease-out forwards;
          animation-delay: 0.15s;
        }

        @keyframes heroFadeIn {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Featured Projects */}
      <section className="px-6 md:px-16 lg:px-24 py-16 md:py-20 bg-gradient-to-b from-[#0B0B0B] to-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-10">
            <div>
              <p className="uppercase tracking-[0.25em] text-xs text-gray-500">
                Featured Residences
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-semibold">
                Signature Homes Across Delhi NCR
              </h2>
            </div>
            <button className="hidden md:inline-flex text-sm border-b border-[#C6A15B]/60 text-gray-200 hover:text-[#C6A15B] hover:border-[#C6A15B] transition">
              Explore full portfolio
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <article className="group rounded-3xl bg-[#111111] overflow-hidden border border-white/5 hover:border-[#C6A15B]/60 transition">
              <div className="relative h-56">
                <Image
                  src="/globe.svg"
                  alt="Golf course villa"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-gray-300">
                  <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10">
                    Gurgaon • Golf Course Road
                  </span>
                  <span className="text-[#C6A15B] font-semibold">
                    ₹32 Cr
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-lg md:text-xl font-semibold">
                  Triplex Sky Villa with Private Deck
                </h3>
                <p className="text-sm text-gray-400">
                  9,500 sq.ft. | 5 ensuite bedrooms | panoramic city and golf-course views from every level.
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-gray-400 pt-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    Private elevator
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    Sky deck pool
                  </span>
                </div>
              </div>
            </article>

            {/* Card 2 */}
            <article className="group rounded-3xl bg-[#111111] overflow-hidden border border-white/5 hover:border-[#C6A15B]/60 transition">
              <div className="relative h-56">
                <Image
                  src="/window.svg"
                  alt="Lutyens bungalow"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-gray-300">
                  <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10">
                    Central Delhi • Lutyens Zone
                  </span>
                  <span className="text-[#C6A15B] font-semibold">
                    On Request
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-lg md:text-xl font-semibold">
                  Heritage Bungalow with Sculpted Gardens
                </h3>
                <p className="text-sm text-gray-400">
                  1+ acre land parcel with curated landscape, private pavilion, and embassy-grade security envelope.
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-gray-400 pt-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    Private drive-in
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    Embassy belt
                  </span>
                </div>
              </div>
            </article>

            {/* Card 3 */}
            <article className="group rounded-3xl bg-[#111111] overflow-hidden border border-white/5 hover:border-[#C6A15B]/60 transition">
              <div className="relative h-56">
                <Image
                  src="/file.svg"
                  alt="Farmhouse"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-gray-300">
                  <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10">
                    Chhatarpur • Farm Estate
                  </span>
                  <span className="text-[#C6A15B] font-semibold">
                    ₹24 Cr
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-lg md:text-xl font-semibold">
                  Contemporary Farmhouse with Courtyard Pool
                </h3>
                <p className="text-sm text-gray-400">
                  2.5 acre estate with resort-style pool court, double-height living and full-service staff quarters.
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-gray-400 pt-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    Managed estate
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    Turnkey interiors
                  </span>
                </div>
              </div>
            </article>
          </div>

          {/* Credibility / Trust metrics */}
          <div className="mt-16 border-t border-white/5 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                  Average Transaction
                </p>
                <p className="mt-2 text-2xl md:text-3xl font-semibold text-gray-100">
                  ₹15 Cr+
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  Typical ticket size across our closed mandates.
                </p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                  Experience
                </p>
                <p className="mt-2 text-2xl md:text-3xl font-semibold text-gray-100">
                  20+ Years
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  Deep focus on Delhi NCR&apos;s ultra-luxury corridors.
                </p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                  Buyer Network
                </p>
                <p className="mt-2 text-2xl md:text-3xl font-semibold text-gray-100">
                  Private &amp; Invite-only
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  Family offices, CXOs and long-horizon capital allocators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory CTA */}
      <section className="px-6 md:px-16 lg:px-24 py-12 border-t border-white/5 bg-black">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="uppercase tracking-[0.25em] text-xs text-gray-500">
              Private Advisory
            </p>
            <h3 className="mt-3 text-2xl md:text-3xl font-semibold">
              Schedule a confidential conversation with our lead advisor.
            </h3>
            <p className="mt-3 text-sm md:text-base text-gray-400 max-w-xl">
              Share your acquisition brief and timelines, and we will curate a short-list of off-market and on-market options that match your intent precisely.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <button className="bg-[#C6A15B] text-black px-7 py-3 rounded-full font-semibold tracking-wide hover:bg-[#C6A15B]/90 transition">
              Schedule Consultation
            </button>
            <p className="text-xs text-gray-500">
              Discretion guaranteed • No mass marketing • Invite-only inventory
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
