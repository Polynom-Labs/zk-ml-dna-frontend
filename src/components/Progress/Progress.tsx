import { FC, useEffect, useState } from "react";
import * as ProgressRadix from "@radix-ui/react-progress";
import cn from "classnames";
import styles from "./Progress.module.scss";

type ProgressProps = {};

export const Progress: FC<ProgressProps> = () => {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ProgressRadix.Root className={styles.ProgressRoot} value={progress}>
      <ProgressRadix.Indicator
        className={styles.ProgressIndicator}
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </ProgressRadix.Root>
  );
};
