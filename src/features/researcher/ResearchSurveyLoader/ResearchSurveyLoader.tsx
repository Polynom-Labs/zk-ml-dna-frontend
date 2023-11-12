"use client";
import { FC, useCallback, useState } from "react";
import { Article } from "@/components/Article/Article";
import { Step, Stepper } from "@/components/Stepper/Stepper";
import { ProgressActions } from "@/components/ProgressActions/ProgressActions";
import { LoaderOverflow } from "@/components/LoaderOverflow/LoaderOverflow";
import { Survey, SurveyForm } from "../SurveyForm/SurveyForm";
import steps from "@/mocks/steps.json";
import { useLocalStorage } from "react-use";
import { useWallet } from "@/features/wallet/hooks/useWallet";

type ResearchSurveyLoaderProps = {};

export const ResearchSurveyLoader: FC<ResearchSurveyLoaderProps> = () => {
  const stepsList: Step[] = steps;

  const [isSigned, setIsSigned] = useState(false);

  const [dnaValue, setDnaValue, removeDna] = useLocalStorage("dnaCode", "");

  const [surveyData, setSurveyData] = useState<Survey | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { submitBiometricData } = useWallet()();

  const handleSubmit = useCallback(async () => {
    const userData = {
      ...surveyData,
      dnaCode: dnaValue ? JSON.parse(dnaValue) : undefined,
    };
    console.log("start magic");

    submitBiometricData(
      surveyData?.age,
      surveyData?.diseased,
      surveyData?.gender,
      userData.dnaCode
    );
    console.log("finish magic");
    setIsSigned(true);
  }, [dnaValue, submitBiometricData, surveyData]);

  return (
    <Article
      title="Provide Additional Information"
      description="Fill in Your Details"
      beforeArticle={
        <Stepper
          steps={stepsList}
          currentStep="provide-personal-information"
          passedSteps={["connect-wallet", "participate"]}
        />
      }
      backUrl="./submit"
    >
      <SurveyForm onchange={setSurveyData} />
      {!isSigned ? (
        <ProgressActions backUrl="./submit" onSubmit={handleSubmit} />
      ) : (
        <ProgressActions
          backUrl="./submit"
          nextUrl="./result"
          nextText="Continue"
        />
      )}

      {isLoading && <LoaderOverflow title="Calculation..." />}
    </Article>
  );
};
