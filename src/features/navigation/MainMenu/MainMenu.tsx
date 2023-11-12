"use client";
import { FC } from "react";
import cn from "classnames";
import { Poppins } from "next/font/google";
import { Atom, HandEye, Users } from "@phosphor-icons/react";
import { MenuItem, MenuItemName } from "../types";
import styles from "./MainMenu.module.scss";

const PoppinsFont = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

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
      isActive: true,
    },
    {
      name: MenuItemName.SUBJECTS,
      text: "Subjects",
      slug: "subjects",
      icon: <Atom weight="bold" />,
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
    <nav className={cn(styles.menu, PoppinsFont.className, className)}>
      <ul className={cn(styles.list, { [styles.horizontal]: isHorizontal })}>
        {menu.map((item) => (
          <li className={styles.item} key={item?.slug}>
            <a
              className={cn(
                styles.link,
                { [styles.active]: item?.isActive },
                { [styles.upload]: item?.name === MenuItemName.UPLOAD }
              )}
              href={`/${item?.slug}`}
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
