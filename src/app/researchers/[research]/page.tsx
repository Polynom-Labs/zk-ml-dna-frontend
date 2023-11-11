import type { Metadata } from "next";
import { ResearchLoader } from "@/features/researcher/ResearchLoader/ResearchLoader";

export const metadata: Metadata = {
  title: "zkMed",
  description: "...Description",
};

export default function ResearcherPage() {
  return <ResearchLoader />;
}
