"use client";
import { FC, useEffect, useState } from "react";
import { siteConfig } from "@/src/config/site.config";
import { FaGithub, FaStar, FaCodeBranch } from "react-icons/fa";

interface ProjectFromAPI {
    github: string;
    title: string;
    description: string;
    languages: string[];
    stars: number;
    forks: number;
}

interface LanguageColors {
    [lang: string]: string;
}

const ProjectCardSkeleton: FC = () => {
    return (
        <div className="bg-neutral-900 overflow-hidden rounded-lg animate-pulse">
            <div className="p-5 flex flex-col h-full">
                {/* Title skeleton */}
                <div className="flex justify-between mb-2">
                    <div className="h-6 bg-neutral-700 rounded w-3/4"></div>
                    <div className="h-6 w-6 bg-neutral-700 rounded"></div>
                </div>

                {/* Description skeleton */}
                <div className="mb-4 space-y-2 flex-1">
                    <div className="h-4 bg-neutral-700 rounded w-full"></div>
                    <div className="h-4 bg-neutral-700 rounded w-5/6"></div>
                </div>

                {/* Languages skeleton */}
                <div className="flex flex-wrap gap-6 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-neutral-700"></div>
                        <div className="h-3 w-16 bg-neutral-700 rounded"></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-neutral-700"></div>
                        <div className="h-3 w-20 bg-neutral-700 rounded"></div>
                    </div>
                </div>

                {/* Button skeleton */}
                <div className="h-12 bg-neutral-800 rounded-lg"></div>
            </div>
        </div>
    );
};

export const ProjectsSection: FC = () => {
    const [projects, setProjects] = useState<ProjectFromAPI[]>([]);
    const [langColors, setLangColors] = useState<LanguageColors>({});
    const [isLoading, setIsLoading] = useState(true);

    const projectCount = siteConfig.projects.items.length;

    useEffect(() => {
        fetch(
            "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json",
        )
            .then((res) => res.json())
            .then((data) => {
                const colors: LanguageColors = {};
                Object.entries(data).forEach(([lang, info]: any) => {
                    if (info.color) colors[lang] = info.color;
                });
                setLangColors(colors);
            });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetch("/api/projects")
            .then((res) => res.json())
            .then((data: ProjectFromAPI[]) => {
                setProjects(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    return (
        <section>
            <h2 className="mb-4 font-semibold text-2xl text-white">
                Projects
            </h2>
            <p className="text-zinc-300 mb-6">
                Some projects from my Github repository.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading ? (
                    <>
                        {[...Array(projectCount)].map((_, i) => (
                            <ProjectCardSkeleton key={i} />
                        ))}
                    </>
                ) : (
                    projects.map((p, i) => (
                        <div
                            key={i}
                            className="bg-neutral-900 overflow-hidden rounded-lg"
                        >
                            <div className="p-5 flex flex-col h-full">
                                <h3 className="text-white font-semibold mb-2 text-xl flex justify-between">
                                    {p.title}
                                </h3>
                                <p className="mb-4 text-sm text-zinc-400 line-clamp-2 flex-1">
                                    {p.description}
                                </p>
                                <div className="flex flex-wrap gap-6 mb-4">
                                    {p.languages.map((lang) => (
                                        <div
                                            key={lang}
                                            className="flex items-center gap-2 text-xs font-medium text-white"
                                        >
                                            <span
                                                className="w-2 h-2 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        langColors[lang] ||
                                                        "#444",
                                                }}
                                            />
                                            <span>{lang}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-6 mb-4 text-zinc-300 text-xs font-mono">
                                    <span className="flex items-center gap-1">
                                        <FaStar /> {p.stars}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FaCodeBranch /> {p.forks}
                                    </span>
                                </div>

                                <a
                                    href={p.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center gap-2 p-3 text-white text-sm bg-neutral-800 hover:brightness-120 transition-all font-medium rounded-lg"
                                >
                                    <FaGithub className="text-white text-xl" />
                                    <span>View on GitHub</span>
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};
