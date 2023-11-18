"use client";
import { FC } from "react";
// import cn from "classnames";
import { Researcher } from "../types";
import styles from "./ResearchersList.module.scss";
import { ResearcherCard } from "../ResearcherCard/ResearcherCard";
import images from "@/mocks/images.json";

type ResearchersListProps = {
  className?: string;
  researchers: Researcher[];
};

export const ResearchersList: FC<ResearchersListProps> = ({
  className,
  researchers,
}) => {
  return (
    <div className={styles.researchers}>
      <ul className={styles.list}>
        {researchers.map((r, index) => (
          <li className={styles.item} key={index}>
            <ResearcherCard
              researcher={r}
              photoUrl={`/images/${images[index]}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
