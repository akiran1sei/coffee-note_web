"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import styles from "@/app/styles/Pages.module.css";
import { TastingEvaluationComponent } from "@/app/components/form/container/common/TastingEvaluation";
import { ShopCoffeeComponent } from "@/app/components/form/container/shop/PurchaseInfo";
import { CoffeeBeansComponent } from "@/app/components/form/container/self/CoffeeBeans";
import { BrewingRecipeComponent } from "@/app/components/form/container/self/BrewingRecipe";
import { MemoAreaComponent } from "@/app/components/form/container/common/MemoArea";
import { PageTitle } from "@/app/components/title/Title";
import { MainButton } from "@/app/components/buttons/Buttons";
import { useWindowSize } from "@/app/utils/useWindowSize";
import { CoffeeRecord } from "@/app/types/db";
import ImageUploadComponent, {
  ImageFormData,
  ImageUploadRef,
} from "@/app/components/form/item/ImageUpload";
import { validateString, validateNumber } from "@/app/utils/validation";
import { useRouter } from "next/navigation";
// slugが単一の文字列の場合
// Next.js App RouterのPropsの型を定義
interface UpdatePageProps {
  params: {
    slug: string;
  };
  // ★ 修正点: searchParams を追加する
  // クエリパラメータ（例: ?foo=bar）を含み、必須ではない型として定義します。
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const UpdatePage = ({ params, searchParams }: UpdatePageProps) => {
  // ウィンドウサイズの取得
  const { width } = useWindowSize();
  const router = useRouter();
  const imageUploadRef = useRef<ImageUploadRef>(null);

  const shopVer = "Shop";
  const selfVer = "Self";
  const [coffeeData, setCoffeeData] = useState<CoffeeRecord[]>([]);
  const [coffeeId, setCoffeeId] = useState({ id: "", _id: "" });
  // 共通の項目
  const [coffeeInfo, setCoffeeInfo] = useState({
    coffeeName: "",
    productionArea: "",
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
    variety: "",
    roastingDegree: "",
  });

  // ショップの情報
  const [shopInfo, setShopInfo] = useState({
    shopName: "",
    shopPrice: 0,
    shopDate: new Date(),
    shopAddress: "",
    shopUrl: "",
  });

  // 自宅での抽出情報
  const [extractionInfo, setExtractionInfo] = useState({
    extractionMethod: "",
    extractionMaker: "",
    measurementMethod: "",
    grindSize: "",
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
    if (!validateString(coffeeInfo.coffeeName, "コーヒー名")) return;
    if (!validateString(coffeeInfo.productionArea, "生産地")) return;
    if (!validateString(imageData.imageUrl, "画像のURL")) return;
    if (!validateString(imageData.imageAlt, "画像の説明")) return;
    if (verText[0] === selfVer) {
      if (!validateString(selfInfo.variety, "品種")) return;
      if (!validateString(selfInfo.roastingDegree, "焙煎度")) return;
      if (!validateString(extractionInfo.extractionMethod, "抽出方法")) return;
      if (!validateString(extractionInfo.extractionMaker, "抽出器")) return;
      if (!validateString(extractionInfo.measurementMethod, "計量方法")) return;
      if (!validateString(extractionInfo.grindSize, "挽き目")) return;
      if (!validateNumber(extractionInfo.extractionTime, "抽出時間")) return;
      if (!validateNumber(Number(extractionInfo.temperature), "温度")) return;
      if (
        !validateNumber(Number(extractionInfo.coffeeAmount), "コーヒー豆の量")
      )
        return;
      if (!validateNumber(Number(extractionInfo.waterAmount), "水の量")) return;
    } else if (verText[0] === shopVer) {
      if (!validateString(shopInfo.shopName, "ショップ名")) return;
      if (!validateNumber(Number(shopInfo.shopPrice), "価格")) return;
      if (!validateString(shopInfo.shopAddress, "住所")) return;
      if (!validateString(shopInfo.shopUrl, "URL")) return;
    }
    if (!validateNumber(reviewInfo.chart.acidity, "酸味")) return;
    if (!validateNumber(reviewInfo.chart.bitterness, "苦味")) return;
    if (!validateNumber(reviewInfo.chart.body, "ボディ")) return;
    if (!validateNumber(reviewInfo.chart.aroma, "香り")) return;
    if (!validateNumber(reviewInfo.chart.aftertaste, "余韻")) return;
    if (!validateNumber(reviewInfo.chart.overall, "総合評価")) return;
    // if (!validateString(reviewInfo.memo, "メモ")) return;
    if (verText[0] === selfVer) {
      // 自分で淹れた場合のデータ統合
      const Data = {
        model: "coffee", // APIルートで使用するモデル名
        data: {
          // 基本情報
          _id: coffeeId._id,
          id: coffeeId.id,
          name: coffeeInfo.coffeeName,
          productionArea: coffeeInfo.productionArea,

          // 自分で淹れた場合の識別
          self: "self",

          // 焙煎・抽出情報（selfInfoとextractionInfoから）
          variety: selfInfo.variety,
          roastingDegree: selfInfo.roastingDegree,
          extractionMethod: extractionInfo.extractionMethod,
          extractionMaker: extractionInfo.extractionMaker,
          grindSize: extractionInfo.grindSize,
          temperature: extractionInfo.temperature,
          coffeeAmount: extractionInfo.coffeeAmount,
          waterAmount: extractionInfo.waterAmount,
          measurementMethod: extractionInfo.measurementMethod,
          extractionTime: extractionInfo.extractionTime,

          // 評価情報（reviewInfoから）
          acidity: reviewInfo.chart.acidity,
          bitterness: reviewInfo.chart.bitterness,
          overall: reviewInfo.chart.overall,
          body: reviewInfo.chart.body,
          aroma: reviewInfo.chart.aroma,
          aftertaste: reviewInfo.chart.aftertaste,

          // 共通情報
          memo: reviewInfo.memo,
          imageUri: imageData.imageUrl,
          imageAlt: imageData.imageAlt,

          // 店舗情報は空（自分で淹れた場合は不要）
          shopName: "ー",
          shopPrice: 0,
          shopDate: 0,
          shopAddress: "ー",
          shopUrl: "ー",
        },
      };

      const response = await fetch("/api/controllers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Data),
      });

      await response.json();
      return await router.push("/pages/list");
    } else if (verText[0] === shopVer) {
      // 店で飲んだ場合のデータ統合
      const Data = {
        model: "coffee", // APIルートで使用するモデル名
        data: {
          // 基本情報
          _id: coffeeId._id,
          id: coffeeId.id,
          name: coffeeInfo.coffeeName,
          productionArea: coffeeInfo.productionArea,

          // 店で飲んだ場合の識別
          self: "shop",

          // 焙煎・抽出情報は空（店で飲んだ場合は不要）
          variety: "ー",
          extractionMethod: "ー",
          extractionMaker: "ー",
          grindSize: "ー",
          temperature: 0,
          coffeeAmount: 0,
          waterAmount: 0,
          measurementMethod: "ー",
          extractionTime: 0,

          // 評価情報（reviewInfoから）
          acidity: reviewInfo.chart.acidity,
          bitterness: reviewInfo.chart.bitterness,
          overall: reviewInfo.chart.overall,
          body: reviewInfo.chart.body,
          aroma: reviewInfo.chart.aroma,
          aftertaste: reviewInfo.chart.aftertaste,

          // 共通情報
          memo: reviewInfo.memo,
          imageUri: imageData.imageUrl,
          imageAlt: imageData.imageAlt,

          // 店舗情報（shopInfoから）
          shopName: shopInfo.shopName,
          shopPrice: shopInfo.shopPrice,
          shopDate: shopInfo.shopDate,
          shopAddress: shopInfo.shopAddress,
          shopUrl: shopInfo.shopUrl,
        },
      };

      const response = await fetch("/api/controllers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Data),
      });

      await response.json();

      return await router.push("/pages/list");
    }

    // どちらでもない場合のエラーハンドリング

    alert("フォームデータがコンソールに出力されました");
  };

