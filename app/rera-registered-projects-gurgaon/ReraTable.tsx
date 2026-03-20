"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { projects as verifiedProjects } from "@/data/projects";

type ReraProject = {
  projectName: string;
  developerName: string;
  reraNumber: string;
  location: string;
  status: string;
  possession: string;
  slug: string;
};

export default function ReraTable({ data }: { data: ReraProject[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDeveloper, setFilterDeveloper] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  
  const [modalData, setModalData] = useState<ReraProject | null>(null);

  // Derive unique lists for filters
  const developers = useMemo(() => Array.from(new Set(data.map(p => p.developerName))).sort(), [data]);
  const locations = useMemo(() => Array.from(new Set(data.map(p => p.location))).sort(), [data]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchSearch = item.projectName.toLowerCase().includes(searchTerm.toLowerCase()) || item.reraNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDev = filterDeveloper ? item.developerName === filterDeveloper : true;
      const matchLoc = filterLocation ? item.location === filterLocation : true;
      return matchSearch && matchDev && matchLoc;
    });
  }, [data, searchTerm, filterDeveloper, filterLocation]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, page]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getMatchedVerifiedProject = (slug: string) => {
    return verifiedProjects.find(p => p.slug === slug && p.hasDedicatedPage !== false);
  };

  return (
    <div className="w-full">
      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input 
          type="text"
          placeholder="Search by Project or RERA Number..."
          className="flex-1 bg-[#111] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C6A15B] transition-colors"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
        />
        <select 
          className="bg-[#111] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C6A15B] transition-colors"
          value={filterDeveloper}
          onChange={(e) => { setFilterDeveloper(e.target.value); setPage(1); }}
        >
          <option value="">All Developers</option>
          {developers.map(dev => <option key={dev} value={dev}>{dev}</option>)}
        </select>
        <select 
          className="bg-[#111] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C6A15B] transition-colors"
          value={filterLocation}
          onChange={(e) => { setFilterLocation(e.target.value); setPage(1); }}
        >
          <option value="">All Locations</option>
          {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>
      </div>

      {/* TABLE DATA */}
      <div className="bg-[#0A0A0A] rounded-2xl border border-white/10 overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#111] text-gray-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4 font-medium border-b border-white/5">Project Name</th>
                <th className="px-6 py-4 font-medium border-b border-white/5">Developer</th>
                <th className="px-6 py-4 font-medium border-b border-white/5">RERA Number</th>
                <th className="px-6 py-4 font-medium border-b border-white/5">Location</th>
                <th className="px-6 py-4 font-medium border-b border-white/5">Status</th>
                <th className="px-6 py-4 font-medium border-b border-white/5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-200">
              {paginatedData.length > 0 ? paginatedData.map((project, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{project.projectName}</td>
                  <td className="px-6 py-4 text-xs">{project.developerName}</td>
                  <td className="px-6 py-4 text-[#C6A15B] text-xs max-w-[200px] truncate">{project.reraNumber}</td>
                  <td className="px-6 py-4 text-xs truncate max-w-[200px]" title={project.location}>{project.location}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] tracking-wider uppercase ${project.status === "Registered" ? "bg-green-500/10 text-green-400" : project.status === "Lapsed" ? "bg-red-500/10 text-red-500" : "bg-yellow-500/10 text-yellow-500"}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {getMatchedVerifiedProject(project.slug) ? (
                      <Link href={`/projects/${project.slug}`} className="text-[#C6A15B] hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider">
                        View Details
                      </Link>
                    ) : (
                      <button onClick={() => setModalData(project)} className="text-gray-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider border-b border-gray-600 hover:border-white w-max mx-auto block">
                        Get Intel
                      </button>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">No matching RERA projects found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE STACKED CARDS */}
      <div className="md:hidden space-y-4">
        {paginatedData.length > 0 ? paginatedData.map((project, i) => (
          <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-white text-base">{project.projectName}</h4>
              <span className={`px-2 py-1 rounded text-[10px] tracking-wider uppercase ${project.status === "Registered" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-500"}`}>
                {project.status}
              </span>
            </div>
            <p className="text-xs text-[#C6A15B] mb-3 break-all">{project.reraNumber}</p>
            <div className="space-y-1 mb-4 text-sm text-gray-400">
              <p><span className="text-gray-600 w-20 inline-block">Developer:</span> {project.developerName}</p>
              <p><span className="text-gray-600 w-20 inline-block">Location:</span> {project.location}</p>
            </div>
            {getMatchedVerifiedProject(project.slug) ? (
              <Link href={`/projects/${project.slug}`} className="block w-full text-center bg-[#C6A15B]/10 border border-[#C6A15B]/30 text-[#C6A15B] py-2 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#C6A15B] hover:text-black transition">
                View Project Details
              </Link>
            ) : (
              <button onClick={() => setModalData(project)} className="block w-full text-center bg-white/5 border border-white/10 text-white py-2 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-white/10 transition">
                Request Info
              </button>
            )}
          </div>
        )) : (
          <div className="text-center py-10 text-gray-500 bg-[#111] rounded-xl border border-white/10">No projects found.</div>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button 
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="p-2 border border-white/10 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          </button>
          <span className="text-sm text-gray-400 text-center">Page <strong className="text-white">{page}</strong> of {totalPages}</span>
          <button 
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="p-2 border border-white/10 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      )}

      {/* FALLBACK MODAL */}
      {modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setModalData(null)} />
          <div className="relative z-10 w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden animate-fade-in shadow-[0_24px_70px_rgba(0,0,0,0.8)]">
            <div className="p-8">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-100 mb-2">{modalData.projectName}</h3>
              <p className="text-xs uppercase tracking-widest text-[#C6A15B] mb-6">{modalData.developerName}</p>
              
              <div className="bg-[#111] border border-white/5 rounded-xl p-4 mb-8 space-y-3 text-sm">
                <div>
                  <p className="text-gray-500 text-xs">RERA Reference</p>
                  <p className="text-gray-200">{modalData.reraNumber}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Project Status</p>
                  <p className="text-gray-200">{modalData.status}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => { e.preventDefault(); alert("Developer Website currently unavailable."); }}
                  className="w-full flex justify-center items-center gap-2 bg-white/5 text-white border border-white/10 px-6 py-3.5 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Visit Developer Website
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => { e.preventDefault(); window.location.hash = "#open-form"; setModalData(null); }}
                  className="w-full flex justify-center items-center gap-2 bg-[#C6A15B] text-black px-6 py-3.5 rounded-xl text-sm font-semibold hover:bg-[#C6A15B]/90 transition-colors"
                >
                  Request Brochure
                </a>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 text-center">
                 <button onClick={() => setModalData(null)} className="text-gray-500 text-[10px] tracking-widest uppercase hover:text-white transition">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
