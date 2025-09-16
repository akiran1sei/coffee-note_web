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
interface ItemPageProps {
  params: {
    slug: {
      coffeeInfo: string;
      shopInfo: string;
      extractionInfo: string | number;
      reviewInfo: string | number;
    };
  };
}

const ItemPage: React.FC<ItemPageProps> = () =>
  // { params: { slug } }
  {
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
      shopDate: new Date(),
      shopAddress: "",
      shopUrl: "https://example.com",
    });

    // 自宅での抽出情報
    const [extractionInfo, setExtractionInfo] = useState({
      extractionMethod: "選択していません。",
      extractionMaker: "選択していません。",
      measurementMethod: "",
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
            <PageTitle value="Item Page" />
          </h1>
          <div className={`${styles.createPageWrapper} ${styles.pageWrapper}`}>
            {/* {width ? `${width}px` : "ロード中..."} */}
            {width && width < 600 ? (
              <div
                className={`${styles.buttonContent} ${styles.versionButtonContent}`}
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
                className={`${styles.buttonContent} ${styles.versionButtonContent}`}
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
                <div className={styles.createSelfVersionContents}>
                  <div className={styles.leftColumn}>
                    <CoffeeBeansComponent
                      coffeeInfo={coffeeInfo}
                      setCoffeeInfo={setCoffeeInfo}
                    />
                    <BrewingRecipeComponent
                      extractionInfo={extractionInfo}
                      setExtractionInfo={setExtractionInfo}
                    />
                  </div>
                  <div className={styles.rightColumn}>
                    <TastingEvaluationComponent
                      reviewInfo={reviewInfo}
                      setReviewInfo={setReviewInfo}
                    />
                  </div>
                  <div className={styles.buttonContent}>
                    <MemoAreaComponent
                      reviewInfo={reviewInfo}
                      setReviewInfo={setReviewInfo}
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.createShopVersionContents}>
                  <div className={styles.leftColumn}>
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
                  </div>
                  <div className={styles.rightColumn}>
                    <TastingEvaluationComponent
                      reviewInfo={reviewInfo}
                      setReviewInfo={setReviewInfo}
                    />
                  </div>
                  <div className={styles.buttonContent}>
                    <MemoAreaComponent
                      reviewInfo={reviewInfo}
                      setReviewInfo={setReviewInfo}
                    />
                  </div>
                </div>
              )}
              <div className={styles.itemButtonContainer}>
                <div
                  className={`${styles.buttonContent} ${styles.saveButtonContent}`}
                >
                  <MainButton
                    sizeValue="large"
                    textValue="保存"
                    buttonColor="btn-success"
                    widthValue="widthAuto"
                  />
                </div>
                <div
                  className={`${styles.buttonContent} ${styles.resetButtonContent}`}
                >
                  <MainButton
                    sizeValue="large"
                    textValue="リセット"
                    buttonColor="btn-secondary"
                    widthValue="widthAuto"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };
export default ItemPage;
