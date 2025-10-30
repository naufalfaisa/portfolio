import fs from "fs";
import path from "path";

export type Project = {
  id: number;
  title: string;
  description: string;
  github: string;
  language: string;
  color: string;
  image: string;
};

const repoLinks = [
  "naufalfaisa/amly",
  "naufalfaisa/amdl",
  "naufalfaisa/portfolio"
];

const coverMap: Record<string, string> = {
  "naufalfaisa/amly": "/images/amly.webp",
  "naufalfaisa/amdl": "/images/amdl.webp",
  "naufalfaisa/portfolio": "/images/portfolio.webp"
};

type CacheFile = {
  timestamp: number;
  projects: Project[];
};

export async function fetchProjects(): Promise<Project[]> {
  const cachePath = path.resolve("./src/data/projects-cache.json");
  const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN;
  const CACHE_TTL = 30 * 60 * 1000;

  if (fs.existsSync(cachePath)) {
    const cached: CacheFile = JSON.parse(fs.readFileSync(cachePath, "utf-8"));
    const age = Date.now() - cached.timestamp;
    if (age < CACHE_TTL) {
      return cached.projects;
    }
  }

  const colorRes = await fetch(
    "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json"
  );
  const colors = await colorRes.json();

  const headers = new Headers();
  headers.set("Accept", "application/vnd.github.v3+json");
  if (GITHUB_TOKEN) {
    headers.set("Authorization", `token ${GITHUB_TOKEN}`);
  }

  const projects: Project[] = await Promise.all(
    repoLinks.map(async (fullName) => {
      const res = await fetch(`https://api.github.com/repos/${fullName}`, { headers });
      const data = await res.json();
      const lang = data.language || "Unknown";
      const color = colors[lang]?.color || "#999999";

      return {
        id: data.id,
        title: data.name || "Project title",
        description: data.description || "No description",
        github: data.html_url,
        language: data.language || "Unknown",
        color,
        image: coverMap[fullName] || "https://placehold.jp/1280x720.png",
      };
    })
  );

  const cacheData: CacheFile = {
    timestamp: Date.now(),
    projects,
  };
  fs.writeFileSync(cachePath, JSON.stringify(cacheData, null, 2));

  return projects;
}
