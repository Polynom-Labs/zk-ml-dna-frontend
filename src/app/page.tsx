import type { Metadata } from "next";
import { ResearchersListLoader } from "@/features/researcher/ResearchersListLoader/ResearchersListLoader";

export const metadata: Metadata = {
  title: "zkMed",
  description: "Ongoing Researches",
};

export default function HomePage() {
  return <ResearchersListLoader />;
}
