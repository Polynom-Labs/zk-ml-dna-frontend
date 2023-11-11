"use client";
import { FC } from "react";
import { Article } from "@/components/Article/Article";
import { Step, Stepper } from "@/components/Stepper/Stepper";

type ResearchSubmissionLoaderProps = {};

export const ResearchSubmissionLoader: FC<
  ResearchSubmissionLoaderProps
> = () => {
  const steps: Step[] = [
    {
      number: 2,
      text: "Connect Wallet",
      isPassed: true,
    },
    {
      number: 3,
      text: "Submit DNA",
      isPassed: true,
    },
    {
      number: 4,
      text: "Provide Personal Information",
      isCurrent: true,
    },
    {
      number: 5,
      text: "Waiting for Results",
    },
    {
      number: 6,
      text: "Claim Aleo Credits",
    },
  ];

  return (
    <Article
      title="Upload your DNA"
      description="Fill in Your Details"
      beforeArticle={<Stepper steps={steps} />}
      backUrl="."
    >
      <Stepper steps={steps} />
    </Article>
  );
};
