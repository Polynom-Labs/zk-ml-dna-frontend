"use client";
import { FC, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const [dnaValue, setDnaValue, removeDna] = useLocalStorage("dnaCode", "");
  console.log("🚀 ~ dnaValue:", dnaValue);

  const [surveyData, setSurveyData] = useState<Survey | null>(null);
  console.log("🚀 ~ surveyData:", surveyData);

  const [isLoading, setIsLoading] = useState(false);

  const { submitBiometricData } = useWallet()();

  const handleSubmit = useCallback(async () => {
    const userData = {
      ...surveyData,
      dnaCode: dnaValue ? JSON.parse(dnaValue) : undefined,
    };
    console.log("DO SOMETHING WITH", userData);
    console.log("start magic");

    submitBiometricData(
      surveyData?.age,
      surveyData?.diseased,
      surveyData?.gender,
      userData.dnaCode
    );
    console.log("finish magic");
    router.push("./result");
  }, [dnaValue, router, submitBiometricData, surveyData]);

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
      <ProgressActions backUrl="./submit" onSubmit={handleSubmit} />
      {isLoading && <LoaderOverflow title="Calculation..." />}
    </Article>
  );
};
