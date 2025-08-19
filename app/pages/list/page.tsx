"use client";
import styles from "@/app/styles/Pages.module.css";

import { useState, useEffect } from "react";
import Image from "next/image";
interface PageTitleProps {
  value: string;
}

// タイトルコンポーネントのモック
// 本来は共通コンポーネントとして定義されていると想定
const PageTitle: React.FC<PageTitleProps> = ({ value }) => <h1>{value}</h1>;

// スタイルシートのモック
// 本来はstyles/Pages.module.cssの内容を記述

const ListPage = () => {
  // ウィンドウ幅の状態を管理
  const [windowWidth, setWindowWidth] = useState(0);

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

  // PC向けのレイアウト
  const ListPcPage = () => {
    return (
      <div className={`${styles.listPageWrapper}`}>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
          {/* 左側のテキストリスト */}
          <div className="md:w-1/2 bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">コーヒースタイル一覧</h2>
            <div className={`${styles.listItem}`}>
              <h3>{"タイトル 1"}</h3>
              <p>日付: 2025/08/21</p>
              {/* 他のテキストデータ */}
            </div>
            <div className={`${styles.listItem}`}>
              <h3>{"タイトル 2"}</h3>
              <p>日付: 2025/08/20</p>
              {/* 他のテキストデータ */}
            </div>
            <div className={`${styles.listItem}`}>
              <h3>{"タイトル 3"}</h3>
              <p>日付: 2025/08/19</p>
              {/* 他のテキストデータ */}
            </div>
          </div>
          {/* 右側のレーダーチャート図と詳細 */}
          <div className="md:w-1/2 bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">詳細とレーダーチャート</h2>
            <div className={`${styles.listItem}`}>
              <h3 className="text-lg font-semibold mb-2">
                {"選択したコーヒーのタイトル"}
              </h3>
              {/* プレースホルダー画像を使用 */}
              <div className={styles.uploadedImageContainer}>
                <p>プレビュー:</p>
                <div className={styles.uploadedImage}>
                  <img
                    width={300}
                    height={300}
                    src="https://placehold.co/600x400/E9E9E9/252525?text=Radar+Chart"
                    alt="レーダーチャートのプレビュー画像"
                    className={styles.image}
                  />
                </div>
              </div>
            </div>
            <div className={`${styles.listItem}`}>
              <h3 className="text-lg font-semibold mb-2">
                テイスティングノート
              </h3>
              <p>{"酸味: 5, 苦味: 2, コク: 3"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // タブレット向けのレイアウト
  const ListTbPage = () => {
    // 画面の向きによってPC or SPレイアウトを返す
    // 画面幅が768px未満はSP、768px以上はPCとして扱う（Tailwindのmdブレイクポイント）
    if (windowWidth < 768) {
      return ListSpPage();
    } else {
      return ListPcPage();
    }
  };

  // スマホ向けのレイアウト
  const ListSpPage = () => {
    const spImg = "https://placehold.co/600x400/E9E9E9/252525?text=Radar+Chart";
    return (
      <div
        className={`${styles.listPageWrapper} ${styles.pageWrapper} ${styles.listSpPageWrapper}`}
      >
        <div className={`${styles.listItemCard} ${styles.listSp}`}>
          <h2>{"タイトル"}</h2>
          {/* self */}
          <div className={`${styles.listItemCoffeeBeans}`}>
            <div className={styles.listItemImageBox}>
              <div className={styles.listItemImage}>
                {/* <Image
                  src={
                    spImg
                  }
                  width={300}
                  height={300}
                  alt={"プレビュー画像"}
                /> */}
                <img
                  width={300}
                  height={300}
                  src={spImg}
                  alt="レーダーチャートのプレビュー画像"
                  className={styles.image}
                />
              </div>
            </div>
            <div className={`${styles.listItemCoffeeName}`}>{"コーヒー名"}</div>
            <div className={`${styles.listItemVariety}`}>{"品種"}</div>
            <div className={`${styles.listItemProductionArea}`}>{"産地"}</div>
            <div className={`${styles.listItemRoastingDegree}`}>{"焙煎度"}</div>
          </div>
          <div className={`${styles.listItemBrewingRecipe}`}>
            <div className={`${styles.listItemExtractionMethod}`}>
              {"抽出方法"}
            </div>
            <div className={`${styles.listItemExtractionMaker}`}>
              {"抽出器具"}
            </div>
            <div className={`${styles.listItemGrindSize}`}>{"挽き目"}</div>
            <div className={`${styles.listItemTemperature}`}>{"温度（℃）"}</div>
            <div className={`${styles.listItemCoffeeAmount}`}>
              {"粉量（ｇ）"}
            </div>
            <div className={`${styles.listItemWaterAmount}`}>
              {"湯量（ｇ）"}
            </div>
            <div className={`${styles.listItemMeasurementMethod}`}>
              {"計測方法"}
            </div>
            <div className={`${styles.listItemExtractionTime}`}>
              {"抽出時間"}
            </div>
          </div>
          {/* shop */}
          <div className={`${styles.listItemShopData}`}>
            <div className={`${styles.listItemShopName}`}>{"店名"}</div>
            <div className={`${styles.listItemShopPrice}`}>
              {"店の価格（円）"}
            </div>
            <div className={`${styles.listItemShopDate}`}>{"飲んだ日付"}</div>
            <div className={`${styles.listItemShopAddress}`}>{"店の住所"}</div>
            <div className={`${styles.listItemShopUrl}`}>{"店のURL"}</div>
          </div>
          <div className={`${styles.listItemShopCoffee}`}>
            {" "}
            <div className={`${styles.listItemCoffeeName}`}>{"コーヒー名"}</div>
            <div className={`${styles.listItemVariety}`}>{"品種"}</div>
            <div className={`${styles.listItemProductionArea}`}>{"産地"}</div>
          </div>
          {/* 共通 */}
          <div className={`${styles.tastingEvaluation}`}>
            {" "}
            <div className={`${styles.listItemAcidity}`}>{"酸味"}</div>
            <div className={`${styles.listItemBitterness}`}>{"苦味"}</div>
            <div className={`${styles.listItemOverall}`}>{"全体の評価"}</div>
            <div className={`${styles.listItemBody}`}>{"コク"}</div>
            <div className={`${styles.listItemAroma}`}>{"アロマ"}</div>
            <div className={`${styles.listItemAftertaste}`}>{"キレ"}</div>
          </div>
          <div className={`${styles.memoArea}`}>
            {" "}
            <div className={`${styles.listItemMemo}`}>{"メモ"}</div>
            <div className={`${styles.listItemRating}`}>{"自己評価"}</div>
          </div>
        </div>
      </div>
    );
  };

  const getLayout = () => {
    if (windowWidth >= 1024) {
      // PC向け (lgブレイクポイント)
      return <ListPcPage />;
    } else if (windowWidth >= 768 && windowWidth < 1024) {
      // タブレット向け (mdブレイクポイント)
      return <ListTbPage />;
    } else {
      // スマホ向け (それ以外)
      return <ListSpPage />;
    }
  };

  return (
    <div className={styles.listPageContents}>
      <PageTitle value="List Page" />
      {windowWidth > 0 && getLayout()}
    </div>
  );
};
export default ListPage;
