import { getTemplateDetails, registry } from "@mila/registry";

export function handleGetTemplate(args: { templateName: string }) {
  const result = getTemplateDetails(args.templateName);

  if (!result) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Template "${args.templateName}" not found. Available templates: ${registry.templates
            .map((t) => t.name)
            .join(", ")}`,
        },
      ],
    };
  }

  const { template, sourceCode } = result;

  const responseText =
    `# Template: ${template.title} (\`${template.name}\`)\n\n` +
    `**Description:** ${template.description}\n` +
    `**Components Composed:** ${template.componentsUsed.map((c) => `\`${c}\``).join(", ")}\n\n` +
    `### Template Source Code\n` +
    "```tsx\n" +
    sourceCode +
    "\n```\n\n" +
    `*Note: Ensure the dependent components are installed first using \`mila_get_component\`.*`;

  return {
    content: [
      {
        type: "text" as const,
        text: responseText,
      },
    ],
  };
}
