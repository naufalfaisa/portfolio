"use client";
import { FC, useState, useEffect } from "react";
import { siteConfig } from "@/src/config/site.config";

// Komponen Skeleton untuk Experience Card
const ExperienceCardSkeleton: FC = () => {
    return (
        <div className="bg-neutral-900 border-2 border-zinc-800 overflow-hidden flex items-start p-5 rounded-lg animate-pulse">
            <div className="p-3 bg-neutral-700 rounded-full mr-4 w-14 h-14"></div>
            <div className="flex-1 space-y-2">
                <div className="h-6 bg-neutral-700 rounded w-3/4"></div>
                <div className="h-4 bg-neutral-700 rounded w-1/2"></div>
                <div className="h-4 bg-neutral-700 rounded w-2/5"></div>
            </div>
        </div>
    );
};

export const ExperienceSection: FC = () => {
    const { Experience } = siteConfig;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulasi loading (sesuaikan dengan kebutuhan Anda)
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section>
            <h2 className="mb-4 text-white font-semibold text-2xl">
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
                                className="hover:bg-neutral-900 transition-all duration-300 overflow-hidden flex items-start p-5 rounded-lg"
                            >
                                <div className="p-3 bg-neutral-800 rounded-full mr-4">
                                    <Icon className="text-white text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium mb-1 text-xl">
                                        {s.role}
                                    </h3>
                                    <p className="text-sm text-zinc-400">
                                        {s.company}
                                    </p>
                                    <p className="text-sm text-zinc-400 mt-1">
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
