import { IconType } from "react-icons";
import { FaGithub, FaInstagram, FaDesktop } from "react-icons/fa";

export interface ProfileConfig {
  name: string;
  title: string;
  description: string[];
  image: string;
  enabled: boolean;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  github: string;
}

export interface WorkExperience {
  role: string;
  company: string;
  period: string;
  icon: IconType;
  link: string;
}

export interface Achievement {
  slug: string;
  title: string;
  description: string;
  image: string;
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
  text: string;
  enabled: boolean;
}

export interface SiteConfig {
  profile: ProfileConfig;
  projects: SectionConfig<Project>;
  workExperience: SectionConfig<WorkExperience>;
  achievements: SectionConfig<Achievement>;
  socials: SectionConfig<Social>;
  footer: FooterConfig;
}

export const siteConfig: SiteConfig = {
  profile: {
    name: "Naufal Faisa",
    title: "Hi there — I'm Naufal Faisa",
    description: [
      "I'm an undergraduate student in Informatics with a passion for programming. I enjoy exploring different tools and technologies and seeing what I can build.",
      "I'm currently learning to create CLI tools, web apps, and backend systems, while learning JavaScript, Python, Go, and working with Node.js. Writing clean and efficient code is always my goal.",
    ],
    image: "https://github.com/naufalfaisa.png",
    enabled: true,
  },

  projects: {
    title: "Projects",
    description: "Some projects from my Github repository.",
    items: [
      {
        title: "Apple Music Lyrics Downloader",
        description: "A Python program for downloading Apple Music time-synced lyrics in LRC format.",
        image: "/images/amly.webp",
        github: "https://github.com/naufalfaisa/amly",
      },
    ],
    enabled: true,
  },

  workExperience: {
    title: "Work Experience",
    description: "Key roles and hands-on development experience I've undertaken.",
    items: [
      {
        role: "Web Developer",
        company: "Freelance",
        period: "2025 - Present",
        icon: FaDesktop,
        link: "#",
      },
    ],
    enabled: true,
  },

  achievements: {
    title: "Achievements",
    description: "Lorem ipsum.",
    items: [
      {
        slug: "achievement-1",
        title: "Achievement Title",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
        image: "https://placehold.jp/400x225.png",
      },
    ],
    enabled: true,
  },

  socials: {
    title: "Connect with me",
    description: "These are the platforms where I share my work, interests, and connect with others.",
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
        url: "https://instagram.com/naufalfaisa",
        icon: FaInstagram,
      },
    ],
    enabled: true,
  },

  footer: {
    text: "© 2025 naufalfaisa",
    enabled: true,
  },
};
