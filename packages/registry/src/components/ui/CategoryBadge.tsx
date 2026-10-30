"use client";

import { cn } from "./cn";

const CATEGORY_STYLES: Record<string, string> = {
  apps: "bg-indigo-500/10 border-indigo-500/20 text-indigo-300",
  sites: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
  screens: "bg-blue-500/10 border-blue-500/20 text-blue-300",
  flows: "bg-violet-500/10 border-violet-500/20 text-violet-300",
  animations: "bg-orange-500/10 border-orange-500/20 text-orange-300",
  "ui-elements": "bg-neutral-500/10 border-neutral-500/20 text-neutral-300",
};

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export function CategoryBadge({ category, className = "" }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors hover:opacity-90",
        CATEGORY_STYLES[category] || CATEGORY_STYLES["ui-elements"],
        className,
      )}
    >
      {category}
    </span>
  );
}