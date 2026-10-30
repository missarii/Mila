"use client";

import { motion } from "framer-motion";
import { cn } from "../ui/cn";
import { Tilt3DCard } from "../ui/Tilt3DCard";
import { ImageFromUrl } from "../ui/ImageFromUrl";
import { Code, Layers, RotateCw } from "lucide-react";

const DEMOS = [
  {
    title: "3D Tilt Cards",
    icon: RotateCw,
    iconColor: "text-indigo-400",
    image: "https://picsum.photos/500/600?image=129",
    alt: "3D tilt card with dynamic glare",
    desc: "Physics-driven perspective tilt cards with mouse-reactive glare and depth layers.",
  },
  {
    title: "Particle Wave Canvas",
    icon: Layers,
    iconColor: "text-emerald-400",
    image: "https://picsum.photos/500/600?image=74",
    alt: "60fps wireframe particle landscape",
    desc: "Canvas-rendered 3D wireframe particle field with cursor camera orbit.",
  },
  {
    title: "Interactive Code Blocks",
    icon: Code,
    iconColor: "text-blue-400",
    image: "https://picsum.photos/500/600?image=104",
    alt: "Syntax-highlighted code block card",
    desc: "Hover-lift code cards with syntax highlighting and copy-to-clipboard.",
  },
];

export function ThreeDShowcase() {
  return (
    <section id="3d-showcase" className="bg-neutral-950 py-24 sm:py-32 border-y border-neutral-800">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">3D animation showcase</h2>
            <p className="mt-4 max-w-xl text-neutral-400">
              GPU-accelerated CSS 3D and canvas motion built with Mila's motion standards. All assets render from
              open-source URLs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEMOS.map((demo) => (
            <motion.div
              key={demo.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative"
            >
              <Tilt3DCard className="h-full" maxTilt={10}>
                <div className="aspect-[5/6] overflow-hidden rounded-xl bg-neutral-900 mb-5">
                  <ImageFromUrl
                    src={demo.image}
                    alt={demo.alt}
                    width={500}
                    height={600}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-800">
                    <demo.icon className="h-4 w-4" style={{ color: "currentColor" }} />
                  </div>
                  <span className={cn(demo.iconColor, "ml-2 font-semibold text-neutral-300 hidden sm:inline")}>
                    {demo.iconColor.includes("indigo") ? "CSS 3D" : demo.iconColor.includes("emerald") ? "Canvas" : "UI"}
                  </span>
                </div>
                <h3 className="font-semibold text-neutral-100 mb-1">{demo.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{demo.desc}</p>
              </Tilt3DCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}