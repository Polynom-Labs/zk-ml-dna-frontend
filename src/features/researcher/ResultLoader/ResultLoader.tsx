"use client";
import { FC } from "react";
import { Article } from "@/components/Article/Article";
import { Step, Stepper } from "@/components/Stepper/Stepper";
import { ProgressActions } from "@/components/ProgressActions/ProgressActions";
import steps from "@/mocks/steps.json";

type ResultLoaderProps = {};

export const ResultLoader: FC<ResultLoaderProps> = () => {
  const stepsList: Step[] = steps;

  return (
    <Article
      title="Waiting for Results"
      beforeArticle={
        <Stepper
          steps={stepsList}
          currentStep="waiting-for-results"
          passedSteps={[
            "connect-wallet",
            "submit-dna",
            "provide-personal-information",
          ]}
        />
      }
      backUrl="./survey"
    >
      <h1>Thank you!</h1>
      <ProgressActions
        backUrl="./survey"
        nextUrl="./claim"
        nextText="Claim Aleo"
      />
    </Article>
  );
};
