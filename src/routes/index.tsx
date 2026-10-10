import { createFileRoute } from "@tanstack/react-router";
import { WeddingInvitation } from "@/components/wedding/WeddingInvitation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "دعوة خطوبة هايدي & كيرلس" },
      { name: "description", content: "الجمعة ١٦ أكتوبر ٢٠٢٦ – قاعة الملكة" },
      { property: "og:title", content: "دعوة خطوبة هايدي & كيرلس" },
      { property: "og:description", content: "الجمعة ١٦ أكتوبر ٢٠٢٦ – قاعة الملكة" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <WeddingInvitation />;
}
