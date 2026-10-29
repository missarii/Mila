# Mila — End-to-End Project Integration & UI/UX Guide

> A comprehensive handbook explaining how to connect Mila to any frontend repository, import high-craft components, and guide your AI coding agent to design production-quality interfaces.

---

## 📖 Table of Contents
1. [What Mila Does in Your Project](#1-what-mila-does-in-your-project)
2. [Supported AI Coding Tools](#2-supported-ai-coding-tools)
3. [60-Second Setup: Connecting the MCP Server](#3-60-second-setup-connecting-the-mcp-server)
4. [How Mila Works Inside Your Project Workflow](#4-how-mila-works-inside-your-project-workflow)
   - [Workflow A: On-Demand Component Import](#workflow-a-on-demand-component-import)
   - [Workflow B: Enforcing Design Intelligence & Tokens](#workflow-b-enforcing-design-intelligence--tokens)
   - [Workflow C: Pre-Commit UI Quality Review](#workflow-c-pre-commit-ui-quality-review)
5. [Frontend Requirements in Your Project](#5-frontend-requirements-in-your-project)
6. [Real-World Prompting Playbook](#6-real-world-prompting-playbook)
7. [Frequently Asked Questions (FAQ)](#7-frequently-asked-questions-faq)

---

## 1. What Mila Does in Your Project

Standard AI coding tools generate code that works logically, but frequently fails aesthetically:
- **Generic "AI Slop":** Neon purple-to-pink gradient buttons and low-contrast ghost text.
- **Rigid Layouts:** Arbitrary magic pixel widths (`w-[387px]`, `top-[17px]`) that break on responsive viewports.
- **Missing Micro-Interactions:** Static cards with zero focus rings, hover lifts, or active press feedback.

**Mila acts as your AI agent's dedicated design director:**
1. It provides a **searchable registry** of high-craft components (Spotlight cards, comparison sliders, bento grids, floating headers).
2. It injects **mathematical design rules** (8pt spatial rhythm, WCAG AA contrast, concentric border radiuses).
3. It performs **instant heuristic audits** on the generated code before you commit it.

---

## 2. Supported AI Coding Tools

Mila uses the universal open standard **Model Context Protocol (MCP)**, meaning it works out of the box with:
- **Cursor IDE**
- **Claude Code** (Anthropic CLI)
- **Windsurf IDE**
- **Google Antigravity**
- **GitHub Copilot Workspace / Any MCP-compliant client**

---

## 3. 60-Second Setup: Connecting the MCP Server

You can connect Mila to your project locally or globally.

### Option A: Cursor IDE
In your project root, create or edit `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "mila": {
      "command": "bun",
      "args": ["run", "/absolute/path/to/Mila/packages/mcp-server/src/index.ts"]
    }
  }
}
```
*(Or use `node /absolute/path/to/Mila/packages/mcp-server/bin/mila-mcp.js` if you prefer Node.js).*

### Option B: Claude Code (Terminal CLI)
Run this single command in your terminal:

```bash
claude mcp add mila -- bun /absolute/path/to/Mila/packages/mcp-server/src/index.ts
```

### Option C: Windsurf IDE
In `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "mila": {
      "command": "bun",
      "args": ["run", "/absolute/path/to/Mila/packages/mcp-server/src/index.ts"]
    }
  }
}
```

### Option D: Antigravity IDE / CLI
In `~/.gemini/antigravity-cli/mcp.json`:

```json
{
  "mcpServers": {
    "mila": {
      "command": "bun",
      "args": ["run", "/absolute/path/to/Mila/packages/mcp-server/src/index.ts"]
    }
  }
}
```

---

## 4. How Mila Works Inside Your Project Workflow

Once connected, your AI coding agent has direct access to 5 native Mila tools. Here is how they interact with your repository:

```
[Developer Prompt]
       │
       ▼
[AI Agent: Cursor / Claude Code]
       │
       ├─── 1. Asks Mila: "What components match this feature?" (mila_search)
       │    ◄── Returns: "before-after-slider", tags, dependencies
       │
       ├─── 2. Asks Mila: "Give me the code for before-after-slider" (mila_get_component)
       │    ◄── Returns: Complete TypeScript code + Props + Styling
       │
       ├─── 3. Writes File directly into your project:
       │       `src/components/ui/BeforeAfterSlider.tsx`
       │
       ├─── 4. Generates your page and calls Mila Auditor (mila_review_code)
       │    ◄── Returns: "Review Score: 95/100 ✅ PASS"
       │
       ▼
[Production-Ready Pull Request]
```

---

### Workflow A: On-Demand Component Import

When you want to add a UI element to your project, simply instruct your agent in plain English:

> *"Add a comparison slider to our `/case-studies` page so users can compare raw vs enhanced photos."*

**What happens automatically:**
1. The agent calls `mila_search({ query: "comparison slider" })`.
2. Mila recommends `before-after-slider`.
3. The agent calls `mila_get_component({ name: "before-after-slider" })`.
4. The agent writes the component file into your project (e.g. `src/components/ui/BeforeAfterSlider.tsx`).
5. The agent wires up your images and props inside your page.

---

### Workflow B: Enforcing Design Intelligence & Tokens

When you want to build custom UI from scratch, your agent queries Mila for styling principles:

> *"We are building a dark-mode pricing page. Check Mila's design rules for typography and dark-mode contrast before writing the markup."*

**What happens automatically:**
1. The agent calls `mila_get_rules({ topic: "typography" })` and `mila_get_rules({ topic: "colors" })`.
2. Mila supplies strict standards:
   - Primary surface: `bg-neutral-950` with `border-neutral-800`.
   - Body text: minimum `text-neutral-400` (WCAG AA 4.5:1 ratio).
   - Display headings: `tracking-tight` with `leading-[1.1]`.
   - 8pt spatial cadence: `p-6` or `p-8` for card containers.
3. The agent builds the interface according to these exact tokens, avoiding generic AI defaults.

---

### Workflow C: Pre-Commit UI Quality Review

Before finalizing any UI changes, ask your agent to critique its own work:

> *"Review the new Hero section using Mila Review and fix any detected issues."*

**What happens automatically:**
1. The agent passes the JSX/TSX snippet to `mila_review_code`.
2. Mila's heuristic engine audits the code for:
   - **Arbitrary pixel magic numbers** (e.g. `w-[347px]`).
   - **Purple-to-pink gradient slop**.
   - **Missing mobile breakpoints** (`grid-cols-3` without `grid-cols-1`).
   - **Accessibility flaws** (missing `alt` tags, buttons missing `aria-label`).
   - **Missing focus states** (`outline-none` without `focus-visible:ring`).
3. If issues are detected, Mila returns an actionable fix guide.
4. The agent applies the fixes and verifies the score reaches 90+ before completing the task.

---

## 5. Frontend Requirements in Your Project

Mila components are built to be **framework-friendly, zero-runtime, and copy-paste native** (just like shadcn/ui):

### 1. React & TypeScript
- React 18 or React 19
- TypeScript 5+

### 2. Styling
- **Tailwind CSS v3 or v4**
- For Tailwind v3, ensure standard neutral colors are enabled in `tailwind.config.js`:
```js
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        neutral: require("tailwindcss/colors").neutral,
      },
    },
  },
};
```

### 3. Runtime Footprint
- **Zero heavy runtime libraries:** Mila components rely only on standard standard React hooks (`useState`, `useRef`, `useCallback`) and standard Tailwind utility classes.
- No bulky third-party CSS dependencies.

---

## 6. Real-World Prompting Playbook

Copy and paste these exact prompts into Cursor, Claude Code, or Antigravity:

| Goal | Prompt to Give Your Agent |
| :--- | :--- |
| **Search Components** | *"Search Mila for interactive card components with glow or hover effects."* |
| **Fetch & Install** | *"Fetch the `spotlight-card` component from Mila and create it in `components/ui/SpotlightCard.tsx`."* |
| **Build Full Page** | *"Fetch Mila's `modern-saas-landing` template and adapt it for our developer analytics platform."* |
| **Spacing & Contrast Check** | *"Fetch Mila's layout and spacing rules, then refactor our dashboard grid to follow the 8pt rhythm."* |
| **Audit Code** | *"Audit `app/pricing/page.tsx` with Mila Review and fix all warnings."* |

---

## 7. Frequently Asked Questions (FAQ)

### Q: Does Mila lock my project into a proprietary package?
**No.** Mila adopts the **shadcn philosophy**: your agent retrieves clean, readable TypeScript source code and copies it directly into your codebase. You own 100% of the code.

### Q: Can I use Mila in a static project without running the MCP server?
**Yes.** You can copy the [`.cursorrules`](file:///.cursorrules) file from this repository directly into your project root. Any coding agent reading your workspace will immediately adhere to Mila's design rules.

### Q: How does Mila compare to HorizonX?
- **HorizonX** is an asset catalog accessible via MCP.
- **Mila** includes the curated component registry, plus **active design intelligence** (structured token rules) and an **automated code auditor** (`mila_review_code`) that catches aesthetic mistakes in real-time.

---

*Authored by Missari Ahil • Released under the MIT License*
