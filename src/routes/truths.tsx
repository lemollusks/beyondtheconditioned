import { createFileRoute } from "@tanstack/react-router";
import { TruthsApp } from "@/truths/TruthsApp";
import { SITE_NAME, SITE_ORIGIN, OG_IMAGE } from "@/lib/site";

const TITLE = "The Four Noble Truths";
const DESCRIPTION =
  "Understand, abandon, realize, develop. The four tasks beside the twelve-link study of dependent arising. Not a test of attainment.";
const URL = `${SITE_ORIGIN}/truths/`;

export const Route = createFileRoute("/truths")({
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
  component: TruthsPage,
});

function TruthsPage() {
  return <TruthsApp />;
}
