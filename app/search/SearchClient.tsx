"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, MapPin, Building2, ArrowRight } from 'lucide-react';

// Using dummy import mechanism for client app to grab static data; 
// In a real API this would use SWR/React Query.
import locationsData from '@/data/locations.json';
import projectsData from '@/data/projects.json';

export default function SearchClient() {
  const [query, setQuery] = useState('');

  const filteredLocations = useMemo(() => {
    if (!query) return locationsData;
    const lowerQuery = query.toLowerCase();
    return locationsData.filter(loc =>
      loc.name.toLowerCase().includes(lowerQuery) ||
      loc.city.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const filteredProjects = useMemo(() => {
    if (!query) return projectsData;
    const lowerQuery = query.toLowerCase();
    return projectsData.filter(proj =>
      proj.name.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  // Insights Engine MVP Rule:
  const noData = query && filteredLocations.length === 0 && filteredProjects.length === 0;

  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] font-sans pt-32 pb-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-light tracking-tight mb-8">
          Universal <span className="font-semibold text-[#C6A15B]">Search</span>
        </h1>
        
        <div className="w-full relative mb-16">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="w-6 h-6 text-gray-500" />
          </div>
          <input
            type="text"
            className="w-full bg-[#0F0F0F] border border-white/10 rounded-2xl py-6 pl-16 pr-8 text-xl focus:outline-none focus:border-[#C6A15B]/50 focus:bg-[#151515] transition-all placeholder:text-gray-600"
            placeholder="Search locations, projects, or natural queries..."
            value={query}
            autoFocus
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-6 flex items-center text-xs uppercase tracking-widest text-gray-500 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        <div className="w-full space-y-12">
          {noData ? (
            <div className="text-center py-20 bg-[#0A0A0A] border border-white/5 rounded-2xl">
              <span className="text-4xl block mb-4">👉</span>
              <p className="text-xl font-light text-gray-400">“No verified data available yet”</p>
              <p className="text-sm text-gray-600 mt-2 max-w-sm mx-auto">We rely on strict verification for our intelligence base. We do not have data for this query at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              
              {/* LOCATIONS RESULTS */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">Matching Locations</h2>
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-500">{filteredLocations.length} results</span>
                </div>
                {filteredLocations.length > 0 ? (
                  filteredLocations.map(loc => (
                    <Link key={loc.slug} href={`/locations/${loc.slug}`} className="group flex flex-col gap-2 p-6 bg-[#0A0A0A] border border-white/5 rounded-xl hover:border-[#C6A15B]/30 hover:bg-[#0F0F0F] transition-all">
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <MapPin className="w-3 h-3" />
                        <span className="text-[10px] uppercase tracking-widest">{loc.city}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium group-hover:text-[#C6A15B] transition-colors">{loc.name}</h3>
                        <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#C6A15B] transform group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-sm text-gray-500 font-light mt-1 w-[90%] truncate">Livability: {loc.livability_score}/10 | Safety: {loc.safety_score}/10</p>
                    </Link>
                  ))
                ) : null}
              </div>

              {/* PROJECTS RESULTS */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">Matching Projects</h2>
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-500">{filteredProjects.length} results</span>
                </div>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map(proj => {
                    const matchedLoc = locationsData.find(l => l.slug === proj.location_slug);
                    return (
                      <Link key={proj.slug} href={`/projects/${proj.slug}`} className="group flex flex-col gap-2 p-6 bg-[#0A0A0A] border border-white/5 rounded-xl hover:border-[#C6A15B]/30 hover:bg-[#0F0F0F] transition-all">
                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                          <Building2 className="w-3 h-3" />
                          <span className="text-[10px] uppercase tracking-widest">{matchedLoc?.name || 'Unknown'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium group-hover:text-[#C6A15B] transition-colors">{proj.name}</h3>
                          <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#C6A15B] transform group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-sm text-gray-500 font-light mt-1">{proj.price_range}</p>
                      </Link>
                    );
                  })
                ) : null}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}