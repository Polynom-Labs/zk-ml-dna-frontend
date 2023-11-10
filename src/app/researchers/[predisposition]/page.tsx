import type { Metadata } from "next";
import { PredispositionLoader } from "@/features/researcher/PredispositionLoader/PredispositionLoader";

export const metadata: Metadata = {
  title: "Polynom Labs",
  description: "...Description",
};

export default function ResearchersPage() {
  return <PredispositionLoader />;
}
