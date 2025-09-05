"use client";
import React from "react";
import styles from "@/app/styles/Form.module.css";
import { InputComponent } from "@/app/components/form/item/InputComponent/page";

import {
  CoffeeProcessingSelect,
  CoffeeTypesSelect,
} from "@/app/components/form/item/SelectComponent/page";
import ImageUpload from "@/app/components/form/item/ImageUpload/page";

// Propsの型を定義
interface CoffeeBeansComponentProps {
  coffeeInfo: {
    imageUrl: string;
    coffeeName: string;
    productionArea: string;
    variety: string;
    roastingDegree: string;
  };
  setCoffeeInfo: React.Dispatch<
    React.SetStateAction<{
      imageUrl: string;
      coffeeName: string;
      productionArea: string;
      variety: string;
      roastingDegree: string;
    }>
  >;
}

// 親コンポーネントからpropsとして`coffeeInfo`と`setCoffeeInfo`を受け取る
export const CoffeeBeansComponent = ({
  coffeeInfo,
  setCoffeeInfo,
}: CoffeeBeansComponentProps) => {
  // ローカルステートは不要になるため削除

  return (
    <div className={styles.infoContainer}>
      <h2 className={styles.infoTitle}>珈琲豆の情報</h2>
      <div className={styles.infoWrapper}>
        <ImageUpload
          onChange={(value: string) => {
            setCoffeeInfo({
              ...coffeeInfo,
              imageUrl: value,
            });
          }}
        />
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
            setCoffeeInfo({
              ...coffeeInfo,
              variety: value,
            });
          }}
          value={coffeeInfo.variety}
          labelText="variety"
        />
        <CoffeeProcessingSelect
          dataTitle="焙煎度"
          value={coffeeInfo.roastingDegree}
          onChange={(value: string) => {
            setCoffeeInfo({
              ...coffeeInfo,
              roastingDegree: value,
            });
          }}
          labelText="roastingDegree"
        />
      </div>
    </div>
  );
};
