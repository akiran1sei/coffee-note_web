"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/Form.module.css";
import { InputComponent } from "@/app/components/form/item/InputComponent/page";

import {
  CoffeeProcessingSelect,
  CoffeeTypesSelect,
} from "@/app/components/form/item/SelectComponent/page";
import ImageUpload from "@/app/components/form/item/ImageUpload/page";

export const CoffeeBeansComponent = () => {
  const [coffeeBeansFormValue, setCoffeeBeansFormValue] = useState({
    imageUrl: "",
    coffeeName: "",
    productionArea: "",
    variety: "選択していません。",
    roastingDegree: "選択していません。",
  });

  return (
    <div className={styles.infoContainer}>
      <h2 className={styles.infoTitle}>珈琲豆の情報</h2>
      <div className={styles.infoWrapper}>
        <ImageUpload
          onChange={(value: string) => {
            setCoffeeBeansFormValue({
              ...coffeeBeansFormValue,
              imageUrl: value,
            });
          }}
        />
        <InputComponent
          dataTitle="コーヒー名"
          value={coffeeBeansFormValue.coffeeName}
          onChange={(value: string) => {
            setCoffeeBeansFormValue({
              ...coffeeBeansFormValue,
              coffeeName: value,
            });
          }}
          labelText="coffeeName"
        />
        <InputComponent
          dataTitle="産地"
          value={coffeeBeansFormValue.productionArea}
          onChange={(value: string) => {
            setCoffeeBeansFormValue({
              ...coffeeBeansFormValue,
              productionArea: value,
            });
          }}
          labelText="productionArea"
        />
        <CoffeeTypesSelect
          dataTitle="品種"
          onChange={(value: string) => {
            setCoffeeBeansFormValue({
              ...coffeeBeansFormValue,
              variety: value,
            });
          }}
          value={coffeeBeansFormValue.variety}
          labelText="variety"
        />
        <CoffeeProcessingSelect
          dataTitle="焙煎度"
          value={coffeeBeansFormValue.roastingDegree}
          onChange={(value: string) => {
            setCoffeeBeansFormValue({
              ...coffeeBeansFormValue,
              roastingDegree: value,
            });
          }}
          labelText="roastingDegree"
        />
      </div>
    </div>
  );
};
