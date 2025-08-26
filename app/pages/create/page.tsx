"use client";
import React, { useEffect, useState, useRef, use } from "react";
import styles from "@/app/styles/Pages.module.css";

import { TastingEvaluationComponent } from "@/app/components/form/container/common/TastingEvaluation/page";
import { ShopCoffeeComponent } from "@/app/components/form/container/shop/PurchaseInfo/page";
import { CoffeeBeansComponent } from "@/app/components/form/container/self/CoffeeBean/page";
import { BrewingRecipeComponent } from "@/app/components/form/container/self/BrewingRecipe/page";
import { MemoAreaComponent } from "@/app/components/form/container/common/MemoArea/page";
import { PageTitle } from "@/app/components/title/page";
import { MainButton } from "@/app/components/buttons/page";
import { useWindowSize } from "@/app/components/useWindowSize/page";
const CreatePage = () => {
  const { width } = useWindowSize();
  const shopVer = "Shop";
  const selfVer = "Self";

  // 共通の項目
  const [coffeeInfo, setCoffeeInfo] = useState({
    imageUrl: "",
    coffeeName: "",
    productionArea: "",
    variety: "選択していません。",
    roastingDegree: "選択していません。",
  });

  // ショップの情報
  const [shopInfo, setShopInfo] = useState({
    shopName: "",
    shopPrice: "",
    shopDate: "2025-01-01",
    shopAddress: "",
    shopUrl: "https://example.com",
  });

  // 自宅での抽出情報
  const [extractionInfo, setExtractionInfo] = useState({
    extractionMethod: "選択していません。",
    extractionMaker: "選択していません。",
    grindSize: "選択していません。",
    extractionTime: 0,
    temperature: 0,
    coffeeAmount: 0,
    waterAmount: 0,
  });

  // 自宅で抽出した際の評価チャートとメモ
  const [reviewInfo, setReviewInfo] = useState({
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
  const [isLoad, setIsLoad] = useState(false);
  const [isVersion, setIsVersion] = useState(false);
  const [varText, setVarText] = useState(selfVer);
  const handleVersion = () => {
    setIsLoad(true);
    setIsVersion(!isVersion);
    if (isVersion) {
      setVarText(selfVer);
      return setIsLoad(false);
    } else {
      setVarText(shopVer);
      return setIsLoad(false);
    }
  };
  useEffect(() => {
    return handleVersion;
  }, [isVersion]);
  return (
    <>
      <div className={`${styles.createPageContents} ${styles.pageContents}`}>
        <h1 className={styles.pageTitle}>
          <PageTitle value="Create Page" />
        </h1>
        <div className={`${styles.createPageWrapper} ${styles.pageWrapper}`}>
          {/* {width ? `${width}px` : "ロード中..."} */}
          {width && width < 600 ? (
            <div
              className={`${styles.buttonContainer} ${styles.versionButtonContainer}`}
            >
              <MainButton
                onClick={handleVersion}
                sizeValue="large"
                textValue={`Switch to ${varText} Ver.`}
                buttonColor="btn-success"
                widthValue="widthNearlyFull"
              />
            </div>
          ) : (
            <div
              className={`${styles.buttonContainer} ${styles.versionButtonContainer}`}
            >
              <MainButton
                onClick={handleVersion}
                sizeValue="large"
                textValue={`Switch to ${varText} Ver.`}
                buttonColor="btn-success"
                widthValue="widthAuto"
              />
            </div>
          )}
          <form className={styles.pageForm}>
            {isVersion ? (
              <>
                <CoffeeBeansComponent />
                <BrewingRecipeComponent extractionInfo={extractionInfo} />
                <TastingEvaluationComponent reviewInfo={reviewInfo} />
                <MemoAreaComponent />
              </>
            ) : (
              <>
                <ShopCoffeeComponent
                  imageUrl={coffeeInfo.imageUrl}
                  coffeeName={coffeeInfo.coffeeName}
                  productionArea={coffeeInfo.productionArea}
                  shopName={shopInfo.shopName}
                  shopPrice={shopInfo.shopPrice}
                  shopDate={shopInfo.shopDate}
                  shopAddress={shopInfo.shopAddress}
                  shopUrl={shopInfo.shopUrl}
                />
                <TastingEvaluationComponent reviewInfo={reviewInfo} />
                <MemoAreaComponent />
              </>
            )}
            <div
              className={`${styles.buttonContainer} ${styles.saveButtonContainer}`}
            >
              <MainButton
                sizeValue="large"
                textValue="保存"
                buttonColor="btn-success"
                widthValue="widthAuto"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default CreatePage;
