import type { Metadata } from "next";
import { ClaimLoader } from "@/features/researcher/ClaimLoader/ClaimLoader";

export const metadata: Metadata = {
  title: "zkMed",
  description: "Claim Aleo Credits",
};

export default function ResultPage() {
  return <ClaimLoader />;
}
