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

export const MeasuredTimeInputComponent: React.FC<TimeInputProps> = ({
  dataTitle,
  onChange,
  value,
  labelText,
}) => {
  // 分と秒を別々のstateで管理する
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
  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = e.target.value === "" ? 0 : Number(e.target.value);
    setMinutes(newMinutes);
    // 合計秒数を計算し、親コンポーネントに通知
    onChange(newMinutes * 60 + seconds);
  };

  // 秒の入力が変更されたときのハンドラ
  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSeconds = e.target.value === "" ? 0 : Number(e.target.value);
    setSeconds(newSeconds);
    // 合計秒数を計算し、親コンポーネントに通知
    onChange(minutes * 60 + newSeconds);
  };

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={labelText}>
        {dataTitle}
      </label>
      <div className={styles.inputBox}>
        {/* 分の入力 */}
        <input
          className={styles.input}
          id={`${labelText}-minutes`}
          type="number"
          onChange={handleMinutesChange}
          value={minutes === 0 ? "" : minutes} // 0の場合は空文字にすることで、プレースホルダーが表示されるように
          placeholder="0"
          min="0"
        />
        <span>分</span>
        {/* 秒の入力 */}
        <input
          className={styles.input}
          id={`${labelText}-seconds`}
          type="number"
          onChange={handleSecondsChange}
          value={seconds === 0 ? "" : seconds} // 0の場合は空文字にすることで、プレースホルダーが表示されるように
          placeholder="0"
          min="0"
          max="59" // 秒は59までを推奨
        />
        <span>秒</span>
      </div>
      <p>
        合計時間は {minutes} 分 {seconds} 秒です。
      </p>
    </div>
  );
};
