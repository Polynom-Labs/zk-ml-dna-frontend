import type { Metadata } from "next";
import { ResearchCreateLoader } from "@/features/researcher/ResearchCreateLoader/ResearchCreateLoader";

export const metadata: Metadata = {
  title: "zkMed",
  description: "Create new research",
};

export default function ResearcherPage() {
  return <ResearchCreateLoader />;
}
