"use client";
import { FC, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { ResearchersList } from "../ResearchersList/ResearchersList";
import { Article } from "@/components/Article/Article";
import { Researcher } from "../types";
import researchers from "@/mocks/researchers.json";

type ResearchersListLoaderProps = {};

export const ResearchersListLoader: FC<ResearchersListLoaderProps> = () => {
  const [researchersFromServer, setResearchers] = useState<Researcher[]>([]);
  console.log("🚀 ~ researchersFromServer:", researchersFromServer);

  const getResearches = useCallback(async () => {
    try {
      const response = await axios.get("/researches");
      console.log("🚀 ~ response.data:", response.data);
      setResearchers(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getResearches();
  }, [getResearches]);

  return (
    <Article title="Ongoing Researchers">
      <ResearchersList researchers={researchersFromServer} />
    </Article>
  );
};
