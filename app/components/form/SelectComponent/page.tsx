"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/styles/Form.module.css";

// 階層的選択のためのインターフェース
interface HierarchicalSelectProps {
  labelText: string;
  primaryTitle: string;
  secondaryTitle: string;
  onPrimaryChange: (value: string) => void;
  onSecondaryChange: (value: string) => void;
  primaryValue: string;
  secondaryValue: string;
  primaryOptions?: { label: string; value: string }[];
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

const equipmentData: { [key: string]: { label: string; value: string }[] } = {
  // ... (元のコードと同じなので省略)
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

export const HierarchicalCoffeeSelect: React.FC<HierarchicalSelectProps> = ({
  primaryTitle,
  secondaryTitle,
  onPrimaryChange,
  onSecondaryChange,
  primaryValue,
  secondaryValue,
  primaryOptions = extractionMethodsData,
  labelText,
}) => {
  const getSecondaryOptions = (primaryValue: string) => {
    if (!primaryValue) return [];
    return equipmentData[primaryValue] || [];
  };

  const handlePrimaryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onPrimaryChange(value);
    onSecondaryChange("");
  };

  useEffect(() => {
    const availableEquipment = getSecondaryOptions(primaryValue);
    const isCurrentEquipmentValid =
      secondaryValue === "" ||
      availableEquipment.some(
        (equipment) => equipment.value === secondaryValue
      );

    if (secondaryValue && !isCurrentEquipmentValid) {
      onSecondaryChange("");
    }
  }, [primaryValue, secondaryValue, onSecondaryChange]);

  const secondaryOptions = getSecondaryOptions(primaryValue);

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <label className={styles.label} htmlFor={labelText}>
          {primaryTitle}
        </label>
        <div className={styles.pickerWrapper}>
          <select
            value={primaryValue}
            onChange={handlePrimaryChange}
            className={styles.select}
            id={labelText}
          >
            <option value="">選択してください</option>
            {primaryOptions.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {primaryValue && (
        <div className={styles.selectContainer}>
          <label className={styles.label} htmlFor={labelText}>
            {secondaryTitle}
          </label>
          <div className={styles.pickerWrapper}>
            <select
              value={secondaryValue}
              onChange={(e) => onSecondaryChange(e.target.value)}
              className={styles.select}
              id={labelText}
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
      )}
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

  const [selectedMeasurement, setSelectedMeasurement] = useState<
    MeasurementType | ""
  >(shouldShowChoice ? (value as MeasurementType) || "" : "注湯量");

  useEffect(() => {
    if (shouldShowChoice) {
      setSelectedMeasurement((value as MeasurementType) || "");
    } else if (extractionMethod === "エスプレッソ") {
      setSelectedMeasurement("抽出量");
      onChange("抽出量");
    } else {
      setSelectedMeasurement("注湯量");
      onChange("注湯量");
    }
  }, [extractionMethod, shouldShowChoice, onChange, value]);

  const handlePress = (type: MeasurementType) => {
    setSelectedMeasurement(type);
    onChange(type);
  };

  if (!shouldShowChoice && extractionMethod === "エスプレッソ") {
    return (
      <div className={styles.radioContainer}>
        <label className={styles.label} htmlFor={labelText}>
          {dataTitle}
        </label>
        <div className={styles.fixedContainer}>
          <p className={styles.fixedText}>抽出量（固定）</p>
        </div>
        <p className={styles.selectedValueText}>選択中のタイプ: 抽出量</p>
      </div>
    );
  } else if (!shouldShowChoice && extractionMethod !== "エスプレッソ") {
    return (
      <div className={styles.radioContainer}>
        <label className={styles.label} htmlFor={labelText}>
          {dataTitle}
        </label>
        <div className={styles.fixedContainer}>
          <p className={styles.fixedText}>注湯量（固定）</p>
        </div>
        <p className={styles.selectedValueText}>選択中のタイプ: 注湯量</p>
      </div>
    );
  }

  return (
    <div className={styles.radioContainer}>
      <label className={styles.label} htmlFor={labelText}>
        {dataTitle}
      </label>
      <div className={styles.buttonGroup}>
        <button
          type="button"
          className={`${styles.button} ${
            selectedMeasurement === "注湯量" ? styles.selectedButton : ""
          }`}
          onClick={() => handlePress("注湯量")}
        >
          <span
            className={`${styles.buttonText} ${
              selectedMeasurement === "注湯量" ? styles.selectedButtonText : ""
            }`}
          >
            注湯量
          </span>
        </button>

        <button
          type="button"
          className={`${styles.button} ${styles.rightButton} ${
            selectedMeasurement === "抽出量" ? styles.selectedButton : ""
          }`}
          onClick={() => handlePress("抽出量")}
        >
          <span
            className={`${styles.buttonText} ${
              selectedMeasurement === "抽出量" ? styles.selectedButtonText : ""
            }`}
          >
            抽出量
          </span>
        </button>
      </div>
      <p className={styles.selectedValueText}>
        選択中のタイプ:{" "}
        {selectedMeasurement === ""
          ? "選択されていません"
          : selectedMeasurement}
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
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherInputValue, setOtherInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(value || "");

  const options = [
    { label: "アラビカ種", value: "アラビカ種" },
    { label: "カネフォラ種", value: "カネフォラ種" },
    { label: "リベリカ種", value: "リベリカ種" },
    { label: "複数種類", value: "複数種類" },
    { label: "不明", value: "不明" },
  ];

  useEffect(() => {
    const isOtherSelected = selectedValue === "その他";
    setShowOtherInput(isOtherSelected);
    if (!isOtherSelected) {
      setOtherInputValue("");
      onChange(selectedValue);
    }
  }, [selectedValue, onChange]);

  useEffect(() => {
    if (value) {
      const isStandardOption = options.some((option) => option.value === value);
      if (isStandardOption) {
        setSelectedValue(value);
      } else if (value !== "選択していません。") {
        setSelectedValue("その他");
        setOtherInputValue(value);
      }
    }
  }, [value]);

  const handlePickerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherInputValue(e.target.value);
    if (selectedValue === "その他") {
      onChange(e.target.value);
    }
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
