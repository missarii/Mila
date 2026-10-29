# Mila Spacing & Layout Architecture

Consistent spatial cadence separates professional UI from clumsy agent-generated layouts.

## 1. The 4px / 8px Spatial Rhythm
All spacing in padding, margins, and gaps must follow the 8-point grid:
- `p-1` (4px): Fine badge padding, micro gaps.
- `p-2` (8px): Icon button padding, dense dropdown items.
- `p-3` (12px): Standard button padding, input field padding.
- `p-4` (16px): Card internal padding, small list item spacing.
- `p-6` (24px): Standard Bento card padding, modal content padding.
- `p-8` (32px): Large section padding, hero card padding.
- `gap-4` to `gap-8`: Standard grid and flex spacing.
- `py-16 md:py-24`: Standard section vertical padding on landing pages.

## 2. Container Rules
1. **Never let content float unboundedly across ultra-wide monitors:**
   - Always wrap content in `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`.
   - For focused dashboards or readouts, use `max-w-5xl` or `max-w-6xl`.
2. **Bento Grid Rules:**
   - Always use CSS Grid with `grid-cols-1 md:grid-cols-3` or `grid-cols-1 md:grid-cols-4`.
   - Feature items must span multiple columns explicitly: `md:col-span-2` or `md:row-span-2`.
   - Maintain uniform internal padding across all cards in the grid (`p-6` or `p-8`).
   - Cards must share matching border radiuses (typically `rounded-2xl` or `rounded-3xl`).
3. **Mobile First Responsive Guardrails:**
   - Every grid MUST start with `grid-cols-1` on mobile.
   - Every horizontal navbar MUST collapse into a mobile menu or floating drawer on `< 768px`.
   - Avoid fixed widths like `w-[500px]`. Always use `w-full max-w-[500px]`.
