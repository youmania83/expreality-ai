"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function PremiumFloatingCTA({ phoneNumber = "910000000000" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const encodedMessage = encodeURIComponent("Hi, I’d like to discuss a luxury residence.");
  const waHref = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Expanded Options */}
        <div 
          className={`flex flex-col gap-3 transition-all duration-300 origin-bottom-right ${
            isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"
          }`}
        >
          <Link
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#25D366] text-black px-5 py-3 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform font-semibold text-sm w-[200px]"
          >
            <WhatsappIcon className="h-5 w-5" />
            WhatsApp Advisor
          </Link>

          <button
            onClick={() => {
              setIsOpen(false);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-3 bg-[#0A0A0A] border border-[#C6A15B]/50 text-[#C6A15B] px-5 py-3 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:bg-[#C6A15B]/10 hover:border-[#C6A15B] hover:scale-105 transition-all font-semibold text-sm w-[200px]"
          >
            <PhoneIcon className="h-5 w-5" />
            Request Callback
          </button>
        </div>

        {/* Main Floating Button */}
        <button
          onClick={toggleMenu}
          aria-label="Contact Options"
          className={`h-14 w-14 rounded-full shadow-[0_18px_55px_rgba(0,0,0,0.9)] flex items-center justify-center hover:scale-105 transition-all duration-300 z-50 ${
            isOpen 
              ? "bg-[#C6A15B] text-black rotate-45" 
              : "bg-[#0A0A0A] border border-white/10 text-white"
          }`}
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Lead Capture Modal */}
      {isModalOpen && (
        <LeadModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

// --- Icons ---
const PlusIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const PhoneIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const WhatsappIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M16.01 6.002c-4.42 0-8.01 3.59-8.01 8.01 0 1.412.37 2.79 1.07 4.01L8 24l6.12-1.99c1.15.42 2.37.64 3.59.64h.01c4.42 0 8.01-3.59 8.01-8.01 0-2.14-.83-4.15-2.34-5.66s-3.52-2.34-5.66-2.34zm4.69 11.45c-.2.56-1.17 1.09-1.61 1.14-.41.04-.94.06-1.52-.1-.35-.11-.8-.26-1.38-.51-2.44-1.06-4.02-3.54-4.14-3.7-.12-.16-.99-1.32-.99-2.52 0-1.2.63-1.79.86-2.03.22-.23.48-.29.64-.29h.46c.15.01.35-.06.55.42.2.48.67 1.65.73 1.77.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.24.25-.1.49.14.24.63 1.04 1.35 1.69.93.83 1.71 1.09 1.96 1.21.25.12.39.1.54-.06.15-.16.63-.73.8-.98.17-.25.34-.21.57-.13.23.08 1.46.69 1.71.82.25.13.42.19.48.3.06.11.06.64-.14 1.2z" />
  </svg>
);

// --- Modal Component ---
function LeadModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({ name: "", phone: "", budget: "", location: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || "Failed to submit");
      setStatus("success");
      setTimeout(() => onClose(), 3000); // Close after 3 seconds of success
    } catch (err: any) {
      setErrorMsg(err.message);
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
          <h3 className="text-2xl font-semibold text-gray-100 flex items-center justify-between">
            Confidential Briefing
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors rounded-full hover:bg-white/10">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            Share your private acquisition parameters and a lead advisor will contact you discreetly.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#C6A15B]/20 mb-4">
                <svg className="h-8 w-8 text-[#C6A15B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-xl font-medium text-white mb-2">Request Received</h4>
              <p className="text-gray-400 text-sm">Your dossier request has been securely logged. An advisor will reach out shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#C6A15B] font-semibold mb-1">Full Name *</label>
                <input required type="text" className="w-full bg-[#111] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C6A15B] transition-colors" placeholder="e.g. John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#C6A15B] font-semibold mb-1">Phone Number *</label>
                <input required type="tel" className="w-full bg-[#111] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C6A15B] transition-colors" placeholder="+91 90000 00000" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#C6A15B] font-semibold mb-1">Target Budget</label>
                <select className="w-full bg-[#111] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C6A15B] transition-colors appearance-none" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})}>
                  <option value="" disabled>Select a range</option>
                  <option value="₹5 - 10 Cr">₹5 - 10 Cr</option>
                  <option value="₹10 - 20 Cr">₹10 - 20 Cr</option>
                  <option value="₹20 - 50 Cr">₹20 - 50 Cr</option>
                  <option value="₹50 Cr+">₹50 Cr+</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#C6A15B] font-semibold mb-1">Preferred Location</label>
                <input type="text" className="w-full bg-[#111] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C6A15B] transition-colors" placeholder="e.g. Golf Course Road" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-xs">{errorMsg}</p>
              )}

              <button disabled={status === "submitting"} type="submit" className="w-full mt-6 bg-[#C6A15B] text-black rounded-xl px-6 py-3.5 font-semibold text-sm hover:bg-[#C6A15B]/90 transition-colors disabled:opacity-50">
                {status === "submitting" ? "Processing..." : "Request Access"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
