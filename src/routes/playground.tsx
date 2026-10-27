import { createFileRoute } from "@tanstack/react-router";
import { PlaygroundPage } from "@/components/playground/playground-page";

export const Route = createFileRoute("/playground")({
  head: () => ({
    meta: [
      { title: "Playground — Sandeep (Sandy)" },
      {
        name: "description",
        content:
          "Interactive infinite canvas of tactile prototypes, movable stickers, sound widgets, and micro-physics by Sandeep (Sandy).",
      },
      { property: "og:title", content: "Playground — Sandeep (Sandy)" },
      {
        property: "og:description",
        content:
          "Interactive canvas of tactile experiments, movable shapes, and micro-physics by Sandeep (Sandy).",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlaygroundPage,
});
