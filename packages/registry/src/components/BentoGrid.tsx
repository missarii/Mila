"use client";

import React from "react";

export function BentoGrid() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <span className="inline-block rounded-full border border-neutral-800 bg-neutral-900/80 px-3 py-1 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
          Architecture & Performance
        </span>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
          Engineered for agentic precision
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-400 md:text-lg">
          Every token, spacing rule, and interactive element is audited in real-time to prevent AI aesthetic regressions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
        {/* Large Feature Card (Col span 2) */}
        <div className="group relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 p-8 transition-all hover:border-neutral-700 md:col-span-2">
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-blue-400">
                01 / MCP Synchronizer
              </span>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
                Deterministic Agent Execution
              </h3>
              <p className="mt-2 max-w-md text-sm text-neutral-400">
                Direct model-to-code piping without hallucinated Tailwind classes or arbitrary magic numbers.
              </p>
            </div>

            {/* Simulated Agent Terminal */}
            <div className="mt-8 overflow-hidden rounded-xl border border-neutral-800/80 bg-neutral-900/90 p-4 font-mono text-xs text-neutral-300 shadow-inner">
              <div className="flex items-center space-x-2 border-b border-neutral-800 pb-2 mb-3">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                <span className="text-neutral-500 ml-2 text-[11px]">mila-mcp-session</span>
              </div>
              <p className="text-emerald-400">✓ mila_get_component(&quot;spotlight-card&quot;)</p>
              <p className="text-neutral-400">→ Fetched TypeScript definition with WCAG AA compliance</p>
              <p className="text-neutral-400">→ Injected 0 dependencies, standard Tailwind CSS v4</p>
            </div>
          </div>
        </div>

        {/* Metric Highlight Card (Col span 1) */}
        <div className="group relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 p-8 transition-all hover:border-neutral-700">
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                02 / Real-time Audit
              </span>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
                99.8%
              </h3>
              <p className="text-xs text-neutral-400 uppercase tracking-wider">
                First-Pass Visual Cohesion
              </p>
            </div>
            <div className="mt-6 border-t border-neutral-800/80 pt-4">
              <p className="text-sm text-neutral-400">
                Automated heuristics eliminate contrast errors and broken responsive breakpoints before commit.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Feature Card */}
        <div className="group relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 p-8 transition-all hover:border-neutral-700">
          <div className="relative z-10">
            <span className="text-xs font-medium uppercase tracking-wider text-purple-400">
              03 / Design Tokens
            </span>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-white">
              Mathematical Spacing
            </h3>
            <p className="mt-2 text-sm text-neutral-400">
              Strict 8pt rhythm guarantees visual balance across responsive viewports.
            </p>
          </div>
        </div>

        {/* Full-width Wide Feature Card (Col span 2) */}
        <div className="group relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 p-8 transition-all hover:border-neutral-700 md:col-span-2">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-amber-400">
                04 / Framework Agnostic
              </span>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
                Works with any modern tech stack
              </h3>
              <p className="mt-2 max-w-lg text-sm text-neutral-400">
                Tailwind CSS v4, Next.js 15, Vite, Astro, or standard React. Zero vendor lock-in.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs font-mono text-neutral-300">React 19</span>
              <span className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs font-mono text-neutral-300">Next.js 15</span>
              <span className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs font-mono text-neutral-300">Tailwind v4</span>
              <span className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs font-mono text-neutral-300">MCP SDK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BentoGrid;
