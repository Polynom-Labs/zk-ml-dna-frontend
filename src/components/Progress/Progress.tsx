import { FC, useEffect, useState } from "react";
import * as ProgressRadix from "@radix-ui/react-progress";
import cn from "classnames";
import styles from "./Progress.module.scss";

type ProgressProps = {
  value?: number;
};

export const Progress: FC<ProgressProps> = ({ value = 0 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 500);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <ProgressRadix.Root className={styles.ProgressRoot} value={value}>
      <ProgressRadix.Indicator
        className={styles.ProgressIndicator}
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </ProgressRadix.Root>
  );
};
