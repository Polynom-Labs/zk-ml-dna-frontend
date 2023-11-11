import type { Metadata } from "next";
import { ResearchSurveyLoader } from "@/features/researcher/ResearchSurveyLoader/ResearchSurveyLoader";

export const metadata: Metadata = {
  title: "zkMed",
  description: "Provide Additional Information",
};

export default function SurveyPage() {
  return <ResearchSurveyLoader />;
}
