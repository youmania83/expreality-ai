import React from "react";

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-gray-200 px-6 md:px-16 lg:px-24 py-16 md:py-20">
      <section className="max-w-4xl mx-auto space-y-6">
        <header className="space-y-3">
          <p className="uppercase tracking-[0.25em] text-xs text-gray-500">
            Contact
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold">
            Connect with Expreality
          </h1>
          <p className="text-sm md:text-base text-gray-300">
            Reach out to initiate a confidential conversation about your Delhi
            NCR luxury acquisition brief.
          </p>
        </header>

        <div className="rounded-3xl border border-white/5 bg-[#111111] p-6 md:p-8 text-sm text-gray-300 space-y-4">
          <p>
            Email:{" "}
            <a
              href="mailto:advisory@expreality.ai"
              className="text-gray-200 hover:text-[#C6A15B]"
            >
              advisory@expreality.ai
            </a>
          </p>
          <p>Location: Delhi NCR</p>
          <p className="text-xs text-gray-500">
            Please include your approximate budget range, preferred corridors,
            timelines and whether the acquisition is for self-use or
            investment-focused.
          </p>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;

