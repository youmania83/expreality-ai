import SearchClient from './SearchClient';

export const metadata = {
  title: 'Exprealty | Search Locations and Projects',
  description: 'Find verified Delhi NCR locations and ultra luxury projects with real-life livability intelligence and project analysis.',
  openGraph: {
    title: 'Exprealty Search | Delhi NCR Real Estate Intelligence',
    description: 'Find verified Delhi NCR locations and ultra luxury projects with real-life livability intelligence and project analysis.',
    url: 'https://exprealty.in/search',
    siteName: 'Exprealty',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exprealty Search | Delhi NCR Real Estate Intelligence',
    description: 'Find verified Delhi NCR locations and ultra luxury projects with real-life livability intelligence and project analysis.',
    site: '@Exprealty',
    creator: '@Exprealty',
  },
};

export default function SearchPage() {
  return <SearchClient />;
}

