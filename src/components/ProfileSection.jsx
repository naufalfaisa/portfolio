import React from "react";
import Section from "./Section";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import DiscordStatus from "./DiscordStatus";
import { TypingText } from "./TypingText";

export default function ProfileSection() {
    return (
        <Section>
            <div className="flex flex-col items-center justify-center space-y-8 py-16 sm:flex-row sm:space-x-16 sm:space-y-0 sm:py-24">
                <div className="space-y-4  max-w-xl text-center sm:text-left">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6">
                        <TypingText text={siteConfig.profile.title} />
                    </h1>
                    {siteConfig.profile.bio.map((bio, i) => (
                        <p
                            key={i}
                            className="text-base sm:text-lg text-zinc-300"
                        >
                            {bio}
                        </p>
                    ))}
                </div>

                <div className="flex flex-col items-center justify-center shrink-0 space-y-2 order-1 sm:order-2">
                    <Image
                        src={siteConfig.profile.avatar}
                        alt="Avatar"
                        width={200}
                        height={200}
                        className="object-cover rounded-full border-4 border-neutral-800 aspect-square w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]"
                    />
                    {siteConfig.discordStatus.enabled && (
                        <DiscordStatus />
                    )}
                </div>
            </div>
        </Section>
    );
}
