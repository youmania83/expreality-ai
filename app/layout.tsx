import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import PremiumFloatingCTA from "../components/PremiumFloatingCTA";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Exprealty | Ultra Luxury Homes & Apartments in Delhi NCR & Panipat',
  description: 'Exprealty offers exclusive advisory for ultra luxury homes, RERA approved projects, and premium real estate across Gurgaon, Panipat, Golf Course Road, and Delhi NCR.',
  keywords: [
    'real estate',
    'Delhi NCR',
    'Gurgaon',
    'Panipat',
    'Noida',
    'luxury apartments',
    'project analysis',
    'livability score',
    'property insights'
  ],
  metadataBase: new URL('https://exprealty.in'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Exprealty | Ultra Luxury Homes & Apartments in Delhi NCR & Panipat',
    description: 'Exprealty offers exclusive advisory for ultra luxury homes, RERA approved projects, and premium real estate across Gurgaon, Panipat, Golf Course Road, and Delhi NCR.',
    url: 'https://exprealty.in',
    siteName: 'Exprealty',
    locale: 'en_IN',
    type: 'website',
    images: ['https://exprealty.in/featured/og-image-default.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Exprealty',
    creator: '@Exprealty',
    title: 'Exprealty | Ultra Luxury Homes & Apartments in Delhi NCR & Panipat',
    description: 'Exprealty offers exclusive advisory for ultra luxury homes, RERA approved projects, and premium real estate across Gurgaon, Panipat, Golf Course Road, and Delhi NCR.',
    images: ['https://exprealty.in/featured/og-image-default.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://exprealty.in",
              "name": "Exprealty",
              "description": "Exprealty provides ground reality property intelligence for premium real estate in Delhi NCR and Panipat.",
              "publisher": {
                "@type": "Organization",
                "name": "Exprealty",
                "url": "https://exprealty.in"
              }
            }),
          }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0B0B0B] text-gray-200`}
      >
        <Navbar />
        {children}
        <Footer />
        <PremiumFloatingCTA phoneNumber="918368137724" />
      </body>
    </html>
  );
}
