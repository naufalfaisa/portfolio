import { siteConfig } from "@/config/site.config";
import { AchievementsSection } from "./components/AchievementsSection";
import { ProfileSection } from "./components/ProfileSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { SocialsSection } from "./components/SocialsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-screen bg-main text-primary">
      <div className="w-full min-h-screen flex justify-center px-4 sm:px-6 lg:px-12 py-12 sm:py-20 font-sans">
        <div className="max-w-6xl w-full flex flex-col space-y-16 sm:space-y-20">
          {siteConfig.profile.enabled && <ProfileSection />}
          {siteConfig.projects.enabled && <ProjectsSection />}
          {siteConfig.Experience.enabled && <ExperienceSection />}
          {siteConfig.achievements.enabled && <AchievementsSection />}
          {siteConfig.socials.enabled && <SocialsSection />}
          {siteConfig.footer.enabled && <Footer />}
        </div>
      </div>
    </div>
  );
}

