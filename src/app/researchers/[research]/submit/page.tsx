import type { Metadata } from "next";
import { ResearchSubmissionLoader } from "@/features/researcher/ResearchSubmissionLoader/ResearchSubmissionLoader";

export const metadata: Metadata = {
  title: "zkMed",
  description: "Simple survey",
};

export default function SubmitPage() {
  return <ResearchSubmissionLoader />;
}
