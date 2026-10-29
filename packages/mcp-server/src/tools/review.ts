import { reviewCode } from "../../../review/src/index.js";

export function handleReviewCode(args: { code: string }) {
  if (!args.code || typeof args.code !== "string") {
    return {
      content: [
        {
          type: "text" as const,
          text: "Error: No code provided to audit.",
        },
      ],
    };
  }

  const result = reviewCode(args.code);

  return {
    content: [
      {
        type: "text" as const,
        text: result.formattedReport,
      },
    ],
  };
}
