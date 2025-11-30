"use client";

import { FC } from "react";
import { siteConfig } from "@/src/config/site.config";

export const Footer: FC = () => {
    const { profile, footer } = siteConfig;

    if (!footer.enabled) return null;

    return (
        <footer className="mb-16">
        <p className="text-zinc-300">
            © {new Date().getFullYear()} {profile.name}
        </p>
        </footer>
    );
};
