import { getComponentDetails, listComponents } from "../../../registry/src/index.js";

export function handleGetComponent(args: { name: string }) {
  const result = getComponentDetails(args.name);

  if (!result) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Component "${args.name}" not found. Available components: ${listComponents()
            .map((c) => c.name)
            .join(", ")}`,
        },
      ],
    };
  }

  const { entry, sourceCode } = result;

  const responseText =
    `# Component: ${entry.title} (\`${entry.name}\`)\n\n` +
    `**Category:** ${entry.category}\n` +
    `**Description:** ${entry.description}\n` +
    `**Required Packages:** \`${entry.dependencies.join(", ") || "none"}\`\n\n` +
    `### Source Code (\`${entry.files[0]?.name || "Component.tsx"}\`)\n` +
    "```tsx\n" +
    sourceCode +
    "\n```\n\n" +
    `### Agent Implementation Guide\n` +
    `- Copy this component into your project's component directory (e.g. \`components/ui/${entry.name}.tsx\`).\n` +
    `- Ensure Tailwind CSS is configured. Uses standard neutral/dark color tokens.\n` +
    `- Run \`mila_review_code\` after assembling your UI to verify responsive layout and contrast integrity.`;

  return {
    content: [
      {
        type: "text" as const,
        text: responseText,
      },
    ],
  };
}
