export type Project = {
  name: string;
  location: string;
  startingPrice: string;
  image: string;
  slug: string;
};

export const projects: Project[] = [
  {
    name: "DLF Camellias",
    location: "Golf Course Road, Gurgaon",
    startingPrice: "₹35 Cr+",
    image: "/projects/dlf-camellias.jpg",
    slug: "dlf-camellias-gurgaon",
  },
  {
    name: "M3M Golf Estate",
    location: "Sector 65, Golf Course Extension Road, Gurgaon",
    startingPrice: "₹6.5 Cr+",
    image: "/projects/m3m-golf-estate.jpg",
    slug: "m3m-golf-estate-gurgaon",
  },
  {
    name: "Trump Towers Gurgaon",
    location: "Sector 65, Golf Course Extension Road, Gurgaon",
    startingPrice: "₹5.5 Cr+",
    image: "/projects/trump-towers-gurgaon.jpg",
    slug: "trump-towers-gurgaon",
  },
  {
    name: "DLF Magnolias",
    location: "Golf Course Road, Gurgaon",
    startingPrice: "₹25 Cr+",
    image: "/projects/dlf-magnolias.jpg",
    slug: "dlf-magnolias-gurgaon",
  },
  {
    name: "DLF Aralias",
    location: "Golf Course Road, Gurgaon",
    startingPrice: "₹18 Cr+",
    image: "/projects/dlf-aralias.jpg",
    slug: "dlf-aralias-gurgaon",
  },
];

