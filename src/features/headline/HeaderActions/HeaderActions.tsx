"use client";
import { FC } from "react";
import { Flex, Tooltip, IconButton, Button } from "@radix-ui/themes";
import { Envelope, Plus } from "@phosphor-icons/react";
import { SupBadge } from "@/components/SupBadge/SupBadge";
import { HeaderUser } from "../HeaderUser/HeaderUser";
import styles from "./HeaderActions.module.scss";

type HeaderActionsProps = {
  className?: string;
};

export const HeaderActions: FC<HeaderActionsProps> = ({ className }) => {
  return (
    <Flex gap="2" align="center">
      <Button variant="outline" color="gray" className={styles.upload}>
        <Plus weight="bold" /> <span className={styles.uploadText}>Upload</span>
      </Button>

      <HeaderUser />
    </Flex>
  );
};
