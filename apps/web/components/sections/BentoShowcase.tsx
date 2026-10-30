"use client";

import { motion } from "framer-motion";
import { cn } from "../ui/cn";
import { Terminal, BarChart3, Laptop, Zap, Database, Users } from "lucide-react";

const TILES = [
  { title: "Agent terminal", icon: Terminal, desc: "Live autonomous agent command stream.", color: "text-indigo-400" },
  { title: "Live metrics", icon: BarChart3, desc: "Real-time performance and conversion data.", color: "text-emerald-400" },
  { title: "Device preview", icon: Laptop, desc: "Responsive mobile and desktop viewports.", color: "text-blue-400" },
  { title: "Quick actions", icon: Zap, desc: "One-click import of any registered component.", color: "text-orange-400" },
  { title: "Asset library", icon: Database, desc: "Open-source images, SVGs, and icons.", color: "text-violet-400" },
  { title: "Team workspace", icon: Users, desc: "Shared design reviews and version history.", color: "text-pink-400" },
];

export function BentoShowcase() {
  return (
    <section className="bg-neutral-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Bento grid showcase</h2>
          <p className="mt-4 max-w-2xl text-neutral-400">
            Asymmetrical, high-craft layout with simulated agent terminal and live metrics — following the 8pt spatial
            grid.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          style={{ gridTemplateRows: "repeat(2, minmax(200px, 1fr))" }}
        >
          {TILES.map((tile, i) => {
            const isWide = i === 0 || i === 3;
            const isTall = i === 1 || i === 4;
            const Icon = tile.icon;
            return (
              <motion.div
                key={tile.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={cn(
                  "group relative rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 lg:p-8 backdrop-blur-sm hover:border-neutral-600 hover:bg-neutral-800/80 transition-all duration-300",
                  isWide ? "lg:col-span-2" : "",
                  isTall ? "lg:row-span-2" : "",
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800/50 mb-4">
                  <Icon className="h-5 w-5" style={{ color: "currentColor" }} />
                </div>
                <h3 className="font-semibold text-neutral-200">{tile.title}</h3>
                <p className="mt-1 text-sm text-neutral-500">{tile.desc}</p>
                <div
                  className={cn(
                    "absolute -right-3 -bottom-3 h-8 w-8 rounded-full bg-neutral-800/50 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                    tile.color,
                  )}
                >
                  <span className="text-[10px] font-medium">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}