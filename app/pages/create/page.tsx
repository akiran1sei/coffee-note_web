"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/Pages.module.css";
import {
  InputComponent,
  NumberComponent,
} from "@/app/components/form/InputComponent/page";
import { RangeComponent } from "@/app/components/form/RangeComponent/page";
import { translationMap } from "@/app/utils/translations";
import { TastingEvaluationComponent } from "@/app/components/itemCard/TastingEvaluation/page";
import {
  ConditionalMeasurementSelector,
  CoffeeProcessingSelect,
  CoffeeTypesSelect,
  HierarchicalCoffeeSelect,
} from "@/app/components/form/SelectComponent/page";
const CreatePage = () => {
  const [extractionMethod, setExtractionMethod] = useState("");
  const [equipment, setEquipment] = useState("");
  const [measurement, setMeasurement] = useState("");

  const [formValue, setFormValue] = useState({
    coffeeName: "",
    productionArea: "",
    variety: "選択していません。",
    roastingDegree: "選択していません。",
    extractionMethod: "選択していません。",
    extractionMaker: "選択していません。",
    grindSize: "選択していません。",
    temperature: 0,
    coffeeAmount: 0,
    waterAmount: 0,
    chart: {
      acidity: 0,
      bitterness: 0,
      overall: 0,
      body: 0,
      aroma: 0,
      aftertaste: 0,
    },
    memo: "",
  });

  return (
    <div className={styles.createPageContents}>
      <h1>Create Page</h1>
      <InputComponent
        dataTitle="コーヒー名"
        value={formValue.coffeeName}
        onChange={(value: string) => {
          setFormValue({ ...formValue, coffeeName: value });
        }}
        labelText="coffeeName"
      />
      <InputComponent
        dataTitle="産地"
        value={formValue.productionArea}
        onChange={(value: string) => {
          setFormValue({ ...formValue, productionArea: value });
        }}
        labelText="productionArea"
      />
      <CoffeeProcessingSelect
        dataTitle="焙煎度"
        value={formValue.roastingDegree}
        onChange={(value: string) => {
          setFormValue({ ...formValue, roastingDegree: value });
        }}
        labelText="roastingDegree"
      />

      <CoffeeTypesSelect
        dataTitle="品種"
        onChange={(value: string) => {
          setFormValue({ ...formValue, variety: value });
        }}
        value={formValue.variety}
        labelText="variety"
      />
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
        value={formValue.temperature}
        onChange={(value: number) => {
          setFormValue({
            ...formValue,
            temperature: value,
          });
        }}
        labelText="temperature"
      />
      <NumberComponent
        dataTitle="粉量（ｇ）"
        value={formValue.coffeeAmount}
        onChange={(value: number) => {
          setFormValue({
            ...formValue,
            coffeeAmount: value,
          });
        }}
        labelText="coffeeAmount"
      />
      <NumberComponent
        dataTitle="湯量（ｇ）"
        value={formValue.waterAmount}
        onChange={(value: number) => {
          setFormValue({
            ...formValue,
            waterAmount: value,
          });
        }}
        labelText="waterAmount"
      />
      <TastingEvaluationComponent />
    </div>
  );
};
export default CreatePage;
