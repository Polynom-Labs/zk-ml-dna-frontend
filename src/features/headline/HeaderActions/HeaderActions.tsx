"use client";
import { FC } from "react";
import { Flex } from "@radix-ui/themes";
import { HeaderUser } from "../HeaderUser/HeaderUser";
import styles from "./HeaderActions.module.scss";

type HeaderActionsProps = {
  className?: string;
};

export const HeaderActions: FC<HeaderActionsProps> = ({ className }) => {
  return (
    <Flex gap="2" align="center">
      <HeaderUser />
    </Flex>
  );
};
