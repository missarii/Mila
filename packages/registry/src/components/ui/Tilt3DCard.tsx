"use client";

import React, { useRef, useState, type MouseEvent } from "react";
import { cn } from "./cn";

interface Tilt3DCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  glareOpacity?: number;
  scaleOnHover?: number;
  disabled?: boolean;
}

export function Tilt3DCard({
  children,
  className = "",
  maxTilt = 12,
  perspective = 1000,
  glareOpacity = 0.15,
  scaleOnHover = 1.02,
  disabled = false,
  ...props
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: "transform 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99)",
  });
  const [glareStyle, setGlareStyle] = useState({
    opacity: 0,
    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)",
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const x = (e.clientX - rect.left - width / 2) / (width / 2);
    const y = (e.clientY - rect.top - height / 2) / (height / 2);

    const rotateX = -y * maxTilt;
    const rotateY = x * maxTilt;

    const glareX = ((e.clientX - rect.left) / width) * 100;
    const glareY = ((e.clientY - rect.top) / height) * 100;

    setTransformStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scaleOnHover}, ${scaleOnHover}, 1)`,
      transition: "transform 0.08s ease-out",
    });

    setGlareStyle({
      opacity: glareOpacity,
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, transparent 70%)`,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: "transform 0.5s cubic-bezier(0.03, 0.98, 0.52, 0.99)",
    });
    setGlareStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        ...transformStyle,
      }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-sm p-6 shadow-2xl transition-all duration-200 active:scale-[0.99]",
        className,
      )}
      {...props}
    >
      <div className="relative z-10" style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
        style={{
          ...glareStyle,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
export default Tilt3DCard;