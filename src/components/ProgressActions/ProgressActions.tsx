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
  onSubmit?: () => void;
};

export const ProgressActions: FC<ProgressActionsProps> = ({
  className,
  backUrl,
  nextUrl,
  canBack = true,
  canNext = true,
  nextText = "Submit",
  onSubmit,
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
        {onSubmit && (
          <Button
            variant="solid"
            radius="full"
            size="4"
            disabled={!canNext}
            onClick={onSubmit}
            className={cn(styles.continue, {
              [styles.disabled]: !canNext,
            })}
          >
            {nextText}
          </Button>
        )}
      </div>
    </div>
  );
};
