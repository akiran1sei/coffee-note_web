"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/Pages.module.css";

import { TastingEvaluationComponent } from "@/app/components/itemCard/TastingEvaluation/page";

import { CoffeeBeansComponent } from "@/app/components/itemCard/CoffeeBean/page";
import { BrewingRecipeComponent } from "@/app/components/itemCard/BrewingRecipe/page";
import { MemoAreaComponent } from "@/app/components/itemCard/MemoArea/page";

const CreatePage = () => {
  const [formValue, setFormValue] = useState({
    imageUrl: "",
    coffeeName: "",
    productionArea: "",
    variety: "選択していません。",
    roastingDegree: "選択していません。",
    extractionMethod: "選択していません。",
    extractionMaker: "選択していません。",
    grindSize: "選択していません。",
    extractionTime: 0,
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
      <CoffeeBeansComponent />
      <BrewingRecipeComponent />
      <TastingEvaluationComponent />
      <MemoAreaComponent />
    </div>
  );
};
export default CreatePage;
