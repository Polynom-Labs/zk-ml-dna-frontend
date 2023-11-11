import { FC, useCallback, useEffect, useState } from "react";
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
  onChange: (files: File[]) => void;
};

export const FileInput: FC<FileInputProps> = ({
  className,
  fileTypes = ["JPG", "PNG", "GIF"],
  maxFiles = 1,
  selectedFiles,
  onChange,
}) => {
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
    const limit = 8;
    const name = file.name.split(".");
    const ext = name[name.length - 1];
    name.pop();
    const shortName = name.join(".");
    return (
      (shortName.length > limit
        ? shortName.slice(0, limit - 1) + "..."
        : shortName) +
      "." +
      ext
    );
  };

  const remove = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className={cn(styles.fileInput, className)}>
      {selectedFiles?.length === 0 ? (
        <div
          {...getRootProps()}
          className={cn(styles.area, { [styles.active]: isDragActive })}
        >
          <input {...getInputProps()} />

          <div className={styles.content}>
            <div className={styles.title}>Drop your files here</div>
            <div className={styles.or}>or</div>
            <div className={styles.action}>
              <Button
                variant="solid"
                radius="full"
                size="4"
                className={styles.button}
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
              <div className={styles.ext}>
                <Dna />
              </div>
              <div className={styles.fileName}>{getFileName(file)}</div>
              <button className={styles.delete} onClick={() => remove(index)}>
                <XCircle />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
