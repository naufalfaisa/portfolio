"use client";

import { FC } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { FadeUpOnce } from "./FadeUpOnce";

export const ProfileSection: FC = () => {
  const { profile } = siteConfig;

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2 space-y-6">
          <FadeUpOnce>
            <h1 className="font-medium text-4xl">{profile.title}</h1>
          </FadeUpOnce>

          <FadeUpOnce delay={0.2}>
            <div className="space-y-4">
              {profile.description.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeUpOnce>
        </div>

        <FadeUpOnce>
          <div className="flex flex-col items-center space-y-4">
            <Image
              src={profile.image}
              width={224}
              height={224}
              className="rounded-full border-2 border-gray-300 shadow object-cover"
              alt={profile.name}
              priority
            />
          </div>
        </FadeUpOnce>
      </div>
    </section>
  );
};
