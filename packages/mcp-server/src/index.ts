import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { handleSearch } from "./tools/search.js";
import { handleGetComponent } from "./tools/get.js";
import { handleGetRules } from "./tools/rules.js";
import { handleGetTemplate } from "./tools/templates.js";
import { handleReviewCode } from "./tools/review.js";
import { handleGenerateTheme } from "./tools/theme.js";
import { handleAutoFix } from "./tools/autofix.js";

const server = new Server(
  {
    name: "mila-mcp",
    version: "0.2.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 1. List Available Tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "mila_search",
        description:
          "Search the Mila curated UI catalog for components, 3D elements, templates, and patterns by keyword or category.",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Search keyword, e.g., '3d', 'tilt', 'particles', 'bento', 'slider', 'hero', 'card', 'pricing'",
            },
            category: {
              type: "string",
              description: "Optional category filter: 3d-motion, hero, bento, card, nav, pricing, interactive, all",
            },
          },
        },
      },
      {
        name: "mila_get_component",
        description:
          "Retrieve production-ready TypeScript code, required dependencies, and styling for a specific Mila component.",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Component slug, e.g., 'tilt-3d-card', 'particle-wave-3d', 'spotlight-card', 'before-after-slider', 'bento-grid', 'hero-geometric', 'floating-navbar', 'pricing-matrix'",
            },
          },
          required: ["name"],
        },
      },
      {
        name: "mila_get_rules",
        description:
          "Fetch Mila UI/UX intelligence rules, 3D motion standards, design tokens, typography scales, or anti-patterns for AI agents.",
        inputSchema: {
          type: "object",
          properties: {
            topic: {
              type: "string",
              description: "Rule topic: 'typography', 'colors', 'layout', 'spacing', '3d-motion', 'anti-patterns', 'accessibility', or 'all'",
            },
          },
        },
      },
      {
        name: "mila_generate_theme",
        description:
          "Generate an accessible, production-ready design token system and Tailwind CSS v4 @theme block based on industry, mood, or brand preset.",
        inputSchema: {
          type: "object",
          properties: {
            themeNameOrKeyword: {
              type: "string",
              description: "Theme preset or mood keyword, e.g., 'electric-indigo', 'cyber-emerald', 'obsidian-mono', 'warm-editorial', 'fintech', 'crypto', 'luxury'",
            },
          },
        },
      },
      {
        name: "mila_get_template",
        description:
          "Retrieve a complete multi-component page layout composition (e.g. 'modern-saas-landing').",
        inputSchema: {
          type: "object",
          properties: {
            templateName: {
              type: "string",
              description: "Template slug, e.g., 'modern-saas-landing'",
            },
          },
          required: ["templateName"],
        },
      },
      {
        name: "mila_review_code",
        description:
          "Run Mila UI/UX heuristic audit on React/Tailwind code to detect magic numbers, contrast flaws, lack of mobile responsiveness, and missing focus rings.",
        inputSchema: {
          type: "object",
          properties: {
            code: {
              type: "string",
              description: "React/Tailwind JSX or TSX code snippet to review",
            },
          },
          required: ["code"],
        },
      },
      {
        name: "mila_auto_fix",
        description:
          "Automatically refactor and repair React/Tailwind code by replacing arbitrary magic numbers, fixing non-mobile grids, adding accessible focus rings, and removing AI gradient slop.",
        inputSchema: {
          type: "object",
          properties: {
            code: {
              type: "string",
              description: "React/Tailwind code snippet with anti-patterns to automatically repair",
            },
          },
          required: ["code"],
        },
      },
    ],
  };
});

// 2. Handle Tool Execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "mila_search":
        return handleSearch((args as { query?: string; category?: string }) || {});

      case "mila_get_component":
        return handleGetComponent((args as { name: string }) || { name: "" });

      case "mila_get_rules":
        return handleGetRules((args as { topic?: string }) || {});

      case "mila_generate_theme":
        return handleGenerateTheme((args as { themeNameOrKeyword?: string }) || {});

      case "mila_get_template":
        return handleGetTemplate((args as { templateName: string }) || { templateName: "" });

      case "mila_review_code":
        return handleReviewCode((args as { code: string }) || { code: "" });

      case "mila_auto_fix":
        return handleAutoFix((args as { code: string }) || { code: "" });

      default:
        throw new Error(`Unknown Mila tool: ${name}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: "text" as const,
          text: `Mila Tool Execution Error (${name}): ${message}`,
        },
      ],
      isError: true,
    };
  }
});

// 3. Connect Stdio Transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Mila MCP Server v0.2.0 started on stdio");
}

main().catch((err) => {
  console.error("Fatal error starting Mila MCP Server:", err);
  process.exit(1);
});
