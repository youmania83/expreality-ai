"use client";

export default function MicroMarketInsights({
  location,
  priceTrend,
  connectivity,
  futureDevelopments,
}) {
  return (
    <div className="p-10 bg-black text-white">
      <h2>Micro Market Insights</h2>
      <p>{location}</p>
      <p>{priceTrend}</p>
      <p>{connectivity}</p>
      <p>{futureDevelopments}</p>
    </div>
  );
}