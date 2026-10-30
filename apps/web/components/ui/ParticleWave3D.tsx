"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "./cn";

interface ParticleWave3DProps {
  particleColor?: string;
  lineColor?: string;
  particleCountX?: number;
  particleCountY?: number;
  className?: string;
  speed?: number;
}

export function ParticleWave3D({
  particleColor = "rgba(99, 102, 241, 0.5)", // indigo-500 soft
  lineColor = "rgba(16, 185, 129, 0.1)", // emerald-500 soft
  particleCountX = 30,
  particleCountY = 22,
  className = "",
  speed = 0.02,
}: ParticleWave3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / canvas.width - 0.5) * 2;
      targetMouseY = ((e.clientY - rect.top) / canvas.height - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const separation = 55;
    const fov = 400;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      step += speed;

      const projectedPoints: { x: number; y: number; scale: number; alpha: number }[][] = [];

      for (let ix = 0; ix < particleCountX; ix++) {
        projectedPoints[ix] = [];
        for (let iy = 0; iy < particleCountY; iy++) {
          const x3d = (ix - particleCountX / 2) * separation;
          const z3d = (iy - particleCountY / 2) * separation + 600;
          const y3d =
            Math.sin((ix + step) * 0.3) * 55 +
            Math.cos((iy + step) * 0.4) * 45 +
            mouseY * 45;

          const cosRot = Math.cos(mouseX * 0.4);
          const sinRot = Math.sin(mouseX * 0.4);
          const rotX = x3d * cosRot - z3d * sinRot;
          const rotZ = x3d * sinRot + z3d * cosRot + 700;

          const scale = fov / (fov + rotZ);
          const x2d = canvas.width / 2 + rotX * scale;
          const y2d = canvas.height / 2 + (y3d + 140) * scale;
          const alpha = Math.max(0.1, Math.min(1, scale * 1.8));

          projectedPoints[ix]![iy] = { x: x2d, y: y2d, scale, alpha };
        }
      }

      ctx.lineWidth = 1;
      for (let ix = 0; ix < particleCountX; ix++) {
        for (let iy = 0; iy < particleCountY; iy++) {
          const p = projectedPoints[ix]![iy]!;

          if (iy < particleCountY - 1) {
            const nextY = projectedPoints[ix]![iy + 1]!;
            ctx.strokeStyle = lineColor;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(nextY.x, nextY.y);
            ctx.stroke();
          }

          if (ix < particleCountX - 1) {
            const nextX = projectedPoints[ix + 1]![iy]!;
            ctx.strokeStyle = lineColor;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(nextX.x, nextX.y);
            ctx.stroke();
          }

          const radius = Math.max(0.8, p.scale * 3);
          ctx.fillStyle = particleColor;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [particleColor, lineColor, particleCountX, particleCountY, speed]);

  return (
    <div
      className={cn("relative h-[600px] w-full overflow-hidden", className)}
      aria-label="Interactive 3D particle background"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full pointer-events-none select-none" />
    </div>
  );
}
export default ParticleWave3D;