// components/form/MeasuredTimeInputComponent.tsx
"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/styles/Form.module.css";
// translationMap が使用されていないためコメントアウト
// import { translationMap } from "@/app/utils/translations";

interface TimeInputProps {
  dataTitle: string;
  onChange: (value: number) => void;
  value: number; // 親コンポーネントからの値は合計秒数として扱う
  labelText: string;
}

// 0から59までの配列を生成するヘルパー関数
const generateOptions = (max: number) => {
  const options = [];
  for (let i = 0; i <= max; i++) {
    options.push(i);
  }
  return options;
};

export const MeasuredTimeInputComponent: React.FC<TimeInputProps> = ({
  dataTitle,
  onChange,
  value,
  labelText,
}) => {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  // 親コンポーネントからの value（合計秒数）を監視し、分と秒のstateを更新する
  useEffect(() => {
    if (typeof value === "number" && !isNaN(value)) {
      setMinutes(Math.floor(value / 60));
      setSeconds(value % 60);
    }
  }, [value]);

  // 分の入力が変更されたときのハンドラ
  const handleMinutesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMinutes = Number(e.target.value);
    setMinutes(newMinutes);
    onChange(newMinutes * 60 + seconds);
  };

  // 秒の入力が変更されたときのハンドラ
  const handleSecondsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSeconds = Number(e.target.value);
    setSeconds(newSeconds);
    onChange(minutes * 60 + newSeconds);
  };

  // 分と秒のオプションを生成
  const minuteOptions = generateOptions(5);
  const secondOptions = generateOptions(59);

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputTimeBox}>
        {/* 分の選択 */}
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor={`${labelText}-minutes`}>
            {dataTitle}（分）
          </label>
          <div className={styles.inputBox}>
            <select
              className={styles.input}
              id={`${labelText}-minutes`}
              onChange={handleMinutesChange}
              value={minutes}
            >
              <optgroup label="分">
                {minuteOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
        {/* 秒の選択 */}
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor={`${labelText}-minutes`}>
            {dataTitle}（秒）
          </label>
          <div className={styles.inputBox}>
            <select
              className={styles.input}
              id={`${labelText}-seconds`}
              onChange={handleSecondsChange}
              value={seconds}
            >
              <optgroup label="秒">
                {secondOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      </div>
      <p>
        合計時間は {minutes} 分 {seconds} 秒です。
      </p>
    </div>
  );
};
