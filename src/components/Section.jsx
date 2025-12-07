import React from "react";

export default function Section({ children, fullWidth, id }) {
    return (
        <section id={id} className="w-full">
            <div className="max-w-6xl mx-auto py-20 px-4">{children}</div>

            {fullWidth && <div className="w-full">{fullWidth}</div>}
        </section>
    );
}
