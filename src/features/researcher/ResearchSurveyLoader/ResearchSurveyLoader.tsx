"use client";
import { FC, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Article } from "@/components/Article/Article";
import { Step, Stepper } from "@/components/Stepper/Stepper";
import { FileInput } from "@/components/FileInput/FileInput";
import { ProgressActions } from "@/components/ProgressActions/ProgressActions";
import { LoaderOverflow } from "@/components/LoaderOverflow/LoaderOverflow";
import steps from "@/mocks/steps.json";

type ResearchSurveyLoaderProps = {};

export const ResearchSurveyLoader: FC<ResearchSurveyLoaderProps> = () => {
  const stepsList: Step[] = steps;

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Article
      title="Provide Additional Information"
      description="Fill in Your Details"
      beforeArticle={
        <Stepper
          steps={stepsList}
          currentStep="provide-personal-information"
          passedSteps={["connect-wallet", "submit-dna"]}
        />
      }
      backUrl="."
    >
      FORM
      <ProgressActions backUrl="./submit" nextUrl="result" />
      {isLoading && <LoaderOverflow title="Calculation..." />}
    </Article>
  );
};
