"use client";
import React from "react";
import styles from "@/app/styles/Form.module.css";
import { InputComponent } from "@/app/components/form/item/InputComponent/page";

import {
  CoffeeProcessingSelect,
  CoffeeTypesSelect,
} from "@/app/components/form/item/SelectComponent/page";

// Propsの型を定義
interface CoffeeBeansComponentProps {
  coffeeInfo: {
    imageUrl: string;
    imageAlt: string;
    coffeeName: string;
    productionArea: string;
  };
  selfInfo: {
    variety: string;
    roastingDegree: string;
  };
  setCoffeeInfo: React.Dispatch<
    React.SetStateAction<{
      imageUrl: string;
      imageAlt: string;
      coffeeName: string;
      productionArea: string;
    }>
  >;
  setSelfInfo: React.Dispatch<
    React.SetStateAction<{
      variety: string;
      roastingDegree: string;
    }>
  >;
}

// 親コンポーネントからpropsとして`coffeeInfo`と`setCoffeeInfo`を受け取る
export const CoffeeBeansComponent = ({
  coffeeInfo,
  selfInfo,
  setCoffeeInfo,
  setSelfInfo,
}: CoffeeBeansComponentProps) => {
  // ローカルステートは不要になるため削除

  return (
    <div className={styles.infoContainer}>
      <h2 className={styles.infoTitle}>珈琲豆の情報</h2>
      <div className={styles.infoWrapper}>
        <InputComponent
          dataTitle="コーヒー名"
          value={coffeeInfo.coffeeName}
          onChange={(value: string) => {
            setCoffeeInfo({
              ...coffeeInfo,
              coffeeName: value,
            });
          }}
          labelText="coffeeName"
        />
        <InputComponent
          dataTitle="産地"
          value={coffeeInfo.productionArea}
          onChange={(value: string) => {
            setCoffeeInfo({
              ...coffeeInfo,
              productionArea: value,
            });
          }}
          labelText="productionArea"
        />
        <CoffeeTypesSelect
          dataTitle="品種"
          onChange={(value: string) => {
            setSelfInfo({
              ...selfInfo,
              variety: value,
            });
          }}
          value={selfInfo.variety}
          labelText="variety"
        />
        <CoffeeProcessingSelect
          dataTitle="焙煎度"
          value={selfInfo.roastingDegree}
          onChange={(value: string) => {
            setSelfInfo({
              ...selfInfo,
              roastingDegree: value,
            });
          }}
          labelText="roastingDegree"
        />
      </div>
    </div>
  );
};
