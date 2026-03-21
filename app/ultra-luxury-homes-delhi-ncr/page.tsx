import { Metadata } from 'next';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Ultra Luxury Homes Delhi NCR | Elite Real Estate Advisory',
  description: 'Curated collection of ultra luxury homes across Delhi NCR. Masterpiece residences, estates, and bespoke luxury apartments curated for high net-worth private clients.',
  alternates: {
    canonical: '/ultra-luxury-homes-delhi-ncr',
  },
};

export default function UltraLuxuryHomesDelhiNcr() {
  // Let's feature the top or most premium projects. E.g., taking the first 6 as premium curated
  const ncrProjects = projects.slice(0, 6);

  return (
    <main className="bg-[#050505] text-white min-h-screen pt-24 pb-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-semibold mb-6">
          Ultra Luxury Homes in <span className="text-[#C6A15B]">Delhi NCR</span>
        </h1>
        <p className="text-lg text-gray-400 mb-8 leading-relaxed">
          At the pinnacle of North Indian real estate, the ultra luxury homes in Delhi NCR redefine the art of fine living. From expansive mansions nestled in highly secure sanctuaries to high-rise <Link href="/luxury-apartments-golf-course-road" className="text-white underline hover:text-[#C6A15B]">Luxury Apartments on Golf Course Road</Link>, this segment demands discrete, expert advisory.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-[#C6A15B]">Defining Ultra-Luxury</h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          True luxury extends beyond square footage and marble finishing. It is defined by legacy architecture, highly restricted density, elite community profiling, and state-of-the-art intelligent home systems. Many of these exclusive properties are fully <Link href="/rera-approved-projects-gurgaon" className="text-white underline hover:text-[#C6A15B]">RERA Approved Projects in Gurgaon</Link> and Delhi, engineered by internationally acclaimed architects.
        </p>
        
        <h3 className="text-xl font-semibold mb-4">Capital Appreciation & Wealth Preservation</h3>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Beyond unparalleled comforts, an ultra luxury home in Delhi NCR represents a robust vehicle for wealth preservation. Capital appreciation within this niche segment consistently outperforms the broader market indices, insulating HNIs against inflationary pressures and market volatility.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-[#C6A15B]">Bespoke Client Advisory</h2>
        <p className="text-gray-300 mb-12 leading-relaxed">
          Expreality offers a white-glove service designed specifically for securing these masterpiece assets. Whether sourcing multi-level penthouses with private helipads or sprawling bespoke bungalows, our private client advisory manages every detail. Discover a selection of the NCRs finest structural masterpieces below.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-center">The Delhi NCR Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ncrProjects.map(project => (
            <Link href={`/projects/${project.slug}`} key={project.slug} className="group block h-full bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden hover:border-[#C6A15B]/50 transition-colors">
              <div className="relative h-64 w-full">
                <SafeImage src={project.image || "/projects/default.jpg"} alt={project.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-[#C6A15B] mb-2">{project.location}</p>
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{project.developer}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white">{project.startingPrice}</span>
                  <span className="text-[#C6A15B]">View Profile &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
