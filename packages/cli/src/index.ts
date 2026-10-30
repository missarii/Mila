#!/usr/bin/env node
/**
 * Mila CLI — Initialize Mila UI/UX toolkit in any project.
 *
 * Usage:
 *   npx @mila/cli init          # Set up Mila MCP + component directories
 *   npx @mila/cli add <name>    # Copy a component into components/ui/
 *   npx @mila/cli doctor        # Verify your Mila setup
 *   npx @mila/cli search <q>    # Search Mila components
 */

import { execa } from "execa";
import {
  registry,
  searchComponents,
  getComponentDetails,
  type ComponentEntry,
} from "@mila/registry";
import { readFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = resolve(fileURLToPath(import.meta.url), "..");
const ROOT = process.cwd();

const COMPONENTS_DIR = join(ROOT, "components", "ui");
const CURSOR_DIR = join(ROOT, ".cursor");
const MCP_CONFIG = join(CURSOR_DIR, "mcp.json");

const MCP_CONFIG_CONTENT = {
  mcpServers: {
    mila: {
      command: "npx",
      args: ["-y", "@mila/mcp"],
    },
  },
};

function log(msg: string) {
  console.log(msg);
}

function success(msg: string) {
  console.log(`\x1b[32m✓\x1b[0m ${msg}`);
}

function info(msg: string) {
  console.log(`\x1b[36m→\x1b[0m ${msg}`);
}

function warn(msg: string) {
  console.log(`\x1b[33m⚠\x1b[0m ${msg}`);
}

function error(msg: string) {
  console.error(`\x1b[31m✗\x1b[0m ${msg}`);
  process.exit(1);
}

function resolveRegistryDist(): string {
  const candidates = [
    join(ROOT, "node_modules", "@mila", "registry", "dist"),
    join(__dirname, "..", "..", "registry", "dist"),
    join(__dirname, "..", "..", "..", "registry", "dist"),
    join(ROOT, "node_modules", "@mila", "registry"),
  ];
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }
  error(
    "@mila/registry not found. Run `npm install @mila/registry` (or `bun add @mila/registry`) first.",
  );
  return "";
}

/** Get the absolute path to a component source file inside the registry dist */
function resolveComponentFile(entry: ComponentEntry): string {
  const distDir = resolveRegistryDist();
  const file = entry.files?.[0];
  if (!file) error(`Component "${entry.name}" has no source file declared.`);

  const fromDist = join(distDir, file.path);
  if (existsSync(fromDist)) return fromDist;

  const fromSrc = join(
    resolveRegistryDist(),
    "..",
    "src",
    file.path,
  );
  if (existsSync(fromSrc)) return fromSrc;

  error(`Component source file not found: ${file.path} (tried ${fromDist})`);
  return "";
}

async function cmdInit() {
  log("\n🌀 Mila Init — Setting up Mila UI/UX toolkit in your project\n");

  info("Installing @mila/mcp (MCP server) as a devDependency…");
  try {
    await execa("bun", ["add", "--dev", "@mila/mcp"], { stdio: "inherit" });
    success("@mila/mcp installed");
  } catch {
    warn("Could not auto-install @mila/mcp. Install manually: bun add --dev @mila/mcp");
  }

  if (!existsSync(CURSOR_DIR)) {
    mkdirSync(CURSOR_DIR, { recursive: true });
  }
  if (!existsSync(MCP_CONFIG)) {
    const fs = await import("node:fs/promises");
    await fs.writeFile(
      MCP_CONFIG,
      JSON.stringify(MCP_CONFIG_CONTENT, null, 2) + "\n",
    );
    success(`Created ${MCP_CONFIG}`);
  } else {
    warn(`${MCP_CONFIG} already exists — add the mila server manually:`);
    log(JSON.stringify(MCP_CONFIG_CONTENT, null, 2));
  }

  if (!existsSync(COMPONENTS_DIR)) {
    mkdirSync(COMPONENTS_DIR, { recursive: true });
    success(`Created ${COMPONENTS_DIR}/`);
  }

  log("\n📦 Available Mila components:");
  const comps = registry.components;
  comps.forEach((c) => {
    log(`   • ${c.name.padEnd(24)} ${c.category}`);
  });

  log("\n🎉 Mila is ready! Next steps:");
  log("   1. Add a component:  npx mila add tilt-3d-card");
  log("   2. Restart your AI agent (Cursor / Claude Code) to pick up the MCP server");
  log("   3. Use 'mila_search' / 'mila_get_component' in your agent");
  log("\n");
}

