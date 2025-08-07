// components/form/InputComponent.tsx

import React from "react";
import styles from "@/app/styles/Form.module.css";
import { translationMap } from "@/app/utils/translations";

interface InputProps {
  dataTitle: string;
  onChange: (value: string) => void;
  value: string;
  labelText: string;
}

export const InputComponent: React.FC<InputProps> = ({
  dataTitle,
  onChange,
  value,
  labelText,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={labelText}>
        {dataTitle}
      </label>
      <div className={styles.inputBox}>
        <input
          className={styles.input}
          id={labelText}
          type="text"
          onChange={handleInputChange}
          value={value}
          placeholder="入力してください"
          name={translationMap[dataTitle] || dataTitle}
        />
      </div>
    </div>
  );
};
interface NumberProps {
  dataTitle: string;
  onChange: (value: number) => void;
  value: number;
  labelText: string;
}

export const NumberComponent: React.FC<NumberProps> = ({
  dataTitle,
  onChange,
  value,
  labelText,
}) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // inputValueが空文字列（''）の場合に0を返すロジック
    onChange(inputValue === "" ? 0 : Number(inputValue));
  };
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={labelText}>
        {dataTitle}
      </label>
      <div className={styles.inputBox}>
        <input
          className={styles.input}
          type="number"
          id={labelText}
          onChange={handleNumberChange}
          value={String(value)}
          placeholder="入力してください"
          name={translationMap[dataTitle] || dataTitle}
        />
      </div>
    </div>
  );
};
