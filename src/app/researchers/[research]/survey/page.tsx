import type { Metadata } from "next";
import { ResearchSurveyLoader } from "@/features/researcher/ResearchSurveyLoader/ResearchSurveyLoader";

export const metadata: Metadata = {
  title: "Polynom Labs",
  description: "Provide Additional Information",
};

export default function SurveyPage() {
  return <ResearchSurveyLoader />;
}
