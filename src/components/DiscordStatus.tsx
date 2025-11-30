"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { formatTimestamp } from "../lib/utils";
import type { LanyardResponse } from "../types/discord";
import { siteConfig } from "@/src/config/site.config";

interface DiscordStatusProps {
    showAvatar?: boolean;
    showCustomStatus?: boolean;
    showSpotify?: boolean;
    showActivity?: boolean;
}

export default function DiscordStatus({
    showAvatar = false,
    showCustomStatus = false,
    showSpotify = true,
    showActivity = true,
}: DiscordStatusProps) {
    const [data, setData] = useState<LanyardResponse["data"] | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
    const { discordStatus } = siteConfig;

    useEffect(() => {
        if (!discordStatus.enabled) return;

        async function fetchDiscordStatus() {
            try {
                const response = await fetch(
                    `https://api.lanyard.rest/v1/users/${discordStatus.userId}`,
                );
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

    if (loading || !data) {
        return (
            <div className="max-w-xl space-y-3">
                {showAvatar && (
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-neutral-900 rounded-full animate-pulse" />
                        <div className="space-y-2">
                            <div className="w-32 h-4 bg-neutral-900 rounded animate-pulse" />
                            <div className="w-24 h-3 bg-neutral-900 rounded animate-pulse" />
                        </div>
                    </div>
                )}
                {showCustomStatus && (
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-neutral-900 rounded animate-pulse" />
                        <div className="w-40 h-3 bg-neutral-900 rounded animate-pulse" />
                    </div>
                )}
                {showActivity && (
                    <div className="bg-neutral-900 border-2 border-zinc-800 rounded-lg p-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#2f2f2f] rounded animate-pulse" />
                        <div className="space-y-2 flex-1">
                            <div className="w-3/4 h-4 bg-[#2f2f2f] rounded animate-pulse" />
                            <div className="w-1/2 h-3 bg-[#2f2f2f] rounded animate-pulse" />
                            <div className="w-2/3 h-3 bg-[#2f2f2f] rounded animate-pulse" />
                        </div>
                    </div>
                )}
            </div>
        );
    }

    const {
        discord_user,
        activities,
        discord_status,
        listening_to_spotify,
        spotify,
    } = data;

    const customStatus = activities.find((a) => a.type === 4);

    // Collect all displayable items (Spotify + Activities)
    const pages = [];
    if (showSpotify && listening_to_spotify && spotify) {
        pages.push({ type: "spotify", data: spotify });
    }
    if (showActivity) {
        const mainActivities = activities.filter(
            (a) => a.type === 0 && a.application_id,
        );
        mainActivities.forEach((activity) => {
            pages.push({ type: "activity", data: activity });
        });
    }

    const totalPages = pages.length;

    const statusColors = {
        online: "bg-green-500",
        idle: "bg-yellow-500",
        dnd: "bg-red-500",
        offline: "bg-zinc-500",
    };

    const handlePrevActivity = () => {
        setCurrentActivityIndex((prev) =>
            prev === 0 ? totalPages - 1 : prev - 1,
        );
    };

    const handleNextActivity = () => {
        setCurrentActivityIndex((prev) =>
            prev === totalPages - 1 ? 0 : prev + 1,
        );
    };

    const currentPage = pages[currentActivityIndex];

    return (
        <div className="max-w-xl space-y-3">
            {/* Avatar */}
            {showAvatar && (
                <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12">
                        <Image
                            src={`https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.webp?size=1024`}
                            alt={discord_user.display_name}
                            width={48}
                            height={48}
                            className="rounded-full"
                        />
                        <div
                            className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-neutral-900 ${
                                statusColors[
                                    discord_status as keyof typeof statusColors
                                ]
                            }`}
                        />
                    </div>
                    <div>
                        <p className="text-white font-semibold">
                            {discord_user.display_name}
                        </p>
                        <p className="text-zinc-400 text-sm">
                            @{discord_user.username}
                        </p>
                    </div>
                </div>
            )}

            {/* Custom Status */}
            {showCustomStatus && (
                <div className="flex items-center gap-1 text-sm text-zinc-400">
                    {customStatus?.emoji && (
                        <Image
                            src={`https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.webp?size=128`}
                            alt={customStatus.emoji.name}
                            width={16}
                            height={16}
                        />
                    )}
                    <span>{customStatus?.state || "Do nothing"}</span>
                </div>
            )}

            {/* Spotify and Activities with Navigation */}
            {(showSpotify || showActivity) &&
                (totalPages > 0 ? (
                    <div className="space-y-2">
                        <div className="relative group">
                            {currentPage?.type === "spotify" && (
                                <div className="bg-neutral-900 border-2 border-zinc-800 rounded-lg p-4 text-sm flex items-center gap-3">
                                    <Image
                                        src={currentPage.data.album_art_url}
                                        alt={currentPage.data.album}
                                        width={40}
                                        height={40}
                                        className="rounded"
                                    />
                                    <div className="flex-1">
                                        <p className="text-white font-medium">
                                            {currentPage.data.song}
                                        </p>
                                        <p className="text-zinc-400 text-sm">
                                            by {currentPage.data.artist}
                                        </p>
                                        <p className="text-zinc-400 text-sm">
                                            on {currentPage.data.album}
                                        </p>
                                        {currentPage.data.timestamps?.start && (
                                            <p className="text-zinc-500 text-xs mt-1">
                                                {formatTimestamp(
                                                    currentPage.data.timestamps
                                                        .start,
                                                )}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {currentPage?.type === "activity" && (
                                <div className="bg-neutral-900 border-2 border-zinc-800 rounded-lg p-4 text-sm flex items-center gap-3">
                                    {currentPage.data?.assets?.large_image && (
                                        <Image
                                            src={
                                                currentPage.data.assets.large_image.startsWith(
                                                    "mp:external",
                                                )
                                                    ? `https://${currentPage.data.assets.large_image.split("/https/")[1]}`
                                                    : `https://cdn.discordapp.com/app-assets/${currentPage.data.application_id}/${currentPage.data.assets.large_image}.webp?size=128`
                                            }
                                            alt={
                                                currentPage.data.assets
                                                    .large_text ||
                                                currentPage.data.name
                                            }
                                            width={40}
                                            height={40}
                                            className="rounded"
                                            unoptimized
                                        />
                                    )}
                                    <div className="flex-1">
                                        <p className="text-white font-medium">
                                            {currentPage.data?.name ||
                                                "No Activity"}
                                        </p>
                                        <p className="text-zinc-400 text-sm">
                                            {currentPage.data?.details ||
                                                "Do nothing"}
                                        </p>
                                        {currentPage.data?.state && (
                                            <p className="text-zinc-400 text-sm">
                                                {currentPage.data.state}
                                            </p>
                                        )}
                                        {currentPage.data?.timestamps
                                            ?.start && (
                                            <p className="text-zinc-500 text-xs mt-1">
                                                {formatTimestamp(
                                                    currentPage.data.timestamps
                                                        .start,
                                                )}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Pagination Dots */}
                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2">
                                {pages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            setCurrentActivityIndex(index)
                                        }
                                        className={`w-2 h-2 rounded-full transition-colors ${
                                            index === currentActivityIndex
                                                ? "bg-white"
                                                : "bg-zinc-600 hover:bg-zinc-500"
                                        }`}
                                        aria-label={`Go to page ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-neutral-900 border-2 border-zinc-800 rounded-lg p-4 text-sm flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#2f2f2f] rounded flex items-center justify-center">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-zinc-500"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-white font-medium">
                                No Activity
                            </p>
                            <p className="text-zinc-400 text-sm">
                                Currently not doing anything
                            </p>
                        </div>
                    </div>
                ))}
        </div>
    );
}
