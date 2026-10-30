"use client";

import { cn } from "@/components/ui/cn";
import { Crown, Check, Zap } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    description: "For individuals exploring design inspiration.",
    featured: false,
    features: ["600K+ screens", "Category browsing", "Open-source image URLs", "Community support"],
    cta: "Get started",
    ctaVariant: "outline",
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    description: "For professional designers and teams.",
    featured: true,
    features: [
      "600K+ screens",
      "Category browsing",
      "Open-source image URLs",
      "MCP server access",
      "3D animation assets",
      "Priority support",
    ],
    cta: "Start free trial",
    ctaVariant: "primary",
  },
  {
    name: "Team",
    price: "$49",
    period: "/mo per seat",
    description: "For design teams building world-class products.",
    featured: false,
    features: ["Everything in Pro", "Team workspaces", "Shared design reviews", "Version history", "SSO & admin controls", "Dedicated support"],
    cta: "Contact sales",
    ctaVariant: "outline",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="bg-neutral-950 py-24 sm:py-32 border-y border-neutral-800">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Simple, transparent pricing</h2>
          <p className="mt-4 max-w-2xl mx-auto text-neutral-400">
            Join for free. Upgrade to unlock MCP access, 3D animation assets, and team workspaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {PLANS.map((plan) => {
            const Featured = plan.featured ? (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full border border-neutral-600 bg-neutral-900 text-xs font-semibold text-neutral-200">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Most popular
              </div>
            ) : null;
            return (
              <div
                key={plan.name}
                className={cn(
                  "relative flex flex-col rounded-3xl border p-8 transition-all duration-300 hover:bg-neutral-900/50 hover:border-neutral-600",
                  plan.featured
                    ? "border-neutral-500/50 bg-neutral-900/40 ring-1 ring-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.10)] scale-105 z-10"
                    : "border-neutral-800 bg-neutral-900/60",
                )}
              >
                {Featured}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-sm font-medium text-neutral-500">{plan.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-500">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-neutral-400">
                      <Check className="h-4 w-4 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={cn(
                    "w-full rounded-xl px-6 py-3 text-sm font-semibold transition-all active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2",
                    plan.ctaVariant === "primary"
                      ? "bg-white text-neutral-950 shadow-lg shadow-white/10 hover:bg-neutral-100 focus-visible:outline-white"
                      : "border border-neutral-800 bg-neutral-900/80 text-neutral-200 hover:bg-neutral-800 hover:text-white focus-visible:outline-neutral-400",
                  )}
                >
                  {plan.cta}
                </button>
                {plan.featured && (
                  <p className="mt-4 text-xs text-neutral-500 text-center">
                    Includes Zapier, MCP, and 3D assets
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}