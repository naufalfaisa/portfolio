"use client";

import { FaGithub, FaStar, FaCodeBranch } from "react-icons/fa";

export const ProjectCardSkeleton = () => (
    <div className="bg-neutral-900/90 border border-neutral-700 overflow-hidden rounded-xl animate-pulse">
        <div className="p-5 flex flex-col h-full">
            <div className="flex justify-between mb-2">
                <div className="h-6 bg-neutral-700 rounded w-3/4" />
            </div>
            <div className="mb-4 space-y-2 flex-1">
                <div className="h-4 bg-neutral-700 rounded w-full" />
                <div className="h-4 bg-neutral-700 rounded w-5/6" />
            </div>
            <div className="flex flex-wrap gap-6 mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-neutral-700" />
                    <div className="h-3 w-16 bg-neutral-700 rounded" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-neutral-700" />
                    <div className="h-3 w-20 bg-neutral-700 rounded" />
                </div>
            </div>
            <div className="h-12 bg-neutral-800 border border-neutral-700 rounded-lg" />
        </div>
    </div>
);

export const ProjectCard = ({ project }) => (
    <div className="bg-neutral-900/90 border border-neutral-700 hover:bg-neutral-800/70 transition-colors duration-200 ease-out overflow-hidden rounded-xl">
        <div className="p-5 flex flex-col h-full">
            <h3 className="text-white font-semibold mb-2 text-xl flex justify-between">
                {project.title}
            </h3>
            <p className="mb-4 text-sm text-zinc-300 line-clamp-2 flex-1">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-6 mb-4">
                {project.languages.map((lang) => (
                    <div
                        key={lang.name}
                        className="flex items-center gap-2 text-xs font-medium text-white"
                    >
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: lang.color || "#444" }}
                        />
                        <span>{lang.name}</span>
                    </div>
                ))}
            </div>

            <div className="flex gap-6 mb-4 text-zinc-300 text-xs font-mono">
                <span className="flex items-center gap-1">
                    <FaStar /> {project.stars}
                </span>
                <span className="flex items-center gap-1">
                    <FaCodeBranch /> {project.forks}
                </span>
            </div>

            <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 p-3 text-white text-sm font-medium rounded-lg bg-neutral-800 border border-neutral-700 hover:bg-neutral-700/60 hover:border-neutral-600 transition-colors duration-200 ease-in-out"
            >
                <FaGithub className="text-white text-xl" />
                <span>View on GitHub</span>
            </a>
        </div>
    </div>
);
