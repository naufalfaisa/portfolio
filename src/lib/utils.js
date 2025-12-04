// --- Utility for combining Tailwind classes ---
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// --- Format timestamp to elapsed string ---
export function formatTimestamp(timestamp) {
    const now = Date.now();
    const elapsed = now - timestamp;
    const minutes = Math.floor(elapsed / 60000);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
        return `${hours} hour${hours === 1 ? "" : "s"} elapsed`;
    }
    return `${minutes} minute${minutes === 1 ? "" : "s"} elapsed`;
}

// --- Set cookie with fallback to document.cookie and localStorage ---
export async function setCookie(name, value, options = {}) {
    try {
        // Browser with cookieStore API
        if (
            typeof window !== "undefined" &&
            "cookieStore" in window.navigator
        ) {
            const cookieInit = { value };

            if (options.expires) cookieInit.expires = options.expires;
            if (options.maxAge != null) cookieInit.maxAge = options.maxAge;
            if (options.path) cookieInit.path = options.path;
            if (options.sameSite) cookieInit.sameSite = options.sameSite;
            if (options.secure) cookieInit.secure = options.secure;

            const nav = window.navigator;

            if (nav.cookieStore?.set) {
                await nav.cookieStore.set({
                    name,
                    ...cookieInit,
                });
                return;
            }
        }

        // Fallback: document.cookie
        if (typeof document === "undefined") return;

        const parts = [
            `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
        ];

        if (options.path) parts.push(`path=${options.path}`);
        if (options.maxAge != null) parts.push(`max-age=${options.maxAge}`);
        if (options.expires)
            parts.push(`expires=${options.expires.toUTCString()}`);
        if (options.secure) parts.push("secure");
        if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);

        document.cookie = parts.join("; ");

        // Extra fallback: localStorage
        try {
            if (typeof window !== "undefined" && window.localStorage) {
                const payload = { value, attrs: options };
                window.localStorage.setItem(
                    `cookie:${name}`,
                    JSON.stringify(payload)
                );
            }
        } catch { }
    } catch (e) {
        console.warn("setCookie failed:", e);
    }
}
