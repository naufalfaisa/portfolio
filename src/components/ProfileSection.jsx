"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { TypingText } from "./TypingText";
import DiscordStatus from "./DiscordStatus";

export const ProfileSection = () => {
    const { profile } = siteConfig;
    const [loaded, setLoaded] = useState(false);

    return (
        <section className="space-y-10">
            <div className="flex flex-col md:flex-row items-center gap-8 mt-16 md:mt-20 lg:mt-24 px-4 sm:px-8">
                <div className="flex-1">
                    <h1 className="mb-6 font-bold text-white text-5xl leading-tight">
                        <TypingText text={profile.title} />
                    </h1>
                    {profile.bio.map((p, i) => (
                        <p key={i} className="mb-4 text-lg text-zinc-300 leading-relaxed max-w-prose">
                            {p}
                        </p>
                    ))}
                </div>

                {profile.avatar.enabled && (
                    <div className="flex justify-center">
                        <div
                            className={`flex flex-col items-center transform transition-all duration-700 ease-out ${loaded ? "scale-100" : "scale-90"
                                }`}
                        >
                            <div className="w-40 md:w-56">
                                <Image
                                    src={profile.avatar.src}
                                    alt={profile.name}
                                    width={256}
                                    height={256}
                                    sizes="(max-width: 768px) 100vw, 256px"
                                    className="object-cover rounded-full aspect-square border-4 border-zinc-800 w-full h-auto"
                                    onLoad={() => setLoaded(true)}
                                    priority
                                />
                            </div>

                            {siteConfig.discordStatus.enabled && (
                                <div className="w-full">
                                    <DiscordStatus />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};