# Mila Color Systems & Aesthetic Direction

A major problem with AI-generated interfaces is the "AI Slop Palette": aggressive purple/cyan gradients with washed-out, illegible text. Mila provides intentional, high-craft color architectures.

## 1. The 60-30-10 Color Architecture
* **60% Dominant Base:** Neutral backdrop and structural surfaces (`bg-neutral-950` / `bg-neutral-900` for dark, or `bg-white` / `bg-neutral-50` for light).
* **30% Secondary Structure:** Borders, elevated cards, inputs, subtle dividers (`border-neutral-800`, `bg-neutral-900/60`, `bg-neutral-100`).
* **10% Intentional Accent:** Singular accent color for primary actions, badges, and focus rings (e.g. Electric Indigo, Emerald, Amber, or Pure White-on-Dark).

## 2. Standard Curated Palettes for AI Agents

### Aesthetic A: Sleek Obsidian (Modern Devtool & AI SaaS)
- Canvas: `#0a0a0b` (`bg-neutral-950`)
- Elevated Surface: `#141416` (`bg-neutral-900/80` with backdrop-blur)
- Border: `#26262b` (`border-neutral-800`)
- Subtle Border Highlight: `#3f3f46` (`border-neutral-700/50`)
- Primary Text: `#f4f4f5` (`text-neutral-100`)
- Muted Text: `#a1a1aa` (`text-neutral-400`)
- Accent Highlight: `#3b82f6` (Clean Royal Blue) or `#10b981` (Emerald)

### Aesthetic B: Warm Editorial (Fintech, Creator Tools, Knowledge Apps)
- Canvas: `#faf9f6` (`bg-stone-50`)
- Elevated Surface: `#ffffff` (`bg-white` with `shadow-sm`)
- Border: `#e7e5e4` (`border-stone-200`)
- Primary Text: `#1c1917` (`text-stone-900`)
- Muted Text: `#78716c` (`text-stone-500`)
- Accent Highlight: `#ea580c` (Burnt Orange) or `#0f766e` (Deep Teal)

## 3. Strict Rules for AI Agents
1. **Never use raw `#8b5cf6` to `#ec4899` gradient buttons.** If gradients are used, keep them subtle and ambient (e.g. `bg-gradient-to-b from-white/10 to-transparent`).
2. **Accessible Contrast (WCAG AA):**
   - Headings must achieve at least 4.5:1 contrast against background.
   - Body text must achieve at least 4.5:1 contrast.
   - Never use `text-zinc-600` on a `bg-zinc-950` dark background.
3. **Borders define structure, not harsh shadows:** Modern craft uses thin, subtle borders (`border border-neutral-800/80`) paired with tiny or medium diffused shadows (`shadow-sm` or `shadow-2xl shadow-black/40`), never heavy drop-shadows without borders.
