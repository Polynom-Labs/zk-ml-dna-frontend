import type { Metadata } from "next";
import { ResearchersListLoader } from "@/features/researcher/ResearchersListLoader/ResearchersListLoader";

export const metadata: Metadata = {
  title: "Twype - Speak Freely",
  description: "...Description",
};

export default function ResearchersPage() {
  return (
    <div>
      <h1>Researchers</h1>
      <ResearchersListLoader />
    </div>
  );
}
