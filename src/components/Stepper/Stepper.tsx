import { FC } from "react";
import cn from "classnames";
import styles from "./Stepper.module.scss";

export type Step = {
  slug: string;
  text: string;
  number: number;
  isPassed?: boolean;
  isCurrent?: boolean;
};

type StepperProps = {
  className?: string;
  steps: Step[];
  currentStep?: string;
  passedSteps?: string[];
};

export const Stepper: FC<StepperProps> = ({
  className,
  steps,
  currentStep,
  passedSteps,
}) => {
  return (
    <div className={styles.stepper}>
      <ol className={styles.list}>
        {steps.map((step) => (
          <li
            className={cn(
              styles.item,
              { [styles.passed]: passedSteps?.includes(step.slug) },
              { [styles.current]: step.slug === currentStep }
            )}
            key={step.slug}
          >
            <div className={styles.number}>{step.number}</div>
            <div className={styles.text}>{step.text}</div>
          </li>
        ))}
      </ol>
    </div>
  );
};
