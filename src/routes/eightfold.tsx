import { createFileRoute } from "@tanstack/react-router";
import { EightfoldApp } from "@/eightfold/EightfoldApp";
import { SITE_NAME, SITE_ORIGIN, OG_IMAGE } from "@/lib/site";

const TITLE = "The Noble Eightfold Path";
const DESCRIPTION =
  "Wisdom, ethical conduct, and mental cultivation. The eight factors beside the twelve-link study. Not a test of attainment.";
const URL = `${SITE_ORIGIN}/eightfold/`;

export const Route = createFileRoute("/eightfold")({
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
  component: EightfoldPage,
});

function EightfoldPage() {
  return <EightfoldApp />;
}
