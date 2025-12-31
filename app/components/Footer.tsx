import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import React from 'react';

const SOCIAL_LINKS = [
    {   
        id: 1, 
        href: 'https://github.com/naufalfaisa', 
        icon: <FaGithub /> 
    },
    {
        id: 2,
        href: 'https://linkedin.com/in/naufalfaisa',
        icon: <FaLinkedin />,
    },
    {   
        id: 3, 
        href: 'https://x.com/naufalfaisa', 
        icon: <FaXTwitter /> 
    },
];

export default function Footer() {
    return (
        <footer className="mb-16">
            <ul className="font-sm mt-10 flex flex-col space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0 text-zinc-600 dark:text-zinc-300">
                <li className="flex items-center gap-1 text-xl">
                    {SOCIAL_LINKS.map((link, index) => (
                        <React.Fragment key={link.id}>
                            <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center p-2 -m-2 rounded-md text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors"
                            >
                                {link.icon}
                            </a>
                            {index !== SOCIAL_LINKS.length - 1 && (
                                <hr className="h-6 border-l border-zinc-400 dark:border-zinc-600 mx-2" />
                            )}
                        </React.Fragment>
                    ))}
                </li>
            </ul>
            <p className="mt-8 text-zinc-600 dark:text-zinc-300">
                © {new Date().getFullYear()} Naufal Faisa
            </p>
        </footer>
    );
}
