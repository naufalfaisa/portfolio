"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { formatTimestamp } from "../lib/utils";
import { siteConfig } from "@/config/site.config";

export default function DiscordStatus({ showSpotify = true, showActivity = true }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
    const { discordStatus } = siteConfig;

    // --- Fetch Discord Status ---
    useEffect(() => {
        if (!discordStatus.enabled) return;

        async function fetchDiscordStatus() {
            try {
                const response = await fetch(`https://api.lanyard.rest/v1/users/${discordStatus.userId}`);
                const json = await response.json();
                if (json.success) setData(json.data);
            } catch (error) {
                console.error("Error fetching Discord status:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchDiscordStatus();
        const interval = setInterval(fetchDiscordStatus, 30000);
        return () => clearInterval(interval);
    }, []);

    // --- Pagination / Activity Navigation ---
    const goToNextPage = () => {
        setCurrentActivityIndex(prev => (prev + 1) % totalPages);
    };

    // --- Loading State ---
    if (loading || !data) {
        return (
            <div className="w-full max-w-[260px] py-4 space-y-3">
                {showActivity && (
                    <div className="bg-[#1a1a1a] rounded-xl p-3 flex items-center gap-3 animate-pulse">
                        <div className="w-10 h-10 bg-neutral-700 rounded" />
                        <div className="space-y-2 flex-1">
                            <div className="w-3/4 h-4 bg-neutral-700 rounded" />
                            <div className="w-1/2 h-3 bg-neutral-700 rounded" />
                            <div className="w-2/3 h-3 bg-neutral-700 rounded" />
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // --- Prepare Pages (Spotify + Activity) ---
    const { activities, listening_to_spotify, spotify } = data;
    const pages = [];
    if (showSpotify && listening_to_spotify && spotify) {
        pages.push({ type: "spotify", data: spotify });
    }
    if (showActivity) {
        const mainActivities = activities.filter(a => a.type === 0 && a.application_id);
        mainActivities.forEach(activity => pages.push({ type: "activity", data: activity }));
    }

    // --- No Activity State ---
    const totalPages = pages.length;
    const currentPage = pages[currentActivityIndex];

    if (totalPages === 0) {
        return (
            <div className="bg-[#1a1a1a] rounded-xl p-4 text-sm flex items-center gap-3 max-w-[260px] w-full">
                <div className="w-10 h-10 bg-neutral-700 rounded flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-400">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                </div>
                <div>
                    <p className="text-white font-medium">No Activity</p>
                    <p className="text-zinc-300 text-sm">Currently not doing anything</p>
                </div>
            </div>
        );
    }

    // --- Render Current Page ---
    return (
        <div className="w-full max-w-[260px] py-4 space-y-3">
            <div
                className="cursor-pointer"
                onClick={goToNextPage}
            >
                {currentPage.type === "spotify" && (
                    <div className="bg-[#1a1a1a] rounded-xl p-3 text-sm flex items-center gap-3">
                        <Image
                            src={currentPage.data.album_art_url}
                            alt={currentPage.data.album}
                            width={60}
                            height={60}
                            className="rounded"
                        />
                        <div className="flex-1">
                            <p className="text-sm text-white font-semibold">{currentPage.data.song}</p>
                            <p className="text-zinc-300 text-xs">by {currentPage.data.artist}</p>
                            <p className="text-zinc-300 text-xs">on {currentPage.data.album}</p>
                            {currentPage.data.timestamps?.start && (
                                <p className="text-zinc-400 text-xs mt-1">{formatTimestamp(currentPage.data.timestamps.start)}</p>
                            )}
                        </div>
                    </div>
                )}

                {currentPage.type === "activity" && (
                    <div className="bg-[#1a1a1a] rounded-xl p-4 text-sm flex items-center gap-3">
                        {currentPage.data?.assets?.large_image && (
                            <Image
                                src={
                                    currentPage.data.assets.large_image.startsWith("mp:external")
                                        ? `https://${currentPage.data.assets.large_image.split("/https/")[1]}`
                                        : `https://cdn.discordapp.com/app-assets/${currentPage.data.application_id}/${currentPage.data.assets.large_image}.webp?size=128`
                                }
                                alt={currentPage.data.assets.large_text || currentPage.data.name}
                                width={40}
                                height={40}
                                className="rounded"
                            />
                        )}
                        <div className="flex-1">
                            <p className="text-sm text-white font-semibold">{currentPage.data?.name || "No Activity"}</p>
                            <p className="text-zinc-300 text-xs">{currentPage.data?.details || "Do nothing"}</p>
                            {currentPage.data?.state && <p className="text-zinc-300 text-xs">{currentPage.data.state}</p>}
                            {currentPage.data?.timestamps?.start && (
                                <p className="text-zinc-400 text-xs mt-1">{formatTimestamp(currentPage.data.timestamps.start)}</p>
                            )}
                        </div>
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-2">
                        {pages.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${index === currentActivityIndex ? "bg-white" : "bg-zinc-600"}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
