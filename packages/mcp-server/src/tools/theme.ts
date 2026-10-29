import { generateTheme, presetThemes } from "../../../rules/src/index.js";

export function handleGenerateTheme(args: { themeNameOrKeyword?: string }) {
  const query = args.themeNameOrKeyword || "electric-indigo";
  const theme = generateTheme(query);

  const responseText =
    `# Mila Design System Theme: ${theme.name}\n\n` +
    `**Description:** ${theme.description}\n\n` +
    `### Design Tokens\n` +
    `- **Canvas (Base):** \`${theme.tokens.canvas}\`\n` +
    `- **Surface (Cards):** \`${theme.tokens.surface}\`\n` +
    `- **Surface Elevated:** \`${theme.tokens.surfaceElevated}\`\n` +
    `- **Border (Subtle):** \`${theme.tokens.border}\`\n` +
    `- **Border (Highlight):** \`${theme.tokens.borderHighlight}\`\n` +
    `- **Primary Text:** \`${theme.tokens.textPrimary}\`\n` +
    `- **Secondary Text:** \`${theme.tokens.textSecondary}\`\n` +
    `- **Accent Color:** \`${theme.tokens.accent}\` (Hover: \`${theme.tokens.accentHover}\`)\n` +
    `- **Accent Glow:** \`${theme.tokens.accentGlow}\`\n\n` +
    `### Tailwind CSS v4 Theme Block\n` +
    "```css\n" +
    theme.tailwindCssVariables +
    "\n```\n\n" +
    `*Available presets: \`${Object.keys(presetThemes).join("`, `")}\` or pass descriptive keywords like 'crypto', 'dark devtool', 'warm luxury'.*`;

  return {
    content: [
      {
        type: "text" as const,
        text: responseText,
      },
    ],
  };
}
