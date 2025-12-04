import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site.config";

// --- GitHub token from environment ---
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// --- Simple cache ---
let cachedData = null;
let lastFetch = 0;

// --- API handler ---
export async function GET() {
    const now = Date.now();

    // --- Check GitHub token ---
    if (!GITHUB_TOKEN) {
        console.error("GITHUB_TOKEN not set!");
        return NextResponse.json(
            { error: "GITHUB_TOKEN not set" },
            { status: 500 },
        );
    }

    // --- Return cached data if recent ---
    if (cachedData && now - lastFetch < 3600_000) {
        return NextResponse.json(cachedData);
    }

    try {
        // --- Fetch data for each project ---
        const projectData = await Promise.all(
            siteConfig.projects.items.map(async (p) => {
                const repoPath = p.github.replace("https://github.com/", "");

                // --- Fetch repo info ---
                const repoRes = await fetch(
                    `https://api.github.com/repos/${repoPath}`,
                    { headers: { Authorization: `token ${GITHUB_TOKEN}` } },
                );
                const repoJson = await repoRes.json();

                // --- Handle fetch errors ---
                if (!repoRes.ok) {
                    console.error("Failed fetching repo:", repoPath, repoJson);
                    return {
                        github: p.github,
                        title: "Error fetching repo",
                        description: "",
                        languages: [],
                        stars: 0,
                        forks: 0,
                    };
                }

                // --- Fetch languages ---
                const langRes = await fetch(
                    `https://api.github.com/repos/${repoPath}/languages`,
                    { headers: { Authorization: `token ${GITHUB_TOKEN}` } },
                );
                const langJson = langRes.ok ? await langRes.json() : {};

                // --- Return formatted project data ---
                return {
                    github: p.github,
                    title: repoJson.name || "Unknown",
                    description: repoJson.description || "No description",
                    languages: Object.keys(langJson),
                    stars: repoJson.stargazers_count || 0,
                    forks: repoJson.forks_count || 0,
                };
            }),
        );

        // --- Update cache ---
        cachedData = projectData;
        lastFetch = now;

        return NextResponse.json(projectData);
    } catch (err) {
        // --- Handle exceptions ---
        console.error("Exception in API route:", err);
        return NextResponse.json(
            { error: "Failed to fetch GitHub data" },
            { status: 500 },
        );
    }
}
