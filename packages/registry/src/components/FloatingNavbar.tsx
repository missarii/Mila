"use client";

import React, { useState, useEffect } from "react";

interface NavItem {
  label: string;
  href: string;
}

interface FloatingNavbarProps {
  brandName?: string;
  items?: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
}

export function FloatingNavbar({
  brandName = "Mila",
  items = [
    { label: "Components", href: "#components" },
    { label: "Rules", href: "#rules" },
    { label: "MCP Server", href: "#mcp" },
    { label: "Docs", href: "#docs" },
  ],
  ctaLabel = "Connect Agent",
  ctaHref = "#connect",
}: FloatingNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center p-4">
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-3 transition-all duration-300 ${
          scrolled
            ? "border border-neutral-800 bg-neutral-950/80 shadow-2xl backdrop-blur-md"
            : "border border-neutral-800/40 bg-neutral-900/40 backdrop-blur-sm"
        }`}
      >
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white font-bold text-neutral-950 text-xs">
            M
          </div>
          <span className="font-semibold tracking-tight text-white">{brandName}</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-medium text-neutral-400 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href={ctaHref}
            className="hidden sm:inline-flex rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-neutral-950 transition-all hover:bg-neutral-200 active:scale-95"
          >
            {ctaLabel}
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 rounded-2xl border border-neutral-800 bg-neutral-950/95 p-6 backdrop-blur-xl md:hidden z-50">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-neutral-300 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-xs font-semibold text-neutral-950"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
export default FloatingNavbar;
