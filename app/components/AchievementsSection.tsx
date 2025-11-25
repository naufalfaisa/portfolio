"use client";

import { FC, ReactNode } from "react";
import { FaArrowRight } from "react-icons/fa";
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

export const AchievementsSection: FC = () => {
  const { achievements } = siteConfig;

  return (
    <section className="space-y-4">
      <AnimateOnView>
      <h2 className="font-medium text-2xl">{achievements.title}</h2>
      </AnimateOnView>
      <AnimateOnView delay={0.1}>        
      <p className="text-gray-700">{achievements.description}</p>
      </AnimateOnView>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.items.map((a, i) => (
          <AnimateOnView key={i} delay={0.2 + i * 0.1}>            
          <div className="border border-gray-300 overflow-hidden shadow rounded group">
            <a href={`/achievements/${a.slug}`} className="block">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={a.image}
                  className="w-full h-full object-cover"
                  alt={a.title}
                />
              </div>

              <div className="p-5">
                <h3 className="font-medium mb-2 text-xl flex items-center justify-between">
                  <span>{a.title}</span>
                  <FaArrowRight className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </h3>

                <p className="mb-4 text-sm text-gray-700 line-clamp-2">
                  {a.description}
                </p>
              </div>
            </a>
          </div>
          </AnimateOnView>
        ))}
      </div>
    </section>
  );
};
