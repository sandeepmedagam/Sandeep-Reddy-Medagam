import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/about/about-page";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Sandeep (Sandy)" },
      {
        name: "description",
        content:
          "About Sandeep (Sandy) — Product designer & frontend developer who gets excited about making complicated things simple. Bio, story, and work timeline.",
      },
      { property: "og:title", content: "About — Sandeep (Sandy)" },
      {
        property: "og:description",
        content:
          "About Sandeep (Sandy) — Product designer & frontend developer who gets excited about making complicated things simple. Bio, story, and work timeline.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});
