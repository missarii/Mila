# Mila — AI UI/UX Intelligence Toolkit 🚀

> **Mila** is an active UI/UX intelligence system and MCP server for autonomous AI coding agents (Claude Code, Cursor, Windsurf, Antigravity, v0). Inspired by HorizonX's agent-first paradigm, Mila teaches AI coding tools how to build beautiful, production-ready interfaces with mathematical precision and zero "AI slop".

📚 **[Read the Complete Project Integration & UI/UX Guide](./INTEGRATION_GUIDE.md)** — Step-by-step instructions on connecting Mila to any repo, importing components, and prompting agents.

---

## 🌟 The 4 Pillars of Mila

1. **Mila Registry**: Production-grade, accessible React 19 + Tailwind CSS components (`SpotlightCard`, `BeforeAfterSlider`, `BentoGrid`, `HeroGeometric`, `FloatingNavbar`, `PricingMatrix`).
2. **Mila Skills & Rules**: Mathematical design rules (typography scales, 60-30-10 color palettes, 8pt spatial grid, anti-patterns).
3. **Mila MCP Server**: Real-time tools for AI coding agents to discover, retrieve, and compose components natively from natural language.
4. **Mila Review Engine**: Automated heuristic linter evaluating generated UI code for arbitrary magic numbers, contrast flaws, accessibility gaps, and mobile responsiveness.

---

## 🔌 Connecting Mila to Your AI Coding Agents

### 1. Claude Code
Add Mila to your Claude Code configuration:

```bash
claude mcp add mila -- bun /path/to/Mila/packages/mcp-server/src/index.ts
```

Or run via node:
```bash
claude mcp add mila -- node /path/to/Mila/packages/mcp-server/bin/mila-mcp.js
```

### 2. Cursor IDE (`.cursor/mcp.json`)
Add Mila to your project's `.cursor/mcp.json` or global Cursor settings:

```json
{
  "mcpServers": {
    "mila": {
      "command": "bun",
      "args": ["run", "/home/missari/Mila/packages/mcp-server/src/index.ts"]
    }
  }
}
```

### 3. Antigravity CLI / IDE
Configure Mila in your `~/.gemini/antigravity-cli/mcp.json`:

```json
{
  "mcpServers": {
    "mila": {
      "command": "bun",
      "args": ["run", "/home/missari/Mila/packages/mcp-server/src/index.ts"]
    }
  }
}
```

---

## 🛠 Available MCP Tools (7 Advanced Agent Tools)

| Tool | Description |
| :--- | :--- |
| `mila_search` | Search components, 3D elements, and templates by keyword or category (`3d-motion`, `bento`, `hero`, `slider`, `pricing`). |
| `mila_get_component` | Fetch complete, ready-to-paste TypeScript source code, styling, and required dependencies. |
| `mila_get_rules` | Fetch design intelligence rules for typography, 3D motion standards, 8pt spacing rhythm, or anti-patterns. |
| `mila_generate_theme` | Generate accessible token palettes & Tailwind v4 `@theme` blocks (e.g. Electric Indigo, Cyber Emerald, Obsidian Mono, Warm Editorial). |
| `mila_get_template` | Fetch full-page layout compositions (e.g., `modern-saas-landing`). |
| `mila_review_code` | Audit a generated React/Tailwind component and receive an automated quality score and actionable fixes. |
| `mila_auto_fix` | Automatically refactor and repair code by removing magic pixel numbers, fixing grids for mobile, adding focus rings, and cleaning AI gradient slop. |

---

## 🚀 Quickstart & Verification

```bash
# Clone and enter workspace
cd Mila

# Run automated tests across all tools
bun test

# Test MCP server interaction directly
bun packages/mcp-server/src/index.ts
```
