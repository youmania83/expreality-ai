import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FloatingWhatsappButton } from "../components/WhatsappCTA";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'DealFlow | Get Property Buyers Weekly',
  description: 'Get 2–5 serious property buyers every week without ads or portals.',

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
        <FloatingWhatsappButton phoneNumber="910000000000" />
        <Analytics />
      </body>
    </html>
  );
}
