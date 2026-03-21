"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function PremiumFloatingCTA({ phoneNumber = "918368137724" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const encodedMessage = encodeURIComponent("Hi, I’m interested in luxury properties in Delhi NCR. Please assist.");
  const waHref = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Listen for hash changes to auto-open modal (used by Contact Page)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#open-form") {
        setIsOpen(false);
        setIsModalOpen(true);
        // Clear hash after opening
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };
    handleHashChange(); // Check on mount
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Close menu when modal opens
  const handleOpenModal = () => {
    setIsOpen(false);
    setIsModalOpen(true);
  };

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
            onClick={handleOpenModal}
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
        <LeadModal onClose={() => setIsModalOpen(false)} adminPhone={phoneNumber} />
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
function LeadModal({ onClose, adminPhone }: { onClose: () => void, adminPhone: string }) {
  const [formData, setFormData] = useState({ purpose: "", name: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_URL || "https://formspree.io/f/mqwaanvd"; 

  const isFormValid = formData.name.trim() !== "" && formData.phone.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setStatus("submitting");
    setErrorMsg("");
    
    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      const res = await fetch(formspreeEndpoint, {
        method: "POST",
        body: formPayload,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error("Submission failed. Please try again.");

      setStatus("success");
      
      const message = `Hi, I just submitted a request on Exprealty for luxury properties. Name: ${formData.name}. Interest: ${formData.purpose || "undecided"}.`;
      const encodedMsg = encodeURIComponent(message);
      
      setTimeout(() => {
        window.location.href = `https://wa.me/${adminPhone}?text=${encodedMsg}`;
      }, 1500);

    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
      setStatus("error");
    }
  };

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header Section */}
        <div className="p-6 md:p-8 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-100 leading-tight pr-4">
              Access Off-Market Inventory
            </h3>
            <button onClick={onClose} className="p-2 -mr-2 text-gray-500 hover:text-white transition-colors rounded-full hover:bg-white/10 self-start">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
            Speak directly with our senior partners for curated property dossiers and exclusive walkthroughs in Delhi NCR.
          </p>
        </div>

        {/* Dynamic Body Section */}
        <div className="p-6 md:p-8 overflow-y-auto">
          {status === "success" ? (
            <div className="text-center py-6 animate-fade-in">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#C6A15B]/20 mb-4">
                <svg className="h-8 w-8 text-[#C6A15B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-xl font-medium text-white mb-2">Request Approved</h4>
              <p className="text-gray-400 text-sm mb-6">Connecting you securely to our Priority WhatsApp Advisory...</p>
              
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-[#C6A15B] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-[#C6A15B] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-[#C6A15B] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col flex-grow animate-fade-in">
              <div className="mb-6 flex items-center justify-center gap-2 px-4 py-2 bg-[#C6A15B]/10 rounded-full border border-[#C6A15B]/20 w-max mx-auto">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6A15B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C6A15B]"></span>
                </span>
                <span className="text-[10px] uppercase font-semibold text-[#C6A15B] tracking-wider">
                  Only 3 advisory slots available this week
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <input 
                    required 
                    type="text" 
                    placeholder="Full Name *"
                    className="w-full bg-[#111] border border-white/10 text-white rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#C6A15B] transition-colors" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  />
                </div>
                <div>
                  <input 
                    required 
                    type="tel" 
                    placeholder="WhatsApp Number *"
                    className="w-full bg-[#111] border border-white/10 text-white rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#C6A15B] transition-colors" 
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Area of Interest (e.g. Golf Course Road, Investment)"
                    rows={3}
                    className="w-full bg-[#111] border border-white/10 text-white rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#C6A15B] transition-colors resize-none" 
                    value={formData.purpose} 
                    onChange={(e) => setFormData({...formData, purpose: e.target.value})} 
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-xs text-center">{errorMsg}</p>
                )}

                <button 
                  disabled={status === "submitting" || !isFormValid} 
                  type="submit" 
                  className="w-full mt-2 bg-[#C6A15B] text-black rounded-xl px-6 py-4 font-semibold text-sm hover:bg-[#C6A15B]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
                >
                  {status === "submitting" ? "Securing Slot..." : "Request Private Advisory"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Global Footer Trust Banner */}
        <div className="p-4 bg-black/40 border-t border-white/5 flex-shrink-0">
          <p className="text-[10px] text-center text-gray-500 tracking-wider uppercase font-medium">
            Advisory led. No spam. Strictly confidential.
          </p>
        </div>

      </div>
      
      {/* Basic Keyframes for smooth transitions */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
}