  // フォームリセット関数
  const handleReset = useCallback(() => {
    setCoffeeInfo({
      coffeeName: "",
      productionArea: "",
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
      shopPrice: 0,
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
  // page.tsx の fetchData 関数部分を修正

  useEffect(() => {
    // (中略：params.slugの処理)
    const fetchData = async () => {
      const awaitedParams = await Promise.resolve(params);
      const slug = awaitedParams.slug;

      // 348行目の警告箇所を修正後のslugに置き換え
      const response = await fetch(`/api/controllers?id=${slug}`);
      const data = await response.json();

      // --- 修正箇所 ---
      let coffeeRecords = [];

      if (Array.isArray(data.data)) {
        // data.dataが配列（期待通り）の場合
        coffeeRecords = data.data;
      } else if (data.data) {
        // data.dataが単一のオブジェクトの場合（今回のエラーの原因として最有力）
        // 配列に格納してからセットする
        coffeeRecords = [data.data];
      }

      // APIからデータが取得できた場合、フォームのステートを一度に設定する
      if (coffeeRecords.length > 0) {
        const items = coffeeRecords[0]; // 配列の最初の要素を使用

        // ★ dataMap() の中身をここに移動 ★
        setCoffeeId({
          id: items.id,
          _id: items._id,
        });

        setCoffeeInfo({
          coffeeName: items.name,
          productionArea: items.productionArea,
        });
        setImageData({
          imageId: null,
          imageUrl: items.imageUri,
          imageAlt: items.imageAlt,
          hasImage: items.imageUri ? true : false, // hasImageも適切に設定
        });
        setSelfInfo({
          variety: items.variety,
          roastingDegree: items.roastingDegree,
        });
        setShopInfo({
          shopName: items.shopName,
          shopPrice: items.shopPrice,
          shopDate: items.shopDate ? new Date(items.shopDate) : new Date(),
          shopAddress: items.shopAddress,
          shopUrl: items.shopUrl,
        });
        setExtractionInfo({
          extractionMethod: items.extractionMethod,
          extractionMaker: items.extractionMaker,
          measurementMethod: items.measurementMethod,
          grindSize: items.grindSize,
          extractionTime: items.extractionTime,
          temperature: items.temperature,
          coffeeAmount: items.coffeeAmount,
          waterAmount: items.waterAmount,
        });
        setReviewInfo({
          chart: {
            acidity: items.acidity,
            bitterness: items.bitterness,
            body: items.body,
            aroma: items.aroma,
            aftertaste: items.aftertaste,
            overall: items.overall,
          },
          memo: items.memo || "",
        });

        // バージョン設定（取得したデータがSelfかShopかによって切り替える）
        if (items.self === "self") {
          setIsVersion(true); // Self バージョン
          setVerText(["Self"]);
        } else {
          setIsVersion(false); // Shop バージョン
          setVerText(["Shop"]);
        }
      }
      // setCoffeeData はこの処理が完了した後で呼び出す必要はないため削除。
      // もし必要なら setCoffeeData(coffeeRecords); を残しても良いが、
      // フォーム初期化には items (最初の要素) のみ使うのが一般的です。
    };
    fetchData();
  }, [params]);
  return (
    <>
      <div className={`${styles.createPageContents} ${styles.pageContents}`}>
        <h1 className={styles.pageTitle}>
          <PageTitle value="Update Page" />
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

export default UpdatePage;
