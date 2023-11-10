import { FC } from "react";
import Image from "next/image";
import { Azeret_Mono } from "next/font/google";
import cn from "classnames";
import styles from "./Logo.module.scss";

const Aazeret = Azeret_Mono({ weight: "500", subsets: ["latin"] });

type LogoProps = {
  className?: string;
};

export const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn(styles.logo, Aazeret.className, className)}>
      <svg
        width="512"
        height="512"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.image}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 73.1429C102.149 62.24 162.286 42.3543 256 0C349.714 42.3543 409.851 62.24 512 73.1429C512 161.817 505.977 225.554 483.097 284.011C464.388 331.679 436.672 375.297 401.463 412.48C344.777 472.663 282.411 504.366 256 512C229.589 504.366 167.223 472.663 110.537 412.48C75.3281 375.297 47.6117 331.679 28.9029 284.011C6.02286 225.554 0 161.817 0 73.1429ZM256 401C336.081 401 401 336.081 401 256C401 175.919 336.081 111 256 111C175.919 111 111 175.919 111 256C111 336.081 175.919 401 256 401Z"
        />
        <path d="M156 230H356V282H156V230Z" />
        <path d="M282 156L282 356H230L230 156L282 156Z" />
      </svg>
      Polynom Labs
    </div>
  );
};
