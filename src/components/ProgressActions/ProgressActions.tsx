"use client";
import { FC } from "react";
import Link from "next/link";
import cn from "classnames";
import { Button } from "@radix-ui/themes";
import styles from "./ProgressActions.module.scss";

type ProgressActionsProps = {
  backUrl?: string;
  nextUrl?: string;
  nextText?: string;
  canBack?: boolean;
  canNext?: boolean;
  className?: string;
};

export const ProgressActions: FC<ProgressActionsProps> = ({
  backUrl,
  nextUrl,
  canBack = true,
  canNext = true,
  nextText = "Submit",
  className,
}) => {
  if (!backUrl && !nextUrl) return null;

  return (
    <div className={styles.progress}>
      <div className={styles.actions}>
        {backUrl && (
          <Link href={backUrl} className={styles.link}>
            <Button
              variant="soft"
              radius="full"
              size="4"
              disabled={!canBack}
              className={styles.back}
            >
              Back
            </Button>
          </Link>
        )}

        {nextUrl && (
          <Link href={nextUrl} className={styles.link}>
            <Button
              variant="solid"
              radius="full"
              size="4"
              disabled={!canNext}
              className={cn(styles.continue, {
                [styles.disabled]: !canNext,
              })}
            >
              {nextText}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
