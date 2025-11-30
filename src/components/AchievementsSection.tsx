"use client";
import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { siteConfig } from "@/src/config/site.config";

const AchievementCardSkeleton: FC = () => {
    return (
        <div className="bg-neutral-900 overflow-hidden rounded-lg animate-pulse">
            <div className="aspect-video w-full bg-neutral-700"></div>
            <div className="p-5 space-y-3">
                <div className="flex justify-between">
                    <div className="h-6 bg-neutral-700 rounded w-3/4"></div>
                    <div className="h-5 w-5 bg-neutral-700 rounded"></div>
                </div>
                <div className="space-y-2">
                    <div className="h-4 bg-neutral-700 rounded w-full"></div>
                    <div className="h-4 bg-neutral-700 rounded w-5/6"></div>
                </div>
                <div className="h-6 bg-neutral-700 rounded w-24"></div>
            </div>
        </div>
    );
};

export const AchievementsSection: FC = () => {
    const { achievements } = siteConfig;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section>
            <h2 className="mb-4 text-white font-semibold text-2xl">
                {achievements.title}
            </h2>
            <p className="text-zinc-300 mb-6">
                {achievements.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading ? (
                    <>
                        {[...Array(achievements.items.length)].map((_, i) => (
                            <AchievementCardSkeleton key={i} />
                        ))}
                    </>
                ) : (
                    achievements.items.map((a, i) => (
                        <div
                            key={i}
                            className="bg-neutral-900 overflow-hidden rounded-lg group"
                        >
                            <a
                                href={a.link ?? `/achievements/${a.slug}`}
                                target={a.link ? "_blank" : "_self"}
                                rel={a.link ? "noopener noreferrer" : undefined}
                                className="block"
                            >
                                <div className="aspect-video w-full relative">
                                    <Image
                                        src={a.image}
                                        alt={a.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, 
                                            (max-width: 1024px) 50vw, 
                                            33vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-white font-medium mb-2 text-xl flex justify-between">
                                        <span>{a.title}</span>
                                        <FaArrowUpRightFromSquare className="ml-3 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </h3>
                                    <p className="mb-4 text-sm text-zinc-400 line-clamp-2">
                                        {a.description}
                                    </p>
                                    {a.source && (
                                        <p className="inline-flex px-2 py-1 bg-neutral-800 rounded-md text-xs text-zinc-300">
                                            {a.source}
                                        </p>
                                    )}
                                </div>
                            </a>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};
