# Mila Typography Guidelines for AI Coding Agents

Typography is 80% of interface quality. When typography fails, the entire application looks amateur.

## 1. Type Scale & Hierarchy
Always enforce a mathematically harmonious type scale:

| Level | Size | Tailwind Class | Line Height | Tracking | Recommended Weight | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Display | 48px–64px | `text-5xl md:text-6xl` | `leading-[1.1]` | `tracking-tight` | `font-extrabold` / `font-bold` | Hero landing headlines |
| H1 | 36px–40px | `text-3xl md:text-4xl` | `leading-[1.2]` | `tracking-tight` | `font-bold` | Page titles, primary section headers |
| H2 | 28px–30px | `text-2xl md:text-3xl` | `leading-[1.25]` | `tracking-tight` | `font-semibold` | Subsections, Bento card titles |
| H3 | 20px–22px | `text-xl` | `leading-[1.3]` | `tracking-normal` | `font-semibold` | Modal headers, card titles |
| Body Large | 18px | `text-lg` | `leading-relaxed` | `tracking-normal` | `font-normal` / `font-medium` | Lead paragraphs, hero subtext |
| Body Base | 15px–16px | `text-base` | `leading-relaxed` | `tracking-normal` | `font-normal` | Standard text, descriptions |
| Small / Caption| 13px–14px | `text-sm` | `leading-normal` | `tracking-normal` | `font-medium` | Badges, form labels, secondary meta |
| Micro / Overline| 11px–12px| `text-xs` | `leading-none` | `tracking-wider` | `font-semibold uppercase`| Section tags, category indicators |

## 2. Core Rules for AI Agents
1. **Never use more than 2 font families:**
   - One high-quality Sans (e.g. Geist, Inter, Plus Jakarta Sans, DM Sans).
   - Optional Monospace (Geist Mono, JetBrains Mono) for code, metrics, and tokens.
2. **Always tighten display tracking:** Large headings (`text-4xl` and above) MUST have `tracking-tight` or `tracking-tighter`. Standard tracking on large text looks detached.
3. **Always loosen uppercase overlines:** When using `uppercase text-xs`, always pair with `tracking-wider` or `tracking-widest`.
4. **Never use pure black or pure white for body text:**
   - Dark mode: Use `text-neutral-100` for titles, `text-neutral-400` for body. Never `text-neutral-600` (causes illegible contrast).
   - Light mode: Use `text-neutral-900` for titles, `text-neutral-600` for body.
5. **Set max line width for readability:** Paragraphs must be constrained to `max-w-xl` or `max-w-2xl` (`60–75` characters per line). Never let body text span full width across a 1400px container.
