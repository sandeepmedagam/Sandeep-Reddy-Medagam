import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio/portfolio";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sandy — Product Design × Code × AI" },
      {
        name: "description",
        content:
          "Step into Sandy’s design workspace. Explore product design, UI/UX, frontend and GenAI projects that make complex things feel simple.",
      },
      { property: "og:title", content: "Sandy — Product Design × Code × AI" },
      {
        property: "og:description",
        content:
          "Thoughtful products, useful interfaces, and a curious mind. Explore Sandy’s selected work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});
