"use client";
import { FC } from "react";
import { Article } from "@/components/Article/Article";
import { Step, Stepper } from "@/components/Stepper/Stepper";
import { Button } from "@radix-ui/themes";
import steps from "@/mocks/steps.json";
import Link from "next/link";

type ResultLoaderProps = {};

export const ResultLoader: FC<ResultLoaderProps> = () => {
  const stepsList: Step[] = steps;

  return (
    <Article
      title="Your data was submitted"
      beforeArticle={
        <Stepper
          steps={stepsList}
          currentStep="done"
          passedSteps={[
            "connect-wallet",
            "participate",
            "provide-personal-information",
          ]}
        />
      }
      backUrl="/"
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "32px" }}>Thank you!</h1>
        <Link href="/">
          <Button variant="solid" radius="full" size="4">
            See more researches
          </Button>
        </Link>
      </div>
    </Article>
  );
};
