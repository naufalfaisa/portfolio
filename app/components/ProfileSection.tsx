"use client";

import { FC, ReactNode } from "react";
import { siteConfig } from "@/config/site.config";
import { motion, Variants } from "framer-motion";

// 1. Buat konfigurasi animasi yang bisa digunakan ulang
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// 2. Buat komponen wrapper untuk animasi saat muncul
const AnimateOnView: FC<{ children: ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={fadeUp}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

export const ProfileSection: FC = () => {
  const { profile } = siteConfig;

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2 space-y-6">
          <AnimateOnView>
            <h1 className="font-medium text-4xl">{profile.title}</h1>
          </AnimateOnView>

          <AnimateOnView delay={0.2}>
            <div className="space-y-4">
              {profile.description.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </AnimateOnView>
        </div>

        <AnimateOnView>
          <div className="flex flex-col items-center space-y-4">
            <img
              src={profile.image}
              className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-2 border-gray-300 shadow"
              alt={profile.name}
            />
          </div>
        </AnimateOnView>
      </div>
    </section>
  );
};
