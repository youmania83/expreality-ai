import React from 'react';
import Image from 'next/image';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-luxury-black text-luxury-white">
      <header className="hero p-8">
        <h1 className="text-4xl font-bold">Delhi NCR Luxury Intelligence</h1>
        <p className="mt-4 text-xl">Discover the finest luxury properties in Delhi NCR.</p>
      </header>

      <section className="mt-16">
        <h2 className="text-3xl font-bold">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <div className="bg-luxury-gold p-4 rounded-lg">
            <h3 className="text-2xl font-bold">Project 1</h3>
            <p className="mt-2">Description of Project 1</p>
          </div>
          <div className="bg-luxury-gold p-4 rounded-lg">
            <h3 className="text-2xl font-bold">Project 2</h3>
            <p className="mt-2">Description of Project 2</p>
          </div>
          <div className="bg-luxury-gold p-4 rounded-lg">
            <h3 className="text-2xl font-bold">Project 3</h3>
            <p className="mt-2">Description of Project 3</p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold">Advisory Call-to-Action</h2>
        <div className="mt-8">
          <button className="bg-luxury-gold text-luxury-black px-6 py-3 rounded-lg font-bold">
            Schedule a Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
