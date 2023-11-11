"use client";
import { FC } from "react";
import { Article } from "@/components/Article/Article";
import { ResearchCard } from "../ResearchCard/ResearchCard";
import researcher from "@/mocks/researcher.json";

type ResearchLoaderProps = {};

export const ResearchLoader: FC<ResearchLoaderProps> = () => {
  return (
    <Article title="Research" backUrl=".">
      <ResearchCard researcher={researcher} />
    </Article>
  );
};
