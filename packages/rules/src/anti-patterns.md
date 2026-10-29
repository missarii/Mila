# Mila Anti-Patterns: The 10 "AI Slop" Mistakes to Avoid

AI coding tools frequently fall into recurring bad habits. Mila actively flags and corrects these:

1. **The Purple/Pink Gradient Cliche:**
   - *Bad:* AI defaults every button or header to `bg-gradient-to-r from-purple-500 to-pink-500`.
   - *Fix:* Use monochromatic solid surfaces (`bg-white text-black` or `bg-neutral-900 border border-neutral-700`) with subtle hover states.

2. **Arbitrary Pixel Chaos (Magic Numbers):**
   - *Bad:* `h-[387px] w-[542px] top-[17px] mt-[23px] text-[15px]`.
   - *Fix:* Stick to the standard Tailwind scale (`h-96`, `w-full max-w-lg`, `mt-6`, `text-sm`, `text-base`).

3. **Illegible Ghost Text:**
   - *Bad:* `text-gray-500` or `text-neutral-600` on dark backgrounds (`#0a0a0a`).
   - *Fix:* Use minimum `text-neutral-400` for secondary text and `text-neutral-200` for primary.

4. **Inconsistent Border Radius Soup:**
   - *Bad:* Outer card has `rounded-lg`, inner button has `rounded-full`, inner image has `rounded-3xl`.
   - *Fix:* Enforce concentric border radiuses: inner radius = outer radius - padding. Example: Outer container `rounded-2xl p-4`, inner element `rounded-xl`.

5. **Missing Keyboard & Focus Rings:**
   - *Bad:* Interactive buttons/links with `outline-none` and no focus indicators.
   - *Fix:* Always provide `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2`.

6. **Unresponsive Desktop-Only Grids:**
   - *Bad:* `className="flex flex-row gap-6"` or `className="grid grid-cols-3"` that breaks on iPhone screens.
   - *Fix:* `className="grid grid-cols-1 md:grid-cols-3 gap-6"`.

7. **Zero Micro-Interaction States:**
   - *Bad:* Static cards with no hover feedback, no cursor pointer, no subtle lift or border glow.
   - *Fix:* Add `transition-all duration-200 hover:border-neutral-700 hover:shadow-lg active:scale-[0.99]`.

8. **Missing Empty and Error States:**
   - *Bad:* AI only codes the "happy path" with mock data; if array is empty, UI renders a blank empty void.
   - *Fix:* Always include empty state illustrations, clear messaging, and a primary action trigger.

9. **Text Wall Without Scannability:**
   - *Bad:* 4 continuous paragraphs of hero text with zero visual anchors or bullet highlights.
   - *Fix:* One punchy headline, 2-line subtext, followed by interactive feature pills or metric badges.

10. **Unconstrained Content Sprawl:**
    - *Bad:* Elements expanding to 100vw on an ultrawide 34-inch monitor.
    - *Fix:* `max-w-7xl mx-auto` container with appropriate gutter padding.
