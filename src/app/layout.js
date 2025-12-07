import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Naufal Faisa",
    description: "Personal website and portfolio.",
    keywords: ["Naufal", "Portfolio", "Developer"],
    authors: [{ name: "Naufal Faisa" }],
    metadataBase: new URL("https://naufalfaisa.my.id"),
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
