import { Metadata } from 'next';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Luxury Apartments in Golf Course Road | Exclusive Real Estate',
  description: 'Discover the most coveted luxury apartments on Golf Course Road, Gurgaon. Exclusive access to premium inventory, bespoke amenities, and ultra luxury living.',
  alternates: {
    canonical: '/luxury-apartments-golf-course-road',
  },
};

export default function LuxuryApartmentsGolfCourseRoad() {
  const gcrProjects = projects.filter(p => p.location.toLowerCase().includes('golf course'));

  return (
    <main className="bg-[#050505] text-white min-h-screen pt-24 pb-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-semibold mb-6">
          Luxury Apartments on <span className="text-[#C6A15B]">Golf Course Road</span>
        </h1>
        <p className="text-lg text-gray-400 mb-8 leading-relaxed">
          The Golf Course Road in Gurgaon stands as a testament to world-class urban luxury. Investing in luxury apartments on Golf Course Road guarantees not only an unmatched quality of life but also significant long-term capital appreciation. We offer curated access to this elite micro-market.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-[#C6A15B]">The Epicenter of Opulence</h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Recognized as the premier address in the National Capital Region, Golf Course Road seamlessly blends high-street retail, culinary excellence, and vast green expanses. The <Link href="/ultra-luxury-homes-delhi-ncr" className="text-white underline hover:text-[#C6A15B]">Ultra Luxury Homes in Delhi NCR</Link> located here provide unobstructed panoramic views of the Aravallis, combined with 5-star concierge services.
        </p>

        <h3 className="text-xl font-semibold mb-4">Unparalleled Connectivity & Infrastructure</h3>
        <p className="text-gray-300 mb-6 leading-relaxed">
          The infrastructure flanking this corridor provides rapid access to international airports, pivotal business districts, and exclusive country clubs. This robust connectivity solidifies Golf Course Road as the most coveted location for <Link href="/rera-approved-projects-gurgaon" className="text-white underline hover:text-[#C6A15B]">RERA Approved Projects in Gurgaon</Link>. 
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-[#C6A15B]">Advisory Driven Asset Selection</h2>
        <p className="text-gray-300 mb-12 leading-relaxed">
          Our private advisory network identifies high-alpha assets across the Golf Course Extension before they reach the secondary market. Whether you require expansive penthouses with private infinity pools or serene sky villas, we present exclusively tailored inventory. Browse our premium selection below.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-center">Exclusive Golf Course Road Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gcrProjects.length > 0 ? (
            gcrProjects.map(project => (
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
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-400 py-10 border border-white/10 rounded-2xl">
              Currently reviewing exclusive mandates for this location. Please contact our advisory team for off-market inventory.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
