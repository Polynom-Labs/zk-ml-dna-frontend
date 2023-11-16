"use client";
import { FC, useEffect, useMemo, useState } from "react";
import cn from "classnames";
import * as Form from "@radix-ui/react-form";
import formStyles from "@/styles/form.module.scss";
import styles from "./SurveyForm.module.scss";

export type Survey = {
  diseased: 0 | 1;
  gender: 0 | 1;
  age?: number;
};

type SurveyFormProps = {
  onChange: (data: any) => void;
};

export const SurveyForm: FC<SurveyFormProps> = ({ onChange }) => {
  const [isDiseased, setIsDiseased] = useState(false);
  const [isMale, setIsMale] = useState(false);
  const [age, setAge] = useState<string>("");

  const transformedData = useMemo((): Survey => {
    const localAge = Number(age);
    return {
      diseased: isDiseased ? 1 : 0,
      gender: isMale ? 1 : 0,
      age: !isNaN(localAge) ? localAge : undefined,
    };
  }, [age, isDiseased, isMale]);

  useEffect(() => {
    onChange(transformedData);
  }, [onChange, transformedData]);

  return (
    <Form.Root className={cn(formStyles.form, styles.survey)}>
      <div className={formStyles.row}>
        <Form.Field name="roomName" className={formStyles.field}>
          <div className={formStyles.side}>
            <Form.Label className={formStyles.label}>
              Have you ever had cardiovascular deceases?
            </Form.Label>
          </div>
          <div className={formStyles.main}>
            <div className={formStyles.controls}>
              <label className={formStyles.inlineLabel}>
                <input
                  type="radio"
                  name="deceases"
                  onChange={(e) => setIsDiseased(e.target.value === "on")}
                />
                Yes
              </label>
              <label className={formStyles.inlineLabel}>
                <input
                  type="radio"
                  name="deceases"
                  onChange={(e) => setIsDiseased(e.target.value !== "on")}
                />
                No
              </label>
            </div>
          </div>
        </Form.Field>
      </div>

      <div className={formStyles.row}>
        <Form.Field name="roomName" className={formStyles.field}>
          <div className={formStyles.side}>
            <Form.Label className={formStyles.label}>Gender</Form.Label>
          </div>
          <div className={formStyles.main}>
            <div className={formStyles.controls}>
              <label className={formStyles.inlineLabel}>
                <input
                  type="radio"
                  name="gender"
                  onChange={(e) => setIsMale(e.target.value === "on")}
                />
                Male
              </label>
              <label className={formStyles.inlineLabel}>
                <input
                  type="radio"
                  name="gender"
                  onChange={(e) => setIsMale(e.target.value !== "on")}
                />
                Female
              </label>
            </div>
          </div>
        </Form.Field>
      </div>

      <div className={formStyles.row}>
        <Form.Field
          name="roomTimeout"
          className={cn(formStyles.field, styles.ageField)}
        >
          <div className={formStyles.side}>
            <Form.Label className={formStyles.label}>Age</Form.Label>
          </div>
          <div className={formStyles.main}>
            <div className={formStyles.controls}>
              <Form.Control asChild>
                <input
                  type="number"
                  value={age}
                  className={cn(formStyles.input, styles.ageInput)}
                  onChange={(event) => setAge(event.target.value)}
                />
              </Form.Control>
            </div>
          </div>
        </Form.Field>

        <div className={formStyles.field}></div>
      </div>
    </Form.Root>
  );
};
