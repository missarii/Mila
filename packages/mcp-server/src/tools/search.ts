import { searchComponents, listComponents } from "../../../registry/src/index.js";

export function handleSearch(args: { query?: string; category?: string }) {
  const query = args.query || "";
  const category = args.category;
  const results = searchComponents(query, category);

  if (results.length === 0) {
    return {
      content: [
        {
          type: "text" as const,
          text: `No Mila components found matching query: "${query}" in category: "${category || "all"}". Available components: ${listComponents()
            .map((c) => c.name)
            .join(", ")}`,
        },
      ],
    };
  }

  const formatted = results
    .map(
      (c) =>
        `### ${c.title} (\`${c.name}\`)\n` +
        `- **Category**: ${c.category}\n` +
        `- **Description**: ${c.description}\n` +
        `- **Tags**: ${c.tags.join(", ")}\n` +
        `- **Dependencies**: ${c.dependencies.join(", ") || "none"}`
    )
    .join("\n\n");

  return {
    content: [
      {
        type: "text" as const,
        text: `Found ${results.length} Mila component(s):\n\n${formatted}\n\n*Use \`mila_get_component\` with any component name to retrieve its source code.*`,
      },
    ],
  };
}
