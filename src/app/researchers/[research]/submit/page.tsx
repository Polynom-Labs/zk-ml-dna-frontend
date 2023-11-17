import type { Metadata } from "next";
import { ResearchSubmissionLoader } from "@/features/researcher/ResearchSubmissionLoader/ResearchSubmissionLoader";

export const metadata: Metadata = {
  title: "AleoMed",
  description: "Simple survey",
};

export default function SubmitPage() {
  return <ResearchSubmissionLoader />;
}
