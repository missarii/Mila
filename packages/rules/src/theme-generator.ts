export interface MilaTheme {
  id: string;
  name: string;
  description: string;
  tokens: {
    canvas: string;
    surface: string;
    surfaceElevated: string;
    border: string;
    borderHighlight: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    accent: string;
    accentHover: string;
    accentGlow: string;
  };
  tailwindCssVariables: string;
}

export const presetThemes: Record<string, MilaTheme> = {
  "electric-indigo": {
    id: "electric-indigo",
    name: "Electric Indigo (HorizonX Modern)",
    description: "Sleek obsidian canvas with sharp indigo highlights and subtle blue glow.",
    tokens: {
      canvas: "#09090b",
      surface: "#121215",
      surfaceElevated: "#18181c",
      border: "#27272a",
      borderHighlight: "#3f3f46",
      textPrimary: "#fafafa",
      textSecondary: "#a1a1aa",
      textMuted: "#71717a",
      accent: "#6366f1",
      accentHover: "#4f46e5",
      accentGlow: "rgba(99, 102, 241, 0.25)",
    },
    tailwindCssVariables: `@theme {
  --color-canvas: #09090b;
  --color-surface: #121215;
  --color-surface-elevated: #18181c;
  --color-border-subtle: #27272a;
  --color-border-highlight: #3f3f46;
  --color-text-primary: #fafafa;
  --color-text-secondary: #a1a1aa;
  --color-accent: #6366f1;
  --color-accent-glow: rgba(99, 102, 241, 0.25);
}`,
  },
  "cyber-emerald": {
    id: "cyber-emerald",
    name: "Cyber Emerald (Fintech & Data)",
    description: "Deep neutral canvas with emerald-accented badges and ambient green energy.",
    tokens: {
      canvas: "#060808",
      surface: "#0d1211",
      surfaceElevated: "#131b19",
      border: "#1d2825",
      borderHighlight: "#2e3f3b",
      textPrimary: "#f0fdf4",
      textSecondary: "#86efac",
      textMuted: "#4ade80",
      accent: "#10b981",
      accentHover: "#059669",
      accentGlow: "rgba(16, 185, 129, 0.25)",
    },
    tailwindCssVariables: `@theme {
  --color-canvas: #060808;
  --color-surface: #0d1211;
  --color-surface-elevated: #131b19;
  --color-border-subtle: #1d2825;
  --color-border-highlight: #2e3f3b;
  --color-text-primary: #f0fdf4;
  --color-text-secondary: #86efac;
  --color-accent: #10b981;
  --color-accent-glow: rgba(16, 185, 129, 0.25);
}`,
  },
  "obsidian-mono": {
    id: "obsidian-mono",
    name: "Obsidian Monochrome (Minimalist Devtool)",
    description: "Pure grayscale minimalism with high-contrast pure white CTAs.",
    tokens: {
      canvas: "#080808",
      surface: "#111111",
      surfaceElevated: "#1a1a1a",
      border: "#262626",
      borderHighlight: "#404040",
      textPrimary: "#ffffff",
      textSecondary: "#d4d4d4",
      textMuted: "#737373",
      accent: "#ffffff",
      accentHover: "#e5e5e5",
      accentGlow: "rgba(255, 255, 255, 0.15)",
    },
    tailwindCssVariables: `@theme {
  --color-canvas: #080808;
  --color-surface: #111111;
  --color-surface-elevated: #1a1a1a;
  --color-border-subtle: #262626;
  --color-border-highlight: #404040;
  --color-text-primary: #ffffff;
  --color-text-secondary: #d4d4d4;
  --color-accent: #ffffff;
  --color-accent-glow: rgba(255, 255, 255, 0.15);
}`,
  },
  "warm-editorial": {
    id: "warm-editorial",
    name: "Warm Editorial Stone (Luxury & Creators)",
    description: "Refined warm stone canvas with copper and terracotta accents.",
    tokens: {
      canvas: "#0c0a09",
      surface: "#1c1917",
      surfaceElevated: "#292524",
      border: "#44403c",
      borderHighlight: "#57534e",
      textPrimary: "#fafaf9",
      textSecondary: "#d6d3d1",
      textMuted: "#a8a29e",
      accent: "#f97316",
      accentHover: "#ea580c",
      accentGlow: "rgba(249, 115, 22, 0.2)",
    },
    tailwindCssVariables: `@theme {
  --color-canvas: #0c0a09;
  --color-surface: #1c1917;
  --color-surface-elevated: #292524;
  --color-border-subtle: #44403c;
  --color-border-highlight: #57534e;
  --color-text-primary: #fafaf9;
  --color-text-secondary: #d6d3d1;
  --color-accent: #f97316;
  --color-accent-glow: rgba(249, 115, 22, 0.2);
}`,
  },
};

export function generateTheme(presetOrKeyword: string): MilaTheme {
  const normalized = presetOrKeyword.toLowerCase().trim();
  if (presetThemes[normalized]) {
    return presetThemes[normalized];
  }

  // Keyword matchers
  if (normalized.includes("green") || normalized.includes("emerald") || normalized.includes("crypto") || normalized.includes("fintech")) {
    return presetThemes["cyber-emerald"];
  }
  if (normalized.includes("mono") || normalized.includes("black") || normalized.includes("dev")) {
    return presetThemes["obsidian-mono"];
  }
  if (normalized.includes("warm") || normalized.includes("stone") || normalized.includes("orange")) {
    return presetThemes["warm-editorial"];
  }

  // Default to electric indigo
  return presetThemes["electric-indigo"];
}
