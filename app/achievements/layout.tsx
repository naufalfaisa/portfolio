import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Achievements',
};

export default function AchievementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}