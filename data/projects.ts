import projectsData from "./projects.json";

export type ProjectIntelligence = {
  appreciation: string;
  rentalYield: string;
  builderRating: string;
  liquidity: string;
  sentiment: string;
  marketInsights: {
    priceTrend: string;
    connectivity: string;
    futureDevelopments: string;
  };
};

export type Project = {
  name: string;
  location: string;
  startingPrice: string;
  price: string;
  image: string;
  slug: string;
  developer: string;
  status: string;
  intelligence: ProjectIntelligence;
  developerUrl?: string;
  brochureUrl?: string;
  hasDedicatedPage?: boolean;
};

export const projects: Project[] = projectsData as Project[];
