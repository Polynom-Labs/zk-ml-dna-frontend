"use client";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import cn from "classnames";
import * as Form from "@radix-ui/react-form";
import FileInput from "@/components/FileInput/FileInput";
import Input from "@/components/Input/Input";
import TextArea from "@/components/TextArea/TextArea";
import formStyles from "@/styles/form.module.scss";
import styles from "./CreateResearchForm.module.scss";

export type NewResearch = {
  title: string;
  description?: string;
  draft: 0 | 1;
};

type CreateResearchFormProps = {
  onChange: (data: any) => void;
};

export const CreateResearchForm: FC<CreateResearchFormProps> = ({
  onChange,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [isDraft, setIsDraft] = useState(false);

  const transformedData = useMemo((): NewResearch => {
    return {
      title,
      description,
      draft: isDraft ? 1 : 0,
    };
  }, [title, description, isDraft]);

  const handleFileChange = useCallback((files: File[]) => {
    setFiles(files);
    if (!files[0]) return;
  }, []);

  useEffect(() => {
    onChange(transformedData);
  }, [onChange, transformedData]);

  return (
    <Form.Root className={cn(formStyles.form, styles.researchForm)}>
      <div className={formStyles.row}>
        <Form.Field name="title" className={formStyles.field}>
          <div className={formStyles.side}>
            <Form.Label className={formStyles.label}>Title *</Form.Label>
          </div>
          <div className={formStyles.main}>
            <div className={formStyles.controls}>
              <Form.Control asChild>
                <Input
                  type="text"
                  value={title}
                  className={cn(formStyles.input)}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </Form.Control>
            </div>
            <div className={formStyles.info}>
              Please, enter the title of your research, 5 characters minimum
            </div>
          </div>
        </Form.Field>
      </div>

      <div className={formStyles.row}>
        <Form.Field name="description" className={formStyles.field}>
          <div className={formStyles.side}>
            <Form.Label className={formStyles.label}>Description</Form.Label>
          </div>
          <div className={formStyles.main}>
            <div className={formStyles.controls}>
              <Form.Control asChild>
                <TextArea
                  value={description}
                  className={cn(formStyles.textarea)}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Form.Control>
            </div>
          </div>
        </Form.Field>
      </div>

      <div className={formStyles.row}>
        <Form.Field name="model" className={formStyles.field}>
          <div className={formStyles.side}>
            <Form.Label className={formStyles.label}>Model *</Form.Label>
          </div>
          <div className={formStyles.main}>
            <div className={formStyles.controls}>
              <Form.Control asChild>
                <FileInput
                  idCompact
                  nameLimit={16}
                  selectedFiles={files}
                  fileTypes={["JPG", "PNG", "GIF"]}
                  onChange={handleFileChange}
                />
              </Form.Control>
            </div>
            <div className={formStyles.info}>Please, load your research</div>
          </div>
        </Form.Field>
      </div>

      <div className={formStyles.row}>
        <Form.Field name="draft" className={formStyles.field}>
          <div className={formStyles.side}>
            <Form.Label className={formStyles.label}>
              Open to submissions?
            </Form.Label>
          </div>
          <div className={formStyles.main}>
            <div className={formStyles.controls}>
              <label className={formStyles.inlineLabel}>
                <input
                  type="radio"
                  name="draft"
                  onChange={(e) => setIsDraft(e.target.value !== "on")}
                />
                Yes
              </label>
              <label className={formStyles.inlineLabel}>
                <input
                  type="radio"
                  name="draft"
                  onChange={(e) => setIsDraft(e.target.value === "on")}
                />
                No
              </label>
            </div>
          </div>
        </Form.Field>
      </div>
    </Form.Root>
  );
};
