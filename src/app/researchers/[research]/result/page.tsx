import type { Metadata } from "next";
import { ResultLoader } from "@/features/researcher/ResultLoader/ResultLoader";

export const metadata: Metadata = {
  title: "zkMed",
  description: "Waiting for Results",
};

export default function ResultPage() {
  return <ResultLoader />;
}
