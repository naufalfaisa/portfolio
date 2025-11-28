"use client";

import { FC } from "react";
import { FaArrowRight } from "react-icons/fa";
import { siteConfig } from "@/config/site.config";
import { FadeUpOnce } from "./FadeUpOnce";

export const SocialsSection: FC = () => {
  const { socials } = siteConfig;

  return (
    <section className="space-y-4">
      <FadeUpOnce>
        <h2 className="font-medium text-2xl">{socials.title}</h2>
      </FadeUpOnce>
      <FadeUpOnce delay={0.1}>
        <p className="text-gray-700">{socials.description}</p>
      </FadeUpOnce>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {socials.items.map((s, i) => {
          const Icon = s.icon;
          return (
            <FadeUpOnce key={s.name} delay={0.2 + i *0.1}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="group border border-gray-300 hover:bg-gray-100 transition flex items-center p-5 shadow rounded"
              >
                <div className="p-3 bg-neutral-200 rounded-full mr-4">
                  <Icon className="text-3xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1 text-xl flex items-center justify-between">
                    <span>{s.name}</span>
                    <FaArrowRight className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </h3>
                  <p className="text-sm text-gray-700">{s.username}</p>
                </div>
              </a>
            </FadeUpOnce>
          );
        })}
      </div>
    </section>
  );
};
