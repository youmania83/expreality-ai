import fs from 'fs';
import path from 'path';

export interface Location {
  name: string;
  slug: string;
  city: string;
  coordinates: [number, number];
  livability_score: number;
  safety_score: number;
  connectivity_score: number;
  insights: {
    water: string;
    safety: string;
    transport: string;
    metro_distance: string;
    aqi: string;
    markets?: string;
    schools?: string;
    [key: string]: string | undefined;
  };
  pros: string[];
  cons: string[];
  faq: { question: string; answer: string }[];
}

export interface Project {
  name: string;
  slug: string;
  location_slug: string;
  price_range: string;
  segment: "luxury" | "mid" | "affordable";
  insights: Record<string, string>;
  pros: string[];
  cons: string[];
  faq: { question: string; answer: string }[];
}

export function getLocations(): Location[] {
  const filePath = path.join(process.cwd(), 'data', 'locations.json');
  if (!fs.existsSync(filePath)) return [];
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents) as Location[];
}

export function getProjects(): Project[] {
  const filePath = path.join(process.cwd(), 'data', 'projects.json');
  if (!fs.existsSync(filePath)) return [];
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents) as Project[];
}

export function getLocationBySlug(slug: string): Location | undefined {
  return getLocations().find(loc => loc.slug === slug);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find(proj => proj.slug === slug);
}
