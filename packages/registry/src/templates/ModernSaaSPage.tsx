"use client";

import React from "react";
import { FloatingNavbar } from "../components/FloatingNavbar";
import { HeroGeometric } from "../components/HeroGeometric";
import { BentoGrid } from "../components/BentoGrid";
import { PricingMatrix } from "../components/PricingMatrix";

export function ModernSaaSPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-neutral-800 selection:text-white">
      {/* 1. Header Navigation */}
      <FloatingNavbar
        brandName="Mila"
        items={[
          { label: "Features", href: "#features" },
          { label: "Architecture", href: "#architecture" },
          { label: "Pricing", href: "#pricing" },
        ]}
        ctaLabel="Connect MCP"
        ctaHref="#get-started"
      />

      {/* 2. Hero Section */}
      <HeroGeometric
        badgeText="Mila Intelligence v0.1 • Agent Ready"
        title="Stop shipping generic"
        highlightedText="AI-generated slop"
        description="Equip your AI coding agents with production design tokens, mathematical spacing scales, and instant heuristic visual reviews."
        primaryCtaText="Install via MCP"
        primaryCtaLink="#get-started"
        secondaryCtaText="Browse Component Library"
        secondaryCtaLink="#features"
      />

      {/* 3. Bento Features Showcase */}
      <section id="features" className="relative border-t border-neutral-900 bg-neutral-950 py-12">
        <BentoGrid />
      </section>

      {/* 4. Pricing Section */}
      <section id="pricing" className="relative border-t border-neutral-900 bg-neutral-950 py-12">
        <PricingMatrix />
      </section>

      {/* 5. Minimalist Production Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-12 text-center text-xs text-neutral-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Mila AI UI Intelligence. Built for autonomous coding agents.</p>
        </div>
      </footer>
    </div>
  );
}
export default ModernSaaSPage;
