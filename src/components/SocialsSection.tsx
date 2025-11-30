"use client";
import { FC, useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { siteConfig } from "@/src/config/site.config";

const SocialCardSkeleton: FC = () => {
    return (
        <div className="bg-neutral-900 border-2 border-zinc-800 flex items-center p-5 shadow rounded-lg animate-pulse">
            <div className="p-3 bg-neutral-700 rounded-full mr-4 w-14 h-14"></div>
            <div className="flex-1 space-y-2">
                <div className="h-6 bg-neutral-700 rounded w-2/3"></div>
                <div className="h-4 bg-neutral-700 rounded w-1/2"></div>
            </div>
        </div>
    );
};

export const SocialsSection: FC = () => {
    const { socials } = siteConfig;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section >
            <h2 className="mb-4 text-white font-semibold text-2xl">
                {socials.title}
            </h2>
            <p className="text-zinc-300 mb-6">
                {socials.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading ? (
                    <>
                        {[...Array(socials.items.length)].map((_, i) => (
                            <SocialCardSkeleton key={i} />
                        ))}
                    </>
                ) : (
                    socials.items.map((s) => {
                        const Icon = s.icon;
                        return (
                            <a
                                key={s.name}
                                href={s.url}
                                target="_blank"
                                rel="noreferrer"
                                className="group hover:bg-neutral-900 transition-all flex items-center p-5 shadow rounded-lg"
                            >
                                <div className="p-3 bg-neutral-800 rounded-full mr-4">
                                    <Icon className="text-white text-3xl" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-medium mb-1 text-xl flex justify-between items-center">
                                        <span>{s.name}</span>
                                        <FaArrowRight className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </h3>
                                    <p className="text-sm text-zinc-400">
                                        {s.username}
                                    </p>
                                </div>
                            </a>
                        );
                    })
                )}
            </div>
        </section>
    );
};
