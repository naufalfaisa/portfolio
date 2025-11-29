"use client";

import { FC } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";

export const ProfileSection: FC = () => {
  const { profile } = siteConfig;

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2 space-y-6">
          <h1 className="font-semibold text-primary text-3xl">{profile.title}</h1>

          <div className="space-y-4">
            {profile.description.map((paragraph, index) => (
              <p key={index} className="text-lg text-secondary leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <Image
            src={profile.image}
            width={224}
            height={224}
            className="rounded-full border-2 border-zinc-300 dark:border-zinc-800 shadow object-cover"
            alt={profile.name}
            priority
          />
        </div>
      </div>
    </section>
  );
};
