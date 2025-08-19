import React from "react";
import styles from "@/app/styles/Form.module.css";
import { translationMap } from "@/app/utils/translations";
import { OnClickButton } from "@/app/components/buttons/page";
interface rangeProps {
  dataTitle: string;
  onChange: (value: number) => void;
  value: number;
  labelText: string;
  min: number;
  max: number;
  step: number;
}

export const RangeComponent: React.FC<rangeProps> = ({
  dataTitle,
  onChange,
  value,
  labelText,
  min,
  max,
  step,
}) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(Number(inputValue));
  };

  const tickValues = [];
  for (let i = min; i <= max; i += step) {
    tickValues.push(i);
  }

  const handleButtonClick = (type: "increment" | "decrement") => {
    let newValue = type === "increment" ? value + step : value - step;
    newValue = Math.max(min, Math.min(max, newValue));
    onChange(parseFloat(newValue.toFixed(1)));
  };

  const className = translationMap[dataTitle] || dataTitle;

  return (
    <div className={`${styles.inputContainer} ${styles[className]}`}>
      <label className={styles.label} htmlFor={labelText}>
        {dataTitle}
      </label>
      <div className={styles.sliderContainer}>
        <div className={styles.valueTextContainer}>
          <span className={styles.valueText}>{value.toFixed(1)}</span>
        </div>
        <div className={styles.sliderAndButtons}>
          <OnClickButton
            textValue="remove"
            onClick={() => handleButtonClick("decrement")}
            buttonColor="btn-secondary"
            iconWidth="iconMd"
          />
          <div className={styles.sliderWrapper}>
            <div className={styles.tickContainer}>
              {tickValues.map((tick) => (
                <div
                  key={tick}
                  className={`${styles.tick} ${
                    tick % 1 === 0 ? styles.majorTick : styles.minorTick
                  } ${value === tick ? styles.activeTick : ""}`}
                >
                  {tick % 1 === 0 && (
                    <span className={styles.tickLabel}>{tick}</span>
                  )}
                </div>
              ))}
            </div>
            <input
              className={styles.rangeInput}
              type="range"
              id={labelText}
              onChange={handleNumberChange}
              value={String(value)}
              name={translationMap[dataTitle] || dataTitle}
              min={min}
              max={max}
              step={step}
            />
          </div>

          <OnClickButton
            textValue="add"
            onClick={() => handleButtonClick("increment")}
            buttonColor="btn-secondary"
            iconWidth="iconMd"
          />
        </div>
      </div>
    </div>
  );
};
