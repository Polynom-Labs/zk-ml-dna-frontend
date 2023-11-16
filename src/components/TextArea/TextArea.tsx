"use client";
import { FC, InputHTMLAttributes, forwardRef, useEffect, useRef } from "react";
import cn from "classnames";
import styles from "./TextArea.module.scss";

type TextAreaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  value: string;
  width?: number;
};

const TextArea: FC<TextAreaProps> = forwardRef(
  ({ className, width, ...rest }, ref) => {
    const textarea = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (width) {
        textarea.current?.style.setProperty(
          "--input-control-width",
          width + "px"
        );
      }
    }, [width]);

    return (
      <textarea
        {...rest}
        ref={textarea}
        className={cn(styles.textarea, className)}
      />
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
