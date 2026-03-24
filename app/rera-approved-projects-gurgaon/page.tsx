import { Metadata } from 'next';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { getProjects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'RERA Approved Projects Gurgaon | Secure Luxury Real Estate',
  description: 'Explore the definitive list of RERA approved projects in Gurgaon. Advisory-driven curation of ultra luxury homes with verified legal standing and premium amenities.',
  alternates: {
    canonical: '/rera-approved-projects-gurgaon',
  },
};

export default function ReraApprovedProjectsGurgaon() {
  const reraProjects = getProjects().filter(p => p.location.toLowerCase().includes('gurgaon') || p.location.toLowerCase().includes('gurugram'));

  return (
    <main className="bg-[#050505] text-white min-h-screen pt-24 pb-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-semibold mb-6">
          RERA Approved Projects in <span className="text-[#C6A15B]">Gurgaon</span>
        </h1>
        <p className="text-lg text-gray-400 mb-8 leading-relaxed">
          Navigating the expansive luxury real estate market of Gurgaon requires uncompromising diligence. We present an exclusive curation of RERA approved projects in Gurgaon, ensuring that your investment in ultra luxury homes is safeguarded by strict legal compliance and unparalleled architectural excellence.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-[#C6A15B]">Why Choose RERA Compliant Ultra Luxury Homes in Delhi NCR?</h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          The Real Estate (Regulation and Development) Act provides an institutional framework to protect buyers across India. By investing in a RERA approved project, exclusive clientele benefit from enhanced transparency, assured delivery timelines, and financial security. Our curated portfolio consists only of projects developed by tier-1 institutional developers, offering unmatched lifestyle amenities alongside absolute peace of mind.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4 text-[#C6A15B]">The Golf Course Road Ecosystem</h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          While exploring RERA approved properties, many of our High Net-worth Individuals naturally gravitate towards the <Link href="/luxury-apartments-golf-course-road" className="text-white underline hover:text-[#C6A15B]">Luxury Apartments on Golf Course Road</Link>. This micro-market maintains the highest compound annual growth rate in the National Capital Region, offering an ecosystem that seamlessly integrates cosmopolitan living with supreme exclusivity.
        </p>

        <h3 className="text-xl font-semibold mb-4">Securing Your Investment</h3>
        <p className="text-gray-300 mb-12 leading-relaxed">
          Whether you are evaluating primary residences or seeking generational wealth preservation vehicles, our deep-market intelligence allows us to guide you through the intricacies of RERA documentation, developer track records, and micro-market viability. Discover our elite collection of <Link href="/ultra-luxury-homes-delhi-ncr" className="text-white underline hover:text-[#C6A15B]">Ultra Luxury Homes in Delhi NCR</Link> below.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-center">Featured RERA Approved Inventory</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reraProjects.map(project => (
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
