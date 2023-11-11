"use client";
import { FC, useEffect, useMemo, useState } from "react";
import cn from "classnames";
import * as Form from "@radix-ui/react-form";
import { Switch } from "@/components/Switch/Switch";
import formStyles from "@/styles/form.module.scss";
import styles from "./SurveyForm.module.scss";

export type Survey = {
  diseased: 0 | 1;
  gender: 0 | 1;
  age?: number;
};

type SurveyFormProps = {
  onchange: (data: any) => void;
};

export const SurveyForm: FC<SurveyFormProps> = ({ onchange }) => {
  const [isLoading, setIsLoading] = useState(false);
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
    onchange(transformedData);
  }, [onchange, transformedData]);

  return (
    <Form.Root className={cn(formStyles.form, styles.survey)}>
      <div className={formStyles.row}>
        <Form.Field name="roomName" className={formStyles.field}>
          <Switch
            label="Diseased"
            checked={isDiseased}
            onChange={setIsDiseased}
          />
        </Form.Field>
      </div>

      <div className={formStyles.row}>
        <Form.Field name="roomName" className={formStyles.field}>
          <Switch
            label="Gender (Male?)"
            checked={isMale}
            onChange={setIsMale}
          />
        </Form.Field>
      </div>
      <div className={formStyles.row}>
        <Form.Field
          name="roomTimeout"
          className={cn(formStyles.field, styles.ageField)}
        >
          <Form.Control asChild>
            <input
              type="number"
              value={age}
              className={cn(formStyles.input, styles.ageInput)}
              onChange={(event) => setAge(event.target.value)}
            />
          </Form.Control>
          <Form.Label>Age</Form.Label>
        </Form.Field>

        <div className={formStyles.field}></div>
      </div>
    </Form.Root>
  );
};
