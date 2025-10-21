import fs from "fs";

export type Project = {
  id: number;
  title: string;
  description: string;
  github: string;
  // demoUrl: string | null;
  // stars: number;
  // forks: number;
  language: string;
  color: string;
  // topics: string[];
  image: string;
};

const repoLinks = [
  "naufalfaisa/amly",
  "naufalfaisa/amdl",
  "naufalfaisa/portfolio"
  // other repos here
];

const coverMap: Record<string, string> = {
  "naufalfaisa/amly": "/images/amly.webp",
  "naufalfaisa/amdl": "/images/amdl.webp",
  "naufalfaisa/portfolio": "/images/portfolio.webp"
  // repo cover image
};

export async function fetchProjects(): Promise<Project[]> {
  const cachePath = "./src/data/projects-cache.json";
  const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN;

  if (fs.existsSync(cachePath)) {
    const cached = JSON.parse(fs.readFileSync(cachePath, "utf-8"));
    return cached;
  }

  const colorRes = await fetch("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json");
  const colors = await colorRes.json();

  const headers = GITHUB_TOKEN
    ? { Authorization: `token ${GITHUB_TOKEN}`, Accept: "application/vnd.gtihub.v3+json"}
    : {};

  const projects: Project[] = await Promise.all(
    repoLinks.map(async (fullName) => {
      const res = await fetch(`https://api.github.com/repos/${fullName}`);
      const data = await res.json();
      const lang = data.language || "Unknown";
      const color = colors[lang]?.color || "#999999";

      return {
        id: data.id,
        title: data.name || "Project title",
        description: data.description || "No description",
        github: data.html_url,
        // demoUrl: data.homepage || null,
        // stars: data.stargazers_count,
        // forks: data.forks_count,
        language: data.language || "Unknown",
        color,
        // topics: data.topics || [],
        image: coverMap[fullName] || "https://placehold.jp/1280x720.png",
      };
    })
  );

  fs.writeFileSync(cachePath, JSON.stringify(projects, null, 2));
  return projects;
}
