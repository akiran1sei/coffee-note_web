"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/Form.module.css";
import { NumberComponent } from "@/app/components/form/InputComponent/page";

import {
  ConditionalMeasurementSelector,
  HierarchicalCoffeeSelect,
  MinuteSecondComponent,
  HourComponent,
} from "@/app/components/form/SelectComponent/page";
export const BrewingRecipeComponent = () => {
  const [extractionMethod, setExtractionMethod] = useState("");
  const [equipment, setEquipment] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [brewingFormValue, setBrewingFormValue] = useState({
    extractionMethod: "選択していません。",
    extractionMaker: "選択していません。",
    grindSize: "選択していません。",
    extractionTime: 0,
    temperature: 0,
    coffeeAmount: 0,
    waterAmount: 0,
  });

  return (
    <div className={styles.infoContainer}>
      <h2 className={styles.infoTitle}>抽出レシピ</h2>
      <div className={styles.infoWrapper}>
        {/* まず、抽出方法を選択するコンポーネントを配置 */}
        <HierarchicalCoffeeSelect
          primaryTitle="抽出方法"
          secondaryTitle="抽出器具"
          primaryValue={extractionMethod}
          secondaryValue={equipment}
          onPrimaryChange={setExtractionMethod}
          onSecondaryChange={setEquipment}
          labelText="extractionMethod"
        />
        {/* 抽出方法が選択された場合にのみ、量り方のコンポーネントを表示 */}
        {extractionMethod && (
          <ConditionalMeasurementSelector
            dataTitle="量り方"
            value={measurement}
            onChange={setMeasurement}
            extractionMethod={extractionMethod}
            labelText="measurement"
          />
        )}
        <NumberComponent
          dataTitle="温度（℃）"
          value={brewingFormValue.temperature}
          onChange={(value: number) => {
            setBrewingFormValue({
              ...brewingFormValue,
              temperature: value,
            });
          }}
          labelText="temperature"
        />
        <NumberComponent
          dataTitle="粉量（ｇ）"
          value={brewingFormValue.coffeeAmount}
          onChange={(value: number) => {
            setBrewingFormValue({
              ...brewingFormValue,
              coffeeAmount: value,
            });
          }}
          labelText="coffeeAmount"
        />
        <NumberComponent
          dataTitle="湯量（ｇ）"
          value={brewingFormValue.waterAmount}
          onChange={(value: number) => {
            setBrewingFormValue({
              ...brewingFormValue,
              waterAmount: value,
            });
          }}
          labelText="waterAmount"
        />
        {extractionMethod === "水出し" ? (
          <HourComponent
            dataTitle="水出し抽出時間（時間）"
            onChange={(value: number) =>
              setBrewingFormValue({
                ...brewingFormValue,
                extractionTime: value,
              })
            }
            value={brewingFormValue.extractionTime}
            labelText="extractionTime"
          />
        ) : (
          <MinuteSecondComponent
            dataTitle="抽出時間"
            onChange={(value: number) =>
              setBrewingFormValue({
                ...brewingFormValue,
                extractionTime: value,
              })
            }
            value={brewingFormValue.extractionTime}
            labelText="extractionTime"
          />
        )}
      </div>
    </div>
  );
};
