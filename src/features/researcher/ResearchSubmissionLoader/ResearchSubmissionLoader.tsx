"use client";
import { FC, useCallback, useState } from "react";
import { Article } from "@/components/Article/Article";
import { Step, Stepper } from "@/components/Stepper/Stepper";
import { FileInput } from "@/components/FileInput/FileInput";
import { ProgressActions } from "@/components/ProgressActions/ProgressActions";
import { LoaderOverflow } from "@/components/LoaderOverflow/LoaderOverflow";
import steps from "@/mocks/steps.json";

type ResearchSubmissionLoaderProps = {};

export const ResearchSubmissionLoader: FC<
  ResearchSubmissionLoaderProps
> = () => {
  const stepsList: Step[] = steps;

  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = useCallback((files: File[]) => {
    setFiles(files);
    console.log("FILES CHANGED, DO SOMETHING WITH IT :)");

    // @TODO: Loader Demo
    if (!files.length) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

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
        onChange={handleFileChange}
      />
      <ProgressActions backUrl="." continueUrl="survey" />
      {isLoading && <LoaderOverflow title="Calculation..." />}
    </Article>
  );
};
