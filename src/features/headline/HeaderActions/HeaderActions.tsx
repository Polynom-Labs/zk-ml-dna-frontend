"use client";
import { FC } from "react";
import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { Plus } from "@phosphor-icons/react";
import { Wallet } from "@/features/wallet/Wallet";
import styles from "./HeaderActions.module.scss";

type HeaderActionsProps = {
  className?: string;
};

export const HeaderActions: FC<HeaderActionsProps> = ({ className }) => {
  return (
    <div className={styles.actions}>
      <Link href="/researchers/create" className={styles.upload}>
        <Button variant="outline" color="gray" className={styles.uploadButton}>
          <Plus weight="bold" />{" "}
          <span className={styles.uploadText}>
            Create <span className={styles.uploadExtended}>new research</span>
          </span>
        </Button>
      </Link>

      <Wallet />
    </div>
  );
};
