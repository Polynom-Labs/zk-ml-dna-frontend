"use client";
import { FC } from "react";
import { Article } from "@/components/Article/Article";
import { Step, Stepper } from "@/components/Stepper/Stepper";
import { ProgressActions } from "@/components/ProgressActions/ProgressActions";
import steps from "@/mocks/steps.json";

type ClaimLoaderProps = {};

export const ClaimLoader: FC<ClaimLoaderProps> = () => {
  const stepsList: Step[] = steps;

  return (
    <Article
      title="Claim Aleo Credits"
      beforeArticle={
        <Stepper
          steps={stepsList}
          currentStep="claim-aleo-credits"
          passedSteps={[
            "connect-wallet",
            "submit-dna",
            "provide-personal-information",
            "waiting-for-results",
          ]}
        />
      }
      backUrl="./result"
    >
      <h1>Some content about the claim</h1>
      <ProgressActions backUrl="./result" nextUrl="/" nextText="Claim" />
    </Article>
  );
};
