import { FC } from "react";
import * as SwitchRadix from "@radix-ui/react-switch";
import cn from "classnames";
import styles from "./Switch.module.scss";

type ProgressProps = {
  label?: string;
  checked?: boolean;
  className?: string;
  onChange?: (value: boolean) => void;
};

export const Progress: FC<ProgressProps> = ({
  className,
  label,
  checked,
  onChange,
}) => {
  return (
    <div className={cn(styles.progress, className)}>
      <SwitchRadix.Root
        checked={checked}
        className={styles.SwitchRoot}
        id="airplane-mode"
        onCheckedChange={onChange}
      >
        <SwitchRadix.Thumb className={styles.SwitchThumb} />
      </SwitchRadix.Root>

      {label && (
        <label className={styles.label} htmlFor="airplane-mode">
          {label}
        </label>
      )}
    </div>
  );
};
