import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/contact/contact-page";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sandy" },
      {
        name: "description",
        content:
          "Leave a note for Sandy. Available for thoughtful product design, UI/UX, and frontend projects.",
      },
      { property: "og:title", content: "Contact — Sandy" },
      {
        property: "og:description",
        content:
          "Leave a note for Sandy. Available for thoughtful product design, UI/UX, and frontend projects.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});
