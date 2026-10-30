"use client";

import Link from "next/link";
import { cn } from "../ui/cn";
import { CATEGORIES } from "@/lib/data";
import {
  LayoutGrid,
  Monitor,
  GitBranch,
  Play,
  Pencil,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  apps: LayoutGrid,
  sites: Monitor,
  screens: LayoutGrid,
  flows: GitBranch,
  animations: Play,
  "ui-elements": Pencil,
};

export function Categories() {
  return (
    <section className="bg-neutral-950/50 border-y border-neutral-800 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">One library for all your needs</h2>
            <p className="mt-4 text-neutral-400 max-w-2xl">
              Explore apps, sites, screens, flows, animations, and UI elements — updated weekly.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.key] ?? LayoutGrid;
            return (
              <Link
                key={cat.key}
                href={`/browse?category=${cat.key}`}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 lg:p-8 backdrop-blur-sm transition-all hover:border-neutral-600 hover:bg-neutral-800/80 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-neutral-400",
                  cat.count === 0 ? "opacity-50 pointer-events-none" : "",
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-neutral-400 group-hover:text-emerald-400 mb-4 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-neutral-200 group-hover:text-white transition-colors">
                  {cat.label}
                </h3>
                <p className="mt-1 text-xs text-neutral-500">{cat.count} screens</p>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}