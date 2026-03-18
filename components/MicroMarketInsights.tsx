"use client";

type Props = {
  location: string;
  priceTrend: string;
  connectivity: string;
  futureDevelopments: string;
};

export default function MicroMarketInsights({
  location,
  priceTrend,
  connectivity,
  futureDevelopments,
}: Props) {
  return (
    <div className="p-10 bg-black text-white">
      <h2 className="text-2xl mb-4">Micro Market Insights</h2>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Price Trend:</strong> {priceTrend}</p>
      <p><strong>Connectivity:</strong> {connectivity}</p>
      <p><strong>Future Developments:</strong> {futureDevelopments}</p>
    </div>
  );
}