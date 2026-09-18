import { createFileRoute } from "@tanstack/react-router";
import { StudyApp } from "@/study/StudyApp";

const DESCRIPTION =
  "Explore the twelve links of dependent arising through an interactive model, a readable study guide, and an annotated scholarly reading list. Grounded in early Buddhist discourses.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["WebPage", "LearningResource"],
  name: "Beyond the Conditioned — Dependent Arising",
  headline: "Dependent arising. The conditions of suffering and release.",
  description: DESCRIPTION,
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
    "@type": "Organization",
    name: "Beyond the Conditioned",
  },
  dateModified: "2026-09-18",
  creativeWorkStatus: "Published",
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
