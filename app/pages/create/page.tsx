"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "@/app/styles/Pages.module.css";

import { TastingEvaluationComponent } from "@/app/components/selfComponents/TastingEvaluation/page";

import { CoffeeBeansComponent } from "@/app/components/selfComponents/CoffeeBean/page";
import { BrewingRecipeComponent } from "@/app/components/selfComponents/BrewingRecipe/page";
import { MemoAreaComponent } from "@/app/components/selfComponents/MemoArea/page";
import { PageTitle } from "@/app/components/title/page";
import { UpperButton } from "@/app/components/buttons/upper/page";

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
    <>
      <UpperButton />
      <div className={`${styles.createPageContents} ${styles.pageContents}`}>
        <h1 className={styles.pageTitle}>
          <PageTitle value="Create Page" />
        </h1>
        <div className={`${styles.createPageWrapper} ${styles.pageWrapper}`}>
          <CoffeeBeansComponent />
          <BrewingRecipeComponent />
          <TastingEvaluationComponent />
          <MemoAreaComponent />
        </div>
      </div>
    </>
  );
};
export default CreatePage;
