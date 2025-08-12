// components/form/TextAreaComponent.tsx

import React from "react";
import styles from "@/app/styles/Form.module.css";
import { translationMap } from "@/app/utils/translations";

interface TextAreaProps {
  dataTitle: string;
  onChange: (value: string) => void;
  value: string;
  labelText: string;
}

export const TextAreaComponent: React.FC<TextAreaProps> = ({
  dataTitle,
  onChange,
  value,
  labelText,
}) => {
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.textareaContainer}>
      <label className={styles.label} htmlFor={labelText}>
        {dataTitle}
      </label>
      <div className={styles.textareaBox}>
        <textarea
          name={translationMap[dataTitle] || dataTitle}
          id={labelText}
          onChange={handleTextareaChange}
          value={value}
          placeholder="入力してください"
        />
      </div>
    </div>
  );
};
