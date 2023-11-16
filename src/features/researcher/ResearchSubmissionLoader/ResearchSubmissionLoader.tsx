"use client";
import { FC, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "react-use";
import { Article } from "@/components/Article/Article";
import { Step, Stepper } from "@/components/Stepper/Stepper";
import FileInput from "@/components/FileInput/FileInput";
import { ProgressActions } from "@/components/ProgressActions/ProgressActions";
import { LoaderOverflow } from "@/components/LoaderOverflow/LoaderOverflow";
import steps from "@/mocks/steps.json";

type ResearchSubmissionLoaderProps = {};

export const ResearchSubmissionLoader: FC<
  ResearchSubmissionLoaderProps
> = () => {
  const router = useRouter();
  const stepsList: Step[] = steps;

  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dnaData, setDnaData] = useState<string>("");
  // console.log("🚀 ~ dnaData:", dnaData);
  const [dnaCode, setDnaCode] = useState<number[]>([]);
  console.log("🚀 ~ dnaCode:", dnaCode);

  const [dnaValue, setDnaValue, removeDna] = useLocalStorage("dnaCode", "");

  const convertDna = useCallback(
    (content: string) => {
      const code = content.substring(content.indexOf("\n") + 1);
      console.log("raw code part: " + code);
      const first15 = code?.substring(0, 15);
      if (first15?.length !== 15) return;

      const convertCharToNumber = (char: string) => {
        if (char == "T") return 0;
        if (char == "C") return 1;
        if (char == "G") return 2;
        if (char == "A") return 3;
        return -1;
      };

      let result: number[] = [];

      for (let i = 0; i < first15.length; i++) {
        const char = convertCharToNumber(first15[i]);
        if (char > -1) {
          result.push(2 ** char);
        }
      }

      setDnaCode(result);
      setDnaValue(JSON.stringify(result));
    },
    [setDnaValue]
  );

  const handleFileChange = useCallback(
    (files: File[]) => {
      setFiles(files);
      if (!files[0]) return;
      const fileReader = new FileReader();
      fileReader.readAsText(files[0]);
      fileReader.onload = (e) => {
        const contents = e?.target?.result;
        if (contents && typeof contents === "string") {
          setDnaData(contents);
          convertDna(contents);
        }
      };

      // @TODO: Loader Demo
      if (!files.length) return;
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        router.push("./survey");
      }, 3000);
    },
    [convertDna, router]
  );

  return (
    <Article
      title="Upload your DNA"
      description="Fill in Your Details"
      beforeArticle={
        <Stepper
          steps={stepsList}
          currentStep="participate"
          passedSteps={["connect-wallet"]}
        />
      }
      backUrl="."
      isProtected
    >
      <FileInput
        selectedFiles={files}
        fileTypes={["JPG", "PNG", "GIF"]}
        onChange={handleFileChange}
      />
      <ProgressActions
        backUrl="."
        nextUrl="survey"
        nextText="Continue"
        canNext={!!dnaValue}
      />
      {isLoading && <LoaderOverflow title="Calculation..." />}
    </Article>
  );
};
