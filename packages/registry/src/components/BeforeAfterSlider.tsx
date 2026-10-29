"use client";

import React, { useState, useRef, useCallback, MouseEvent, TouchEvent } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialSliderPosition?: number; // 0 to 100
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before comparison view",
  afterAlt = "After comparison view",
  beforeLabel = "Original",
  afterLabel = "Enhanced",
  initialSliderPosition = 50,
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(initialSliderPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !e.touches[0]) return;
    handleMove(e.touches[0].clientX);
  };

  const startDrag = () => setIsDragging(true);
  const stopDrag = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseUp={stopDrag}
      onTouchEnd={stopDrag}
      onMouseLeave={stopDrag}
      className={`relative select-none overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl ${className}`}
      style={{ touchAction: "none" }}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt={afterAlt}
        className="block h-full w-full object-cover"
        draggable={false}
      />
      <span className="absolute top-4 right-4 z-10 rounded-full border border-neutral-700/60 bg-black/60 px-3 py-1 text-xs font-semibold tracking-wider text-neutral-300 backdrop-blur-md">
        {afterLabel}
      </span>

      {/* Before Image (Clipped Foreground) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={beforeAlt}
          className="block h-full w-full object-cover"
          draggable={false}
        />
        <span className="absolute top-4 left-4 z-10 rounded-full border border-neutral-700/60 bg-black/60 px-3 py-1 text-xs font-semibold tracking-wider text-neutral-300 backdrop-blur-md">
          {beforeLabel}
        </span>
      </div>

      {/* Divider Bar & Handle */}
      <div
        className="absolute top-0 bottom-0 z-20 w-1 cursor-ew-resize bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.7)]"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      >
        <div className="absolute top-1/2 -left-3.5 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-700 bg-neutral-950 text-white shadow-lg transition-transform hover:scale-110 active:scale-95">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3m8-6l4 3-4 3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
export default BeforeAfterSlider;
