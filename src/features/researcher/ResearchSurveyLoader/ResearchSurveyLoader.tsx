"use client";
import { FC, useState } from "react";
import { Article } from "@/components/Article/Article";
import { Step, Stepper } from "@/components/Stepper/Stepper";
import { ProgressActions } from "@/components/ProgressActions/ProgressActions";
import { LoaderOverflow } from "@/components/LoaderOverflow/LoaderOverflow";
import { SurveyForm } from "../SurveyForm/SurveyForm";
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
      <SurveyForm />
      <ProgressActions backUrl="./submit" nextUrl="result" />
      {isLoading && <LoaderOverflow title="Calculation..." />}
    </Article>
  );
};
