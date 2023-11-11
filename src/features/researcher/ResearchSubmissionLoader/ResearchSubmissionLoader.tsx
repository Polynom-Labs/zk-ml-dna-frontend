"use client";
import { FC, useState } from "react";
import { Article } from "@/components/Article/Article";
import { Step, Stepper } from "@/components/Stepper/Stepper";
import { FileInput } from "@/components/FileInput/FileInput";
import { ProgressActions } from "@/components/ProgressActions/ProgressActions";
import steps from "@/mocks/steps.json";

type ResearchSubmissionLoaderProps = {};

export const ResearchSubmissionLoader: FC<
  ResearchSubmissionLoaderProps
> = () => {
  const stepsList: Step[] = steps;

  const [files, setFiles] = useState<File[]>([]);

  return (
    <Article
      title="Upload your DNA"
      description="Fill in Your Details"
      beforeArticle={
        <Stepper
          steps={stepsList}
          currentStep="submit-dna"
          passedSteps={["connect-wallet"]}
        />
      }
      backUrl="."
    >
      <FileInput
        selectedFiles={files}
        fileTypes={["JPG", "PNG", "GIF"]}
        onChange={setFiles}
      />
      <ProgressActions backUrl="." continueUrl="survey" />
    </Article>
  );
};
