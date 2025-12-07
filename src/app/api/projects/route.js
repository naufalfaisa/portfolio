import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site.config";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// --- Cache sederhana ---
let cachedData = null;
let lastFetch = 0;

export async function GET() {
    const now = Date.now();

    if (!GITHUB_TOKEN) {
        console.error("GITHUB_TOKEN not set!");
        return NextResponse.json(
            { error: "GITHUB_TOKEN not set" },
            { status: 500 },
        );
    }

    // --- Gunakan cache jika masih valid (1 jam) ---
    if (cachedData && now - lastFetch < 3600_000) {
        return NextResponse.json(cachedData);
    }

    try {
        // --- Ambil warna bahasa dari GitHub Colors ---
        const colorRes = await fetch(
            "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json",
        );
        const colorsData = await colorRes.json();
        const langColors = {};
        Object.entries(colorsData).forEach(([lang, info]) => {
            if (info.color) langColors[lang] = info.color;
        });

        // --- Ambil data project dari GitHub ---
        const projectData = await Promise.all(
            siteConfig.projects.items.map(async (p) => {
                const repoPath = p.github.replace("https://github.com/", "");

                const repoRes = await fetch(
                    `https://api.github.com/repos/${repoPath}`,
                    {
                        headers: { Authorization: `token ${GITHUB_TOKEN}` },
                    },
                );
                const repoJson = await repoRes.json();

                const langRes = await fetch(
                    `https://api.github.com/repos/${repoPath}/languages`,
                    {
                        headers: { Authorization: `token ${GITHUB_TOKEN}` },
                    },
                );
                const langJson = langRes.ok ? await langRes.json() : {};

                return {
                    github: p.github,
                    title: repoJson.name || "Unknown",
                    description: repoJson.description || "No description",
                    languages: Object.keys(langJson).map((lang) => ({
                        name: lang,
                        color: langColors[lang] || "#444",
                    })),
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
        console.error("Exception in API route:", err);
        return NextResponse.json(
            { error: "Failed to fetch GitHub data" },
            { status: 500 },
        );
    }
}
