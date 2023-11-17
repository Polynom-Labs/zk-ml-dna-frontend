import type { Metadata } from "next";
import { ResearchersListLoader } from "@/features/researcher/ResearchersListLoader/ResearchersListLoader";

export const metadata: Metadata = {
  title: "AleoMed",
  description: "...Description",
};

export default function ResearchersPage() {
  return <ResearchersListLoader />;
}
