"use client";
import { FC } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
// import cn from "classnames";
import { Button } from "@radix-ui/themes";
import { Pulse } from "@phosphor-icons/react";
import { Researcher } from "../types";
import styles from "./ResearchCard.module.scss";

type ResearchCardProps = {
  className?: string;
  researcher: Researcher;
};

export const ResearchCard: FC<ResearchCardProps> = ({
  className,
  researcher,
}) => {
  const { research } = useParams();
  console.log("🚀 ~ research:", research);

  return (
    <div className={styles.predisposition}>
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
        <h1 className={styles.title}>{researcher.title}</h1>
        <p className={styles.name}>{researcher.name}</p>
      </header>

      <aside className={styles.info}>
        <div className={styles.status}>
          {researcher.status === "available" && (
            <div className={styles.badge}>Open to submissions</div>
          )}
        </div>
        <span className={styles.price}>
          {researcher.price && <>{researcher.price} ALEO</>}
        </span>
      </aside>

      {researcher.description && (
        <section className={styles.description}>
          <h3>Research Description</h3>
          <p>{researcher.description}</p>
        </section>
      )}

      <footer className={styles.footer}>
        <Link
          href={`/researchers/${research}/submit`}
          className={styles.submitLink}
        >
          <Button
            variant="solid"
            radius="full"
            size="4"
            className={styles.submit}
          >
            Submit DNA
          </Button>
        </Link>
      </footer>
    </div>
  );
};
