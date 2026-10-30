"use client";

import { useState, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import Link from "next/link";
import { ScreenCard } from "@/components/ui/ScreenCard";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { CATEGORIES, SCREENS, getRelatedScreens, type ScreenCategory } from "@/lib/data";
import { cn } from "@/components/ui/cn";

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ScreenCategory | "all">("all");

  const filtered = useMemo(() => {
    return SCREENS.filter((screen) => {
      const matchesSearch =
        screen.title.toLowerCase().includes(search.toLowerCase()) ||
        screen.app.toLowerCase().includes(search.toLowerCase()) ||
        screen.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      const matchesCat = category === "all" || screen.category === category;
      return matchesSearch && matchesCat;
    });
  }, [search, category]);

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-12 sm:py-20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Browse gallery</h1>
            <p className="mt-2 text-neutral-400">
              {filtered.length} design screens across apps, sites, flows, animations, and UI elements.
            </p>
          </div>

          <div className="flex w-full lg:w-auto items-center gap-3">
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search screens, apps, tags…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 pl-10 pr-4 py-3 text-neutral-100 placeholder-neutral-500 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-500 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex w-full lg:w-auto gap-2 overflow-x-auto no-scrollbar pb-2">
              <button
                onClick={() => setCategory("all")}
                className={cn(
                  "flex-shrink-0 rounded-xl border px-4 py-2 text-sm font-medium transition-all",
                  category === "all"
                    ? "border-white bg-white text-neutral-950"
                    : "border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:border-neutral-600 hover:text-white",
                )}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  className={cn(
                    "flex-shrink-0 rounded-xl border px-4 py-2 text-sm font-medium transition-all",
                    category === cat.key
                      ? "border-white bg-white text-neutral-950"
                      : "border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:border-neutral-600 hover:text-white",
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="h-16 w-16 rounded-full bg-neutral-900/50 flex items-center justify-center mb-4 text-neutral-600">
              <Search className="h-8 w-8" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-semibold text-white">No results found</h2>
            <p className="mt-2 text-neutral-400 max-w-xs">
              Try adjusting your search or select a different category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((screen) => (
              <ScreenCard key={screen.id} screen={screen} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}