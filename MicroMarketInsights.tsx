import React from "react";

type MicroMarketInsightsProps = {
  location: string;
  priceTrend: string;
  connectivity: string;
  futureDevelopments: string;
};

const MicroMarketInsights: React.FC<MicroMarketInsightsProps> = ({
  location,
  priceTrend,
  connectivity,
  futureDevelopments,
}) => {
  return (
    <div className="bg-black p-6 rounded-lg shadow-md">
      <h3 className="text-white text-xl font-bold mb-4">Micro Market Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400 uppercase tracking-[0.2em] mb-2">Location Growth</p>
          <p className="text-white">{location}</p>
        </div>
        <div>
          <p className="text-gray-400 uppercase tracking-[0.2em] mb-2">Price Trend</p>
          <p className="text-white">{priceTrend}</p>
        </div>
        <div>
          <p className="text-gray-400 uppercase tracking-[0.2em] mb-2">Connectivity</p>
          <p className="text-white">{connectivity}</p>
        </div>
        <div>
          <p className="text-gray-400 uppercase tracking-[0.2em] mb-2">Future Developments</p>
          <p className="text-white">{futureDevelopments}</p>
        </div>
      </div>
    </div>
  );
};

export default MicroMarketInsights;
