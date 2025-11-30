import { IconType } from "react-icons";
import {
    FaGithub,
    FaInstagram,
    FaXTwitter,
    FaLinkedin,
    FaDesktop,
    FaDiscord,
} from "react-icons/fa6";

export interface ProfileConfig {
    avatar: string;
    title: string;
    name: string;
    bio: string[];
    enabled: boolean;
}

export interface DiscordStatusConfig {
    userId: string;
    enabled: boolean;
}

export interface Project {
    github: string;
}

export interface Experience {
    role: string;
    company: string;
    period: string;
    link?: string;
    icon: IconType;
}

export interface Achievement {
    slug: string;
    title: string;
    description: string;
    image: string;
    source: string;
    link?: string;
}

export interface Social {
    name: string;
    username: string;
    url: string;
    icon: IconType;
}

export interface SectionConfig<T> {
    title: string;
    description: string;
    items: T[];
    enabled: boolean;
}

export interface FooterConfig {
    enabled: boolean;
}

export interface SiteConfig {
    profile: ProfileConfig;
    discordStatus: DiscordStatusConfig;
    projects: SectionConfig<Project>;
    Experience: SectionConfig<Experience>;
    achievements: SectionConfig<Achievement>;
    socials: SectionConfig<Social>;
    footer: FooterConfig;
}

export const siteConfig: SiteConfig = {
    profile: {
        name: "Naufal Faisa",
        title: "Welcome!",
        bio: [
            "Hi! I'm Naufal Faisa, a Bachelor's degree student in Informatics Engineering with a passion for programming. I love exploring different tools and technologies and seeing what I can build.",
            "I'm currently learning to build CLI tools, web applications, and backend systems, while also learning JavaScript, Python, Go, and Node.js. Writing clean and efficient code has always been my goal.",
        ],
        avatar: "/images/avatar.jpg",
        enabled: true,
    },

    discordStatus: {
        userId: "1235664011987517565",
        enabled: true,
    },

    projects: {
        title: "Projects",
        description: "Some projects from my Github repository.",
        items: [
            { github: "https://github.com/naufalfaisa/amly" },
            { github: "https://github.com/naufalfaisa/portfolio" },
        ],
        enabled: true,
    },

    Experience: {
        title: "Experience",
        description:
            "Key roles and hands-on development experience I've undertaken.",
        items: [
            {
                role: "Web Developer",
                company: "Freelance",
                period: "2025 - Present",
                link: "#",
                icon: FaDesktop,
            },
        ],
        enabled: true,
    },

    achievements: {
        title: "Achievements",
        description: "These are some of the achievements I've earned.",
        items: [
            {
                slug: "responsive-web-design-certification",
                title: "Responsive Web Design Certification",
                description:
                    "Completed FreeCodeCamp's Responsive Web Design course.",
                image: "https://placehold.jp/400x225.png",
                source: "FreeCodeCamp",
                link: "https://www.freecodecamp.org/certification/naufalfaisa/responsive-web-design",
            },
        ],
        enabled: true,
    },

    socials: {
        title: "Socials",
        description:
            "These are the platforms where I share my work, interests, and connect with others.",
        items: [
            {
                name: "GitHub",
                username: "@naufalfaisa",
                url: "https://github.com/naufalfaisa",
                icon: FaGithub,
            },
            {
                name: "Instagram",
                username: "@naufalfaisa_",
                url: "https://instagram.com/naufalfaisa_",
                icon: FaInstagram,
            },
            {
                name: "Twitter",
                username: "@naufalfaisa",
                url: "https://twitter.com/naufalfaisa",
                icon: FaXTwitter,
            },
            {
                name: "LinkedIn",
                username: "Naufal Faisa",
                url: "https://linkedin.com/in/naufalfaisa",
                icon: FaLinkedin,
            },
            {
                name: "Discord",
                username: "@naufalfaisa",
                url: "https://linkedin.com/in/naufalfaisa",
                icon: FaDiscord,
            },
        ],
        enabled: true,
    },

    footer: {
        enabled: true,
    },
};
