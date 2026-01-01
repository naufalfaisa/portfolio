'use client';

import useSWR from 'swr';
import { FaGithub } from 'react-icons/fa6';
import Image from 'next/image';

const fetcher = (url: string) =>
    fetch(url).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
    });

interface Repo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    image_url: string;
}

interface ColorData {
    [language: string]: {
        color: string;
        url: string;
    };
}

export default function Projects() {
    const { data: colorData } = useSWR<ColorData>(
        'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json',
        fetcher,
    );

    const {
        data: projects,
        error,
        isLoading,
    } = useSWR<Repo[]>('/api/projects', fetcher);

    return (
        <section className="font-sans flex flex-col gap-10">
            <div className="max-w-prose">
                <h1 className="mb-4 text-3xl font-semibold tracking-tight">
                    Projects
                </h1>
                <p className="text-zinc-600 dark:text-zinc-300">
                    Some projects from my GitHub repository.
                </p>
            </div>

            {isLoading && !projects ? (
                <div className="py-10 text-center animate-pulse text-zinc-500">
                    Loading data...
                </div>
            ) : error && !projects ? (
                <div className="py-10 text-center text-red-500">
                    Failed to load data...
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 gap-5">
                    {projects?.map((project) => (
                        <div
                            key={project.id}
                            className="rounded-xl overflow-hidden bg-zinc-50/80 dark:bg-[#121212]/80 border border-zinc-300 dark:border-zinc-700 transition-all hover:border-zinc-400 dark:hover:border-zinc-600 shadow"
                        >
                            <div className="overflow-hidden">
                                <Image
                                    src={project.image_url}
                                    width={600}
                                    height={400}
                                    sizes="(max-width: 640px) 100vw, 50vw"
                                    unoptimized
                                    alt={`${project.name} preview`}
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            
                            <div className="p-5 flex flex-col">
                                <div className="mb-2 flex justify-between items-center gap-2">
                                    <h2 className="text-xl font-semibold tracking-tighter">
                                        {project.name}
                                    </h2>
                                    {project.language && (
                                    <span
                                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold border transition-all dark:brightness-150"
                                        style={{
                                        backgroundColor: `${colorData?.[project.language]?.color ?? '#666666'}20`,
                                        borderColor: `${colorData?.[project.language]?.color ?? '#666666'}50`,
                                        color: colorData?.[project.language]?.color ?? '#666666',
                                        }}
                                    >
                                        {project.language}
                                    </span>
                                    )}
                                </div>

                                <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-300">
                                    {project.description ??
                                        'No description available.'}
                                </p>

                                <a
                                    href={project.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="self-start flex items-center gap-2 px-3 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                                >
                                    <FaGithub className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                                    <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                        View on GitHub
                                    </span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
