"use client";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Article } from "@/components/Article/Article";
import { ResearchCard } from "../ResearchCard/ResearchCard";
import { Researcher } from "../types";
import { useParams } from "next/navigation";
import researcher from "@/mocks/researcher.json";

type ResearchLoaderProps = {};

export const ResearchLoader: FC<ResearchLoaderProps> = () => {
  const { research } = useParams();
  console.log("🚀 ~ research:", research);

  const [researchersFromServer, setResearchers] = useState<Researcher[]>([]);
  console.log("🚀 ~ researchersFromServer:", researchersFromServer);

  const getResearches = useCallback(async () => {
    try {
      const response = await axios.get("/items");
      // console.log("🚀 ~ response.data:", response.data);
      setResearchers(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }, []);

  const item = useMemo(() => {
    const i = researchersFromServer.find(
      (item) => item.id === Number(research)
    );
    return i || null;
  }, [research, researchersFromServer]);
  console.log("🚀 ~ item ~ item:", item);

  useEffect(() => {
    getResearches();
  }, [getResearches]);

  if (!item)
    return (
      <Article title="Research" backUrl=".">
        Not found
      </Article>
    );

  return (
    <Article title="Research" backUrl=".">
      <ResearchCard researcher={item} />
    </Article>
  );
};
