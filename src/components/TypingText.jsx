"use client";

import { useEffect, useState } from "react";

export const TypingText = ({ text, speed = 120 }) => {
    const [typed, setTyped] = useState("");

    useEffect(() => {
        let index = 0;

        const tick = () => {
            if (index <= text.length) {
                setTyped(text.slice(0, index));
                index += 1;
                setTimeout(tick, speed);
            }
        };

        tick();
    }, [text, speed]);

    return (
        <span>
            {typed}
            <span className="animate-pulse">_</span>
        </span>
    );
};
