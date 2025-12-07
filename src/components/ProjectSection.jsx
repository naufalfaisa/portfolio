"use client";

import React, { useEffect, useState } from "react";
import Section from "./Section";
import { siteConfig } from "@/config/site.config";
import { ProjectCard, ProjectCardSkeleton } from "./ProjectCard";

export default function ProjectSection() {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const skeletonCount = siteConfig.projects.items.length;

    useEffect(() => {
        setIsLoading(true);

        fetch("/api/projects")
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, []);

    return (
        <Section>
            <div className="space-y-4 mb-8 sm:mb-10 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold">{siteConfig.projects.heading}</h2>
                <p className="text-gray-300">
                    {siteConfig.projects.subheading}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading
                    ? [...Array(skeletonCount)].map((_, i) => (
                        <ProjectCardSkeleton key={i} />
                    ))
                    : projects.map((project, i) => (
                        <ProjectCard key={i} project={project} />
                    ))}
            </div>
            <div className="mt-8 sm:mt-10 flex justify-center">
                <a
                    href="https://github.com/naufalfaisa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 text-sm rounded-lg bg-neutral-800 border border-neutral-700 hover:bg-neutral-700/60 hover:border-neutral-600 transition-colors duration-200 ease-in-out"
                >
                    More on GitHub
                </a>
            </div>
        </Section>
    );
}
