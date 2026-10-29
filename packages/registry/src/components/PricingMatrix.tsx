"use client";

import React, { useState } from "react";

interface PricingPlan {
  name: string;
  badge?: string;
  description: string;
  priceMonthly: number;
  priceAnnually: number;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Ideal for indie vibe-coders and solo developers building side projects.",
    priceMonthly: 0,
    priceAnnually: 0,
    features: [
      "Access to core Mila Registry",
      "Mila MCP Server (Local stdio)",
      "Essential UI/UX design rules",
      "Community GitHub support",
    ],
    ctaText: "Start Free",
  },
  {
    name: "Pro Agentic",
    badge: "Most Popular",
    description: "For teams using Cursor, Claude Code, and Antigravity in production.",
    priceMonthly: 29,
    priceAnnually: 24,
    features: [
      "All 30+ signature components",
      "Full layout page templates",
      "Real-time Mila Review / Audit MCP tool",
      "Remote hosted MCP stream endpoint",
      "Custom brand design token injection",
      "Priority agent support",
    ],
    highlighted: true,
    ctaText: "Upgrade to Pro",
  },
  {
    name: "Team & Enterprise",
    description: "Custom design systems and private component registries for engineering orgs.",
    priceMonthly: 99,
    priceAnnually: 82,
    features: [
      "Private internal MCP registry",
      "Custom company Figma-to-code rules",
      "SOC-2 compliant agent audit logging",
      "Dedicated Slack/Discord channel",
    ],
    ctaText: "Contact Sales",
  },
];

export function PricingMatrix() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          Predictable pricing for builders
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-400">
          Supercharge your AI coding workflow with zero lock-in. Open-source core forever.
        </p>

        {/* Billing Toggle */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className={`text-xs font-medium ${!isAnnual ? "text-white" : "text-neutral-500"}`}>
            Monthly
          </span>
          <button
            type="button"
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-neutral-700 bg-neutral-900 transition-colors duration-200 ease-in-out focus:outline-none"
            role="switch"
            aria-checked={isAnnual}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                isAnnual ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className={`text-xs font-medium ${isAnnual ? "text-white" : "text-neutral-500"}`}>
            Annually <span className="text-emerald-400 font-semibold">(Save 20%)</span>
          </span>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {defaultPlans.map((plan) => {
          const price = isAnnual ? plan.priceAnnually : plan.priceMonthly;
          return (
            <div
              key={plan.name}
              className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all ${
                plan.highlighted
                  ? "border-2 border-indigo-500/80 bg-neutral-950 shadow-2xl shadow-indigo-500/10"
                  : "border border-neutral-800 bg-neutral-950 hover:border-neutral-700"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border border-indigo-500/50 bg-indigo-600 px-3 py-0.5 text-xs font-semibold text-white">
                  {plan.badge}
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="mt-2 text-xs text-neutral-400 min-h-[32px]">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-white">${price}</span>
                  <span className="text-xs text-neutral-500">/month</span>
                </div>

                <ul className="mt-8 space-y-3 border-t border-neutral-800/80 pt-6 text-xs text-neutral-300">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <svg className="h-4 w-4 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <button
                  type="button"
                  className={`w-full rounded-xl py-2.5 text-xs font-semibold transition-all active:scale-[0.98] ${
                    plan.highlighted
                      ? "bg-white text-neutral-950 hover:bg-neutral-200"
                      : "border border-neutral-800 bg-neutral-900 text-white hover:bg-neutral-800"
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default PricingMatrix;
