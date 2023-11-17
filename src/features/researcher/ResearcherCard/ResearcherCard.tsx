"use client";
import { FC } from "react";
import Link from "next/link";
// import cn from "classnames";
import { Button } from "@radix-ui/themes";
import { Pulse } from "@phosphor-icons/react";
import { Researcher } from "../types";
import styles from "./ResearcherCard.module.scss";

type ResearcherCardProps = {
  className?: string;
  researcher: Researcher;
};

export const ResearcherCard: FC<ResearcherCardProps> = ({
  className,
  researcher,
}) => {
  return (
    <Link href={`/researchers/${researcher.id}`} className={styles.researcher}>
      <aside className={styles.media}>
        {researcher.photoUrl ? (
          <img
            src={researcher.photoUrl}
            alt={researcher.name}
            className={styles.poster}
          />
        ) : (
          <div className={styles.placeholder}>
            <Pulse />
          </div>
        )}
      </aside>

      <header className={styles.content}>
        <h3 className={styles.title}>{researcher.title}</h3>
        <p className={styles.name}>{researcher.name}</p>
      </header>

      <footer className={styles.footer}>
        <span className={styles.price}>
          {researcher.price && <>{researcher.price} ALEO</>}
        </span>
        <Button variant="outline" radius="full">
          Participate
        </Button>
      </footer>
    </Link>
  );
};