async function cmdAdd(name: string) {
  const entry = registry.components.find((c) => c.name === name);
  if (!entry) {
    const suggestions = registry.components
      .filter(
        (c) =>
          c.name.includes(name) ||
          c.title.toLowerCase().includes(name.toLowerCase()),
      )
      .map((c) => c.name);
    error(
      `Component "${name}" not found.${suggestions.length ? ` Did you mean: ${suggestions.join(", ")}?` : ""}`,
    );
  }
  const component = entry!;

  const srcPath = resolveComponentFile(component);
  const srcCode = readFileSync(srcPath, "utf-8");

  if (!existsSync(COMPONENTS_DIR)) {
    mkdirSync(COMPONENTS_DIR, { recursive: true });
  }

  const destName = component.files?.[0]?.name || `${name}.tsx`;
  const destPath = join(COMPONENTS_DIR, destName);

  if (existsSync(destPath)) {
    warn(`Skipping — ${destPath} already exists.`);
    return;
  }

  const fs = await import("node:fs/promises");
  await fs.writeFile(destPath, srcCode);
  success(`Copied ${component.title} → ${destPath}`);

  const deps = component.dependencies.filter((d) => d !== "react");
  const devDeps = component.devDependencies;
  if (deps.length || devDeps.length) {
    log("\n📦 Install peer dependencies:");
    log(`   bun add ${deps.join(" ")}`);
    if (devDeps.length) {
      log(`   bun add --dev ${devDeps.join(" ")}`);
    }
  }

  log("\n💡 Tip: Run 'npx mila doctor' to verify your setup.");
}

async function cmdDoctor() {
  log("\n🩺 Mila Doctor — Verifying your setup\n");

  let ok = true;

  const registryDist = resolveRegistryDist();
  if (registryDist && existsSync(join(registryDist, "index.js"))) {
    success("@mila/registry is installed");
  } else {
    error("@mila/registry not found. Run: bun add @mila/registry");
    ok = false;
  }

  if (existsSync(MCP_CONFIG)) {
    success(`${MCP_CONFIG} exists`);
    try {
      const config = JSON.parse(readFileSync(MCP_CONFIG, "utf-8"));
      if (config.mcpServers?.mila) {
        success("Mila MCP server configured in Cursor");
      } else {
        warn("Mila MCP server not found in .cursor/mcp.json");
        ok = false;
      }
    } catch {
      warn("Could not parse .cursor/mcp.json");
      ok = false;
    }
  } else {
    warn(`${MCP_CONFIG} not found. Run: npx mila init`);
    ok = false;
  }

  if (existsSync(COMPONENTS_DIR)) {
    const files = readdirSync(COMPONENTS_DIR).filter((f) => f.endsWith(".tsx"));
    if (files.length) {
      success(`${files.length} Mila component(s) in components/ui/`);
      files.forEach((f) => log(`   • ${f}`));
    } else {
      info("No components copied yet. Run: npx mila add tilt-3d-card");
    }
  } else {
    info(`components/ui/ not created yet. Run: npx mila init`);
  }

  log(`\n${ok ? "✅" : "⚠️"} Mila setup ${ok ? "healthy" : "needs attention"}\n`);
}

async function cmdSearch(query: string) {
  const results = searchComponents(query);
  if (results.length === 0) {
    log(`No Mila components found matching "${query}".`);
    log(`Available: ${registry.components.map((c) => c.name).join(", ")}`);
    return;
  }
  log(`\n🔍 Found ${results.length} Mila component(s) matching "${query}":\n`);
  results.forEach((c) => {
    log(`  ${c.name.padEnd(26)} ${c.category}`);
    log(`    ${c.description}`);
    log(`    deps: ${c.dependencies.join(", ") || "none"}\n`);
  });
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const rest = args.slice(1);

  switch (command) {
    case "init":
      await cmdInit();
      break;
    case "add":
      if (!rest[0]) error("Usage: npx mila add <component-name>");
      await cmdAdd(rest[0]);
      break;
    case "doctor":
      await cmdDoctor();
      break;
    case "search":
      if (!rest[0]) {
        log(`Usage: npx mila search <query>\n`);
        log(`All components: ${registry.components.map((c) => c.name).join(", ")}`);
      } else {
        await cmdSearch(rest[0]);
      }
      break;
    case "--version":
    case "-v":
      log("1.0.0");
      break;
    case "--help":
    case "-h":
    case undefined:
      log(`\n  Mila CLI — UI/UX toolkit for your project\n\n  Usage: npx @mila/cli <command> [args]\n\n  Commands:\n    init              Set up Mila MCP server + components directory\n    add <name>        Copy a Mila component into components/ui/\n    doctor            Verify your Mila setup\n    search <query>    Search Mila components by keyword\n\n  Examples:\n    npx @mila/cli init\n    npx @mila/cli add tilt-3d-card\n    npx @mila/cli search 3d\n      `);
      break;
    default:
      error(`Unknown command: ${command}. Run 'npx @mila/cli --help'`);
  }
}

main().catch((err) => {
  error(err instanceof Error ? err.message : String(err));
});
