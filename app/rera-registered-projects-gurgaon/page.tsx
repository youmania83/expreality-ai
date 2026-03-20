import { Metadata } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import ReraTable from "./ReraTable";

// Server-side loaded data strategy allows easy swapping out of JSON dumps
const loadExternalData = () => {
  try {
    const dataPath = path.join(process.cwd(), "data", "rera-projects.json");
    const doc = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(doc);
  } catch (err) {
    return [];
  }
};

export const metadata: Metadata = {
  title: "RERA Registered Projects in Gurgaon (2026)",
  description: "Explore verified RERA registered projects in Gurgaon with developer details, registration numbers, and project insights.",
};

export default function ReraProjectsPage() {
  const reraData = loadExternalData();

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* PAGE HEADER */}
      <section className="pt-32 pb-16 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto border-b border-white/5">
        <p className="text-[#C6A15B] uppercase tracking-[0.2em] text-xs font-semibold mb-4">Official Verification</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
          RERA Registered Projects in Gurgaon
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed">
          Access our comprehensive directory of verified real estate developments. Explore project statuses, specific RERA registration numbers, and transparent insights into the Delhi NCR luxury market.
        </p>
      </section>

      {/* TABLE SECTION */}
      <section className="py-12 px-6 md:px-16 lg:px-24 mx-auto max-w-[1400px]">
        <ReraTable data={reraData} />
      </section>

      {/* SEO ARTICLE TEXT */}
      <section className="py-20 px-6 md:px-16 lg:px-24 bg-[#0A0A0A] border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-semibold mb-4">Why RERA Registered Projects Matter</h2>
          
          <div className="space-y-6 text-gray-300 leading-relaxed text-sm md:text-base">
             <p>
               The Real Estate (Regulation and Development) Act, famously known as RERA, was established to completely revolutionize the real estate sector by aggressively protecting home purchasers while strictly boosting real estate investments. Selecting <Link href="/projects" className="text-[#C6A15B] hover:underline hover:text-white transition">RERA registered projects in Gurgaon</Link> provides unprecedented accountability and total financial protection for luxury buyers and investors alike.
             </p>
             <p>
               Whether you are looking for sprawling <Link href="/residences" className="text-[#C6A15B] hover:underline hover:text-white transition">exquisite luxury residences</Link> or navigating strategic commercial asset investments within high-growth <Link href="/markets" className="text-[#C6A15B] hover:underline hover:text-white transition">micro-market corridors</Link>, exclusively focusing on properties bearing an official RERA certification ensures that developer funds are escrowed and timelines are legally bound by heavy regulatory oversights.
             </p>
             <p>
               Our extensive proprietary directory empowers you to rapidly query builder profiles, assess exact project locations, and verify possession timelines efficiently. The Haryana Real Estate Regulatory Authority (Gurugram) establishes these firm baselines that filter out unverified operators, leaving only premium, secure asset opportunities.
             </p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 px-6 md:px-16 lg:px-24 text-center">
         <div className="max-w-3xl mx-auto">
           <h3 className="text-2xl md:text-4xl font-semibold mb-6">Looking for curated luxury opportunities in Gurgaon?</h3>
           <p className="text-gray-400 mb-10 max-w-xl mx-auto">
             Bypass the typical market noise. Our private network grants you exclusive early-stage access into the most secure and prestigious developments.
           </p>
           
           <a 
             href="#open-form"
             className="inline-block bg-[#C6A15B] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#C6A15B]/90 transition"
           >
             Request Private Consultation
           </a>
         </div>
      </section>
    </main>
  );
}
