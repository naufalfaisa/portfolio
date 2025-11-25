import { siteConfig } from "@/config/site.config";
import { AchievementsSection } from "./components/AchievementsSection";
import { ProfileSection } from "./components/ProfileSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { SocialsSection } from "./components/SocialsSection";
import { WorkExperienceSection } from "./components/WorkExperienceSection";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-screen">
      <div className="w-screen min-h-screen flex justify-center px-6 py-20 ">
        <div className="max-w-6xl w-full flex flex-col space-y-20">
          {siteConfig.profile.enabled && <ProfileSection />}
          {siteConfig.projects.enabled && <ProjectsSection />}
          {siteConfig.workExperience.enabled && <WorkExperienceSection />}
          {siteConfig.achievements.enabled && <AchievementsSection />}
          {siteConfig.socials.enabled && <SocialsSection />}
          {siteConfig.footer.enabled && <Footer />}
        </div>
      </div>
    </div>
  );
}

