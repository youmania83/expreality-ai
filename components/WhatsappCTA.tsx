"use client";

import React from "react";
import Link from "next/link";

type WhatsappCTAProps = {
  phoneNumber: string;
  message?: string;
  label?: string;
  className?: string;
};

const WhatsappIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    aria-hidden="true"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M16.01 6.002c-4.42 0-8.01 3.59-8.01 8.01 0 1.412.37 2.79 1.07 4.01L8 24l6.12-1.99c1.15.42 2.37.64 3.59.64h.01c4.42 0 8.01-3.59 8.01-8.01 0-2.14-.83-4.15-2.34-5.66s-3.52-2.34-5.66-2.34zm4.69 11.45c-.2.56-1.17 1.09-1.61 1.14-.41.04-.94.06-1.52-.1-.35-.11-.8-.26-1.38-.51-2.44-1.06-4.02-3.54-4.14-3.7-.12-.16-.99-1.32-.99-2.52 0-1.2.63-1.79.86-2.03.22-.23.48-.29.64-.29h.46c.15.01.35-.06.55.42.2.48.67 1.65.73 1.77.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.24.25-.1.49.14.24.63 1.04 1.35 1.69.93.83 1.71 1.09 1.96 1.21.25.12.39.1.54-.06.15-.16.63-.73.8-.98.17-.25.34-.21.57-.13.23.08 1.46.69 1.71.82.25.13.42.19.48.3.06.11.06.64-.14 1.2z"
    />
  </svg>
);

export const WhatsappCTA: React.FC<WhatsappCTAProps> = ({
  phoneNumber,
  message = "Hi, I’d like to discuss a luxury residence.",
  label = "WhatsApp Private Advisory",
  className = "",
}) => {
  const encodedMessage = encodeURIComponent(message);
  const href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full bg-[#25D366] text-black px-5 py-2.5 text-sm font-semibold shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_18px_55px_rgba(0,0,0,0.85)] hover:-translate-y-0.5 transition-transform duration-300 ${className}`}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/10">
        <WhatsappIcon className="h-4 w-4" />
      </span>
      <span>{label}</span>
    </Link>
  );
};

type FloatingWhatsappButtonProps = {
  phoneNumber: string;
  message?: string;
};

export const FloatingWhatsappButton: React.FC<FloatingWhatsappButtonProps> = ({
  phoneNumber,
  message = "Hi, I’d like to schedule a confidential consultation.",
}) => {
  const encodedMessage = encodeURIComponent(message);
  const href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp consultation"
      className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[#25D366] text-black shadow-[0_18px_55px_rgba(0,0,0,0.9)] flex items-center justify-center hover:scale-105 hover:shadow-[0_24px_70px_rgba(0,0,0,0.95)] transition-transform duration-300"
    >
      <WhatsappIcon className="h-7 w-7" />
    </Link>
  );
};

