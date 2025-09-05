"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "@/app/styles/Pages.module.css";
import {
  addCoffeeRecord,
  getCoffeeRecords,
  deleteCoffeeRecord,
} from "@/app/lib/IndexedDB";
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

  const [coffeeRecords, setCoffeeRecords] = useState<CoffeeRecord[]>([]);
  const [recordName, setRecordName] = useState<string>("");

  // コンポーネントがマウントされたときに、すべての記録を取得して表示
  useEffect(() => {
    const fetchRecords = async () => {
      const records = await getCoffeeRecords();
      setCoffeeRecords(records);
    };
    fetchRecords();
  }, []);

  // フォーム送信時のハンドラー
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coffeeInfo.coffeeName.trim()) {
      alert("コーヒー豆の名前を入力してください。");
      return;
    }

    // 新しい記録のデータを作成
    // ここでCoffeeRecordの型に合わせてキー名を修正
    const newRecord: CoffeeRecord = {
      id: uuidv4(),
      name: coffeeInfo.coffeeName, // 名称
      variety: coffeeInfo.variety, // 品種
      productionArea: coffeeInfo.productionArea, // 産地
      roastingDegree: coffeeInfo.roastingDegree, // 焙煎度
      extractionMethod: extractionInfo.extractionMethod,
      extractionMaker: extractionInfo.extractionMaker,
      grindSize: extractionInfo.grindSize, // 挽き目
      temperature: extractionInfo.temperature, // 温度（℃）
      coffeeAmount: extractionInfo.coffeeAmount, // 粉量（g）
      waterAmount: extractionInfo.waterAmount, // 湯量（g）
      measurementMethod: extractionInfo.measurementMethod, // 計測方法
      extractionTime: extractionInfo.extractionTime, // 抽出時間
      acidity: reviewInfo.chart.acidity, // 酸味（1-10）
      bitterness: reviewInfo.chart.bitterness, // 苦味（1-10）
      overall: reviewInfo.chart.overall, // 全体の好み（1-55）
      body: reviewInfo.chart.body, // コク（1-10）
      aroma: reviewInfo.chart.aroma, // 香り（1-10）
      aftertaste: reviewInfo.chart.aftertaste, // キレ（1-10）
      memo: reviewInfo.memo, // メモ
      imageUri: coffeeInfo.imageUrl, // 画像のパス
      self: varText, // true or falseで保存
      shopName: shopInfo.shopName, // 店名（店で飲んだ場合のみ）
      shopPrice: shopInfo.shopPrice, // 店の価格（円）（店で飲んだ場合のみ）
      shopDate: shopInfo.shopDate, // 店で飲んだ日付（店で飲んだ場合のみ）
      shopAddress: shopInfo.shopAddress, // 店の住所（店で飲んだ場合のみ）
      shopUrl: shopInfo.shopUrl, // 店のURL（店で飲んだ場合のみ）
      createdAt: new Date(), // タイムスタンプで保存
    };

    try {
      // addCoffeeRecord関数を呼び出して、データベースに保存
      await addCoffeeRecord(newRecord);
      alert("記録が正常に保存されました！");

      // UIを更新するため、データベースから最新のデータを再取得
      const updatedRecords = await getCoffeeRecords();
      setCoffeeRecords(updatedRecords);

      // フォームの入力値をクリア
      setCoffeeInfo({
        imageUrl: "",
        coffeeName: "",
        productionArea: "",
        variety: "選択していません。",
        roastingDegree: "選択していません。",
      });
      setShopInfo({
        shopName: "",
        shopPrice: "",
        shopDate: "2025-01-01",
        shopAddress: "",
        shopUrl: "https://example.com",
      });
      setExtractionInfo({
        extractionMethod: "選択していません。",
        extractionMaker: "選択していません。",
        measurementMethod: "",
        grindSize: "選択していません.",
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
    // deleteCoffeeRecord関数を呼び出して、特定の記録を削除
    await deleteCoffeeRecord(id);
    // 削除後のリストに更新
    const updatedRecords = await getCoffeeRecords();
    setCoffeeRecords(updatedRecords);
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
