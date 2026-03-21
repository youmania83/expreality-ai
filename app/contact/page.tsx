"use client";

import React, { useEffect } from "react";

const ContactPage = () => {
  // To trigger the global modal, we manipulate the URL hash
  // PremiumFloatingCTA handles listening to this hash
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem("contactModalOpened")) {
        window.location.hash = "open-form";
        sessionStorage.setItem("contactModalOpened", "true");
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const waHref = "https://wa.me/918368137724?text=" + encodeURIComponent("Hi, I’m interested in luxury properties in Gurgaon. Please assist.");

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-gray-200 px-6 md:px-16 lg:px-24 py-16 md:py-20">
      <section className="max-w-4xl mx-auto space-y-6">
        <header className="space-y-3">
          <p className="uppercase tracking-[0.25em] text-xs text-gray-500">
            Contact
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold">
            Connect with Exprealty
          </h1>
          <p className="text-sm md:text-base text-gray-300">
            Reach out to initiate a confidential conversation about your Delhi
            NCR luxury acquisition brief.
          </p>
        </header>

        <div className="rounded-3xl border border-white/5 bg-[#111111] p-6 md:p-8 space-y-4">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const name = formData.get("name") as string;
              const phone = formData.get("phone") as string;
              const purpose = formData.get("purpose") as string;

              // Webhook or formspree endpoint logic:
              const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_URL || "https://formspree.io/f/mqwaanvd";
              
              try {
                await fetch(formspreeEndpoint, {
                  method: "POST",
                  body: formData,
                  headers: { Accept: "application/json" },
                });

                const message = `Hi, I just submitted a request on Exprealty for luxury properties. Name: ${name}. Interest: ${purpose || "undecided"}.`;
                window.location.href = `https://wa.me/918368137724?text=${encodeURIComponent(message)}`;
              } catch (err) {
                alert("Submission failed. Please try again or connect via WhatsApp.");
              }
            }}
            className="flex flex-col gap-4 animate-fade-in"
          >
            <div>
              <input 
                name="name"
                required 
                type="text" 
                placeholder="Full Name *"
                className="w-full bg-black border border-white/10 text-white rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#C6A15B] transition-colors" 
              />
            </div>
            <div>
              <input 
                name="phone"
                required 
                type="tel" 
                placeholder="WhatsApp Number *"
                className="w-full bg-black border border-white/10 text-white rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#C6A15B] transition-colors" 
              />
            </div>
            <div>
              <textarea 
                name="purpose"
                placeholder="Area of Interest (e.g. Golf Course Road, Investment)"
                rows={3}
                className="w-full bg-black border border-white/10 text-white rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#C6A15B] transition-colors resize-none" 
              />
            </div>
            <button 
              type="submit" 
              className="w-full mt-2 bg-[#C6A15B] text-black rounded-xl px-6 py-4 font-semibold text-sm hover:bg-[#C6A15B]/90 transition-colors uppercase tracking-wide"
            >
              Request Private Advisory
            </button>
          </form>

          <div className="pt-6 border-t border-white/10 mt-6 text-center text-sm text-gray-400">
            <p className="mb-4">Or bypass the form and connect directly:</p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full gap-3 bg-[#25D366] text-black px-6 py-4 rounded-xl font-semibold hover:bg-[#1DA851] transition uppercase tracking-wide"
            >
              <svg viewBox="0 0 32 32" aria-hidden="true" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M16.01 6.002c-4.42 0-8.01 3.59-8.01 8.01 0 1.412.37 2.79 1.07 4.01L8 24l6.12-1.99c1.15.42 2.37.64 3.59.64h.01c4.42 0 8.01-3.59 8.01-8.01 0-2.14-.83-4.15-2.34-5.66s-3.52-2.34-5.66-2.34zm4.69 11.45c-.2.56-1.17 1.09-1.61 1.14-.41.04-.94.06-1.52-.1-.35-.11-.8-.26-1.38-.51-2.44-1.06-4.02-3.54-4.14-3.7-.12-.16-.99-1.32-.99-2.52 0-1.2.63-1.79.86-2.03.22-.23.48-.29.64-.29h.46c.15.01.35-.06.55.42.2.48.67 1.65.73 1.77.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.24.25-.1.49.14.24.63 1.04 1.35 1.69.93.83 1.71 1.09 1.96 1.21.25.12.39.1.54-.06.15-.16.63-.73.8-.98.17-.25.34-.21.57-.13.23.08 1.46.69 1.71.82.25.13.42.19.48.3.06.11.06.64-.14 1.2z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;

