"use client";
import { FC } from "react";
import { Article } from "@/components/Article/Article";
import { Predisposition } from "../PredispositionCard/Predisposition";
import researcher from "@/mocks/researcher.json";

type PredispositionLoaderProps = {};

export const PredispositionLoader: FC<PredispositionLoaderProps> = () => {
  return (
    <Article>
      <Predisposition researcher={researcher} />
    </Article>
  );
};
