"use client";

import React, { useRef, useState, MouseEvent } from "react";

interface Tilt3DCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees
  perspective?: number; // perspective in px
  glareOpacity?: number; // max glare opacity (0 to 1)
  scaleOnHover?: number;
}

export function Tilt3DCard({
  children,
  className = "",
  maxTilt = 15,
  perspective = 1000,
  glareOpacity = 0.2,
  scaleOnHover = 1.03,
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
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized cursor coordinate (-1 to 1)
    const x = (e.clientX - rect.left - width / 2) / (width / 2);
    const y = (e.clientY - rect.top - height / 2) / (height / 2);

    // rotateX is inverted based on Y coordinate
    const rotateX = -y * maxTilt;
    const rotateY = x * maxTilt;

    // Glare position
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
      className={`relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 p-8 shadow-2xl ${className}`}
      {...props}
    >
      {/* 3D Depth Content Layer */}
      <div
        className="relative z-10"
        style={{
          transform: "translateZ(30px)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>

      {/* Dynamic 3D Glare Reflection */}
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
