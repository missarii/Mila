"use client";

import React from "react";

interface HeroGeometricProps {
  badgeText?: string;
  title?: string;
  highlightedText?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export function HeroGeometric({
  badgeText = "Mila AI UI Intelligence v0.1",
  title = "The design engine for",
  highlightedText = "autonomous coding agents",
  description = "Equip Cursor, Claude Code, and Antigravity with production-grade components, mathematical design systems, and real-time visual audits.",
  primaryCtaText = "Get Started with MCP",
  primaryCtaLink = "#get-started",
  secondaryCtaText = "Explore Components",
  secondaryCtaLink = "#components",
}: HeroGeometricProps) {
  return (
    <div className="relative isolate overflow-hidden bg-neutral-950 px-6 pt-24 pb-20 sm:pt-32 lg:px-8">
      {/* Background Ambient Glow & Subtle Geometric Gradients */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-500/20 to-emerald-500/10 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        {/* Announcement Pill Badge */}
        <div className="mb-8 inline-flex items-center gap-x-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-4 py-1.5 text-xs font-medium text-neutral-300 backdrop-blur-md transition-colors hover:border-neutral-700">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{badgeText}</span>
          <span className="text-neutral-500" aria-hidden="true">→</span>
        </div>

        {/* Main Title with Intentional Tracking */}
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
          {title}{" "}
          <span className="bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-400 bg-clip-text text-transparent">
            {highlightedText}
          </span>
        </h1>

        {/* Constrained Body Subtext */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
          {description}
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={primaryCtaLink}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition-all hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
          >
            {primaryCtaText}
          </a>
          <a
            href={secondaryCtaLink}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/80 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-neutral-700 hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-700 active:scale-[0.98]"
          >
            {secondaryCtaText}
          </a>
        </div>
      </div>
    </div>
  );
}
export default HeroGeometric;
