"use client";
import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site.config";
import Section from "./Section";

const SocialCardSkeleton = () => (
    <div className="bg-neutral-900/90 border border-neutral-700 flex items-center p-5 shadow rounded-xl animate-pulse">
        <div className="p-6 bg-neutral-800 border border-neutral-700 transition duration-200 rounded-full mr-4"></div>
        <div className="flex-1">
            <div className="h-6 bg-neutral-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-neutral-700 rounded w-1/2"></div>
        </div>
    </div>
);

export const SocialsSection = () => {
    const { socials } = siteConfig;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Section>
            <div className="space-y-4 mb-8 sm:mb-10 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold">
                    {socials.heading}
                </h2>
                <p className="text-zinc-300">{socials.subheading}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-4">
                {isLoading ? (
                    <>
                        {[...Array(socials.items.length)].map((_, i) => (
                            <SocialCardSkeleton key={i} />
                        ))}
                    </>
                ) : (
                    socials.items.map((social) => {
                        const Icon = social.icon;
                        return (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-neutral-900/90 border border-neutral-700 hover:bg-neutral-800/70 transition-colors duration-200 ease-in-out flex items-center p-5 shadow rounded-xl"
                            >
                                <div className="p-3 bg-neutral-800 border border-neutral-700 transition duration-200 rounded-full mr-4">
                                    <Icon className="text-white text-3xl" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-medium mb-1 text-xl flex justify-between items-center">
                                        {social.name}
                                    </h3>
                                    <p className="text-sm text-zinc-300">
                                        {social.username}
                                    </p>
                                </div>
                            </a>
                        );
                    })
                )}
            </div>
        </Section>
    );
};
