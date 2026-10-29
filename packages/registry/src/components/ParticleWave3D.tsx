"use client";

import React, { useEffect, useRef } from "react";

interface ParticleWave3DProps {
  particleColor?: string;
  lineColor?: string;
  particleCountX?: number;
  particleCountY?: number;
  className?: string;
  speed?: number;
}

export function ParticleWave3D({
  particleColor = "rgba(147, 197, 253, 0.7)", // soft light blue
  lineColor = "rgba(59, 130, 246, 0.15)",
  particleCountX = 35,
  particleCountY = 25,
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

    // 3D Grid Parameters
    const separation = 45;
    const fov = 350; // Camera field of view / focal distance

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse damping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      step += speed;

      const projectedPoints: { x: number; y: number; scale: number; alpha: number }[][] = [];

      // Calculate 3D Wave positions
      for (let ix = 0; ix < particleCountX; ix++) {
        projectedPoints[ix] = [];
        for (let iy = 0; iy < particleCountY; iy++) {
          // World 3D coordinates
          const x3d = (ix - particleCountX / 2) * separation;
          const z3d = (iy - particleCountY / 2) * separation + 500; // Camera distance
          const y3d =
            Math.sin((ix + step) * 0.3) * 50 +
            Math.cos((iy + step) * 0.4) * 40 +
            (mouseY * 40);

          // Rotate around Y axis based on mouse
          const cosRot = Math.cos(mouseX * 0.4);
          const sinRot = Math.sin(mouseX * 0.4);
          const rotX = x3d * cosRot - z3d * sinRot;
          const rotZ = x3d * sinRot + z3d * cosRot + 600;

          // 3D Perspective Projection onto 2D Canvas
          const scale = fov / (fov + rotZ);
          const x2d = canvas.width / 2 + rotX * scale;
          const y2d = canvas.height / 2 + (y3d + 120) * scale;
          const alpha = Math.max(0.1, Math.min(1, scale * 1.8));

          projectedPoints[ix][iy] = { x: x2d, y: y2d, scale, alpha };
        }
      }

      // Draw Grid Lines connecting points
      ctx.lineWidth = 1;
      for (let ix = 0; ix < particleCountX; ix++) {
        for (let iy = 0; iy < particleCountY; iy++) {
          const p = projectedPoints[ix][iy];

          // Connect to next Y neighbor
          if (iy < particleCountY - 1) {
            const nextY = projectedPoints[ix][iy + 1];
            ctx.strokeStyle = lineColor;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(nextY.x, nextY.y);
            ctx.stroke();
          }

          // Connect to next X neighbor
          if (ix < particleCountX - 1) {
            const nextX = projectedPoints[ix + 1][iy];
            ctx.strokeStyle = lineColor;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(nextX.x, nextX.y);
            ctx.stroke();
          }

          // Draw Particle Node
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
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full pointer-events-none" />
    </div>
  );
}
export default ParticleWave3D;
