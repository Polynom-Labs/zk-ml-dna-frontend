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
  photoUrl?: string;
};

export const ResearcherCard: FC<ResearcherCardProps> = ({
  className,
  researcher,
  photoUrl,
}) => {
  return (
    <Link href={`/researchers/${researcher.id}`} className={styles.researcher}>
      <aside className={styles.media}>
        <img
          src={researcher.photoUrl || photoUrl || "/images/bg-dna-2.jpg"}
          alt={researcher.name}
          className={styles.poster}
        />
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
