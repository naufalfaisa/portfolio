"use client";

import { FC } from "react";
import { siteConfig } from "@/config/site.config";

export const ExperienceSection: FC = () => {
  const { Experience } = siteConfig;

  return (
    <section className="space-y-2">
      <h2 className="text-primary font-semibold text-2xl">{Experience.title}</h2>
      <p className="text-secondary mb-6">{Experience.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Experience.items.map((s, i) => {
          const Icon = s.icon;
          return (
            <a
              key={i}
              href={s.link}
              target="_blank"
              rel="noreferrer"
              className="card overflow-hidden flex items-start p-5 rounded-xl"
            >
              <div className="p-3 bg-zinc-300 dark:bg-zinc-700 rounded-full mr-4">
                <Icon className="text-primary text-2xl" />
              </div>
              <div>
                <h3 className="text-primary font-medium mb-1 text-xl">{s.role}</h3>
                <p className="text-sm text-tertiary">{s.company}</p>
                <p className="text-sm text-tertiary mt-1">{s.period}</p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};
