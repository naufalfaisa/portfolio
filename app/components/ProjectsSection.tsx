"use client";

import { FC, ReactNode } from "react";
import { FaGithub } from "react-icons/fa";
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

export const ProjectsSection: FC = () => {
  const { projects } = siteConfig;

  return (
    <section className="space-y-4">
      <AnimateOnView>
        <h2 className="font-medium text-2xl">{projects.title}</h2>
      </AnimateOnView>
      <AnimateOnView delay={0.1}>
        <p className="text-gray-700">{projects.description}</p>
      </AnimateOnView>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.items.map((p, i) => (
          <AnimateOnView key={i} delay={0.2 + i * 0.1}>
            <div className="border border-gray-300 overflow-hidden shadow rounded">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={p.image}
                  className="w-full h-full object-cover"
                  alt={p.title}
                />
              </div>

              <div className="p-5">
                <h3 className="font-medium mb-2 text-xl">{p.title}</h3>
                <p className="mb-4 text-sm text-gray-700 line-clamp-2">
                  {p.description}
                </p>

                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition"
                >
                  <FaGithub className="text-lg" />
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>
          </AnimateOnView>
        ))}
      </div>
    </section>
  );
};
