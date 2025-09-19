// =========================
// page.tsx - 修正版
// =========================
"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/Pages.module.css";
import { addCoffeeRecord, deleteCoffeeRecord } from "@/app/lib/IndexedDB";
import { v4 as uuidv4 } from "uuid";
import { CoffeeRecord } from "@/app/types/db";
import { TastingEvaluationComponent } from "@/app/components/form/container/common/TastingEvaluation/page";
import { ShopCoffeeComponent } from "@/app/components/form/container/shop/PurchaseInfo/page";
import { CoffeeBeansComponent } from "@/app/components/form/container/self/CoffeeBean/page";
import { BrewingRecipeComponent } from "@/app/components/form/container/self/BrewingRecipe/page";
import { MemoAreaComponent } from "@/app/components/form/container/common/MemoArea/page";
import { PageTitle } from "@/app/components/title/page";
import { MainButton } from "@/app/components/buttons/page";
import { useWindowSize } from "@/app/components/useWindowSize/page";
import { useCoffeeValidation } from "@/app/utils/useCoffeeValidation"; // カスタムフックをインポート

const CreatePage = () => {
  const { width } = useWindowSize();
  const { validateCoffeeData } = useCoffeeValidation(); // バリデーションフックを使用

  const shopVer = "Shop";
  const selfVer = "Self";

  // 共通の項目
  const [coffeeInfo, setCoffeeInfo] = useState({
    imageUrl: "",
    imageAlt: "",
    coffeeName: "",
    productionArea: "",
  });

  // 自宅の情報
  const [selfInfo, setSelfInfo] = useState({
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
      body: 0,
      aroma: 0,
      aftertaste: 0,
      overall: 0,
    },
    memo: "",
  });

  const [isLoad, setIsLoad] = useState(false);
  const [isVersion, setIsVersion] = useState(false);
  const [varText, setVarText] = useState<string>("Self");
  const [coffeeRecords, setCoffeeRecords] = useState<CoffeeRecord[]>([]);

  const handleVersion = () => {
    setIsLoad(true);
    setIsVersion(!isVersion);
    if (isVersion) {
      setVarText(selfVer);
    } else {
      setVarText(shopVer);
    }
    setIsLoad(false);
  };

  // コンポーネントがマウントされたときに、すべての記録を取得して表示
  useEffect(() => {
    const fetchRecords = async () => {
      setCoffeeRecords([
        {
          imageUri: coffeeInfo.imageUrl,
          imageAlt: coffeeInfo.imageAlt,
          name: coffeeInfo.coffeeName,
          productionArea: coffeeInfo.productionArea,
          variety: selfInfo.variety,
          roastingDegree: selfInfo.roastingDegree,
          shopName: shopInfo.shopName,
          shopPrice: shopInfo.shopPrice,
          shopDate: shopInfo.shopDate,
          shopAddress: shopInfo.shopAddress,
          shopUrl: shopInfo.shopUrl,
          extractionMethod: extractionInfo.extractionMethod,
          extractionMaker: extractionInfo.extractionMaker,
          measurementMethod: extractionInfo.measurementMethod,
          grindSize: extractionInfo.grindSize,
          extractionTime: extractionInfo.extractionTime,
          temperature: extractionInfo.temperature,
          coffeeAmount: extractionInfo.coffeeAmount,
          waterAmount: extractionInfo.waterAmount,
          acidity: reviewInfo.chart.acidity,
          bitterness: reviewInfo.chart.bitterness,
          overall: reviewInfo.chart.overall,
          body: reviewInfo.chart.body,
          aroma: reviewInfo.chart.aroma,
          aftertaste: reviewInfo.chart.aftertaste,
          memo: reviewInfo.memo,
          id: uuidv4(),
          self: varText,
          createdAt: new Date(),
        },
      ]);
    };
    fetchRecords();
  }, []);

  useEffect(() => {
    console.log(
      "Coffee records updated:",
      coffeeInfo,
      selfInfo,
      shopInfo,
      extractionInfo,
      reviewInfo,
      varText
    );
  }, [coffeeRecords]);

  // フォーム送信時のハンドラー（バリデーション統合版）
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // カスタムフックを使用してバリデーション実行
    const validationError = validateCoffeeData(
      coffeeInfo,
      selfInfo,
      extractionInfo,
      shopInfo,
      reviewInfo,
      varText
    );

    // バリデーションエラーがある場合は処理を停止
    if (validationError) {
      alert(validationError);
      return;
    }

    // 新しい記録のデータを作成
    const newRecord: CoffeeRecord = {
      id: uuidv4(),
      name: coffeeInfo.coffeeName,
      variety: selfInfo.variety,
      productionArea: coffeeInfo.productionArea,
      roastingDegree: selfInfo.roastingDegree,
      extractionMethod: extractionInfo.extractionMethod,
      extractionMaker: extractionInfo.extractionMaker,
      grindSize: extractionInfo.grindSize,
      temperature: extractionInfo.temperature,
      coffeeAmount: extractionInfo.coffeeAmount,
      waterAmount: extractionInfo.waterAmount,
      measurementMethod: extractionInfo.measurementMethod,
      extractionTime: extractionInfo.extractionTime,
      acidity: reviewInfo.chart.acidity,
      bitterness: reviewInfo.chart.bitterness,
      overall: reviewInfo.chart.overall,
      body: reviewInfo.chart.body,
      aroma: reviewInfo.chart.aroma,
      aftertaste: reviewInfo.chart.aftertaste,
      memo: reviewInfo.memo,
      imageUri: coffeeInfo.imageUrl,
      imageAlt: coffeeInfo.imageAlt,
      self: varText,
      shopName: shopInfo.shopName,
      shopPrice: shopInfo.shopPrice,
      shopDate: shopInfo.shopDate,
      shopAddress: shopInfo.shopAddress,
      shopUrl: shopInfo.shopUrl,
      createdAt: new Date(),
    };

    try {
      // addCoffeeRecord関数を呼び出して、データベースに保存
      await addCoffeeRecord(newRecord);
      alert("記録が正常に保存されました！");

      // フォームの入力値をクリア
      setCoffeeInfo({
        imageUrl: "",
        imageAlt: "",
        coffeeName: "",
        productionArea: "",
      });
      setSelfInfo({
        variety: "選択していません。",
        roastingDegree: "選択していません。",
      });
      setShopInfo({
        shopName: "",
        shopPrice: "",
        shopDate: new Date(),
        shopAddress: "",
        shopUrl: "https://example.com",
      });
      setExtractionInfo({
        extractionMethod: "選択していません。",
        extractionMaker: "選択していません。",
        measurementMethod: "",
        grindSize: "選択していません。",
        extractionTime: 0,
        temperature: 0,
        coffeeAmount: 0,
        waterAmount: 0,
      });
      setReviewInfo({
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
    } catch (error) {
      console.error("記録の保存中にエラーが発生しました:", error);
      alert("記録の保存に失敗しました。");
    }
  };

  // 記録を削除するハンドラー
  const handleDelete = async (id: string) => {
    await deleteCoffeeRecord(id);
  };

  return (
    <>
      <div className={`${styles.createPageContents} ${styles.pageContents}`}>
        <h1 className={styles.pageTitle}>
          <PageTitle value="Create Page" />
        </h1>
        <div className={`${styles.createPageWrapper} ${styles.pageWrapper}`}>
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
          <form className={styles.pageForm} onSubmit={handleSubmit}>
            {isVersion ? (
              <div className={styles.createSelfVersionContents}>
                <div className={styles.leftColumn}>
                  <CoffeeBeansComponent
                    coffeeInfo={coffeeInfo}
                    selfInfo={selfInfo}
                    setSelfInfo={setSelfInfo}
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
                    coffeeInfo={coffeeInfo}
                    shopInfo={shopInfo}
                    setShopInfo={setShopInfo}
                    setCoffeeInfo={setCoffeeInfo}
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
            <div
              className={`${styles.buttonContent} ${styles.saveButtonContent}`}
            >
              <MainButton
                type="submit"
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
