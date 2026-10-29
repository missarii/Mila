import rulesJson from "./rules.json" with { type: "json" };
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface MilaRule {
  id: string;
  severity: "must" | "recommended" | "avoid";
  rule: string;
  tailwind?: string;
}

export interface MilaRuleCategory {
  id: string;
  title: string;
  summary: string;
  rules: MilaRule[];
}

export interface MilaRulesManifest {
  version: string;
  categories: MilaRuleCategory[];
}

export const rulesManifest: MilaRulesManifest = rulesJson as MilaRulesManifest;

export function getRuleCategory(categoryId: string): MilaRuleCategory | undefined {
  return rulesManifest.categories.find(
    (c) => c.id.toLowerCase() === categoryId.toLowerCase()
  );
}

export function getFullMarkdownDoc(topic: string): string {
  const fileMap: Record<string, string> = {
    typography: "typography.md",
    colors: "color-systems.md",
    layout: "layout-spacing.md",
    spacing: "layout-spacing.md",
    "anti-patterns": "anti-patterns.md",
    accessibility: "anti-patterns.md",
  };

  const filename = fileMap[topic.toLowerCase()] || "anti-patterns.md";
  const filePath = join(__dirname, filename);
  if (existsSync(filePath)) {
    return readFileSync(filePath, "utf-8");
  }

  // Fallback to rules.json rendering
  const cat = getRuleCategory(topic);
  if (cat) {
    return `# Mila Rule Guide: ${cat.title}\n\n${cat.summary}\n\n` +
      cat.rules.map(r => `- **[${r.severity.toUpperCase()}]** ${r.rule}`).join("\n");
  }

  return "Topic not found. Available topics: typography, colors, layout, spacing, anti-patterns, accessibility.";
}
