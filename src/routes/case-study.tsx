import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyPage } from "@/components/case-study/case-study-page";

export const Route = createFileRoute("/case-study")({
  head: () => ({
    meta: [
      { title: "Case Studies — Sandeep (Sandy)" },
      {
        name: "description",
        content:
          "Selected case studies by Sandeep (Sandy): Meridian Health, StyleBook, Homestead, and North Light. Thoughtful product design and human-centric software.",
      },
      { property: "og:title", content: "Case Studies — Sandeep (Sandy)" },
      {
        property: "og:description",
        content:
          "Selected case studies by Sandeep (Sandy): Meridian Health, StyleBook, Homestead, and North Light.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CaseStudyPage,
});
