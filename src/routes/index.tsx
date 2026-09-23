import { createFileRoute } from "@tanstack/react-router";
import { WeddingInvitation } from "@/components/wedding/WeddingInvitation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Osama & Eman's Wedding — October 8, 2026" },
      { name: "description", content: "You are warmly invited to celebrate the wedding of Osama and Eman at Royal Villa Hall." },
      { property: "og:title", content: "Osama & Eman's Wedding — October 8, 2026" },
      { property: "og:description", content: "Open our invitation and join us for a beautiful evening at Royal Villa Hall." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://id-preview--c331dc56-ce28-4410-a829-bf418d7d7784.lovable.app/wedding-preview.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://id-preview--c331dc56-ce28-4410-a829-bf418d7d7784.lovable.app/wedding-preview.jpg" },
    ],
  }),
  component: Index,
});

function Index() {
  return <WeddingInvitation />;
}
