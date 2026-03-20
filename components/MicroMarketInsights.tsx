"use client";

import React from "react";
import { ProjectIntelligence } from "@/data/projects";

type Props = {
  location: string;
  intelligence: ProjectIntelligence;
};

export default function MicroMarketInsights({ location, intelligence }: Props) {
  return (
    <section className="py-16 md:py-24 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-black to-[#0A0A0A] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="uppercase tracking-[0.25em] text-xs text-[#C6A15B] font-semibold mb-3">
            Intelligence Report
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-100">
            Micro Market Dynamics
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl text-sm md:text-base">
            Quantitative metrics and qualitative research for {location}. Our
            proprietary data modeling indicates the following performance 
            parameters for this asset class.
          </p>
        </div>

        {/* Top Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-16">
          <MetricCard
            title="Appreciation (3Y)"
            value={intelligence.appreciation}
            highlight
          />
          <MetricCard title="Rental Yield" value={intelligence.rentalYield} />
          <MetricCard title="Developer Rating" value={intelligence.builderRating} />
          <MetricCard title="Liquidity" value={intelligence.liquidity} />
          <MetricCard
            title="Sentiment"
            value={intelligence.sentiment}
            valueColor={
              intelligence.sentiment.includes("Buy")
                ? "text-emerald-400"
                : "text-amber-400"
            }
          />
        </div>

        {/* Qualitative Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative before:absolute before:inset-0 before:bg-white/[0.02] before:-m-8 md:before:-m-12 before:rounded-3xl before:border before:border-white/5">
          <div className="relative z-10 space-y-4">
            <h3 className="text-lg font-semibold text-gray-200 border-b border-white/10 pb-4">
              Price Action
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {intelligence.marketInsights.priceTrend}
            </p>
          </div>
          <div className="relative z-10 space-y-4">
            <h3 className="text-lg font-semibold text-gray-200 border-b border-white/10 pb-4">
              Connectivity & Infra
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {intelligence.marketInsights.connectivity}
            </p>
          </div>
          <div className="relative z-10 space-y-4">
            <h3 className="text-lg font-semibold text-gray-200 border-b border-white/10 pb-4">
              Future Catalysts
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {intelligence.marketInsights.futureDevelopments}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  title,
  value,
  highlight = false,
  valueColor = "text-white",
}: {
  title: string;
  value: string;
  highlight?: boolean;
  valueColor?: string;
}) {
  return (
    <div
      className={`p-6 rounded-2xl flex flex-col justify-center border transition-colors ${
        highlight
          ? "bg-[#C6A15B]/10 border-[#C6A15B]/30"
          : "bg-[#111] border-white/5 hover:border-white/20"
      }`}
    >
      <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
        {title}
      </p>
      <p className={`text-xl md:text-2xl font-semibold tracking-tight ${valueColor}`}>
        {value}
      </p>
    </div>
  );
}