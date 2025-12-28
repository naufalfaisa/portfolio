import { NextResponse } from "next/server";

const PROJECTS = [
  "naufalfaisa/amdl",
  "naufalfaisa/amly",
];

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "Missing GitHub token" },
      { status: 500 }
    );
  }

  const res = await fetch(
    "https://api.github.com/users/naufalfaisa/repos",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const error = await res.json();
    return NextResponse.json(error, { status: res.status });
  }

  const data = await res.json();

  if (!Array.isArray(data)) {
    return NextResponse.json(
      { error: "Invalid GitHub response" },
      { status: 500 }
    );
  }

  const projectList = PROJECTS.map(p => p.toLowerCase());

  const filtered = data.filter(repo =>
    projectList.includes(repo.full_name.toLowerCase())
  );

  return NextResponse.json(filtered);
}
