"use client";

import { useEffect, useState, useMemo } from "react";
import useSWR from "swr";
import { Moon } from "lucide-react";
import Image from "next/image";

export interface Props {
  userId: string;
}

export interface LanyardResponse {
  data: {
    listening_to_spotify: boolean;
    spotify: LanyardSpotify | null;
    activities: LanyardActivity[];
  };
}

export interface LanyardSpotify {
  song: string;
  artist: string;
  album_art_url: string;
  timestamps: {
    start: number;
    end: number;
  };
}

export interface LanyardActivity {
  type: number;
  name: string;
  state?: string;
  details?: string;
  application_id?: string;
  assets?: {
    large_image?: string;
  };
  timestamps?: {
    start?: number;
  };
}

export type DiscordPage =
  | { type: "spotify"; data: LanyardSpotify }
  | { type: "activity"; data: LanyardActivity };

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

function getElapsed(start?: number) {
  if (start == null) return "00:00";
  const diff = Math.floor((Date.now() - start) / 1000);
  const m = Math.floor(diff / 60);
  const s = diff % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export default function DiscordPresence({ userId }: Props) {
  const { data: lanyard } = useSWR<LanyardResponse>(
    `https://api.lanyard.rest/v1/users/${userId}`,
    fetcher,
    { refreshInterval: 5000 }
  );

  const data = lanyard?.data;
  const [activePage, setActivePage] = useState(0);
  const spotify = data?.listening_to_spotify ? data.spotify ?? null : null;
  const activity = data?.activities?.find(a => a.type !== 4 && a.type !== 2);

  const pages: DiscordPage[] = useMemo(() => {
    const result: DiscordPage[] = [];
    if (spotify) result.push({ type: "spotify", data: spotify });
    if (activity) result.push({ type: "activity", data: activity });
    return result;
  }, [spotify, activity]);

  const safeIndex = activePage >= pages.length ? 0 : activePage;
  const currentPage = pages[safeIndex];

  const [elapsed, setElapsed] = useState(() =>
    getElapsed(currentPage?.data?.timestamps?.start)
  );

  useEffect(() => {
    const start = currentPage?.data?.timestamps?.start;
    if (!start) return;

    const id = setInterval(() => {
      setElapsed(getElapsed(start));
    }, 1000);

    return () => clearInterval(id);
  }, [currentPage]);

  const handleNextPage = () => {
    if (pages.length <= 1) return;
    setActivePage(p => (p + 1) % pages.length);
  };

  // Loading state
  if (!data) {
    return (
      <div className="w-65 font-sans">
        <div className="flex items-center gap-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-900/20 p-3 animate-pulse">
          <div className="h-16 w-16 shrink-0 rounded-lg bg-zinc-800" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/2 rounded bg-zinc-700" />
            <div className="h-2 w-3/4 rounded bg-zinc-800" />
          </div>
        </div>
      </div>
    );
  }

  // No activity state
  if (pages.length === 0 || !currentPage) {
    return (
      <div className="flex flex-col gap-2 w-65 font-sans">
        <div className="border-2 border-zinc-200 dark:border-zinc-800 p-3 rounded-xl flex items-center gap-3">
          <div className="w-16 h-16 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0">
            <Moon className="w-8 h-8 text-zinc-500" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-zinc-600 dark:text-zinc-300 text-xs">
              Currently Idle
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-1">
              No activity detected
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Display current activity
  return (
    <div className="flex flex-col gap-2 w-65 font-sans">
      <div onClick={handleNextPage} className="cursor-pointer">
        <div className="border-2 border-zinc-200 dark:border-zinc-800 p-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-right-5 duration-500">
          {currentPage.type === "spotify" ? (
            <>
              <Image
                src={currentPage.data.album_art_url}
                width={64}
                height={64}
                alt={`Album cover for ${currentPage.data.song}`}
                className="w-16 h-16 rounded-lg shrink-0"
                priority
              />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-zinc-600 dark:text-zinc-400">
                  Listening to Spotify
                </p>
                <p className="font-bold text-xs">
                  {currentPage.data.song}
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  {currentPage.data.artist}
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 text-[11px] font-mono mt-1">
                  {elapsed} elapsed
                </p>
              </div>
            </>
          ) : (
            <>
              <Image
                src={
                  currentPage.data.assets?.large_image
                    ? currentPage.data.assets.large_image.startsWith("mp:external")
                      ? currentPage.data.assets.large_image.replace(
                          /mp:external\/.*\/https\//,
                          "https://"
                        )
                      : `https://cdn.discordapp.com/app-assets/${currentPage.data.application_id}/${currentPage.data.assets.large_image}.png`
                    : `https://lanyard.rest/assets/${currentPage.data.application_id}.png`
                }
                width={64}
                height={64}
                alt={currentPage.data.name || 'Activity image'}
                className="w-16 h-16 rounded-lg object-cover"
                priority
              />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-zinc-600 dark:text-zinc-400">
                  Playing
                </p>
                <p className="font-bold text-xs">
                  {currentPage.data.name}
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  {currentPage.data.state} - {currentPage.data.details}
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 text-[11px] font-mono mt-1">
                  {elapsed} elapsed
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {pages.length > 1 && (
        <div className="flex justify-center gap-2">
          {pages.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                safeIndex === i
                  ? "w-6 bg-zinc-600 dark:bg-zinc-200"
                  : "w-1.5 bg-zinc-400 dark:bg-zinc-500"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
