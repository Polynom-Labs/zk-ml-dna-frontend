"use client";
import { FC } from "react";
import cn from "classnames";
import { Atom, HandEye, Users } from "@phosphor-icons/react";
import { MenuItem, MenuItemName } from "../types";
import styles from "./MainMenu.module.scss";

type MainMenuProps = {
  className?: string;
  isHorizontal?: boolean;
  items: MenuItemName[];
};

export const MainMenu: FC<MainMenuProps> = ({
  className,
  isHorizontal,
  items,
}) => {
  const list: MenuItem[] = [
    {
      name: MenuItemName.RESEARCHERS,
      text: "Researchers",
      slug: "researchers",
      icon: <Users weight="bold" />,
    },
    {
      name: MenuItemName.SUBJECTS,
      text: "Subjects",
      slug: "subjects",
      icon: <Atom weight="bold" />,
      isActive: true,
    },
    {
      name: MenuItemName.PREDICT,
      text: "Predict",
      slug: "predict",
      icon: <HandEye weight="bold" />,
    },
  ];

  const menu = items
    .map((menuItem) => {
      return list.find((item) => item.name === menuItem);
    })
    .filter(Boolean);

  return (
    <nav className={cn(styles.menu, className)}>
      <ul className={cn(styles.list, { [styles.horizontal]: isHorizontal })}>
        {menu.map((item) => (
          <li className={styles.item} key={item?.slug}>
            <a
              className={cn(
                styles.link,
                { [styles.active]: item?.isActive },
                { [styles.upload]: item?.name === MenuItemName.UPLOAD }
              )}
              href={`#${item?.slug}`}
            >
              <span className={styles.icon}>{item?.icon}</span>
              {item?.name !== MenuItemName.UPLOAD && (
                <span className={styles.text}>{item?.text}</span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
