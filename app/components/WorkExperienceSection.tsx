"use client";

import { FC, ReactNode } from "react";
import { siteConfig } from "@/config/site.config";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

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

export const WorkExperienceSection: FC = () => {
  const { workExperience } = siteConfig;

  return (
    <section className="space-y-4">
      <AnimateOnView>
        <h2 className="font-medium text-2xl">{workExperience.title}</h2>
      </AnimateOnView>
      <AnimateOnView delay={0.1}>
        <p className="text-gray-700">{workExperience.description}</p>
      </AnimateOnView>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workExperience.items.map((s, i) => {
          const Icon = s.icon;
          return (
            <AnimateOnView key={i} delay={0.2 + i * 0.1}>
              <a
                href={s.link}
                target="_blank"
                rel="noreferrer"
                className="border border-gray-300 hover:bg-gray-100 transition flex items-start p-5 shadow rounded"
              >
                <div className="p-3 bg-neutral-200 rounded-full mr-4">
                  <Icon className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-xl">{s.role}</h3>
                  <p className="text-sm text-gray-700">{s.company}</p>
                  <p className="text-sm text-gray-700 mt-1">{s.period}</p>
                </div>
              </a>
            </AnimateOnView>
          );
        })}
      </div>
    </section>
  );
};
