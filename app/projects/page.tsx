'use client';

import useSWR from "swr";
import { FaGithub } from "react-icons/fa6";

const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });

interface Repo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
}

interface ColorData {
  [language: string]: {
    color: string;
    url: string;
  };
}

export default function Projects() {
  const { data: colorData } = useSWR<ColorData>(
    "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json",
    fetcher
  );

  const {
    data: projects,
    error,
    isLoading,
  } = useSWR<Repo[]>("/api/projects", fetcher);

  return (
    <section className="font-sans flex flex-col gap-10">
      <div className="max-w-prose">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">
          Projects
        </h1>
        <p className="text-zinc-600 dark:text-zinc-300">
          Some projects from my GitHub repository.
        </p>
      </div>

      {error && (
        <div className="py-10 text-center text-red-500">
          Failed to load data...
        </div>
      )}

      {isLoading && (
        <div className="py-10 text-center animate-pulse text-zinc-500">
          Loading data...
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid sm:grid-cols-2 gap-5">
          {projects?.map(project => (
            <div
              key={project.id}
              className="rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
            >

              <div className="p-5 flex flex-col">
                <div className="mb-2 flex justify-between items-center gap-2">
                  <h2 className="text-xl font-semibold tracking-tighter">
                    {project.name}
                  </h2>
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors"
                  >
                    < FaGithub className="h-6 w-6" />
                  </a>
                </div>

                <p className="pt-2 border-t-2 border-zinc-200 dark:border-zinc-800 mb-4 text-sm text-zinc-600 dark:text-zinc-300">
                  {project.description ?? "No description available."}
                </p>

                {project.language && (
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium w-fit"
                    style={{
                      color: colorData?.[project.language]?.color ?? "#888",
                      backgroundColor: `${colorData?.[project.language]?.color ?? "#888"}40`,
                      filter: "brightness(1.6)",
                    }}
                  >
                    {project.language}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
