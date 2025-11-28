"use client";

import { FC } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { siteConfig } from "@/config/site.config";

export const AchievementsSection: FC = () => {
  const { achievements } = siteConfig;

  return (
    <section className="space-y-4">
      <h2 className="font-medium text-2xl">{achievements.title}</h2>     
      <p className="text-gray-700">{achievements.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.items.map((a, i) => (          
          <div key={i} className="border border-gray-300 overflow-hidden shadow rounded group">
            <a href={`/achievements/${a.slug}`} className="block">
              <div className="aspect-video w-full relative">
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <h3 className="font-medium mb-2 text-xl flex items-center justify-between">
                  <span>{a.title}</span>
                  <FaArrowRight className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </h3>

                <p className="mb-4 text-sm text-gray-700 line-clamp-2">
                  {a.description}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
