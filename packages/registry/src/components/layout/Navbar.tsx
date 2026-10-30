"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Search,
  Sparkles,
  GraduationCap,
  LayoutGrid,
  Monitor,
  Play,
  GitBranch,
  Pencil,
} from "lucide-react";
import { cn } from "../ui/cn";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Browse", href: "/browse" },
  { name: "MCP", href: "#mcp" },
  { name: "Pricing", href: "#pricing" },
  { name: "Blog", href: "#blog" },
];

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  apps: LayoutGrid,
  sites: Monitor,
  screens: LayoutGrid,
  flows: GitBranch,
  animations: Play,
  "ui-elements": Pencil,
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800"
          : "bg-transparent",
      )}
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500">
              <Sparkles className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <Link
              href="/"
              className="font-bold tracking-tight text-white sm:text-xl"
              aria-label="Mila Gallery home"
            >
              Mila<span className="text-emerald-400">Gallery</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/browse"
              className="ml-4 rounded-xl bg-white px-5 py-2 text-xs font-semibold text-neutral-950 shadow-sm transition-all hover:bg-neutral-200 active:scale-[0.98]"
            >
              Browse Gallery
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="rounded-xl border border-neutral-800 bg-neutral-900/80 px-4 py-2 text-neutral-200 text-sm transition-all hover:bg-neutral-800 backdrop-blur-sm"
              aria-label="Log in"
            >
              Log in
            </button>
            <button
              className="rounded-xl bg-white px-5 py-2 text-xs font-semibold text-neutral-950 shadow-sm transition-all hover:bg-neutral-100 active:scale-[0.98]"
              aria-label="Join for free"
            >
              Join for free
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden p-2 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-neutral-950/95 backdrop-blur-xl"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        >
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mx-auto max-w-sm mt-24 px-6 space-y-8">
            <h2 className="text-xl font-bold text-white">Explore</h2>
            <nav className="space-y-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-medium text-neutral-300 hover:text-white px-4 py-2 rounded-xl hover:bg-neutral-900"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <h2 className="text-xl font-bold text-white mt-8">Categories</h2>
            <nav className="space-y-3">
              {Object.entries(CATEGORY_ICONS).map(([key, Icon]) => (
                <Link
                  key={key}
                  href={`/browse?category=${key}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-lg font-medium text-neutral-300 hover:text-white px-4 py-2 rounded-xl hover:bg-neutral-900"
                >
                  <Icon className="h-5 w-5" />
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}