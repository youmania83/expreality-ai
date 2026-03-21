"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ResidenceCard } from '@/components/ResidenceCard';
import { projects } from '@/data/projects';

const HomePage = () => {
  const router = useRouter();
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
              <button 
                onClick={() => router.push("/contact")}
                className="bg-[#C6A15B] text-black px-7 py-3 rounded-full font-semibold tracking-wide hover:bg-[#C6A15B]/90 transition"
              >
                Request Private Briefing
              </button>
              <button 
                onClick={() => router.push("/projects")}
                className="border border-[#C6A15B]/60 text-gray-200 px-7 py-3 rounded-full font-medium hover:bg-[#C6A15B]/10 transition"
              >
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
              src="/projects/m3m-golf-estate-gurgaon.jpg"
              alt="Luxury residence with pool and palm trees"
              fill
              priority
              className="object-cover"
              onError={(e) => {
                e.currentTarget.srcset = "";
                e.currentTarget.src = "/projects/default.jpg";
              }}
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
            <button 
              onClick={() => router.push("/projects")}
              className="hidden md:inline-flex text-sm border-b border-[#C6A15B]/60 text-gray-200 hover:text-[#C6A15B] hover:border-[#C6A15B] transition"
            >
              Explore full portfolio
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project) => (
              <ResidenceCard
                key={project.slug}
                slug={project.slug}
                name={project.name}
                location={project.location}
                startingPrice={project.startingPrice}
                imageSrc={project.image || "/projects/default.jpg"}
              />
            ))}
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

      {/* Authority SEO Links / Micro Markets */}
      <section className="px-6 md:px-16 lg:px-24 py-16 bg-[#0B0B0B] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <p className="uppercase tracking-[0.25em] text-xs text-gray-500 mb-2">Prime Micro-Markets</p>
            <h2 className="text-2xl md:text-3xl font-semibold">Explore Exclusive Regions in Delhi NCR</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/rera-approved-projects-gurgaon" className="block p-8 rounded-2xl bg-[#111111] border border-white/5 hover:border-[#C6A15B]/50 transition group">
              <h3 className="text-xl font-semibold mb-3 group-hover:text-[#C6A15B] transition">RERA Approved Projects Gurgaon</h3>
              <p className="text-sm text-gray-400">Discover legally vetted, ultra-luxury inventory from tier-1 developers.</p>
            </Link>
            <Link href="/luxury-apartments-golf-course-road" className="block p-8 rounded-2xl bg-[#111111] border border-white/5 hover:border-[#C6A15B]/50 transition group">
              <h3 className="text-xl font-semibold mb-3 group-hover:text-[#C6A15B] transition">Luxury Apartments Golf Course Road</h3>
              <p className="text-sm text-gray-400">The most coveted address in the NCR offering world-class amenities.</p>
            </Link>
            <Link href="/ultra-luxury-homes-delhi-ncr" className="block p-8 rounded-2xl bg-[#111111] border border-white/5 hover:border-[#C6A15B]/50 transition group">
              <h3 className="text-xl font-semibold mb-3 group-hover:text-[#C6A15B] transition">Ultra Luxury Homes Delhi NCR</h3>
              <p className="text-sm text-gray-400">Masterpiece residences, penthouses, and estates curated for private clients.</p>
            </Link>
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
