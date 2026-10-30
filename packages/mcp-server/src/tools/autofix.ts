import { autoFixCode, reviewCode } from "@mila/review";

export function handleAutoFix(args: { code: string }) {
  if (!args.code || typeof args.code !== "string") {
    return {
      content: [
        {
          type: "text" as const,
          text: "Error: No code provided to auto-fix.",
        },
      ],
    };
  }

  const initialReview = reviewCode(args.code);
  const fixedCode = autoFixCode(args.code);
  const postReview = reviewCode(fixedCode);

  const responseText =
    `# Mila Automated Code Repair\n\n` +
    `**Initial Quality Score:** ${initialReview.score}/100\n` +
    `**Repaired Quality Score:** ${postReview.score}/100 ✅\n\n` +
    `### Auto-Corrected Code\n` +
    "```tsx\n" +
    fixedCode +
    "\n```\n\n" +
    `### Issues Resolved:\n` +
    initialReview.issues.map((i) => `- Fixed: **${i.title}** (${i.category})`).join("\n");

  return {
    content: [
      {
        type: "text" as const,
        text: responseText,
      },
    ],
  };
}
