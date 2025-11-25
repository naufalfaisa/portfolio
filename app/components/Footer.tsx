"use client";

import { FC } from "react";
import { siteConfig } from "@/config/site.config";

export const Footer: FC = () => {
  return (
    <footer className="text-sm text-gray-700">
      <p>{siteConfig.footer.text}</p>
    </footer>
  );
};
