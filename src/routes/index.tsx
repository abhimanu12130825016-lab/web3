import { createFileRoute } from "@tanstack/react-router";
import { HeroSwitcher } from "@/components/hero-switcher";
import {
  CollectionSection,
  SiteFooter,
  StorySection,
  VisitSection,
  useRevealOnScroll,
} from "@/components/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FOMO Studio — Streetwear, Kolkata" },
      {
        name: "description",
        content:
          "FOMO Studio — an independent streetwear store in Bhowanipore, Kolkata. Browse the collection, the drops and the in-store rail.",
      },
      { property: "og:title", content: "FOMO Studio — Streetwear, Kolkata" },
      {
        property: "og:description",
        content:
          "An independent streetwear store in Bhowanipore, Kolkata. Browse the collection and the in-store rail.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  useRevealOnScroll();
  return (
    <main>
      <HeroSwitcher />
      <CollectionSection />
      <StorySection />
      <VisitSection />
      <SiteFooter />
    </main>
  );
}
