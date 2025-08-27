"use client";
import styles from "@/app/styles/Pages.module.css";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MainButton } from "@/app/components/buttons/page";
interface PageTitleProps {
  ItemTitle: string;
}

// タイトルコンポーネントのモック
// 本来は共通コンポーネントとして定義されていると想定
const PageTitle: React.FC<PageTitleProps> = ({ ItemTitle }) => (
  <h1>{ItemTitle}</h1>
);
const ItemPage = () => {
  // ウィンドウ幅の状態を管理
  const [windowWidth, setWindowWidth] = useState(0);

  // PC向けのレイアウト
  const ItemPcPage = () => {
    const pcCard = () => {
      return (
        <>
          {/* self */}
          <div className={`${styles.itemCoffeeBeans}  ${styles.itemPcItem}`}>
            <div className={`${styles.itemCoffeeName}`}>
              <div className={styles.itemLabel}>{"コーヒー名"}</div>
              <div className={styles.itemValue}>
                パナマ エスメラルダ農園 ゲイシャ
              </div>
            </div>
            <div className={styles.itemImageBox}>
              <div className={styles.itemImage}>
                <Image
                  width={200}
                  height={200}
                  src="/images/no-image.png"
                  alt="レーダーチャートのプレビュー画像"
                />
              </div>
            </div>
            <div className={`${styles.itemVariety}`}>
              <div className={styles.itemLabel}>{"品種"}</div>
              <div className={styles.itemValue}>アラビカ</div>
            </div>
            <div className={`${styles.itemProductionArea}`}>
              <div className={styles.itemLabel}>{"産地"}</div>
              <div className={styles.itemValue}>
                コスタリカ・コフィアディベルサ・グアドループティピカ・カーボニックマセレーション
              </div>
            </div>
            <div className={`${styles.itemRoastingDegree}`}>
              <div className={styles.itemLabel}>{"焙煎度"}</div>
              <div className={styles.itemValue}>中煎り</div>
            </div>
          </div>
          <div className={`${styles.itemBrewingRecipe} ${styles.itemPcItem}`}>
            <div className={`${styles.itemExMethod}`}>
              <div className={styles.itemLabel}>{"抽出方法"}</div>
              <div className={styles.itemValue}>ドリップ</div>
            </div>
            <div className={`${styles.itemExMaker}`}>
              <div className={styles.itemLabel}>{"抽出器具"}</div>
              <div className={styles.itemValue}>V60</div>
            </div>
            <div className={`${styles.itemGrindSize}`}>
              <div className={styles.itemLabel}>{"挽き目"}</div>
              <div className={styles.itemValue}>中挽き</div>
            </div>
            <div className={`${styles.itemTemperature}`}>
              <div className={styles.itemLabel}>{"温度（℃）"}</div>
              <div className={styles.itemValue}>90</div>
            </div>
            <div className={`${styles.itemCoffeeAmount}`}>
              <div className={styles.itemLabel}>{"粉量（ｇ）"}</div>
              <div className={styles.itemValue}>15</div>
            </div>
            <div className={`${styles.itemWaterAmount}`}>
              <div className={styles.itemLabel}>{"湯量（ｇ）"}</div>
              <div className={styles.itemValue}>240</div>
            </div>
            <div className={`${styles.itemMeasurementMethod}`}>
              <div className={styles.itemLabel}>{"計測方法"}</div>
              <div className={styles.itemValue}>抽出量</div>
            </div>
            <div className={`${styles.itemExTime}`}>
              <div className={styles.itemLabel}>{"抽出時間"}</div>
              <div className={styles.itemValue}>3分20秒</div>
            </div>
          </div>
          {/* shop */}
          {/* <div className={`${styles.itemShopData} ${styles.itemPcItem}`}>
      <div className={`${styles.itemShopName}`}>
        <div className={styles.itemLabel}>{"店名"}</div>
        <div className={styles.itemValue}></div>
      </div>
      <div className={`${styles.itemShopPrice}`}>
        <div className={styles.itemLabel}>{"店の価格（円）"}</div>
        <div className={styles.itemValue}></div>
      </div>
      <div className={`${styles.itemShopDate}`}>
        <div className={styles.itemLabel}>{"飲んだ日付"}</div>
        <div className={styles.itemValue}></div>
      </div>
      <div className={`${styles.itemShopAddress}`}>
        <div className={styles.itemLabel}>{"店の住所"}</div>
        <div className={styles.itemValue}></div>
      </div>
      <div className={`${styles.itemShopUrl}`}>
        <div className={styles.itemLabel}>{"店のURL"}</div>
        <div className={styles.itemValue}></div>
      </div>
    </div>
    <div className={`${styles.itemShopCoffee} ${styles.itemPcItem}`}>
      <div className={`${styles.itemCoffeeName}`}>
        <div className={styles.itemLabel}>{"コーヒー名"}</div>
        <div className={styles.itemValue}></div>
      </div>
      <div className={`${styles.itemVariety}`}>
        <div className={styles.itemLabel}>{"品種"}</div>
        <div className={styles.itemValue}></div>
      </div>
      <div className={`${styles.itemProductionArea}`}>
        <div className={styles.itemLabel}>{"産地"}</div>
        <div className={styles.itemValue}></div>
      </div>
    </div> */}
          {/* 共通 */}
          <div className={`${styles.itemTasting} ${styles.itemPcItem}`}>
            <div className={`${styles.itemAcidity}`}>
              <div className={styles.itemLabel}>{"酸味"}</div>
              <div className={styles.itemValue}>3</div>
            </div>
            <div className={`${styles.itemBitterness}`}>
              <div className={styles.itemLabel}>{"苦味"}</div>
              <div className={styles.itemValue}>2</div>
            </div>
            <div className={`${styles.itemBody}`}>
              <div className={styles.itemLabel}>{"コク"}</div>
              <div className={styles.itemValue}>4</div>
            </div>
            <div className={`${styles.itemAroma}`}>
              <div className={styles.itemLabel}>{"アロマ"}</div>
              <div className={styles.itemValue}>5</div>
            </div>
            <div className={`${styles.itemAftertaste}`}>
              <div className={styles.itemLabel}>{"キレ"}</div>
              <div className={styles.itemValue}>4</div>
            </div>
            <div className={`${styles.itemOverall}`}>
              <div className={styles.itemLabel}>{"全体の好み"}</div>
              <div className={styles.itemValue}>4</div>
            </div>
            <div className={styles.itemChartImageBox}>
              <div className={styles.itemChartImage}>
                <Image
                  width={200}
                  height={200}
                  src="/images/no-image.png"
                  alt="レーダーチャートのプレビュー画像"
                />
              </div>
            </div>
          </div>
          <div className={`${styles.itemMemoArea} ${styles.itemPcItem}`}>
            <div className={`${styles.itemMemo}`}>
              <div className={styles.itemLabel}>{"メモ"}</div>
              <div className={styles.itemValue}>
                全体的に美味しい珈琲で、コクもキレもバランスのとれた珈琲でした。
              </div>
            </div>
            {/* <div className={`${styles.itemRating}`}>
              <div className={styles.itemLabel}>{"自己評価"}</div>
              <div className={styles.itemValue}></div>
            </div> */}
          </div>
          <div className={styles.buttonContainer}>
            <div
              className={`${styles.buttonContent} ${styles.editButtonContent}`}
            >
              <MainButton
                sizeValue="large"
                textValue="編集"
                buttonColor="btn-warning"
                widthValue="widthAuto"
              />
            </div>
            <div
              className={`${styles.buttonContent} ${styles.deleteButtonContent}`}
            >
              <MainButton
                sizeValue="large"
                textValue="削除"
                buttonColor="btn-danger"
                widthValue="widthAuto"
              />
            </div>
            <div
              className={`${styles.buttonContent} ${styles.pdfButtonContent}`}
            >
              <MainButton
                sizeValue="large"
                textValue="PDFをダウンロード"
                buttonColor="btn-main"
                widthValue="widthAuto"
              />
            </div>
          </div>
        </>
      );
    };

    return (
      <>
        <div
          className={`${styles.itemPageWrapper} ${styles.pageWrapper} ${styles.itemPcPageWrapper}`}
        >
          <div className={`${styles.itemCard} ${styles.itemPcCard}`}>
            {pcCard()}
          </div>
        </div>
      </>
    );
  };

  // タブレット向けのレイアウト
  const ItemTabletPage = () => {
    // 画面の向きによってPC or SPレイアウトを返す
    // 画面幅が600px未満はSP、600px以上はPCとして扱う（Tailwindのmdブレイクポイント）
    return ItemPcPage();
  };

  // スマホ向けのレイアウト
  const ItemMobilePage = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // const spImg = "https://placehold.co/600x400/E9E9E9/252525?text=Radar+Chart";
    const MobileCard = () => {
      return (
        <>
          {/* self */}
          <div className={`${styles.itemCoffeeBeans} ${styles.mobileItem}`}>
            <div className={`${styles.itemCoffeeName}`}>
              <div className={styles.itemLabel}>{"コーヒー名"}</div>
              <div className={styles.itemValue}>
                パナマ エスメラルダ農園 ゲイシャ
              </div>
            </div>
            <div className={styles.itemImageBox}>
              <div className={styles.itemImage}>
                <Image
                  width={300}
                  height={300}
                  src="/images/no-image.png"
                  alt="レーダーチャートのプレビュー画像"
                />
              </div>
            </div>
            <div className={`${styles.itemVariety}`}>
              <div className={styles.itemLabel}>{"品種"}</div>
              <div className={styles.itemValue}>アラビカ</div>
            </div>
            <div className={`${styles.itemProductionArea}`}>
              <div className={styles.itemLabel}>{"産地"}</div>
              <div className={styles.itemValue}>
                コスタリカ・コフィアディベルサ・グアドループティピカ・カーボニックマセレーション
              </div>
            </div>
            <div className={`${styles.itemRoastingDegree}`}>
              <div className={styles.itemLabel}>{"焙煎度"}</div>
              <div className={styles.itemValue}>中煎り</div>
            </div>
          </div>
          <div className={`${styles.itemBrewingRecipe} ${styles.mobileItem}`}>
            <div className={`${styles.itemExMethod}`}>
              <div className={styles.itemLabel}>{"抽出方法"}</div>
              <div className={styles.itemValue}>ドリップ</div>
            </div>
            <div className={`${styles.itemExMaker}`}>
              <div className={styles.itemLabel}>{"抽出器具"}</div>
              <div className={styles.itemValue}>V60</div>
            </div>
            <div className={`${styles.itemGrindSize}`}>
              <div className={styles.itemLabel}>{"挽き目"}</div>
              <div className={styles.itemValue}>中挽き</div>
            </div>
            <div className={`${styles.itemTemperature}`}>
              <div className={styles.itemLabel}>{"温度（℃）"}</div>
              <div className={styles.itemValue}>90</div>
            </div>
            <div className={`${styles.itemCoffeeAmount}`}>
              <div className={styles.itemLabel}>{"粉量（ｇ）"}</div>
              <div className={styles.itemValue}>15</div>
            </div>
            <div className={`${styles.itemWaterAmount}`}>
              <div className={styles.itemLabel}>{"湯量（ｇ）"}</div>
              <div className={styles.itemValue}>240</div>
            </div>
            <div className={`${styles.itemMeasurementMethod}`}>
              <div className={styles.itemLabel}>{"計測方法"}</div>
              <div className={styles.itemValue}>抽出量</div>
            </div>
            <div className={`${styles.itemExTime}`}>
              <div className={styles.itemLabel}>{"抽出時間"}</div>
              <div className={styles.itemValue}>3分20秒</div>
            </div>
          </div>
          {/* shop */}
          {/* <div className={`${styles.itemShopData} ${styles.mobileItem}`}>
            <div className={`${styles.itemShopName}`}>
              <div className={styles.itemLabel}>{"店名"}</div>
              <div className={styles.itemValue}></div>
            </div>
            <div className={`${styles.itemShopPrice}`}>
              <div className={styles.itemLabel}>{"店の価格（円）"}</div>
              <div className={styles.itemValue}></div>
            </div>
            <div className={`${styles.itemShopDate}`}>
              <div className={styles.itemLabel}>{"飲んだ日付"}</div>
              <div className={styles.itemValue}></div>
            </div>
            <div className={`${styles.itemShopAddress}`}>
              <div className={styles.itemLabel}>{"店の住所"}</div>
              <div className={styles.itemValue}></div>
            </div>
            <div className={`${styles.itemShopUrl}`}>
              <div className={styles.itemLabel}>{"店のURL"}</div>
              <div className={styles.itemValue}></div>
            </div>
          </div>
          <div className={`${styles.itemShopCoffee} ${styles.mobileItem}`}>
            <div className={`${styles.itemCoffeeName}`}>
              <div className={styles.itemLabel}>{"コーヒー名"}</div>
              <div className={styles.itemValue}></div>
            </div>
            <div className={`${styles.itemVariety}`}>
              <div className={styles.itemLabel}>{"品種"}</div>
              <div className={styles.itemValue}></div>
            </div>
            <div className={`${styles.itemProductionArea}`}>
              <div className={styles.itemLabel}>{"産地"}</div>
              <div className={styles.itemValue}></div>
            </div>
          </div> */}
          {/* 共通 */}
          <div className={`${styles.itemTasting} ${styles.mobileItem}`}>
            <div className={`${styles.itemAcidity}`}>
              <div className={styles.itemLabel}>{"酸味"}</div>
              <div className={styles.itemValue}>3</div>
            </div>
            <div className={`${styles.itemBitterness}`}>
              <div className={styles.itemLabel}>{"苦味"}</div>
              <div className={styles.itemValue}>2</div>
            </div>
            <div className={`${styles.itemBody}`}>
              <div className={styles.itemLabel}>{"コク"}</div>
              <div className={styles.itemValue}>4</div>
            </div>
            <div className={`${styles.itemAroma}`}>
              <div className={styles.itemLabel}>{"アロマ"}</div>
              <div className={styles.itemValue}>5</div>
            </div>
            <div className={`${styles.itemAftertaste}`}>
              <div className={styles.itemLabel}>{"キレ"}</div>
              <div className={styles.itemValue}>4</div>
            </div>
            <div className={`${styles.itemOverall}`}>
              <div className={styles.itemLabel}>{"全体の好み"}</div>
              <div className={styles.itemValue}>4</div>
            </div>
            <div className={styles.itemChartImageBox}>
              <div className={styles.itemChartImage}>
                <Image
                  width={200}
                  height={200}
                  src="/images/no-image.png"
                  alt="レーダーチャートのプレビュー画像"
                />
              </div>
            </div>
          </div>
          <div className={`${styles.itemMemoArea} ${styles.mobileItem}`}>
            <div className={`${styles.itemMemo}`}>
              <div className={styles.itemLabel}>{"メモ"}</div>
              <div className={styles.itemValue}>
                全体的に美味しい珈琲で、コクもキレもバランスのとれた珈琲でした。
              </div>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <div
              className={`${styles.buttonContent} ${styles.editButtonContent}`}
            >
              <MainButton
                sizeValue="large"
                textValue="編集"
                buttonColor="btn-warning"
                widthValue="widthAuto"
              />
            </div>
            <div
              className={`${styles.buttonContent} ${styles.deleteButtonContent}`}
            >
              <MainButton
                sizeValue="large"
                textValue="削除"
                buttonColor="btn-danger"
                widthValue="widthAuto"
              />
            </div>
            <div
              className={`${styles.buttonContent} ${styles.pdfButtonContent}`}
            >
              <MainButton
                sizeValue="large"
                textValue="PDFをダウンロード"
                buttonColor="btn-main"
                widthValue="widthAuto"
              />
            </div>
          </div>
        </>
      );
    };
    return (
      <>
        <div
          className={`${styles.PageWrapper} ${styles.pageWrapper} ${styles.mobilePageWrapper}`}
          ref={containerRef}
        >
          <div className={`${styles.itemCard} ${styles.mobileCard}`}>
            {MobileCard()}
          </div>
        </div>
      </>
    );
  };
  // ウィンドウのリサイズイベントを監視
  useEffect(() => {
    // サーバーサイドレンダリング時にはwindowオブジェクトが存在しないためチェック
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      // コンポーネントがマウントされた時に初期幅を設定
      setWindowWidth(window.innerWidth);

      // リサイズイベントリスナーを追加
      window.addEventListener("resize", handleResize);

      // クリーンアップ関数
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  const getLayout = () => {
    if (windowWidth >= 960) {
      // PC向け (lgブレイクポイント)
      return <ItemPcPage />;
    } else if (windowWidth >= 600 && windowWidth < 960) {
      // タブレット向け (mdブレイクポイント)
      return <ItemTabletPage />;
    } else {
      // スマホ向け (それ以外)
      return <ItemMobilePage />;
    }
  };

  return (
    <div className={`${styles.itemPageContents} ${styles.pageContents}`}>
      <PageTitle ItemTitle="Item Page" />

      {windowWidth > 0 && getLayout()}
    </div>
  );
};
export default ItemPage;
