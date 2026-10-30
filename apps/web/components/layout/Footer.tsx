"use client";

import Link from "next/link";
import { Github, X, Mail, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-400" aria-hidden="true" />
            <span className="font-bold tracking-tight text-white">
              Mila<span className="text-emerald-400">Gallery</span>
            </span>
          </div>
          <p className="max-w-xs text-neutral-500 text-sm leading-relaxed hidden lg:block">
            The design reference library for apps and sites — built with Mila's UI/UX intelligence
            system, 3D animations, open-source assets, and free icons.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-neutral-400 hover:text-white transition-colors" aria-label="Twitter">
              <X className="h-5 w-5" />
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-sm">
          <div>
            <h3 className="mb-4 font-semibold text-white">Products</h3>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="#" className="hover:text-white transition-colors">Apps</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Sites</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Screens</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Flows</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Animations</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">UI Elements</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-white">Resources</h3>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="#" className="hover:text-white transition-colors">Explore Colors</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Glossary</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Help center</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-white">Company</h3>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-white">Mila Intelligence</h3>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="#mcp" className="hover:text-white transition-colors">MCP Server</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Component Registry</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Design Rules</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Review Engine</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Mila Gallery. MIT License.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-neutral-300">Privacy</Link>
            <Link href="#" className="hover:text-neutral-300">Terms</Link>
            <Link href="#" className="hover:text-neutral-300">Copyright</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}