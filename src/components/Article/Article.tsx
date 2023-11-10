import { FC, PropsWithChildren } from "react";
import cn from "classnames";
import { Button } from "@radix-ui/themes";
import { ArrowCircleLeft } from "@phosphor-icons/react";
import styles from "./Article.module.scss";
import Link from "next/link";

type ArticleProps = {
  className?: string;
  title?: string;
  backUrl?: string;
  buttonUrl?: string;
  buttonText?: string;
  onClick?: () => void;
};

export const Article: FC<PropsWithChildren<ArticleProps>> = ({
  className,
  title,
  backUrl,
  buttonUrl,
  buttonText,
  children,
  onClick,
}) => {
  return (
    <article className={cn(styles.article, className)}>
      {(title || (buttonText && onClick)) && (
        <header className={styles.header}>
          {backUrl && (
            <Link href={backUrl} className={styles.back}>
              <ArrowCircleLeft />
            </Link>
          )}
          {title && <h1 className={styles.title}>{title}</h1>}
          {buttonText && (
            <div className={styles.actions}>
              {buttonUrl && !onClick && (
                <Link href={buttonUrl} className={styles.action}>
                  <Button>{buttonText}</Button>
                </Link>
              )}
              {onClick && !buttonUrl && (
                <Button onClick={onClick}>{buttonText}</Button>
              )}
            </div>
          )}
        </header>
      )}
      <section className={styles.content}>{children}</section>
    </article>
  );
};
