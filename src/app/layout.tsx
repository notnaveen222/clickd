import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clickd",
  description: "Your 24/7 e-Photobooth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/film-strip.png" />
      </head>
      <body
        className={`${geistSans.variable}  antialiased flex min-h-svh flex-col`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
