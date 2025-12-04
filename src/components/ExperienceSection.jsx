"use client";
import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site.config";

const ExperienceCardSkeleton = () => {
    return (
        <div className="border-2 border-zinc-800 overflow-hidden flex items-start p-5 rounded-xl animate-pulse">
            <div className="p-3 bg-neutral-700 rounded-full mr-4 w-14 h-14" />
            <div className="flex-1 space-y-2">
                <div className="h-6 bg-neutral-700 rounded w-3/4" />
                <div className="h-4 bg-neutral-700 rounded w-1/2" />
                <div className="h-4 bg-neutral-700 rounded w-2/5" />
            </div>
        </div>
    );
};

export const ExperienceSection = () => {
    const { Experience } = siteConfig;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section>
            <h2 className="mb-4 text-white font-semibold text-3xl">
                {Experience.title}
            </h2>
            <p className="text-zinc-300 mb-6">
                {Experience.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading ? (
                    <>
                        {[...Array(Experience.items.length)].map((_, i) => (
                            <ExperienceCardSkeleton key={i} />
                        ))}
                    </>
                ) : (
                    Experience.items.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <a
                                key={i}
                                href={s.link}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:bg-[#1a1a1a] transition-all duration-300 overflow-hidden flex items-start p-5 rounded-xl"
                            >
                                <div className="p-3 bg-neutral-800 rounded-full mr-4">
                                    <Icon className="text-white text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium mb-1 text-xl">
                                        {s.role}
                                    </h3>
                                    <p className="text-sm text-zinc-300">
                                        {s.company}
                                    </p>
                                    <p className="text-sm text-zinc-300 mt-1">
                                        {s.period}
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
