"use client";
import { FC, forwardRef, useCallback, useEffect, useState } from "react";
import cn from "classnames";
import { Button } from "@radix-ui/themes";
import { Dna, PlusCircle, XCircle } from "@phosphor-icons/react";
import { useDropzone } from "react-dropzone";
import styles from "./FileInput.module.scss";

export type FileInputType = "JPG" | "PNG" | "GIF";

type FileInputProps = {
  className?: string;
  fileTypes?: FileInputType[];
  selectedFiles?: File[];
  maxFiles?: number;
  nameLimit?: number;
  idCompact?: boolean;
  onChange: (files: File[]) => void;
};

const FileInput: FC<FileInputProps> = forwardRef(
  (
    {
      className,
      fileTypes = ["JPG", "PNG", "GIF"],
      maxFiles = 1,
      selectedFiles,
      nameLimit = 8,
      idCompact,
      onChange,
      ...rest
    },
    ref
  ) => {
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
      onChange(files);
    }, [files, onChange]);

    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
      },
      [setFiles]
    );

    const config = {
      maxFiles,
      onDrop,
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone(config);

    const getFileName = (file: File) => {
      const name = file.name.split(".");
      const ext = name[name.length - 1];
      name.pop();
      const shortName = name.join(".");
      return (
        (shortName.length > nameLimit
          ? shortName.slice(0, nameLimit - 1) + "..."
          : shortName) +
        "." +
        ext
      );
    };

    const remove = useCallback((e: any, index: number) => {
      e.preventDefault();
      setFiles((prev) => prev.filter((_, i) => i !== index));
    }, []);

    return (
      <div
        className={cn(
          styles.fileInput,
          { [styles.compact]: idCompact },
          className
        )}
      >
        {selectedFiles?.length === 0 ? (
          <div
            {...getRootProps()}
            className={cn(styles.area, { [styles.active]: isDragActive })}
          >
            <input {...getInputProps()} />

            <div className={styles.content}>
              <div className={styles.title}>
                Drop your {maxFiles > 1 ? "files" : "file"} here
              </div>
              <div className={styles.or}>or</div>
              <div className={styles.action}>
                <Button
                  variant="solid"
                  radius="full"
                  size={idCompact ? "2" : "4"}
                  className={styles.button}
                  onClick={(e) => e.preventDefault()}
                >
                  <PlusCircle weight="fill" size={28} />
                  Add Files
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.files}>
            {selectedFiles?.map((file, index) => (
              <div key={file.name} className={styles.file}>
                {!idCompact && (
                  <div className={styles.ext}>
                    <Dna />
                  </div>
                )}
                <div className={styles.fileName}>{getFileName(file)}</div>
                <button
                  className={styles.delete}
                  type="button"
                  onClick={(e) => remove(e, index)}
                >
                  <XCircle />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export default FileInput;
