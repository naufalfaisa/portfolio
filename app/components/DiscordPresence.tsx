'use client';

import { useEffect, useState, useMemo } from 'react';
import useSWR from 'swr';
import { Moon } from 'lucide-react';
import Image from 'next/image';

// --- Types ---
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
    | { type: 'spotify'; data: LanyardSpotify }
    | { type: 'activity'; data: LanyardActivity };

// --- Fetcher ---
const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
};

// --- Utils ---
function getElapsed(start?: number) {
    if (!start) return '00:00';
    const diff = Math.floor((Date.now() - start) / 1000);
    const m = Math.floor(diff / 60);
    const s = diff % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// --- Components ---
function LoadingPlaceholder() {
    return (
        <div className="w-65 font-sans">
            <div className="flex items-center gap-3 rounded-xl bg-zinc-50 dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 p-3 animate-pulse">
                <div className="h-16 w-16 shrink-0 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex-1 space-y-2">
                    <div className="h-3 w-1/2 rounded bg-zinc-300 dark:bg-zinc-700" />
                    <div className="h-2 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
            </div>
        </div>
    );
}

function IdleState() {
    return (
        <div className="flex flex-col gap-2 w-65 font-sans">
            <div className="bg-zinc-50 dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl flex items-center gap-3">
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

function ActivityCard({
    page,
    elapsed,
    onClick,
}: {
    page: DiscordPage;
    elapsed: string;
    onClick: () => void;
}) {
    const isSpotify = page.type === 'spotify';

    const imageSrc = isSpotify
        ? page.data.album_art_url
        : page.data.assets?.large_image
          ? page.data.assets.large_image.startsWith('mp:external')
              ? page.data.assets.large_image.replace(
                    /mp:external\/.*\/https\//,
                    'https://',
                )
              : `https://cdn.discordapp.com/app-assets/${page.data.application_id}/${page.data.assets.large_image}.png`
          : `https://lanyard.rest/assets/${page.data.application_id}.png`;

    return (
        <div onClick={onClick} className="cursor-pointer">
            <div className="bg-zinc-50 dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-right-5 duration-500">
                <Image
                    src={imageSrc}
                    width={64}
                    height={64}
                    alt={
                        isSpotify
                            ? `Album cover for ${page.data.song}`
                            : page.data.name || 'Activity image'
                    }
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                    priority
                />
                <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-zinc-600 dark:text-zinc-400">
                        {isSpotify ? 'Listening to Spotify' : 'Playing'}
                    </p>
                    <p className="font-bold text-xs">
                        {isSpotify ? page.data.song : page.data.name}
                    </p>
                    {isSpotify ? (
                        <p className="text-xs text-zinc-600 dark:text-zinc-300">
                            {page.data.artist}
                        </p>
                    ) : (
                        <p className="text-xs text-zinc-600 dark:text-zinc-300">
                            {page.data.state} - {page.data.details}
                        </p>
                    )}
                    <p className="text-zinc-600 dark:text-zinc-400 text-[11px] font-mono mt-1">
                        {elapsed} elapsed
                    </p>
                </div>
            </div>
        </div>
    );
}

function PageIndicators({
    count,
    current,
}: {
    count: number;
    current: number;
}) {
    if (count <= 1) return null;

    return (
        <div className="flex justify-center gap-2">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                        current === i
                            ? 'w-6 bg-zinc-600 dark:bg-zinc-200'
                            : 'w-1.5 bg-zinc-400 dark:bg-zinc-500'
                    }`}
                />
            ))}
        </div>
    );
}

// --- Main Component ---
export default function DiscordPresence({ userId }: Props) {
    const { data: lanyard } = useSWR<LanyardResponse>(
        `https://api.lanyard.rest/v1/users/${userId}`,
        fetcher,
        { refreshInterval: 5000 },
    );

    const data = lanyard?.data;
    const [activePage, setActivePage] = useState(0);

    // Extract Spotify & first non-idle activity
    const spotify = data?.listening_to_spotify ? (data.spotify ?? null) : null;
    const activity = data?.activities?.find(
        (a) => a.type !== 4 && a.type !== 2,
    );

    // Combine pages
    const pages: DiscordPage[] = useMemo(() => {
        const result: DiscordPage[] = [];
        if (spotify) result.push({ type: 'spotify', data: spotify });
        if (activity) result.push({ type: 'activity', data: activity });
        return result;
    }, [spotify, activity]);

    const safeIndex = activePage >= pages.length ? 0 : activePage;
    const currentPage = pages[safeIndex];

    const [elapsed, setElapsed] = useState(() =>
        getElapsed(currentPage?.data?.timestamps?.start),
    );

    // Update elapsed every second
    useEffect(() => {
        const start = currentPage?.data?.timestamps?.start;
        if (!start) return;

        const id = setInterval(() => setElapsed(getElapsed(start)), 1000);
        return () => clearInterval(id);
    }, [currentPage]);

    const handleNextPage = () => {
        if (pages.length <= 1) return;
        setActivePage((p) => (p + 1) % pages.length);
    };

    if (!data) return <LoadingPlaceholder />;
    if (!currentPage) return <IdleState />;

    return (
        <div className="flex flex-col gap-2 w-65 font-sans">
            <ActivityCard
                page={currentPage}
                elapsed={elapsed}
                onClick={handleNextPage}
            />
            <PageIndicators count={pages.length} current={safeIndex} />
        </div>
    );
}
