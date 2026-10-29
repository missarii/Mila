import { describe, expect, it } from "bun:test";
import { handleSearch } from "../packages/mcp-server/src/tools/search.js";
import { handleGetComponent } from "../packages/mcp-server/src/tools/get.js";
import { handleGetRules } from "../packages/mcp-server/src/tools/rules.js";
import { handleGetTemplate } from "../packages/mcp-server/src/tools/templates.js";
import { handleReviewCode } from "../packages/mcp-server/src/tools/review.js";

describe("Mila MCP Toolkit", () => {
  it("should search for components by keyword", () => {
    const res = handleSearch({ query: "spotlight" });
    expect(res.content[0].text).toContain("Spotlight Card");
    expect(res.content[0].text).toContain("spotlight-card");
  });

  it("should retrieve full component source code and props", () => {
    const res = handleGetComponent({ name: "before-after-slider" });
    expect(res.content[0].text).toContain("BeforeAfterSlider");
    expect(res.content[0].text).toContain("initialSliderPosition");
    expect(res.content[0].text).toContain("```tsx");
  });

  it("should fetch design system rules for typography and colors", () => {
    const typo = handleGetRules({ topic: "typography" });
    expect(typo.content[0].text).toContain("Mila Typography Guidelines");

    const all = handleGetRules({ topic: "all" });
    expect(all.content[0].text).toContain("Mila AI UI/UX Design System Rules");
  });

  it("should retrieve full layout templates", () => {
    const res = handleGetTemplate({ templateName: "modern-saas-landing" });
    expect(res.content[0].text).toContain("Modern AI SaaS Landing Page");
    expect(res.content[0].text).toContain("FloatingNavbar");
    expect(res.content[0].text).toContain("HeroGeometric");
  });

  it("should audit code and detect AI slop anti-patterns", () => {
    const badSnippet = `
      <div className="w-[347px] bg-gradient-to-r from-purple-500 to-pink-500 text-neutral-700 grid grid-cols-3">
        <img src="test.png" />
        <button className="outline-none">Action</button>
      </div>
    `;
    const res = handleReviewCode({ code: badSnippet });
    expect(res.content[0].text).toContain("Mila Review Score");
    expect(res.content[0].text).toContain("NEEDS REVISION");
    expect(res.content[0].text).toContain("Arbitrary Pixel Magic Numbers Detected");
    expect(res.content[0].text).toContain("Missing Mobile Breakpoint on Grid");
    expect(res.content[0].text).toContain("alt");
  });

  it("should award passing scores to clean code", () => {
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
