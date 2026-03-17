export default function DealflowPage() {
    return (
      <main className="bg-black text-white min-h-screen px-6 py-16">
  
        {/* HERO */}
        <section className="max-w-4xl mx-auto text-center">
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get 2–5 Serious Property Buyers Every Week
          </h1>
  
          <p className="text-gray-400 mb-8 text-lg">
            No ads. No portals. Just real buyer conversations.
          </p>
  
          {/* CTA BUTTON */}
          <a
            href="https://ykwizard1.gumroad.com/l/ccsxt"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition"
          >
            Get Instant Access
          </a>
  
          {/* TRUST TEXT */}
          <p className="text-gray-500 mt-4 text-sm">
            Instant access after payment • One-time $9 • No subscription
          </p>
  
        </section>
  
        {/* WHAT YOU GET */}
        <section className="max-w-4xl mx-auto mt-24">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            What You Get
          </h2>
  
          <ul className="text-gray-400 space-y-4 text-center">
            <li>• Where to find real buyers (global sources)</li>
            <li>• Copy-paste DM scripts that start conversations</li>
            <li>• Qualification framework (filter serious buyers)</li>
            <li>• 7-day execution plan</li>
          </ul>
        </section>
  
        {/* PROBLEM */}
        <section className="max-w-4xl mx-auto mt-24 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Stop Chasing Fake Leads
          </h2>
  
          <p className="text-gray-400">
            Most brokers waste time on portals and low-quality leads.  
            This system helps you connect directly with real buyers already looking.
          </p>
        </section>
  
        {/* FINAL CTA */}
        <section className="max-w-4xl mx-auto mt-24 text-center">
          <a
            href="https://ykwizard1.gumroad.com/l/ccsxt"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition"
          >
            Get Instant Access
          </a>
        </section>
  
      </main>
    );
  }