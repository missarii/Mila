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

const server = new Server(
  {
    name: "mila-mcp",
    version: "0.1.0",
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
          "Search the Mila curated UI catalog for components, templates, and patterns by keyword or category.",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Search keyword, e.g., 'bento', 'slider', 'hero', 'card', 'pricing'",
            },
            category: {
              type: "string",
              description: "Optional category filter: hero, bento, card, nav, pricing, interactive, all",
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
              description: "Component slug, e.g., 'spotlight-card', 'before-after-slider', 'bento-grid', 'hero-geometric', 'floating-navbar', 'pricing-matrix'",
            },
          },
          required: ["name"],
        },
      },
      {
        name: "mila_get_rules",
        description:
          "Fetch Mila UI/UX intelligence rules, design tokens, typography scales, or anti-patterns for AI agents.",
        inputSchema: {
          type: "object",
          properties: {
            topic: {
              type: "string",
              description: "Rule topic: 'typography', 'colors', 'layout', 'spacing', 'anti-patterns', 'accessibility', or 'all'",
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

      case "mila_get_template":
        return handleGetTemplate((args as { templateName: string }) || { templateName: "" });

      case "mila_review_code":
        return handleReviewCode((args as { code: string }) || { code: "" });

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
  console.error("Mila MCP Server v0.1.0 started on stdio");
}

main().catch((err) => {
  console.error("Fatal error starting Mila MCP Server:", err);
  process.exit(1);
});
