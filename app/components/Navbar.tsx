'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

const navItems = {
  '/': { name: 'Home' },
  '/projects': { name: 'Projects' },
  '/achievements': { name: 'Achievements' },
};

export function Navbar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-6 left-1/2 -translate-x-1/2 z-50 font-sans tracking-tight">
      <nav
        className="flex items-center justify-center p-1.5 bg-zinc-50/80 dark:bg-[#121212]/80 border border-zinc-300 dark:border-zinc-700 backdrop-blur-md rounded-full shadow"
        id="nav"
      >
        <div className="flex flex-row space-x-1">
          {Object.entries(navItems).map(([path, { name }]) => {
            const isActive = pathname === path;
            
            return (
              <Link
                key={path}
                href={path}
                className={clsx(
                  "relative px-4 py-1.5 transition-all duration-300 rounded-full text-sm font-medium",
                  isActive 
                    ? "text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800" 
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                )}
              >
                {name}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}