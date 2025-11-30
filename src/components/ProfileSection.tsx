"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/src/config/site.config";
import { TypingText } from "./TypingText";
import DiscordStatus from "./DiscordStatus";

export const ProfileSection: FC = () => {
    const { profile } = siteConfig;
    const [loaded, setLoaded] = useState(false);

    return (
        <section className="space-y-10">
            <div className="flex flex-col md:flex-row items-center gap-8 mt-16 md:mt-20 lg:mt-24 px-4 sm:px-8">
                <div className="flex-1">
                    <h1 className="mb-6 font-bold text-white text-4xl leading-tight">
                        <TypingText text={profile.title} />
                    </h1>
                    {profile.bio.map((p, i) => (
                        <p key={i} className="mb-4 text-lg text-zinc-300 leading-relaxed max-w-prose">
                            {p}
                        </p>
                    ))}
                </div>

                <div className="flex justify-center md:justify-end w-full md:w-auto">
                    <div
                        className={`flex flex-col items-center space-y-4 transform transition-all duration-700 ease-out ${
                            loaded ? "scale-100" : "scale-90"
                        }`}
                    >
                        <div className="flex flex-col items-center">
                            <Image
                                src={profile.avatar}
                                alt={profile.name}
                                width={240}
                                height={240}
                                priority
                                className="object-cover rounded-full aspect-square border-4 border-zinc-800"
                                onLoad={() => setLoaded(true)}
                            />
                            {siteConfig.discordStatus.enabled && (
                                <div className="w-full mt-4">
                                    <DiscordStatus />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};
