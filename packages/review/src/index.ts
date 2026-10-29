export interface ReviewIssue {
  severity: "error" | "warning" | "tip";
  category: "typography" | "layout" | "colors" | "accessibility" | "responsive";
  title: string;
  description: string;
  match?: string;
  suggestion: string;
}

export interface ReviewResult {
  score: number; // 0 to 100
  passed: boolean;
  issues: ReviewIssue[];
  summary: string;
  formattedReport: string;
}

export function reviewCode(code: string): ReviewResult {
  const issues: ReviewIssue[] = [];

  // 1. Check for Arbitrary Magic Numbers in Tailwind
  const arbitraryMatch = code.match(/(?:w|h|p|m|top|left|right|bottom|text)-\[\d+px\]/g);
  if (arbitraryMatch) {
    const uniqueMatches = Array.from(new Set(arbitraryMatch));
    issues.push({
      severity: "warning",
      category: "layout",
      title: "Arbitrary Pixel Magic Numbers Detected",
      description: `Found arbitrary pixel values: ${uniqueMatches.join(", ")}. These cause rigid layouts that break across viewports.`,
      match: uniqueMatches.join(", "),
      suggestion: "Replace with fractional widths (w-full max-w-md) or standard 8pt Tailwind scale values (p-4, p-6, h-12, text-sm, text-base).",
    });
  }

  // 2. Check for AI Purple/Pink Gradient Cliches
  if (
    /from-purple-[456]00/i.test(code) &&
    /to-pink-[456]00/i.test(code)
  ) {
    issues.push({
      severity: "warning",
      category: "colors",
      title: "Generic 'AI Slop' Gradient Detected",
      description: "Code uses standard purple-to-pink gradient. This looks generic and dated.",
      suggestion: "Switch to a clean monochrome surface (bg-white text-black or bg-neutral-900 border border-neutral-800) with a subtle ambient radial glow.",
    });
  }

  // 3. Check for Non-Mobile-First Grids
  const rigidGridMatch = code.match(/grid-cols-[2-6]/g);
  if (rigidGridMatch && !/grid-cols-1/g.test(code)) {
    issues.push({
      severity: "error",
      category: "responsive",
      title: "Missing Mobile Breakpoint on Grid",
      description: "Grid declares multiple columns without defaulting to a single column on mobile.",
      match: rigidGridMatch.join(", "),
      suggestion: "Always use mobile-first grid classes: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'.",
    });
  }

  // 4. Accessibility: Missing alt on img
  if (/<img\b(?![^>]*\balt=)[^>]*>/i.test(code)) {
    issues.push({
      severity: "error",
      category: "accessibility",
      title: "Image Missing 'alt' Attribute",
      description: "Found <img> tag without an accessible alt attribute.",
      suggestion: "Provide descriptive alt text for assistive screen readers.",
    });
  }

  // 5. Accessibility: Buttons with only icons or outline-none without focus ring
  if (/outline-none/i.test(code) && !/focus-visible:ring/i.test(code)) {
    issues.push({
      severity: "warning",
      category: "accessibility",
      title: "Focus Ring Suppressed Without Alternative",
      description: "Found 'outline-none' without a corresponding 'focus-visible:ring' definition.",
      suggestion: "Add 'focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none' to preserve keyboard navigation.",
    });
  }

  // 6. Contrast: Dark mode text too dim
  const dimTextMatches = code.match(/text-(?:gray|neutral|zinc|slate)-[67]00/g);
  if (dimTextMatches && /(?:bg-neutral-950|bg-black|bg-neutral-900|dark)/i.test(code)) {
    issues.push({
      severity: "warning",
      category: "colors",
      title: "Low Contrast Secondary Text on Dark Canvas",
      description: `Detected dark secondary text (${dimTextMatches.slice(0, 3).join(", ")}) on dark background. This fails WCAG AA 4.5:1 ratio.`,
      suggestion: "Use 'text-neutral-400' or 'text-neutral-300' for secondary text on dark surfaces.",
    });
  }

  // 7. Large headings without tight tracking
  if (/text-[4567]xl/i.test(code) && !/tracking-tight/i.test(code)) {
    issues.push({
      severity: "tip",
      category: "typography",
      title: "Display Heading Missing Tight Tracking",
      description: "Large headings look disjointed without tightened character spacing.",
      suggestion: "Add 'tracking-tight' or 'tracking-tighter' alongside large heading text.",
    });
  }

  // Calculate score
  let deductions = 0;
  for (const issue of issues) {
    if (issue.severity === "error") deductions += 20;
    else if (issue.severity === "warning") deductions += 10;
    else if (issue.severity === "tip") deductions += 5;
  }
  const score = Math.max(0, 100 - deductions);
  const passed = score >= 80;

  // Generate markdown report
  let report = `### Mila Review Score: ${score}/100 ${passed ? "✅ PASS" : "⚠️ NEEDS REVISION"}\n\n`;
  if (issues.length === 0) {
    report += "✨ Exceptional quality! No design anti-patterns, contrast flaws, or responsive errors found.\n";
  } else {
    report += `Found **${issues.length}** design opportunities:\n\n`;
    for (const issue of issues) {
      const badge =
        issue.severity === "error"
          ? "🚨 ERROR"
          : issue.severity === "warning"
          ? "⚠️ WARNING"
          : "💡 TIP";
      report += `#### [${badge}] ${issue.title} (${issue.category})\n`;
      report += `- **Observation**: ${issue.description}\n`;
      report += `- **Fix**: \`${issue.suggestion}\`\n\n`;
    }
  }

  return {
    score,
    passed,
    issues,
    summary: `${score}/100 (${issues.length} issues detected)`,
    formattedReport: report,
  };
}
