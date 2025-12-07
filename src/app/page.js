import React from "react";
import ProfileSection from "@/components/ProfileSection";
import ProjectSection from "@/components/ProjectSection";
import Footer from "@/components/Footer";
import { SocialsSection } from "@/components/SocialSection";
import { CertificationSection } from "@/components/CertificationSection";

export default function Home() {
    return (
        <>
            <main className="font-sans">
                <div id="home">
                    <ProfileSection />
                </div>
                <div id="projects">
                    <ProjectSection />
                </div>
                <div id="certifications">
                    <CertificationSection />
                </div>
                <div id="social">
                    <SocialsSection />
                </div>
                <Footer />
            </main>
        </>
    );
}
