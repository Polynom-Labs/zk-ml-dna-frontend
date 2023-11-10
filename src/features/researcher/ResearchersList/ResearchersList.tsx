"use client";
import { FC } from "react";
// import cn from "classnames";
import { Researcher } from "../types";
import styles from "./ResearchersList.module.scss";
import { ResearcherCard } from "../ResearcherCard/ResearcherCard";

type ResearchersListProps = {
  className?: string;
  researchers: Researcher[];
};

export const ResearchersList: FC<ResearchersListProps> = ({
  className,
  researchers,
}) => {
  console.log("🚀 ~ researchers:", researchers);
  return (
    <div className={styles.researchers}>
      <ul className={styles.list}>
        {researchers.map((r, index) => (
          <li className={styles.item} key={index}>
            <ResearcherCard researcher={r} />
          </li>
        ))}
      </ul>
    </div>
  );
};
