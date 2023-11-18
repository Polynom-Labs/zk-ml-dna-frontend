import type { Metadata } from "next";
import { ResearchLoader } from "@/features/researcher/ResearchLoader/ResearchLoader";

export const metadata: Metadata = {
  title: "AleoMed",
  description: "Research description",
};

export default function ResearcherPage() {
  return <ResearchLoader />;
}
