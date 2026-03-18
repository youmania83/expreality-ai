"use client";

import React from "react";

interface MicroMarketInsightsProps {
  location: string;
  priceTrend: string;
  connectivity: string;
  futureDevelopments: string;
}

const MicroMarketInsights: React.FC<MicroMarketInsightsProps> = ({
  location,
  priceTrend,
  connectivity,
  futureDevelopments,
}) => {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">
          Micro Market Insights
        </h2>

        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div><strong>Location:</strong> {location}</div>
          <div><strong>Price Trend:</strong> {priceTrend}</div>
          <div><strong>Connectivity:</strong> {connectivity}</div>
          <div><strong>Future Developments:</strong> {futureDevelopments}</div>
        </div>
      </div>
    </section>
  );
};

export default MicroMarketInsights;