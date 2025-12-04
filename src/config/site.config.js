import {
    FaGithub,
    FaInstagram,
    FaXTwitter,
    FaLinkedin,
    FaDesktop,
    FaDiscord,
} from "react-icons/fa6";

// --- Site Configuration ---
export const siteConfig = {

    // --- Profile ---
    profile: {
        name: "Naufal Faisa",
        title: "Welcome!",
        bio: [
            <>
                Hi! I'm <strong>Naufal Faisa</strong>, a Bachelor's degree student in Informatics Engineering with a passion for programming. I love exploring different tools and technologies and seeing what I can build.
            </>,
            <>
                I'm currently learning to build CLI tools, web applications, and backend systems, while also learning JavaScript, Python, Go, and Node.js. Writing clean and efficient code has always been my goal.
            </>,
        ],
        avatar: {
            src: "/images/avatar.jpg",
            enabled: true,
        },
    },

    // --- Discord Status ---
    discordStatus: {
        userId: "1235664011987517565",
        enabled: true,
    },

    // --- Projects ---
    projects: {
        title: "Projects",
        description: "Some projects from my Github repository.",
        items: [
            { github: "https://github.com/naufalfaisa/amly" },
            { github: "https://github.com/naufalfaisa/portfolio" },
        ],
        enabled: true,
    },

    // --- Experience ---
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

    // --- Achievements ---
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

    // --- Socials ---
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

    // --- Footer ---
    footer: {
        enabled: true,
    },
};