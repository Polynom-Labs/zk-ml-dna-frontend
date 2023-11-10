"use client";
import { FC } from "react";
import { Researcher } from "../types";
import { ResearchersList } from "../ResearchersList/ResearchersList";
import researchers from "@/mocks/researchers.json";

type ResearchersListLoaderProps = {};

export const ResearchersListLoader: FC<ResearchersListLoaderProps> = () => {
  return <ResearchersList researchers={researchers} />;
};
