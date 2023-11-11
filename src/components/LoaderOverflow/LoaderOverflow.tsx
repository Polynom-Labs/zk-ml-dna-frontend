import { FC, useEffect, useState } from "react";
import cn from "classnames";
import { DnaSpinner } from "../DnaSpinner/DnaSpinner";
import styles from "./LoaderOverflow.module.scss";

type LoaderOverflowProps = {
  title?: string;
  className?: string;
};

export const LoaderOverflow: FC<LoaderOverflowProps> = ({
  title,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 300);
  }, []);

  return (
    <div
      className={cn(styles.loader, { [styles.visible]: isVisible }, className)}
    >
      <div className={styles.view}>
        <DnaSpinner className={styles.spinner} />
        {title && <div className={styles.title}>{title}</div>}
      </div>
    </div>
  );
};
