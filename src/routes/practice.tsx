import { createFileRoute } from "@tanstack/react-router";
import { PracticeApp } from "@/practice/PracticeApp";
import { SITE_NAME, SITE_ORIGIN, OG_IMAGE } from "@/lib/site";

const TITLE = "Name the link — a recognition exercise";
const DESCRIPTION =
  "Ten short scenes for telling the twelve links apart. Misses teach. Not a test of attainment, and not the Wheel of Life.";
const URL = `${SITE_ORIGIN}/practice/`;

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: `${TITLE} · ${SITE_NAME}` },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: PracticePage,
});

function PracticePage() {
  return <PracticeApp />;
}
