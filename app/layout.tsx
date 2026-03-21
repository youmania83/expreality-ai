import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import PremiumFloatingCTA from "../components/PremiumFloatingCTA";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Exprealty | Ultra Luxury Homes & Apartments in Delhi NCR',
  description: 'Exprealty offers exclusive advisory for ultra luxury homes, RERA approved projects, and premium real estate across Gurgaon, Golf Course Road, and Delhi NCR.',
  metadataBase: new URL('https://exprealty.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Exprealty | Ultra Luxury Homes & Apartments in Delhi NCR',
    description: 'Exprealty offers exclusive advisory for ultra luxury homes, RERA approved projects, and premium real estate across Gurgaon, Golf Course Road, and Delhi NCR.',
    url: 'https://exprealty.in',
    siteName: 'Exprealty',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
