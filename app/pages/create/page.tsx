"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import styles from "@/app/styles/Pages.module.css";
import TastingEvaluationComponent from "@/app/components/form/container/common/TastingEvaluation/page";
import { ShopCoffeeComponent } from "@/app/components/form/container/shop/PurchaseInfo/page";
import { CoffeeBeansComponent } from "@/app/components/form/container/self/CoffeeBean/page";
import { BrewingRecipeComponent } from "@/app/components/form/container/self/BrewingRecipe/page";
import MemoAreaComponent from "@/app/components/form/container/common/MemoArea/page";
import { PageTitle } from "@/app/components/title/page";
import { MainButton } from "@/app/components/buttons/page";
import { useWindowSize } from "@/app/components/useWindowSize/page";
import ImageUploadComponent, {
  ImageFormData,
  ImageUploadRef,
} from "@/app/components/form/item/ImageUpload/page";

const CreatePage = () => {
  const { width } = useWindowSize();
  const imageUploadRef = useRef<ImageUploadRef>(null);

  const shopVer = "Shop";
  const selfVer = "Self";

  // 共通の項目
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

  // 評価チャートとメモ
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

  useEffect(() => {
    setVerText([shopVer]);
  }, []);

  const handleVersion = () => {
    setIsLoad(true);
    setIsVersion(!isVersion);
    if (isVersion) {
      setVerText([shopVer]);
    } else {
      setVerText([selfVer]);
    }
    setIsLoad(false);
  };

  // 画像データが変更された時のハンドラー
  const handleImageChange = useCallback((newImageData: ImageFormData) => {
    setImageData(newImageData);
  }, []);

  // フォーム送信時のハンドラー（簡単な処理のみ）
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 簡易的なバリデーション
    if (!coffeeInfo.coffeeName.trim()) {
      alert("コーヒー名を入力してください");
      return;
    }

    // フォームデータを表示（実際の保存処理は削除）
    console.log("フォームデータ:", {
      coffeeInfo,
      imageData,
      selfInfo,
      shopInfo,
      extractionInfo,
      reviewInfo,
      version: verText[0],
    });

    alert("フォームデータがコンソールに出力されました");
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

    // 画像コンポーネントのリセット
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
  }, []);

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
                ref={imageUploadRef}
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

            {/* エラー表示は削除 */}

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

              <MainButton
                type="button"
                onClick={handleReset}
                sizeValue="large"
                textValue="リセット"
                buttonColor="btn-secondary"
                widthValue="widthAuto"
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
