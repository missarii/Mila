"use client";

import Image from "next/image";
import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "./cn";

interface ImageFromUrlProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackColor?: string;
  priority?: boolean;
}

/**
 * Renders images from open-source internet URLs (Lorem Picsum / Unsplash source).
 * Falls back to a neutral SVG placeholder if the image fails to load.
 */
export function ImageFromUrl({
  src,
  alt,
  width,
  height,
  className = "",
  fallbackColor = "neutral-800",
  priority = false,
}: ImageFromUrlProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={cn(
          "flex h-full w-full flex-col items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900/50",
          className,
        )}
        role="img"
        aria-label={alt}
      >
        <ImageIcon className="mb-2 h-8 w-8 text-neutral-500" aria-hidden="true" />
        <p className="text-xs text-neutral-500">Image unavailable</p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("rounded-2xl", className)}
      priority={priority}
      sizes="(max-width: 768px) 100vw, 800px"
      onError={() => setError(true)}
      placeholder="blur"
      blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%230f0f0f' width='100%25' height='100%25'/%3E%3C/svg%3E"
    />
  );
}