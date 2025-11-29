"use client";

import { FC } from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { siteConfig } from "@/config/site.config";

export const ProjectsSection: FC = () => {
  const { projects } = siteConfig;

  return (
    <section className="space-y-2">
      <h2 className="font-semibold text-2xl text-primary">{projects.title}</h2>
      <p className="text-lg text-secondary mb-6">{projects.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.items.map((p, i) => (
          <div key={i} className="card overflow-hidden rounded-xl">
            <div className="aspect-video w-full relative">
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="p-5">
              <h3 className="text-primary font-medium mb-2 text-xl">{p.title}</h3>
              <p className="mb-4 text-sm text-tertiary line-clamp-2">
                {p.description}
              </p>
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full border-2 github-btn"
              >
                <FaGithub className="text-lg" />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
