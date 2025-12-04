import { siteConfig } from "@/config/site.config";
import { AchievementsSection } from "../components/AchievementsSection";
import { ProfileSection } from "../components/ProfileSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { SocialsSection } from "../components/SocialsSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { Footer } from "../components/Footer";

export default function Home() {
    return (
        <>
            {siteConfig.profile.avatar.enabled && <ProfileSection />}
            {siteConfig.projects.enabled && <ProjectsSection />}
            {siteConfig.Experience.enabled && <ExperienceSection />}
            {siteConfig.achievements.enabled && <AchievementsSection />}
            {siteConfig.socials.enabled && <SocialsSection />}
            {siteConfig.footer.enabled && <Footer />}
        </>
    );
}
