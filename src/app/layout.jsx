import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    description: "Personal portfolio of Naufal Faisa",
};

export default function RootLayout({ children }) {
    return (
        <html lang="id">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <main className="min-h-screen w-full flex justify-center font-sans px-4 md:px-0">
                    <div className="max-w-6xl w-full flex flex-col space-y-16 md:space-y-20">
                        {children}
                    </div>
                </main>
            </body>
        </html>
    );
}
