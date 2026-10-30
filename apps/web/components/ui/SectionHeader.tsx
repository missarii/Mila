"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "./cn";

interface SectionHeaderProps {
  title: string;
  description?: string;
  href?: string;
  label?: string;
}

export function SectionHeader({
  title,
  description,
  href,
  label = "View all",
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
      <div>
        {description && (
          <p className="text-xs uppercase font-semibold tracking-wider text-neutral-500 mb-1">
            {title.split(" ")[0]}
          </p>
        )}
        <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-neutral-400">{description}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/80 px-5 py-2.5 text-sm font-semibold text-neutral-200 backdrop-blur-sm transition-all hover:bg-neutral-800 hover:border-neutral-600 focus-visible:ring-2 focus-visible:ring-neutral-400 active:scale-[0.98]",
          )}
        >
          {label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}