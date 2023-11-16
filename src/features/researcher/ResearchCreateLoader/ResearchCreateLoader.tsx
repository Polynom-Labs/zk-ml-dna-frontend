"use client";
import { FC, useCallback, useMemo, useState } from "react";
import { Article } from "@/components/Article/Article";
import { useWallet } from "@/features/wallet/hooks/useWallet";
import {
  CreateResearchForm,
  NewResearch,
} from "@/features/researcher/CreateResearchForm/CreateResearchForm";
import { ProgressActions } from "@/components/ProgressActions/ProgressActions";
import { LoaderOverflow } from "@/components/LoaderOverflow/LoaderOverflow";

type ResearchCreateLoaderProps = {};

export const ResearchCreateLoader: FC<ResearchCreateLoaderProps> = () => {
  const { address } = useWallet()();
  const [researchData, setResearchData] = useState<NewResearch | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const isDataValid = useMemo(() => {
    return !!researchData?.title && researchData?.title?.length > 5;
  }, [researchData]);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    console.log("TAKE MY NEW RESEARCH!", researchData);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [researchData]);

  return (
    <Article
      title="Create new research"
      description="Fill in Your Details"
      backUrl="/"
      isProtected
    >
      <CreateResearchForm onChange={setResearchData} />
      <ProgressActions canNext={isDataValid} onSubmit={handleSubmit} />

      {isLoading && <LoaderOverflow title="Calculation..." />}
    </Article>
  );
};
