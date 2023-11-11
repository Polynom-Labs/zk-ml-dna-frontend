import { FC } from "react";
import cn from "classnames";
import styles from "./Stepper.module.scss";

export type Step = {
  text: string;
  number: number;
  isPassed?: boolean;
  isCurrent?: boolean;
};

type StepperProps = {
  className?: string;
  steps: Step[];
};

export const Stepper: FC<StepperProps> = ({ className, steps }) => {
  return (
    <div className={styles.stepper}>
      <ol className={styles.list}>
        {steps.map((step, index) => (
          <li
            className={cn(
              styles.item,
              { [styles.passed]: step.isPassed },
              { [styles.current]: step.isCurrent }
            )}
            key={index}
          >
            <div className={styles.number}>{step.number}</div>
            <div className={styles.text}>{step.text}</div>
          </li>
        ))}
      </ol>
    </div>
  );
};
