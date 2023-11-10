"use client";
import { FC } from "react";
import { Avatar } from "@radix-ui/themes";
import { Envelope } from "@phosphor-icons/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { UserMenuItem } from "../types";
import styles from "./HeaderUser.module.scss";

type HeaderUserProps = {
  className?: string;
};

export const HeaderUser: FC<HeaderUserProps> = ({ className }) => {
  const menu: UserMenuItem[] = [
    {
      text: "View profile",
      slug: "#profile",
      icon: <Envelope />,
    },
    {
      text: "Settings",
      slug: "#settings",
      icon: <Envelope />,
    },
  ];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.button}>
          <Avatar size="2" color="cyan" fallback="" radius="full" />
          <span className={styles.wallet}>aleo346...fhsdfg</span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.DropdownMenuContent}
          sideOffset={5}
        >
          {menu.map((item) => (
            <DropdownMenu.Item
              className={styles.DropdownMenuItem}
              key={item.slug}
            >
              {item.text}
              {item.rightSlot && (
                <div className={styles.RightSlot}>{item.rightSlot}</div>
              )}
            </DropdownMenu.Item>
          ))}

          <DropdownMenu.Separator className={styles.DropdownMenuSeparator} />

          <DropdownMenu.Item className={styles.DropdownMenuItem}>
            Log out <div className={styles.RightSlot}>⌘+E</div>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className={styles.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
