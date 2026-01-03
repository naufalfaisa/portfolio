import { NextResponse } from 'next/server';

const PROJECTS = [
    {
        full_name: 'naufalfaisa/amdl',
    },
    {
        full_name: 'naufalfaisa/amly',
    },
    {
        full_name: 'naufalfaisa/portfolio',
        image: 'https://repository-images.githubusercontent.com/1124270734/772b36c0-bc65-46f4-bb8d-465988fae5a0',
    },
];

export async function GET() {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        return NextResponse.json(
            { error: 'Missing GitHub token' },
            { status: 500 },
        );
    }

    const res = await fetch('https://api.github.com/users/naufalfaisa/repos', {
        headers: {
            Authorization: `Bearer ${token}`,
            'X-GitHub-Api-Version': '2022-11-28',
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        const error = await res.json();
        return NextResponse.json(error, { status: res.status });
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
        return NextResponse.json(
            { error: 'Invalid GitHub response' },
            { status: 500 },
        );
    }

    const projectMap = new Map(
        PROJECTS.map((p) => [p.full_name.toLowerCase(), p]),
    );

    const filtered = data
        .filter((repo) => projectMap.has(repo.full_name.toLowerCase()))
        .map((repo) => {
            const config = projectMap.get(repo.full_name.toLowerCase());

            return {
                ...repo,
                image_url:
                    config?.image ??
                    `https://opengraph.githubassets.com/1/${repo.full_name}`,
            };
        });

    return NextResponse.json(filtered);
}
