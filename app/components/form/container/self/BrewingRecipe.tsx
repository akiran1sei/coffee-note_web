"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/Form.module.css";
import { NumberComponent } from "@/app/components/form/item/InputComponent";

import {
  ConditionalMeasurementSelector,
  ExtractionMakerSelect,
  ExtractionMethodSelect,
  MinuteSecondComponent,
  HourComponent,
  CoffeeProcessingSelect,
} from "@/app/components/form/item/SelectComponent";

interface BrewingRecipeProps {
  extractionInfo: {
    extractionMethod: string;
    extractionMaker: string;
    grindSize: string;
    extractionTime: number;
    temperature: number;
    coffeeAmount: number;
    waterAmount: number;
    measurementMethod: string;
  };
  setExtractionInfo: React.Dispatch<
    React.SetStateAction<{
      extractionMethod: string;
      extractionMaker: string;
      grindSize: string;
      extractionTime: number;
      temperature: number;
      coffeeAmount: number;
      waterAmount: number;
      measurementMethod: string;
    }>
  >;
}

export const BrewingRecipeComponent: React.FC<BrewingRecipeProps> = ({
  extractionInfo,
  setExtractionInfo,
}) => {
  return (
    <div className={styles.infoContainer}>
      <h2 className={styles.infoTitle}>抽出レシピ</h2>
      <div className={styles.infoWrapper}>
        <ExtractionMethodSelect
          primaryValue={extractionInfo.extractionMethod}
          onPrimaryChange={(value) => {
            setExtractionInfo({
              ...extractionInfo,
              extractionMethod: value,
              extractionMaker: "", // 抽出方法が変わったら抽出器具をリセット
            });
          }}
        />
        {/* 抽出方法が選択された場合にのみ抽出器具を表示 */}
        {extractionInfo.extractionMethod && (
          <ExtractionMakerSelect
            primaryValue={extractionInfo.extractionMethod}
            secondaryValue={extractionInfo.extractionMaker}
            onSecondaryChange={(value) => {
              setExtractionInfo({
                ...extractionInfo,
                extractionMaker: value,
              });
            }}
          />
        )}
        {/* 量り方コンポーネントは常に表示、または空文字列の場合に非表示にする */}
        {extractionInfo.extractionMethod !== "" && (
          <ConditionalMeasurementSelector
            dataTitle="量り方"
            value={extractionInfo.measurementMethod}
            onChange={(value) => {
              setExtractionInfo({
                ...extractionInfo,
                measurementMethod: value,
              });
            }}
            extractionMethod={extractionInfo.extractionMethod}
            labelText="measurement"
          />
        )}
        <CoffeeProcessingSelect
          dataTitle="挽き目"
          value={extractionInfo.grindSize}
          onChange={(value: string) => {
            setExtractionInfo({ ...extractionInfo, grindSize: value });
          }}
          labelText="grindSize"
        />

        <NumberComponent
          dataTitle="温度（℃）"
          value={extractionInfo.temperature}
          onChange={(value: number) => {
            setExtractionInfo({
              ...extractionInfo,
              temperature: value,
            });
          }}
          labelText="temperature"
        />
        <NumberComponent
          dataTitle="粉量（ｇ）"
          value={extractionInfo.coffeeAmount}
          onChange={(value: number) => {
            setExtractionInfo({
              ...extractionInfo,
              coffeeAmount: value,
            });
          }}
          labelText="coffeeAmount"
        />
        <NumberComponent
          dataTitle="湯量（ｇ）"
          value={extractionInfo.waterAmount}
          onChange={(value: number) => {
            setExtractionInfo({
              ...extractionInfo,
              waterAmount: value,
            });
          }}
          labelText="waterAmount"
        />
        {/* 抽出方法が「水出し」の場合のみHourComponentを表示 */}
        {extractionInfo.extractionMethod === "水出し" ? (
          <HourComponent
            dataTitle="水出し抽出時間（時間）"
            onChange={(value: number) =>
              setExtractionInfo({
                ...extractionInfo,
                extractionTime: value,
              })
            }
            value={extractionInfo.extractionTime}
            labelText="extractionTime"
          />
        ) : (
          <MinuteSecondComponent
            dataTitle="抽出時間"
            onChange={(value: number) =>
              setExtractionInfo({
                ...extractionInfo,
                extractionTime: value,
              })
            }
            value={extractionInfo.extractionTime}
            labelText="extractionTime"
          />
        )}
      </div>
    </div>
  );
};
