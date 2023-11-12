import { FC, PropsWithChildren } from "react";
import cn from "classnames";
import { Poppins } from "next/font/google";
import { Header } from "@/features/headline/Header/Header";
import { Footer } from "@/features/footer/Footer/Footer";
import styles from "./MainLayout.module.scss";

const PoppinsFont = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

type MainLayoutProps = {};

export const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
}) => {
  return (
    <div className={cn(styles.layout, PoppinsFont.className)}>
      <Header className={styles.header} />
      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
      <Footer className={styles.footer} />
    </div>
  );
};
