import { describe, expect, it } from "bun:test";
import { handleSearch } from "../packages/mcp-server/src/tools/search.js";
import { handleGetComponent } from "../packages/mcp-server/src/tools/get.js";
import { handleGetRules } from "../packages/mcp-server/src/tools/rules.js";
import { handleGetTemplate } from "../packages/mcp-server/src/tools/templates.js";
import { handleReviewCode } from "../packages/mcp-server/src/tools/review.js";
import { handleGenerateTheme } from "../packages/mcp-server/src/tools/theme.js";
import { handleAutoFix } from "../packages/mcp-server/src/tools/autofix.js";

describe("Mila MCP Advanced Toolkit", () => {
  it("should search for 3D motion components by keyword", () => {
    const res = handleSearch({ query: "tilt" });
    expect(res.content[0].text).toContain("3D Perspective Tilt Card");
    expect(res.content[0].text).toContain("tilt-3d-card");
  });

  it("should retrieve full 3D tilt card and 3D particle canvas source code", () => {
    const tilt = handleGetComponent({ name: "tilt-3d-card" });
    expect(tilt.content[0].text).toContain("Tilt3DCard");
    expect(tilt.content[0].text).toContain("perspective");
    expect(tilt.content[0].text).toContain("translateZ");

    const wave = handleGetComponent({ name: "particle-wave-3d" });
    expect(wave.content[0].text).toContain("ParticleWave3D");
    expect(wave.content[0].text).toContain("canvasRef");
  });

  it("should fetch 3D motion design rules", () => {
    const rules = handleGetRules({ topic: "3d-motion" });
    expect(rules.content[0].text).toContain("Mila 3D Motion & Spatial UI Guide");
    expect(rules.content[0].text).toContain("prefers-reduced-motion");
  });

  it("should generate dynamic color themes and CSS variables", () => {
    const emerald = handleGenerateTheme({ themeNameOrKeyword: "fintech" });
    expect(emerald.content[0].text).toContain("Cyber Emerald");
    expect(emerald.content[0].text).toContain("--color-canvas");

    const indigo = handleGenerateTheme({ themeNameOrKeyword: "electric-indigo" });
    expect(indigo.content[0].text).toContain("Electric Indigo");
  });

  it("should auto-fix bad AI code into clean production code", () => {
    const badCode = `<div className="w-[347px] bg-gradient-to-r from-purple-500 to-pink-500 text-neutral-700 grid grid-cols-3"><img src="test.png" /><button className="outline-none">Action</button></div>`;
    const res = handleAutoFix({ code: badCode });

    expect(res.content[0].text).toContain("Initial Quality Score");
    expect(res.content[0].text).toContain("30/100");
    expect(res.content[0].text).toContain("Repaired Quality Score");
    expect(res.content[0].text).toContain("w-full max-w-sm");
    expect(res.content[0].text).toContain("grid-cols-1 md:grid-cols-3");
    expect(res.content[0].text).toContain('alt="Visual illustration"');
    expect(res.content[0].text).toContain("focus-visible:ring-2");
  });

  it("should audit code and award passing scores to clean code", () => {
    const goodSnippet = `
      <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-3 gap-6 bg-neutral-950 text-neutral-100">
        <h1 className="text-4xl font-bold tracking-tight">Clean Title</h1>
        <p className="text-base text-neutral-400">Descriptive subtitle</p>
        <button className="rounded-xl bg-white px-4 py-2 text-neutral-950 focus-visible:ring-2 focus-visible:ring-white">
          Accessible Button
        </button>
      </div>
    `;
    const res = handleReviewCode({ code: goodSnippet });
    expect(res.content[0].text).toContain("PASS");
  });
});
