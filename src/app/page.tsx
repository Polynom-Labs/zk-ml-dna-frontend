import type { Metadata } from "next";
import { ResearchersListLoader } from "@/features/researcher/ResearchersListLoader/ResearchersListLoader";

export const metadata: Metadata = {
  title: "AleoMed",
  description: "Ongoing Research Projects",
};

export default function HomePage() {
  return <ResearchersListLoader />;
}
