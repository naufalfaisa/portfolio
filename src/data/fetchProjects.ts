export type Project = {
  id: number;
  title: string;
  description: string;
  github: string;
  // demoUrl: string | null;
  // stars: number;
  // forks: number;
  // language: string;
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
  "naufalfaisa/amly": "https://i.imgur.com/NL4O93e.jpeg",
  // repo cover image
};

export async function fetchProjects(): Promise<Project[]> {
  const projects: Project[] = await Promise.all(
    repoLinks.map(async (fullName) => {
      const res = await fetch(`https://api.github.com/repos/${fullName}`);
      const data = await res.json();

      return {
        id: data.id,
        title: data.name || "Project title",
        description: data.description || "No description",
        github: data.html_url,
        // demoUrl: data.homepage || null,
        // stars: data.stargazers_count,
        // forks: data.forks_count,
        language: data.language || "Unknown",
        // topics: data.topics || [],
        image: coverMap[fullName] || "https://placehold.jp/1280x720.png",
      };
    })
  );

  return projects;
}
