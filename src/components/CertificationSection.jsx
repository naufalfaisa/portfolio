"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { siteConfig } from "@/config/site.config";
import Section from "./Section";

const CertificationCardSkeleton = () => (
    <div className="bg-neutral-900/90 border border-neutral-700 overflow-hidden rounded-xl animate-pulse">
        <div className="aspect-video w-full relative">
            <div className="w-full h-full bg-neutral-800"></div>
        </div>
        <div className="p-5">
            <div className="h-6 bg-neutral-700 rounded w-4/5 mb-3"></div>
            <div className="space-y-2 mb-4">
                <div className="h-4 bg-neutral-700 rounded"></div>
                <div className="h-4 bg-neutral-700 rounded w-11/12"></div>
            </div>
            <div className="inline-flex px-4 py-2 h-3 w-20 bg-neutral-800 border border-neutral-700 rounded-md"></div>
        </div>
    </div>
);

export const CertificationSection = () => {
    const { certifications } = siteConfig;
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
                    {certifications.heading}
                </h2>
                <p className="text-gray-300">
                    {certifications.subheading}
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading ? (
                    <>
                        {[...Array(certifications.items.length)].map((_, i) => (
                            <CertificationCardSkeleton key={i} />
                        ))}
                    </>
                ) : (
                    certifications.items.map((certification, i) => (
                        <div
                            key={i}
                            className="bg-neutral-900/90 border border-neutral-700 hover:bg-neutral-800/70 transition-colors duration-200 ease-out overflow-hidden rounded-xl"
                        >
                            <a
                                href={certification.link ?? `/certifications/${certification.slug}`}
                                target={certification.link ? "_blank" : "_self"}
                                rel={certification.link ? "noopener noreferrer" : undefined}
                                className="block"
                            >
                                <div className="aspect-video w-full relative">
                                    <Image
                                        src={certification.image}
                                        alt={certification.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, 
                                            (max-width: 1024px) 50vw, 
                                            33vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-white font-medium mb-2 text-xl flex justify-between">
                                        <span>{certification.title}</span>
                                        <FaArrowUpRightFromSquare className="ml-3 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </h3>
                                    <p className="mb-4 text-sm text-zinc-300 line-clamp-2">
                                        {certification.description}
                                    </p>
                                    {certification.source && (
                                        <p className="inline-flex px-2 py-1 bg-neutral-800 border border-neutral-700 rounded-md text-xs text-white">
                                            {certification.source}
                                        </p>
                                    )}
                                </div>
                            </a>
                        </div>
                    ))
                )}
            </div>
        </Section>
    );
};
