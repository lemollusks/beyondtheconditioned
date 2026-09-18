import { createFileRoute } from "@tanstack/react-router";
import { StudyApp } from "@/study/StudyApp";
import { SITE_NAME, SITE_URL, SHARE_TITLE, SHARE_DESCRIPTION, OG_IMAGE } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["WebPage", "LearningResource"],
  name: SHARE_TITLE,
  headline: SHARE_TITLE,
  description: SHARE_DESCRIPTION,
  inLanguage: "en",
  isAccessibleForFree: true,
  learningResourceType: "Interactive resource",
  educationalLevel: "Beginner to intermediate",
  teaches:
    "The twelve links of dependent arising (paṭiccasamuppāda) as presented in SN 12.2, with cessation, selected Āgama parallels, and a guided reading list.",
  about: {
    "@type": "Thing",
    name: "Dependent arising",
    alternateName: [
      "Paṭiccasamuppāda",
      "Pratītyasamutpāda",
      "Twelve nidānas",
    ],
  },
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  author: {
    "@type": "Person",
    name: "CONSCERA",
  },
  editor: {
    "@type": "Person",
    name: "CONSCERA",
  },
  url: SITE_URL,
  mainEntityOfPage: SITE_URL,
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  },
  dateModified: "2026-09-18",
  creativeWorkStatus: "Published",
  image: OG_IMAGE,
};

export const Route = createFileRoute("/")({
  head: () => ({
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return <StudyApp />;
}
