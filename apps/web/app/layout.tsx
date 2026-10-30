import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Mila Gallery — Design Inspiration for Apps & Sites",
  description:
    "A design reference library for mobile and web apps. Browse 600K+ shipped screens, flows, animations, and UI elements. Built with Mila's UI/UX intelligence system — 3D animations, open-source assets, and free icons.",
  metadataBase: new URL("https://mila-gallery.local"),
  openGraph: {
    title: "Mila Gallery — Design Inspiration for Apps & Sites",
    description: "The design reference library for apps and sites.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head />
      <body className={`${inter.variable} font-sans min-h-screen`}>
        {children}
      </body>
    </html>
  );
}