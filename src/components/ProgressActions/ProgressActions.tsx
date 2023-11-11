"use client";
import { FC } from "react";
import Link from "next/link";
import cn from "classnames";
import { Button } from "@radix-ui/themes";
import styles from "./ProgressActions.module.scss";

type ProgressActionsProps = {
  backUrl?: string;
  continueUrl?: string;
  canBack?: boolean;
  canContinue?: boolean;
  className?: string;
};

export const ProgressActions: FC<ProgressActionsProps> = ({
  backUrl,
  continueUrl,
  canBack = true,
  canContinue = true,
  className,
}) => {
  if (!backUrl && !continueUrl) return null;

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

        {continueUrl && (
          <Link href={continueUrl} className={styles.link}>
            <Button
              variant="solid"
              radius="full"
              size="4"
              disabled={!canContinue}
              className={cn(styles.continue, {
                [styles.disabled]: !canContinue,
              })}
            >
              Continue
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
