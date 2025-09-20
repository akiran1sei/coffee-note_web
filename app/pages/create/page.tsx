"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
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
import { useCoffeeValidation } from "@/app/utils/useCoffeeValidation";
import ImageUploadComponent, {
  ImageFormData,
  ImageUploadRef, // ImageUploadComponentからエクスポートされた型をインポート
} from "@/app/components/form/item/ImageUpload/page"; // 改良版コンポーネントをインポート

const CreatePage = () => {
  const { width } = useWindowSize();
  const { validateCoffeeData } = useCoffeeValidation();
  const imageUploadRef = useRef<ImageUploadRef>(null); // useRefでImageUploadComponentのメソッドを呼び出すためのrefを作成

  const shopVer = "Shop";
  const selfVer = "Self";

  // 共通の項目（画像データを統合）
  const [coffeeInfo, setCoffeeInfo] = useState({
    coffeeName: "",
    productionArea: "",
    imageUrl: "",
    imageAlt: "",
  });

  // 画像データを分離して管理
  const [imageData, setImageData] = useState<ImageFormData>({
    imageId: null,
    imageUrl: "",
    imageAlt: "",
    hasImage: false,
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
  const [verText, setVerText] = useState<string[]>([shopVer]);
  const [coffeeRecords, setCoffeeRecords] = useState<CoffeeRecord[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  useEffect(() => {
    setVerText([shopVer]);
  }, []);
  const handleVersion = () => {
    setIsLoad(true);
    setIsVersion(!isVersion);
    if (isVersion) {
      setVerText([shopVer]);
      console.log(verText);
    } else {
      setVerText([selfVer]);
      console.log(verText);
    }
    setIsLoad(false);
  };

  // 画像データが変更された時のハンドラー
  const handleImageChange = useCallback((newImageData: ImageFormData) => {
    console.log("画像データ", newImageData);
    setImageData(newImageData);
    console.log("画像データが更新されました:", newImageData);
  }, []);
  console.log("画像データが更新", imageData);

  // 画像アップロードエラー時のハンドラー
  const handleImageUploadError = useCallback((error: string) => {
    setSubmitError(`画像アップロードエラー: ${error}`);
    console.error("画像アップロードエラー:", error);
  }, []);

  // コンポーネントがマウントされたときに、すべての記録を取得して表示
  useEffect(() => {
    const fetchRecords = async () => {
      setCoffeeRecords([
        {
          imageUri: imageData.imageUrl,
          imageAlt: imageData.imageAlt,
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
          self: verText[0],
          createdAt: new Date(),
        },
      ]);
    };
    fetchRecords();
  }, []); // 初回マウント時のみ実行

  // useEffect(() => {
  //   console.log(
  //     "Coffee records updated:",
  //     coffeeInfo,
  //     imageData,
  //     selfInfo,
  //     shopInfo,
  //     extractionInfo,
  //     reviewInfo,
  //     verText
  //   );
  // }, [coffeeRecords, imageData]);

  // フォーム送信時のハンドラー（バリデーション統合版）
  // handleSubmit関数を以下のように修正

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitError("");
    setIsSubmitting(true);

    try {
      let finalImageData = imageData;

      // 画像が選択されている場合、アップロードをトリガーし完了を待つ
      if (imageData.hasImage && imageUploadRef.current) {
        const uploadedResult = await imageUploadRef.current.triggerUpload();
        if (uploadedResult) {
          finalImageData = uploadedResult;
          console.log("アップロード完了後の画像データ:", finalImageData);
        } else {
          setIsSubmitting(false);
          return;
        }
      }

      // バリデーション用にcoffeeInfoを更新
      const updatedCoffeeInfo = {
        ...coffeeInfo,
        imageUrl: finalImageData.imageUrl || "",
        imageAlt: finalImageData.imageAlt || "",
      };
      console.log("バリデーション用のコーヒー情報:", updatedCoffeeInfo);
      // バリデーション実行
      const validationError = validateCoffeeData(
        updatedCoffeeInfo,
        selfInfo,
        extractionInfo,
        shopInfo,
        reviewInfo,
        verText[0]
      );

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
        // 重要: finalImageDataから画像データを設定
        imageUri: finalImageData.imageUrl || "",
        imageAlt: finalImageData.imageAlt || "",
        self: verText[0],
        shopName: shopInfo.shopName,
        shopPrice: shopInfo.shopPrice,
        shopDate: shopInfo.shopDate,
        shopAddress: shopInfo.shopAddress,
        shopUrl: shopInfo.shopUrl,
        createdAt: new Date(),
      };
      console.log("保存する最終データ:", newRecord);
      console.log("画像URL:", newRecord.imageUri);
      console.log("画像ALT:", newRecord.imageAlt);
      if (validationError) {
        setSubmitError(validationError);
        setIsSubmitting(false);
        return;
      }

      // データベースに保存
      await addCoffeeRecord(newRecord);

      alert("記録が正常に保存されました！");
      handleReset();
    } catch (error) {
      console.error("記録の保存中にエラーが発生しました:", error);
      setSubmitError(
        `記録の保存に失敗しました: ${
          error instanceof Error ? error.message : "不明なエラー"
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  // フォームリセット関数
  const handleReset = useCallback(() => {
    setCoffeeInfo({
      coffeeName: "",
      productionArea: "",
      imageUrl: "",
      imageAlt: "",
    });

    setImageData({
      imageId: null,
      imageUrl: "",
      imageAlt: "",
      hasImage: false,
    });

    // 画像コンポーネントのリセット関数を呼び出す
    if (imageUploadRef.current) {
      imageUploadRef.current.reset();
    }

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

    setSubmitError("");
  }, []);

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
                textValue={`Switch to ${verText} Ver.`}
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
                textValue={`Switch to ${verText} Ver.`}
                buttonColor="btn-success"
                widthValue="widthAuto"
              />
            </div>
          )}

          <form className={styles.pageForm} onSubmit={handleSubmit}>
            {/* 画像アップロードセクション（共通） */}
            <div className={styles.imageUploadSection}>
              <h2>画像アップロード</h2>
              <ImageUploadComponent
                value={imageData}
                onChange={handleImageChange}
                onUploadError={handleImageUploadError}
                // ここにrefを追加します
                ref={imageUploadRef}
                disabled={isSubmitting}
                required={false}
              />
            </div>

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
                    coffeeInfo={{
                      ...coffeeInfo,
                      imageUrl: imageData.imageUrl,
                      imageAlt: imageData.imageAlt,
                    }}
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

            {/* エラー表示 */}
            {submitError && (
              <div
                className={styles.errorMessage}
                style={{
                  color: "red",
                  margin: "10px 0",
                  padding: "10px",
                  backgroundColor: "#ffebee",
                  border: "1px solid #f44336",
                  borderRadius: "4px",
                }}
              >
                {submitError}
              </div>
            )}

            {/* デバッグ用：現在の画像データ状態表示（開発時のみ） */}
            {process.env.NODE_ENV === "development" && (
              <details className={styles.debugDetails}>
                <summary>画像データ状態（デバッグ用）</summary>
                <pre className={styles.debugPre}>
                  {JSON.stringify(imageData, null, 2)}
                </pre>
              </details>
            )}

            <div
              className={`${styles.buttonContent} ${styles.saveButtonContent}`}
            >
              <MainButton
                type="submit"
                sizeValue="large"
                textValue={isSubmitting ? "保存中..." : "保存"}
                buttonColor="btn-success"
                widthValue="widthAuto"
                disabled={isSubmitting}
              />

              <MainButton
                type="button"
                onClick={handleReset}
                sizeValue="large"
                textValue="リセット"
                buttonColor="btn-secondary"
                widthValue="widthAuto"
                disabled={isSubmitting}
                style={{ marginLeft: "10px" }}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePage;
