import { projects as rawProjects } from "@/data/projects";
import fs from "fs";
import path from "path";

export const getProjects = () => {
  return rawProjects.map((project: any) => {
    // Determine proper image from either old or new schema
    let imgSrc = project.image || project.hero_image;
    if (!imgSrc || !fs.existsSync(path.join(process.cwd(), "public", imgSrc))) {
      imgSrc = "/projects/default.jpg";
    }
    
    // Map new schema fields dynamically to old schema for backwards compatibility
    return { 
      ...project, 
      image: imgSrc,
      location: project.location || project.micro_market || project.city,
      startingPrice: project.startingPrice || project.price_range,
      intelligence: project.intelligence || {
        appreciation: project.appreciation_potential || "High",
        rentalYield: project.rental_yield_estimate || "-",
        builderRating: "Tier 1",
        liquidity: "High",
        sentiment: "Bullish",
        marketInsights: {
          priceTrend: "Appreciating rapidly across global networks.",
          connectivity: "Prime international nodes",
          futureDevelopments: project.exit_strategy || "Strong secondary market demand"
        }
      }
    };
  });
};
