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
        title: "Welcome!",
        bio: [
            <>
                Hi! I'm <strong>Naufal Faisa</strong>, a Bachelor's
                degree student in Informatics Engineering with a passion
                for programming.
            </>,
            <>
                I am currently learning to build CLI tools, web
                applications, and backend systems, while also improving
                my skills in JavaScript, Python, Go, and React.
            </>,
        ],
        avatar: "/images/avatar.jpg",
    },

    // --- Discord Status ---
    discordStatus: {
        userId: "1235664011987517565",
        enabled: true,
    },

    // --- Projects ---
    projects: {
        heading: "Projects",
        subheading: "Some projects from my Github repository.",
        items: [
            { github: "https://github.com/naufalfaisa/amdl" },
            { github: "https://github.com/naufalfaisa/amly" },
            { github: "https://github.com/naufalfaisa/portfolio" },
        ],
    },

    // --- Certifications ---
    certifications: {
        heading: "Certifications",
        subheading: "These are some of the certifications I've earned.",
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
    },

    // --- Social media links ---
    socials: {
        heading: "Connect with me",
        subheading:
            "These are the platforms where I share my work, interests, and connect with others.",
        items: [
            {
                name: "GitHub",
                username: "@naufalfaisa",
                url: "https://github.com/naufalfaisa",
                icon: FaGithub,
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
    },
};
