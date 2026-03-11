import { notFound } from "next/navigation";

const residences = [
  {
    slug: "dlf-camellias",
    name: "DLF Camellias Residence",
    location: "Golf Course Road, Gurgaon",
    price: "₹35 Cr+",
  },
  {
    slug: "m3m-golf-estate",
    name: "M3M Golf Estate Residence",
    location: "Sector 65, Golf Course Extension",
    price: "₹7 Cr+",
  },
  {
    slug: "trump-towers",
    name: "Trump Towers Signature Residence",
    location: "Golf Course Extension",
    price: "₹6 Cr+",
  },
];

export default async function ResidencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const residence = residences.find((r) => r.slug === slug);

  if (!residence) return notFound();

  return (
    <div className="min-h-screen bg-black text-white p-16">
      <h1 className="text-4xl font-bold">{residence.name}</h1>
      <p className="mt-4 text-gray-400">{residence.location}</p>
      <p className="mt-4 text-yellow-500">{residence.price}</p>
    </div>
  );
}


