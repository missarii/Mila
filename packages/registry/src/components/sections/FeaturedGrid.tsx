"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ScreenCard } from "../ui/ScreenCard";
import { SectionHeader } from "../ui/SectionHeader";
import { SCREENS } from "@/lib/data";

export function FeaturedGrid() {
  const featured = SCREENS.slice(0, 6);
  return (
    <section className="bg-neutral-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <SectionHeader
          title="Featured screens"
          description="A curated sample of shipped mobile and web designs. Click any card to open the full view."
          href="/browse"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((screen) => (
            <ScreenCard key={screen.id} screen={screen} />
          ))}
        </div>

        <div className="mt-12 flex items-center justify-end">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/80 px-5 py-2.5 text-sm font-semibold text-neutral-200 backdrop-blur-sm transition-all hover:bg-neutral-800 hover:border-neutral-600 focus-visible:ring-2 focus-visible:ring-neutral-400"
          >
            View all screens <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}