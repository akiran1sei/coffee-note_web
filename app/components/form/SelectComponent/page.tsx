// components/form/InputComponent.tsx

import React from "react";
import styles from "@/app/styles/Form.module.css";

interface InputProps {
  dataTitle: string;
  onChange: (value: string) => void;
  value: string;
}

export const InputComponent: React.FC<InputProps> = ({
  dataTitle,
  onChange,
  value,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{dataTitle}</label>
      <input
        className={styles.input}
        type="text"
        onChange={handleInputChange}
        value={value}
        placeholder="入力してください"
      />
    </div>
  );
};
interface NumberProps {
  dataTitle: string;
  onChange: (value: number) => void;
  value: number;
}

export const NumberComponent: React.FC<NumberProps> = ({
  dataTitle,
  onChange,
  value,
}) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // inputValueが空文字列（''）の場合に0を返すロジック
    onChange(inputValue === "" ? 0 : Number(inputValue));
  };
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{dataTitle}</label>
      <input
        className={styles.input}
        type="number"
        onChange={handleNumberChange}
        value={String(value)}
        placeholder="入力してください"
      />
    </div>
  );
};
interface chartProps {
  dataTitle: string;
  onChange: (value: number) => void;
  value: number;
}

export const ChartComponent: React.FC<chartProps> = ({
  dataTitle,
  onChange,
  value,
}) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // inputValueが空文字列（''）の場合に0を返すロジック
    onChange(inputValue === "" ? 0 : Number(inputValue));
  };
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{dataTitle}</label>
      <input
        className={styles.input}
        type="number"
        onChange={handleNumberChange}
        value={String(value)}
        placeholder="入力してください"
      />
    </div>
  );
};
