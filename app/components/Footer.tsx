import React from 'react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import type { IconType } from 'react-icons';

type SocialLink = {
    id: number;
    href: string;
    label: string;
    icon: IconType;
};

const SOCIAL_LINKS: SocialLink[] = [
    {
        id: 1,
        href: 'https://github.com/naufalfaisa',
        label: 'GitHub profile',
        icon: FaGithub,
    },
    {
        id: 2,
        href: 'https://linkedin.com/in/naufalfaisa',
        label: 'LinkedIn profile',
        icon: FaLinkedin,
    },
    {
        id: 3,
        href: 'https://x.com/naufalfaisa',
        label: 'X (Twitter) profile',
        icon: FaXTwitter,
    },
];

export default function Footer() {
    return (
        <footer className="mb-16">
            <ul className="font-sm mt-10 flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0 text-zinc-600 dark:text-zinc-300">
                <li className="flex items-center gap-1 text-xl">
                    {SOCIAL_LINKS.map((link, index) => {
                        const Icon = link.icon;

                        return (
                            <React.Fragment key={link.id}>
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.label}
                                    className="inline-flex items-center justify-center p-2 -m-2 rounded-md text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors"
                                >
                                    <Icon aria-hidden="true" focusable="false" />
                                </a>

                                {index !== SOCIAL_LINKS.length - 1 && (
                                    <hr
                                        aria-hidden="true"
                                        className="h-6 border-l border-zinc-400 dark:border-zinc-600 mx-2"
                                    />
                                )}
                            </React.Fragment>
                        );
                    })}
                </li>
            </ul>

            <p className="mt-8 text-zinc-600 dark:text-zinc-300">
                © {new Date().getFullYear()} Naufal Faisa
            </p>
        </footer>
    );
}