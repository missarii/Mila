/**
 * Mock design-inspiration data modeled after Mobbin.
 * All images are rendered from open-source internet URLs (Lorem Picsum / Unsplash source)
 * so no asset downloads or API keys are required.
 */

export type ScreenCategory = "apps" | "sites" | "screens" | "flows" | "animations" | "ui-elements";

export interface Screen {
  id: string;
  title: string;
  app: string;
  category: ScreenCategory;
  image: string; // open-source URL
  description: string;
  platform: "ios" | "android" | "web" | "macos";
  likes: number;
  tags: string[];
  createdAt: string;
}

const picsum = (id: number, w = 900, h = 1400) =>
  `https://picsum.photos/${w}/${h}?image=${id}`;

export const SCREENS: Screen[] = [
  {
    id: "scr-001",
    title: "Joyful Onboarding Flow",
    app: "Headspace",
    category: "screens",
    image: picsum(10, 900, 1400),
    description: "A calming onboarding carousel with soft gradients and progressive permission requests.",
    platform: "ios",
    likes: 1240,
    tags: ["onboarding", "wellness", "carousel"],
    createdAt: "2026-01-15",
  },
  {
    id: "scr-002",
    title: "Paywall That Converts",
    app: "Notion",
    category: "screens",
    image: picsum(22, 900, 1400),
    description: "Clean 3-tier pricing matrix with annual toggle and feature comparison.",
    platform: "web",
    likes: 980,
    tags: ["paywall", "pricing", "saas"],
    createdAt: "2026-02-03",
  },
  {
    id: "scr-003",
    title: "Finance Dashboard",
    app: "Sanctum",
    category: "apps",
    image: picsum(35, 1200, 800),
    description: "Dark-mode banking dashboard with live metrics and transaction list.",
    platform: "web",
    likes: 1560,
    tags: ["fintech", "dashboard", "banking"],
    createdAt: "2026-02-20",
  },
  {
    id: "scr-004",
    title: "KYC Verification Flow",
    app: "OKX",
    category: "flows",
    image: picsum(48, 900, 1400),
    description: "Step-by-step identity verification with camera capture and document upload.",
    platform: "ios",
    likes: 870,
    tags: ["kyc", "crypto", "verification"],
    createdAt: "2026-03-01",
  },
  {
    id: "scr-005",
    title: "Landing Hero Section",
    app: "Cursor",
    category: "sites",
    image: picsum(61, 1400, 900),
    description: "Bold typography hero with ambient gradient spotlight and dual CTA.",
    platform: "web",
    likes: 2100,
    tags: ["landing", "hero", "saas"],
    createdAt: "2026-03-10",
  },
  {
    id: "scr-006",
    title: "Animation Showcase",
    app: "Linear",
    category: "animations",
    image: picsum(74, 900, 900),
    description: "Micro-interactions and 3D motion cards with hover tilt and glare.",
    platform: "web",
    likes: 1780,
    tags: ["animation", "motion", "3d"],
    createdAt: "2026-03-18",
  },
  {
    id: "scr-007",
    title: "UI Element Library",
    app: "Figma",
    category: "ui-elements",
    image: picsum(83, 900, 900),
    description: "Buttons, inputs, toggles, and badges following the 8pt spatial grid.",
    platform: "web",
    likes: 1430,
    tags: ["ui-kit", "components", "design-system"],
    createdAt: "2026-03-25",
  },
  {
    id: "scr-008",
    title: "Bento Grid Profile",
    app: "Spotify",
    category: "sites",
    image: picsum(91, 1200, 800),
    description: "Asymmetrical bento grid with simulated agent terminal and live metrics.",
    platform: "web",
    likes: 1120,
    tags: ["bento", "profile", "music"],
    createdAt: "2026-04-01",
  },
  {
    id: "scr-009",
    title: "Before/After Slider",
    app: "Adobe",
    category: "ui-elements",
    image: picsum(104, 900, 900),
    description: "Interactive image comparison slider with pill tags and drag support.",
    platform: "web",
    likes: 760,
    tags: ["slider", "comparison", "photo"],
    createdAt: "2026-04-12",
  },
  {
    id: "scr-010",
    title: "Spotlight Card",
    app: "Raycast",
    category: "apps",
    image: picsum(116, 900, 900),
    description: "Cursor-tracking radial spotlight border glow effect for dark-mode cards.",
    platform: "macos",
    likes: 690,
    tags: ["card", "glow", "interactive"],
    createdAt: "2026-04-18",
  },
  {
    id: "scr-011",
    title: "3D Tilt Card Gallery",
    app: "Apple",
    category: "animations",
    image: picsum(129, 900, 1400),
    description: "Physics-driven 3D perspective tilt cards with dynamic glare reflection.",
    platform: "ios",
    likes: 1950,
    tags: ["3d", "tilt", "parallax", "card"],
    createdAt: "2026-04-25",
  },
  {
    id: "scr-012",
    title: "Explore Colors Glossary",
    app: "Mobbin",
    category: "sites",
    image: picsum(137, 1400, 900),
    description: "Color reference glossary with accessibility contrast ratios and palettes.",
    platform: "web",
    likes: 1310,
    tags: ["colors", "glossary", "accessibility"],
    createdAt: "2026-05-01",
  },
];

export const CATEGORIES: { key: ScreenCategory; label: string; icon: string; count: number }[] = [
  { key: "apps", label: "Apps", icon: "LayoutGrid", count: SCREENS.filter((s) => s.category === "apps").length },
  { key: "sites", label: "Sites", icon: "Globe", count: SCREENS.filter((s) => s.category === "sites").length },
  { key: "screens", label: "Screens", icon: "Monitor", count: SCREENS.filter((s) => s.category === "screens").length },
  { key: "flows", label: "Flows", icon: "GitBranch", count: SCREENS.filter((s) => s.category === "flows").length },
  { key: "animations", label: "Animations", icon: "Play", count: SCREENS.filter((s) => s.category === "animations").length },
  { key: "ui-elements", label: "UI Elements", icon: "Pencil", count: SCREENS.filter((s) => s.category === "ui-elements").length },
];

export function getScreenById(id: string) {
  return SCREENS.find((s) => s.id === id);
}

export function getRelatedScreens(id: string, category: ScreenCategory, limit = 4) {
  return SCREENS.filter((s) => s.id !== id && s.category === category).slice(0, limit);
}