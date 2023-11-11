"use client";
import { FC } from "react";
import { ResearchersList } from "../ResearchersList/ResearchersList";
import { Article } from "@/components/Article/Article";
import researchers from "@/mocks/researchers.json";

type ResearchersListLoaderProps = {};

export const ResearchersListLoader: FC<ResearchersListLoaderProps> = () => {
  return (
    <Article title="Ongoing Researchers">
      <ResearchersList researchers={researchers} />
    </Article>
  );
};
