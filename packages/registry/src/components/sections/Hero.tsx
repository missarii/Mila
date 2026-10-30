"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Zap } from "lucide-react";
import Link from "next/link";
import { ParticleWave3D } from "../ui/ParticleWave3D";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-neutral-950 pt-20 pb-24 sm:pt-32 lg:pb-32">
      {/* 3D animated particle background */}
      <div className="absolute inset-0 -z-10">
        <ParticleWave3D className="inset-0 h-full w-full" />
        {/* Ambient geometric spotlights (Mila high-craft surfaces) */}
        <div
          className="absolute inset-x-0 -top-32 -z-10 transform-gpu overflow-hidden blur-[100px] sm:-top-48"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-14rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-500/20 to-emerald-500/10 opacity-40"
            style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
          />
        </div>
        <div
          className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_50%_20%,rgba(16,185,129,0.06),transparent_50%)] -z-10"
          aria-hidden="true"
        />
      </div>

      <div className="mx-auto max-w-4xl text-center px-6 sm:px-8 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 inline-flex items-center gap-x-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-4 py-1.5 text-xs font-semibold text-neutral-300 backdrop-blur-md transition-colors hover:border-neutral-600"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Mila UI/UX Intelligence • Design Gallery</span>
          <span className="text-neutral-500" aria-hidden="true">→</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          The design reference for{" "}
          <span className="bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-400 bg-clip-text text-transparent">
            apps and sites
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg"
        >
          Browse shipped mobile and web screens, flows, animations, and UI elements. All images render from open-source
          internet URLs, with 3D motion backgrounds and free SVG icons throughout.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/browse"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-neutral-950 shadow-lg shadow-white/10 transition-all hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
          >
            <ArrowRight className="h-4 w-4 mr-2" aria-hidden="true" />
            Browse the gallery
          </Link>
          <Link
            href="#3d-showcase"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/80 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:scale-[0.98]"
          >
            <Play className="h-4 w-4 mr-2" aria-hidden="true" />
            3D animation showcase
          </Link>
        </motion.div>
      </div>
    </section>
  );
}