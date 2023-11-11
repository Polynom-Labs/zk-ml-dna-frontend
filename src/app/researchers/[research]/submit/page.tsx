import type { Metadata } from "next";
import { ResearchSubmissionLoader } from "@/features/researcher/ResearchSubmissionLoader/ResearchSubmissionLoader";

export const metadata: Metadata = {
  title: "Polynom Labs",
  description: "Upload your DNA",
};

export default function ResearchersPage() {
  return <ResearchSubmissionLoader />;
}
