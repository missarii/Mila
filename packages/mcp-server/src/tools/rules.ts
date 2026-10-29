import { getFullMarkdownDoc, rulesManifest } from "../../../rules/src/index.js";

export function handleGetRules(args: { topic?: string }) {
  const topic = args.topic || "all";

  if (topic === "all") {
    let summary = "# Mila AI UI/UX Design System Rules\n\n";
    summary += "Mila equips AI coding agents with strict design tokens and rules to prevent visual slop.\n\n";
    for (const cat of rulesManifest.categories) {
      summary += `### ${cat.title} (\`${cat.id}\`)\n`;
      summary += `${cat.summary}\n`;
      for (const r of cat.rules) {
        summary += `- **[${r.severity.toUpperCase()}]** ${r.rule}\n`;
      }
      summary += "\n";
    }
    summary += "\n*For full detailed markdown guides, query specific topics: `typography`, `colors`, `layout`, `accessibility`, or `anti-patterns`.*";

    return {
      content: [
        {
          type: "text" as const,
          text: summary,
        },
      ],
    };
  }

  const doc = getFullMarkdownDoc(topic);
  return {
    content: [
      {
        type: "text" as const,
        text: doc,
      },
    ],
  };
}
