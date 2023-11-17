import type { Metadata } from "next";
import { ResearchSurveyLoader } from "@/features/researcher/ResearchSurveyLoader/ResearchSurveyLoader";

export const metadata: Metadata = {
  title: "AleoMed",
  description: "Provide Additional Information",
};

export default function SurveyPage() {
  return <ResearchSurveyLoader />;
}
