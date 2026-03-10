export type Residence = {
  name: string;
  location: string;
  startingPrice: string;
  priceRange: string;
  image: string;
  slug: string;
  description: string;
  amenities: string[];
};

export const residences: Residence[] = [
  {
    name: "DLF Camellias Residence",
    location: "Golf Course Road, Gurgaon",
    startingPrice: "₹35 Cr+",
    priceRange: "₹35–50 Cr",
    image: "/residences/camellias.jpg",
    slug: "dlf-camellias-residence",
    description:
      "Ultra-luxury high-rise residence overlooking the DLF Golf & Country Club, with expansive decks, hotel-grade services, and a tightly held primary-owner community.",
    amenities: [
      "DLF Golf & Country Club access",
      "Grand clubhouse with spa & indoor pool",
      "Hotel-style concierge and valet",
      "Secure, low-density tower planning",
    ],
  },
  {
    name: "M3M Golf Estate Residence",
    location: "Sector 65, Golf Course Extension Road, Gurgaon",
    startingPrice: "₹7 Cr+",
    priceRange: "₹7–15 Cr",
    image: "/residences/m3m-golf-estate.jpg",
    slug: "m3m-golf-estate-residence",
    description:
      "Golf-facing residences with sweeping greens, resort-style amenities, and strong rental demand from senior corporate leadership.",
    amenities: [
      "Nine-hole executive golf course",
      "Multiple swimming pools & gyms",
      "Clubhouse with business lounge",
      "Secure, gated community",
    ],
  },
  {
    name: "Trump Towers Signature Residence",
    location: "Sector 65, Golf Course Extension Road, Gurgaon",
    startingPrice: "₹6 Cr+",
    priceRange: "₹6–12 Cr",
    image: "/residences/trump-towers.jpg",
    slug: "trump-towers-signature-residence",
    description:
      "Branded residences with double-height living spaces, curated interiors, and an international hospitality-driven service layer.",
    amenities: [
      "Trump-branded clubhouse & lounge",
      "Indoor pool & fitness center",
      "Valet and concierge services",
      "High-ceiling, glass-fronted residences",
    ],
  },
];

