import { MetadataRoute } from 'next'
import { getProjects } from '@/lib/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://exprealty.in';

  // Core authority pages and general pages
  const routes = [
    '',
    '/projects',
    '/rera-approved-projects-gurgaon',
    '/luxury-apartments-golf-course-road',
    '/ultra-luxury-homes-delhi-ncr',
    '/contact',
    '/advisory'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Project Pages
  const projects = getProjects();
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...projectRoutes];
}
