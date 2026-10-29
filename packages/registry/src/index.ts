import registryData from "./registry.json" with { type: "json" };
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface ComponentFile {
  name: string;
  path: string;
}

export interface ComponentEntry {
  name: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  dependencies: string[];
  devDependencies: string[];
  files: ComponentFile[];
}

export interface TemplateEntry {
  name: string;
  title: string;
  description: string;
  componentsUsed: string[];
  entry: string;
}

export interface RegistryManifest {
  name: string;
  version: string;
  components: ComponentEntry[];
  templates: TemplateEntry[];
}

export const registry: RegistryManifest = registryData as RegistryManifest;

export function listComponents(): ComponentEntry[] {
  return registry.components;
}

export function searchComponents(query: string, category?: string): ComponentEntry[] {
  const q = query.toLowerCase().trim();
  return registry.components.filter((item) => {
    const matchesCategory = !category || category === "all" || item.category === category;
    if (!matchesCategory) return false;
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });
}

export function getComponentDetails(name: string): {
  entry: ComponentEntry;
  sourceCode: string;
} | null {
  const entry = registry.components.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
  if (!entry) return null;

  const primaryFile = entry.files[0];
  const fullPath = join(__dirname, primaryFile.path);
  let sourceCode = "";
  if (existsSync(fullPath)) {
    sourceCode = readFileSync(fullPath, "utf-8");
  } else {
    sourceCode = `// Error: source file not found at ${primaryFile.path}`;
  }

  return { entry, sourceCode };
}

export function getTemplateDetails(name: string): {
  template: TemplateEntry;
  sourceCode: string;
} | null {
  const template = registry.templates.find(
    (t) => t.name.toLowerCase() === name.toLowerCase()
  );
  if (!template) return null;

  const fullPath = join(__dirname, template.entry);
  let sourceCode = "";
  if (existsSync(fullPath)) {
    sourceCode = readFileSync(fullPath, "utf-8");
  } else {
    sourceCode = `// Error: template file not found at ${template.entry}`;
  }

  return { template, sourceCode };
}
