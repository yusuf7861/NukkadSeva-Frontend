import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

const interClassName = "font-sans";

export const metadata: Metadata = {
    title: "NukkadSeva - Local Service Finder",
    description: "Find trusted local service providers for all your home needs",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0&display=swap" rel="stylesheet" />
            </head>
            <body className={interClassName}>
                <GoogleOAuthProvider clientId={googleClientId}>
                    <AuthProvider>{children}</AuthProvider>
                </GoogleOAuthProvider>
                <Toaster position="top-center" />
            </body>
        </html>
    );
}


