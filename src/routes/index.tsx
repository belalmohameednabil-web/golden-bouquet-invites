import { createFileRoute } from "@tanstack/react-router";
import { WeddingInvitation } from "@/components/wedding/WeddingInvitation";
import previewImage from "@/assets/osama-eman-wedding-preview.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Osama & Eman's Wedding — October 8, 2026" },
      { name: "description", content: "You are warmly invited to celebrate the wedding of Osama and Eman at Royal Villa Hall." },
      { property: "og:title", content: "Osama & Eman's Wedding — October 8, 2026" },
      { property: "og:description", content: "Open our invitation and join us for a beautiful evening at Royal Villa Hall." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  void previewImage;
  return <WeddingInvitation />;
}
