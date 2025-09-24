"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/styles/Form.module.css";
import { translationMap } from "@/app/utils/translations";

interface ExtractionMethodProps {
  onPrimaryChange: (value: string) => void;
  primaryValue: string;
}

const extractionMethodsData = [
  { label: "ペーパードリップ", value: "ペーパードリップ" },
  { label: "ネルドリップ", value: "ネルドリップ" },
  { label: "ペーパーレスドリッパー", value: "ペーパーレスドリッパー" },
  { label: "フレンチプレス", value: "フレンチプレス" },
  { label: "エアロプレス", value: "エアロプレス" },
  {
    label: "コーヒーメーカー(ドリップ式)",
    value: "コーヒーメーカー(ドリップ式)",
  },
  { label: "サイフォン", value: "サイフォン" },
  { label: "エスプレッソ", value: "エスプレッソ" },
  { label: "モカポット抽出", value: "モカポット抽出" },
  { label: "水出し", value: "水出し" },
];

export const ExtractionMethodSelect: React.FC<ExtractionMethodProps> = ({
  onPrimaryChange,
  primaryValue,
}) => {
  const handlePrimaryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPrimaryChange(e.target.value);
  };

  return (
    <div className={styles.selectContainer}>
      <label
        className={styles.label}
        htmlFor={translationMap["抽出方法"] || "抽出方法"}
      >
        抽出方法
      </label>
      <div className={styles.pickerWrapper}>
        <select
          value={primaryValue}
          onChange={handlePrimaryChange}
          className={styles.select}
          id={translationMap["抽出方法"] || "抽出方法"}
          name={translationMap["抽出方法"] || "抽出方法"}
        >
          <option value="">選択してください</option>
          {extractionMethodsData.map((method) => (
            <option key={method.value} value={method.value}>
              {method.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
interface ExtractionMakerProps {
  onSecondaryChange: (value: string) => void;
  secondaryValue: string;
  primaryValue: string;
}

const equipmentData: { [key: string]: { label: string; value: string }[] } = {
  ペーパードリップ: [
    { label: "ハリオ V60", value: "ハリオ V60" },
    { label: "ハリオ ペガサス", value: "ハリオ ペガサス" },
    { label: "カリタ ウェーブ", value: "カリタ ウェーブ" },
    { label: "カリタ 3つ穴", value: "カリタ 3つ穴" },
    { label: "メリタ 1つ穴", value: "メリタ 1つ穴" },
    { label: "コーノ式", value: "コーノ式" },
    { label: "ORIGAMI", value: "ORIGAMI" },
    { label: "CAFEC フラワー", value: "CAFEC フラワー" },
    { label: "その他", value: "その他" },
  ],
  ネルドリップ: [{ label: "ネルドリップ", value: "ネルドリップ" }],
  ペーパーレスドリッパー: [
    { label: "金属フィルター", value: "金属フィルター" },
    { label: "セラミックフィルター", value: "セラミックフィルター" },
    { label: "その他", value: "その他" },
  ],
  フレンチプレス: [
    { label: "フレンチプレス", value: "フレンチプレス" },
    { label: "その他", value: "その他" },
  ],
  エアロプレス: [{ label: "エアロプレス", value: "エアロプレス" }],
  "コーヒーメーカー(ドリップ式)": [
    { label: "デロンギ ドリップ", value: "デロンギ ドリップ" },
    { label: "メリタ ドリップ", value: "メリタ ドリップ" },
    { label: "カリタ ドリップ", value: "カリタ ドリップ" },
    { label: "象印", value: "象印" },
    { label: "タイガー", value: "タイガー" },
    { label: "バルミューダ The Pot", value: "バルミューダ The Pot" },
    { label: "その他", value: "その他" },
  ],
  サイフォン: [
    { label: "ハリオ", value: "ハリオ" },
    { label: "コーノ", value: "コーノ" },
    { label: "ヤマグラス", value: "ヤマグラス" },
    { label: "その他", value: "その他" },
  ],
  エスプレッソ: [
    { label: "デロンギ", value: "デロンギ" },
    { label: "ガジア", value: "ガジア" },
    { label: "ランチリオ", value: "ランチリオ" },
    { label: "ブレビル", value: "ブレビル" },
    { label: "ラ・パヴォーニ レバー", value: "ラ・パヴォーニ レバー" },
    { label: "その他", value: "その他" },
  ],
  モカポット抽出: [{ label: "マキネッタ", value: "マキネッタ" }],
  水出し: [
    { label: "ハリオ", value: "ハリオ" },
    { label: "キントー", value: "キントー" },
    { label: "ボダム", value: "ボダム" },
    { label: "オクソー", value: "オクソー" },
    { label: "その他", value: "その他" },
  ],
};

export const ExtractionMakerSelect: React.FC<ExtractionMakerProps> = ({
  onSecondaryChange,
  secondaryValue,
  primaryValue,
}) => {
  const getSecondaryOptions = (primaryValue: string) => {
    if (!primaryValue) return [];
    return equipmentData[primaryValue] || [];
  };

  const secondaryOptions = getSecondaryOptions(primaryValue);

  return (
    <div className={styles.selectContainer}>
      <label
        className={styles.label}
        htmlFor={translationMap["抽出器具"] || "抽出器具"}
      >
        抽出器具
      </label>
      <div className={styles.pickerWrapper}>
        <select
          value={secondaryValue}
          onChange={(e) => onSecondaryChange(e.target.value)}
          className={styles.select}
          id={translationMap["抽出器具"] || "抽出器具"}
          name={translationMap["抽出器具"] || "抽出器具"}
        >
          <option value="">選択してください</option>
          {secondaryOptions.map((equipment) => (
            <option key={equipment.value} value={equipment.value}>
              {equipment.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
type MeasurementType = "注湯量" | "抽出量";

interface ConditionalMeasurementProps {
  labelText: string;
  onChange: (value: string) => void;
  dataTitle: string;
  value: string | undefined;
  extractionMethod?: string;
}

export const ConditionalMeasurementSelector: React.FC<
  ConditionalMeasurementProps
> = ({ dataTitle, onChange, value, extractionMethod, labelText }) => {
  const methodsWithChoice = [
    "ペーパードリップ",
    "ペーパーレスドリッパー",
    "ネルドリップ",
    "コーヒーメーカー(ドリップ式)",
  ];

  const shouldShowChoice = methodsWithChoice.includes(extractionMethod || "");

  // 親から渡された `value` を使用し、ローカルステートを削除
  // const [selectedMeasurement, setSelectedMeasurement] = useState<MeasurementType | "">(...);

  useEffect(() => {
    let newValue;

    if (!shouldShowChoice && extractionMethod === "エスプレッソ") {
      newValue = "抽出量";
    } else if (
      !shouldShowChoice &&
      extractionMethod !== "エスプレッソ" &&
      extractionMethod !== "選択していません。"
    ) {
      newValue = "注湯量";
    } else if (shouldShowChoice) {
      // shouldShowChoiceがtrueの場合は、valueをそのまま使用
      return; // この場合はonChangeを呼び出さない
    }

    // 現在の値(value)と新しい値(newValue)が異なる場合のみonChangeを呼び出す
    if (value !== newValue && newValue !== undefined) {
      onChange(newValue);
    }
  }, [extractionMethod, shouldShowChoice, onChange, value]);
  const handlePress = (type: MeasurementType) => {
    onChange(type);
  };

  if (!shouldShowChoice && extractionMethod === "エスプレッソ") {
    return (
      <div className={styles.radioContainer}>
        <p className={styles.label}>{dataTitle}</p>
        <div className={styles.fixedContainer}>
          <p className={styles.fixedText}>抽出量（固定）</p>
        </div>
        <p className={styles.selectedValueText}>選択中のタイプ: 抽出量</p>
      </div>
    );
  } else if (
    !shouldShowChoice &&
    extractionMethod !== "エスプレッソ" &&
    extractionMethod !== "選択していません。"
  ) {
    return (
      <div className={styles.radioContainer}>
        <p className={styles.label}>{dataTitle}</p>
        <div className={styles.fixedContainer}>
          <p className={styles.fixedText}>注湯量（固定）</p>
        </div>
        <p className={styles.selectedValueText}>選択中のタイプ: 注湯量</p>
      </div>
    );
  }

  return (
    <div className={styles.radioContainer}>
      <p className={styles.label}>{dataTitle}</p>
      <div className={styles.buttonGroup}>
        <button
          type="button"
          className={`${styles.button} ${
            value === "注湯量" ? styles.selectedButton : ""
          }`}
          onClick={() => handlePress("注湯量")}
        >
          <span
            className={`${styles.buttonText} ${
              value === "注湯量" ? styles.selectedButtonText : ""
            }`}
          >
            注湯量
          </span>
        </button>

        <button
          type="button"
          className={`${styles.button} ${styles.rightButton} ${
            value === "抽出量" ? styles.selectedButton : ""
          }`}
          onClick={() => handlePress("抽出量")}
        >
          <span
            className={`${styles.buttonText} ${
              value === "抽出量" ? styles.selectedButtonText : ""
            }`}
          >
            抽出量
          </span>
        </button>
      </div>
      <p className={styles.selectedValueText}>
        選択中のタイプ:{" "}
        {value === "" || value === undefined ? "選択されていません" : value}
      </p>
    </div>
  );
};

interface SelectProps {
  dataTitle: string;
  onChange: (value: string) => void;
  value: string;
  labelText: string;
}

export const CoffeeProcessingSelect: React.FC<SelectProps> = ({
  dataTitle,
  onChange,
  value,
  labelText,
}) => {
  const methods = () => {
    if (dataTitle === "焙煎度") {
      return [
        { label: "ライト (浅)", value: "ライト (浅)" },
        { label: "シナモン (浅)", value: "シナモン (浅)" },
        { label: "ミディアム (中浅)", value: "ミディアム (中浅)" },
        { label: "ハイ (中)", value: "ハイ (中)" },
        { label: "シティ (中深)", value: "シティ (中深)" },
        { label: "フルシティ (深)", value: "フルシティ (深)" },
        { label: "フレンチ (深)", value: "フレンチ (深)" },
        { label: "イタリアン (深)", value: "イタリアン (深)" },
        { label: "複数焙煎度", value: "複数焙煎度" },
        { label: "不明", value: "不明" },
      ];
    } else if (dataTitle === "挽き目") {
      return [
        { label: "極細挽き", value: "極細挽き" },
        { label: "細挽き", value: "細挽き" },
        { label: "中細挽き", value: "中細挽き" },
        { label: "中挽き", value: "中挽き" },
        { label: "粗挽き", value: "粗挽き" },
        { label: "極粗挽き", value: "極粗挽き" },
        { label: "複数挽き", value: "複数挽き" },
        { label: "不明", value: "不明" },
      ];
    }
    return [];
  };

  return (
    <div className={styles.selectContainer}>
      <label className={styles.label} htmlFor={labelText}>
        {dataTitle}
      </label>
      <div className={styles.pickerWrapper}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.select}
          id={labelText}
          name={translationMap[dataTitle] || dataTitle}
        >
          <option value="">選択してください</option>
          {methods().map((method) => (
            <option key={method.value} value={method.value}>
              {method.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const CoffeeTypesSelect: React.FC<SelectProps> = ({
  dataTitle,
  onChange,
  value,
  labelText,
}) => {
  const options = [
    { label: "アラビカ種", value: "アラビカ種" },
    { label: "カネフォラ種", value: "カネフォラ種" },
    { label: "リベリカ種", value: "リベリカ種" },
    { label: "複数種類", value: "複数種類" },
    { label: "不明", value: "不明" },
  ];

  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherInputValue, setOtherInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(value || "");

  useEffect(() => {
    const isStandardOption = options.some((option) => option.value === value);

    if (isStandardOption) {
      setSelectedValue(value);
      setOtherInputValue("");
    } else if (value && value !== "選択していません。") {
      setSelectedValue("その他");
      setOtherInputValue(value);
    } else {
      setSelectedValue("");
      setOtherInputValue("");
    }
  }, [value]);

  useEffect(() => {
    setShowOtherInput(selectedValue === "その他");
  }, [selectedValue]);

  const handlePickerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    if (newValue === "その他") {
      setOtherInputValue("");
      onChange("");
    } else {
      onChange(newValue);
    }
  };

  const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setOtherInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={labelText}>
        {dataTitle}
      </label>
      <div className={styles.pickerWrapper}>
        <select
          value={selectedValue}
          onChange={handlePickerChange}
          className={styles.select}
          id={labelText}
          name={translationMap[dataTitle] || dataTitle}
        >
          <option value="">選択してください</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          <option value="その他">その他</option>
        </select>
      </div>
      {showOtherInput && (
        <input
          type="text"
          className={styles.otherInput}
          placeholder="コーヒー豆の種類を入力してください"
          value={otherInputValue}
          onChange={handleOtherInputChange}
        />
      )}
    </div>
  );
};

interface TimeInputProps {
  dataTitle: string;
  onChange: (value: number) => void;
  value: number;
  labelText: string;
}

const generateOptionsHour = (max: number) => {
  const options = [];
  for (let i = 0; i <= max; i++) {
    options.push(i);
  }
  return options;
};

export const HourComponent: React.FC<TimeInputProps> = ({
  dataTitle,
  onChange,
  value,
  labelText,
}) => {
  const [hours, setHours] = useState<number>(0);

  useEffect(() => {
    if (typeof value === "number" && !isNaN(value)) {
      setHours(Math.floor(value / 3600));
    }
  }, [value]);

  const handleHoursChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newHours = Number(e.target.value);
    setHours(newHours);
    onChange(newHours * 3600);
  };

  const hourOptions = generateOptionsHour(23);

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={`${labelText}-hours`}>
        {dataTitle}
      </label>
      <div className={styles.inputBox}>
        <select
          className={styles.input}
          id={`${labelText}-hours`}
          onChange={handleHoursChange}
          value={hours}
          name={translationMap[dataTitle] || dataTitle}
        >
          <optgroup label="時間">
            {hourOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
      <p>合計時間は {hours} 時間です。</p>
    </div>
  );
};

const generateOptionsMinuteSecond = (max: number) => {
  const options = [];
  for (let i = 0; i <= max; i++) {
    options.push(i);
  }
  return options;
};

export const MinuteSecondComponent: React.FC<TimeInputProps> = ({
  dataTitle,
  onChange,
  value,
  labelText,
}) => {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    if (typeof value === "number" && !isNaN(value)) {
      setMinutes(Math.floor(value / 60));
      setSeconds(value % 60);
    }
  }, [value]);

  const handleMinutesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMinutes = Number(e.target.value);
    setMinutes(newMinutes);
    onChange(newMinutes * 60 + seconds);
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSeconds = Number(e.target.value);
    setSeconds(newSeconds);
    onChange(minutes * 60 + newSeconds);
  };

  const minuteOptions = generateOptionsMinuteSecond(10);
  const secondOptions = generateOptionsMinuteSecond(59);

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputTimeBox}>
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
              name={translationMap[dataTitle] || dataTitle}
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
