import { Metadata } from 'next';
import { Globe, TrendingUp, Building, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Investment Properties in Dubai | High ROI Real Estate | Exprealty',
  description: 'Diversify your portfolio with premium investment properties in Dubai. Tax-free yields, Golden Visa eligibility, and exclusive off-plan access.',
  alternates: {
    canonical: 'https://exprealty.in/investment-properties-dubai',
  },
};

export default function InvestmentPropertiesDubai() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] font-sans pb-24 pt-32 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C6A15B]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 relative z-10">
        {/* HERO */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#C6A15B]/20 rounded-full bg-[#C6A15B]/5 backdrop-blur-md mb-6">
            <Globe className="w-4 h-4 text-[#C6A15B]" />
            <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-[#C6A15B] font-medium">Global Markets</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">
            Investment Properties in <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">Dubai</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Secure high-yielding, tax-free assets in one of the world's most dynamic real estate markets. We provide curated off-plan and ready properties for serious investors.
          </p>
        </div>

        {/* WHY DUBAI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 hover:border-[#C6A15B]/30 transition-all">
            <TrendingUp className="w-8 h-8 text-[#C6A15B] mb-4" />
            <h2 className="text-xl font-semibold mb-3">High Rental Yields</h2>
            <p className="text-gray-400 font-light text-sm leading-relaxed">Achieve consistently high tax-free rental returns ranging between 6% to 9% on average across prime Dubai locations.</p>
          </div>
          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 hover:border-[#C6A15B]/30 transition-all">
            <Globe className="w-8 h-8 text-[#C6A15B] mb-4" />
            <h2 className="text-xl font-semibold mb-3">UAE Golden Visa</h2>
            <p className="text-gray-400 font-light text-sm leading-relaxed">Purchasing a property valued at AED 2 Million or more grants eligibility for a 10-year Golden Visa for you and your family.</p>
          </div>
          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 hover:border-[#C6A15B]/30 transition-all">
            <Building className="w-8 h-8 text-[#C6A15B] mb-4" />
            <h2 className="text-xl font-semibold mb-3">Tax-Free Returns</h2>
            <p className="text-gray-400 font-light text-sm leading-relaxed">No property tax or capital gains tax. You keep 100% of the return on your investment in one of the safest cities globally.</p>
          </div>
        </div>

        {/* EXCLUSIVE ADVISORY BANNER */}
        <div className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg">
            <h2 className="text-2xl md:text-3xl font-light mb-4">Curated Off-Plan <span className="font-semibold">Access</span></h2>
            <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed mb-0">
              We operate exclusively with top-tier developers like Emaar, Nakheel, and Damac. Gain early access to the best units before they hit the open market.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a href="https://wa.me/918368137724" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
              Request Dubai Portfolio <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* PREMIUM CTA */}
        <div className="max-w-4xl mx-auto p-10 md:p-14 text-center rounded-3xl bg-gradient-to-br from-[#111111] to-[#0A0A0A] border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-4 relative z-10 text-gray-300">
            Are you looking to <span className="font-bold text-white">Invest</span> in <span className="text-[#C6A15B]">Dubai</span>?
          </h3>
          <p className="text-lg text-gray-400 mb-10 relative z-10 font-light">
            Speak to our global investment advisors for an unbiased consultation.
          </p>
          <a href="https://wa.me/918368137724" target="_blank" rel="noopener noreferrer" className="inline-block relative z-10 bg-white/5 border border-[#C6A15B]/30 rounded-full py-4 px-8 hover:bg-[#C6A15B]/10 hover:border-[#C6A15B] hover:scale-105 transition-all">
            <span className="text-white font-bold text-lg md:text-xl tracking-wide">
              WhatsApp on +918368137724 for more details
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
