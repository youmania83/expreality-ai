import { Metadata } from 'next';
import Link from 'next/link';
import { getLocations, getProjects } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Platform Directory | Exprealty Insights',
  description: 'Complete directory of all documented luxury real estate projects, city zones, and investment hubs.',
  alternates: {
    canonical: 'https://exprealty.in/directory',
  },
};

export default function DirectoryPage() {
  const locations = getLocations();
  const projects = getProjects();

  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] font-sans pt-32 pb-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">Platform <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">Directory</span></h1>
        <p className="text-lg text-gray-400 font-light max-w-2xl mb-16">
          Access our complete index of verified cities, ultra-luxury projects, and specific high-intent investment collections.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LOCATIONS */}
          <div>
            <h2 className="text-2xl font-medium mb-6 text-[#C6A15B] border-b border-white/10 pb-4">Locations & Markets</h2>
            <ul className="space-y-4">
              {locations.map(loc => (
                <li key={loc.slug}>
                  <Link href={`/locations/${loc.slug}`} className="text-gray-300 hover:text-white hover:underline decoration-[#C6A15B] underline-offset-4 group select-none">
                    {loc.name} Intelligence Report <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* PROJECTS */}
          <div>
            <h2 className="text-2xl font-medium mb-6 text-[#C6A15B] border-b border-white/10 pb-4">Analyzed Projects</h2>
            <ul className="space-y-4">
              {projects.map(proj => (
                <li key={proj.slug}>
                  <Link href={`/projects/${proj.slug}`} className="text-gray-300 hover:text-white hover:underline decoration-[#C6A15B] underline-offset-4 group select-none">
                    {proj.name} Verification <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLLECTIONS */}
          <div className="lg:col-span-2 mt-8">
            <h2 className="text-2xl font-medium mb-6 text-[#C6A15B] border-b border-white/10 pb-4">Curated Investment Collections</h2>
            <div className="flex flex-col md:flex-row gap-8">
              <Link href="/rera-approved-projects-gurgaon" className="text-gray-300 hover:text-white hover:underline decoration-[#C6A15B] underline-offset-4 group select-none">
                RERA Approved Projects Gurgaon <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">→</span>
              </Link>
              <Link href="/luxury-apartments-golf-course-road" className="text-gray-300 hover:text-white hover:underline decoration-[#C6A15B] underline-offset-4 group select-none">
                Luxury Apartments Golf Course Road <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">→</span>
              </Link>
              <Link href="/investment-properties-dubai" className="text-gray-300 hover:text-white hover:underline decoration-[#C6A15B] underline-offset-4 group select-none">
                Investment Properties Dubai <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
