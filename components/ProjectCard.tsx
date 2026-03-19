"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type ProjectCardProps = {
  project: {
    name: string;
    location: string;
    price: string;
    image: string;
  };
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  return (
    <div className="bg-black rounded-2xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition">
      {/* IMAGE */}
      <div className="relative w-full h-[240px]">
        <Image
          src={project.image || "/fallback.jpg"}
          alt={project.name}
          fill
          className="object-cover"
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          {project.name}
        </h3>

        <p className="text-neutral-400 text-sm mb-4">
          {project.location}
        </p>

        <p className="text-white font-medium mb-6">
          {project.price}
        </p>

        {/* BUTTONS */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/contact")}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition"
          >
            Request Private Briefing
          </button>

          <button
            onClick={() => router.push("/projects")}
            className="border border-yellow-500 text-yellow-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-500/10 transition"
          >
            View Signature Collection
          </button>
        </div>
      </div>
    </div>
  );
}

