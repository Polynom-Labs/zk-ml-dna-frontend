import { FC } from "react";
import cn from "classnames";
import Lottie from "lottie-react";
import DNA from "./dna.json";
import styles from "./DnaSpinner.module.scss";

type DnaSpinnerProps = {
  size?: "default" | "small";
  isHorizontal?: boolean;
  className?: string;
};

export const DnaSpinner: FC<DnaSpinnerProps> = ({
  size = "default",
  isHorizontal,
  className,
}) => {
  return (
    <Lottie
      animationData={DNA}
      loop={true}
      className={cn(
        styles.spinner,
        { [styles.horizontal]: isHorizontal },
        className
      )}
    />
  );
};
