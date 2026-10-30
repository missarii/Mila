"use client";

import Link from "next/link";
import { Heart, Tag } from "lucide-react";
import { cn } from "./cn";
import { ImageFromUrl } from "./ImageFromUrl";
import { Tilt3DCard } from "./Tilt3DCard";
import { CategoryBadge } from "./CategoryBadge";
import type { Screen } from "@/lib/data";

interface ScreenCardProps {
  screen: Screen;
}

export function ScreenCard({ screen }: ScreenCardProps) {
  return (
    <Tilt3DCard className="group h-full cursor-pointer" maxTilt={8}>
      <Link
        href={`/screen/${screen.id}`}
        className="block h-full"
      >
        <div className="relative overflow-hidden rounded-2xl bg-neutral-900 mb-4 aspect-[3/4]">
          <ImageFromUrl
            src={screen.image}
            alt={`${screen.title} — ${screen.app} design screen`}
            width={450}
            height={600}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            priority={true}
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <CategoryBadge category={screen.category} className="text-[10px] px-2.5 py-1" />
            <button
              aria-label={`Like ${screen.title}`}
              className="p-2 rounded-lg bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-neutral-100 group-hover:text-emerald-400 transition-colors">
              {screen.title}
            </h3>
            <span className="text-xs font-medium text-emerald-400">
              {screen.likes.toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-neutral-400 line-clamp-1">{screen.app}</p>
          <div className="flex items-center gap-1">
            <Tag className="h-3 w-3 text-neutral-500" aria-hidden="true" />
            <span className="text-xs text-neutral-500">{screen.platform}</span>
            <span className="text-[1px] text-neutral-700">·</span>
            <span className="text-xs text-neutral-500">{screen.tags.join(" · ")}</span>
          </div>
        </div>
      </Link>
    </Tilt3DCard>
  );
}