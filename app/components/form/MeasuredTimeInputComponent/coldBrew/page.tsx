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
  // hours の状態のみを管理
  const [hours, setHours] = useState<number>(0);

  // 親コンポーネントからの value（合計秒数）を監視し、hoursのstateを更新する
  useEffect(() => {
    if (typeof value === "number" && !isNaN(value)) {
      setHours(Math.floor(value / 3600));
    }
  }, [value]);

  // 時間の入力が変更されたときのハンドラ
  const handleHoursChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newHours = Number(e.target.value);
    setHours(newHours);
    onChange(newHours * 3600); // 変更された時間を合計秒数に変換して親に通知
  };

  // 時間のオプションを生成（ここでは0～23時を想定）
  const hourOptions = generateOptions(23);

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={`${labelText}-hours`}>
        {dataTitle}
      </label>
      <div className={styles.inputBox}>
        {/* 時間の選択 */}
        <select
          className={styles.input}
          id={`${labelText}-hours`}
          onChange={handleHoursChange}
          value={hours}
        >
          <optgroup label="時間">
            {hourOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </optgroup>
        </select>
        <span>時間</span>
      </div>
      <p>合計時間は {hours} 時間です。</p>
    </div>
  );
};
