# Mila — UI/UX Toolkit Installation Guide

Mila is an installable npm workspace that acts as your project's UI/UX intelligence system. It ships as **four independent npm packages** plus an optional CLI:

| Package | Purpose | Install |
| :--- | :--- | :--- |
| `@mila/registry` | Curated component + template registry (searchable catalog, copy-paste source) | `bun add @mila/registry` |
| `@mila/mcp` | MCP server — connects Mila to Cursor, Claude Code, Windsurf, Antigravity | `bun add --dev @mila/mcp` |
| `@mila/cli` | CLI — `mila init`, `mila add`, `mila doctor`, `mila search` | `bun add --dev @mila/cli` |
| `@mila/rules` | Design intelligence rules (typography, colors, 8pt grid, 3D motion) | `bun add @mila/rules` |

---

## 🚀 Quick Start (30 seconds)

```bash
# Install the toolkit in your project
bun add @mila/registry
bun add --dev @mila/mcp @mila/cli

# Initialize (creates .cursor/mcp.json + components/ui/)
npx mila init

# Add a component (copies source into your project)
npx mila add tilt-3d-card
npx mila add screen-card
npx mila add particle-wave-3d

# Verify your setup
npx mila doctor
```

---

## 1. Install the packages

```bash
# Registry (runtime — for searching components programmatically)
bun add @mila/registry

# MCP server + CLI (dev-only — for your AI agent)
bun add --dev @mila/mcp @mila/cli
```

### Peer dependencies

Components depend on `react`. Some require additional packages — the CLI tells you exactly which when you run `mila add <name>`. Common ones:

```bash
bun add next lucide-react framer-motion clsx tailwind-merge
```
---

## 2. Connect to your AI coding agent

### Cursor IDE
```bash
npx mila init
# or manually create .cursor/mcp.json:
```
```json
{
  "mcpServers": {
    "mila": {
      "command": "npx",
      "args": ["-y", "@mila/mcp"]
    }
  }
}
```

### Claude Code (terminal)
```bash
claude mcp add mila -- npx -y @mila/mcp
```

### Windsurf IDE
Add to `~/.codeium/windsurf/mcp_config.json`:
```json
{
  "mcpServers": {
    "mila": {
      "command": "npx",
      "args": ["-y", "@mila/mcp"]
    }
  }
}
```

After connecting, use these tools directly in your agent:
- `mila_search` — search by keyword/category (e.g., `3d-motion`, `hero`, `bento`)
- `mila_get_component` — retrieve complete source code
- `mila_get_rules` — fetch design intelligence rules
- `mila_generate_theme` — generate accessible token palettes
- `mila_get_template` — fetch full-page layouts
- `mila_review_code` — audit React/Tailwind code
- `mila_auto_fix` — automatically repair design anti-patterns

---

## 3. Browse & use components

```bash
# List all available components
npx mila search "3d"

# Copy any component into your project (shadcn-style)
npx mila add tilt-3d-card
npx mili add screen-card
npx mila add image-from-url
npx mila add hero-section
npx mila add pricing-section
npx mila add bento-showcase
npx mila add navbar
```

### Available components

| Name | Category | Description |
| :--- | :--- | :--- |
| `spotlight-card` | card | Cursor-tracking radial spotlight glow |
| `before-after-slider` | interactive | Drag comparison slider with pill tags |
| `tilt-3d-card` | 3d-motion | CSS 3D parallax tilt with dynamic glare |
| `particle-wave-3d` | 3d-motion | Canvas 3D wireframe particle landscape |
| `screen-card` | card | Mobbin-style screen card with 3D tilt + open-source images |
| `image-from-url` | asset | Open-source image renderer with SVG fallback |
| `bento-grid` | bento | Asymmetrical grid with terminal simulator |
| `hero-geometric` | hero | Geometric wireframe hero with ambient glow |
| `hero-section` | hero | 3D particle hero with dual CTA |
| `floating-navbar` | nav | Scroll-aware floating pill navbar |
| `navbar` | nav | Full navigation with mobile drawer |
| `pricing-matrix` | pricing | 3-tier pricing with toggle |
| `pricing-section` | pricing | Conversion-optimized pricing section |
| `bento-showcase` | bento | Asymmetrical bento grid with Framer Motion |

---

## 4. Use the registry programmatically

```typescript
import { registry, searchComponents, getComponentDetails } from "@mila/registry";

// List all components
console.log(registry.components.map((c) => c.name));

// Search by keyword or category
const results = searchComponents("3d", "3d-motion");

// Get full source code for copy-paste
const { entry, sourceCode } = getComponentDetails("tilt-3d-card");
console.log(entry.title);
console.log(sourceCode);
```

---

## 5. Mila design rules (.cursorrules)

For projects that don't run the MCP server, copy `.cursorrules` from this repo's root directly into your project root. Any AI agent reading your workspace will immediately adhere to Mila's design rules.

---

## 🧩 Architecture

```
Mila/
├── packages/
│   ├── registry/       → @mila/registry  (component catalog + source files)
│   ├── rules/          → @mila/rules     (design intelligence + theme generator)
│   ├── review/         → @mila/review    (heuristic code auditor)
│   ├── mcp-server/     → @mila/mcp       (MCP server for AI agents)
│   └── cli/            → @mila/cli       (mila init / add / doctor / search)
├── apps/
│   └── web/            → @mila/web       (demo website — Mobbin-style gallery)
└── INTEGRATION_GUIDE.md
```

MIT License — Authored by Missari Ahil
