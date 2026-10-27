import { createFileRoute } from "@tanstack/react-router";
import { JournalPage } from "@/components/journal/journal-page";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — Sandeep (Sandy)" },
      {
        name: "description",
        content:
          "Thoughts on design, architecture, craft, and human-centric software by Sandeep (Sandy). Essays on focus, everyday beauty, and tools.",
      },
      { property: "og:title", content: "Journal — Sandeep (Sandy)" },
      {
        property: "og:description",
        content:
          "Thoughts on design, architecture, craft, and human-centric software by Sandeep (Sandy).",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JournalPage,
});
