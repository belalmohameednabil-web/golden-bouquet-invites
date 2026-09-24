import { createFileRoute } from "@tanstack/react-router";
import { WeddingInvitation } from "@/components/wedding/WeddingInvitation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "دعوة زفاف Osama & Eman" },
      { name: "description", content: "الخميس ٨ أكتوبر ٢٠٢٦ – قاعة رويال فيلا" },
      { property: "og:title", content: "دعوة زفاف Osama & Eman" },
      { property: "og:description", content: "الخميس ٨ أكتوبر ٢٠٢٦ – قاعة رويال فيلا" },
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
