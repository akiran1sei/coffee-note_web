"use client";
import styles from "@/app/styles/Pages.module.css";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MainButton } from "@/app/components/buttons/page";

interface PageTitleProps {
  listItemValue: string;
}

// タイトルコンポーネントのモック
// 本来は共通コンポーネントとして定義されていると想定
const PageTitle: React.FC<PageTitleProps> = ({ listItemValue }) => (
  <h1>{listItemValue}</h1>
);

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
    const pcCard = (id: string) => {
      const checkboxId = `checkbox_${id}`;
      return (
        <>
          {/* チェックボックス */}
          <div className={styles.listCheckboxContainer}>
            <label htmlFor={checkboxId} className={styles.listCheckboxLabel}>
              <input
                id={checkboxId}
                type="checkbox"
                name="checkbox"
                title="チェックボックス"
                className={styles.listCheckboxInput}
              />
            </label>
          </div>
          {/* self */}
          <div
            className={`${styles.listItemCoffeeBeans}  ${styles.listPcItem}`}
          >
            <div className={`${styles.listItemCoffeeName}`}>
              <div className={styles.listItemLabel}>{"コーヒー名"}</div>
              <div className={styles.listItemValue}>
                パナマ エスメラルダ農園 ゲイシャ
              </div>
            </div>
            <div className={styles.listItemImageBox}>
              <div className={styles.listItemImage}>
                <Image
                  width={200}
                  height={200}
                  src="/images/no-image.png"
                  alt="レーダーチャートのプレビュー画像"
                />
              </div>
            </div>
            <div className={`${styles.listItemVariety}`}>
              <div className={styles.listItemLabel}>{"品種"}</div>
              <div className={styles.listItemValue}>アラビカ</div>
            </div>
            <div className={`${styles.listItemProductionArea}`}>
              <div className={styles.listItemLabel}>{"産地"}</div>
              <div className={styles.listItemValue}>
                コスタリカ・コフィアディベルサ・グアドループティピカ・カーボニックマセレーション
              </div>
            </div>
            <div className={`${styles.listItemRoastingDegree}`}>
              <div className={styles.listItemLabel}>{"焙煎度"}</div>
              <div className={styles.listItemValue}>中煎り</div>
            </div>
          </div>
          <div
            className={`${styles.listItemBrewingRecipe} ${styles.listPcItem}`}
          >
            <div className={`${styles.listItemExMethod}`}>
              <div className={styles.listItemLabel}>{"抽出方法"}</div>
              <div className={styles.listItemValue}>ドリップ</div>
            </div>
            <div className={`${styles.listItemExMaker}`}>
              <div className={styles.listItemLabel}>{"抽出器具"}</div>
              <div className={styles.listItemValue}>V60</div>
            </div>
            <div className={`${styles.listItemGrindSize}`}>
              <div className={styles.listItemLabel}>{"挽き目"}</div>
              <div className={styles.listItemValue}>中挽き</div>
            </div>
            <div className={`${styles.listItemTemperature}`}>
              <div className={styles.listItemLabel}>{"温度（℃）"}</div>
              <div className={styles.listItemValue}>90</div>
            </div>
            <div className={`${styles.listItemCoffeeAmount}`}>
              <div className={styles.listItemLabel}>{"粉量（ｇ）"}</div>
              <div className={styles.listItemValue}>15</div>
            </div>
            <div className={`${styles.listItemWaterAmount}`}>
              <div className={styles.listItemLabel}>{"湯量（ｇ）"}</div>
              <div className={styles.listItemValue}>240</div>
            </div>
            <div className={`${styles.listItemMeasurementMethod}`}>
              <div className={styles.listItemLabel}>{"計測方法"}</div>
              <div className={styles.listItemValue}>抽出量</div>
            </div>
            <div className={`${styles.listItemExTime}`}>
              <div className={styles.listItemLabel}>{"抽出時間"}</div>
              <div className={styles.listItemValue}>3分20秒</div>
            </div>
          </div>
          {/* shop */}
          {/* <div className={`${styles.listItemShopData} ${styles.listPcItem}`}>
      <div className={`${styles.listItemShopName}`}>
        <div className={styles.listItemLabel}>{"店名"}</div>
        <div className={styles.listItemValue}></div>
      </div>
      <div className={`${styles.listItemShopPrice}`}>
        <div className={styles.listItemLabel}>{"店の価格（円）"}</div>
        <div className={styles.listItemValue}></div>
      </div>
      <div className={`${styles.listItemShopDate}`}>
        <div className={styles.listItemLabel}>{"飲んだ日付"}</div>
        <div className={styles.listItemValue}></div>
      </div>
      <div className={`${styles.listItemShopAddress}`}>
        <div className={styles.listItemLabel}>{"店の住所"}</div>
        <div className={styles.listItemValue}></div>
      </div>
      <div className={`${styles.listItemShopUrl}`}>
        <div className={styles.listItemLabel}>{"店のURL"}</div>
        <div className={styles.listItemValue}></div>
      </div>
    </div>
    <div className={`${styles.listItemShopCoffee} ${styles.listPcItem}`}>
      <div className={`${styles.listItemCoffeeName}`}>
        <div className={styles.listItemLabel}>{"コーヒー名"}</div>
        <div className={styles.listItemValue}></div>
      </div>
      <div className={`${styles.listItemVariety}`}>
        <div className={styles.listItemLabel}>{"品種"}</div>
        <div className={styles.listItemValue}></div>
      </div>
      <div className={`${styles.listItemProductionArea}`}>
        <div className={styles.listItemLabel}>{"産地"}</div>
        <div className={styles.listItemValue}></div>
      </div>
    </div> */}
          {/* 共通 */}
          <div className={`${styles.listItemTasting} ${styles.listPcItem}`}>
            <div className={`${styles.listItemAcidity}`}>
              <div className={styles.listItemLabel}>{"酸味"}</div>
              <div className={styles.listItemValue}>3</div>
            </div>
            <div className={`${styles.listItemBitterness}`}>
              <div className={styles.listItemLabel}>{"苦味"}</div>
              <div className={styles.listItemValue}>2</div>
            </div>
            <div className={`${styles.listItemBody}`}>
              <div className={styles.listItemLabel}>{"コク"}</div>
              <div className={styles.listItemValue}>4</div>
            </div>
            <div className={`${styles.listItemAroma}`}>
              <div className={styles.listItemLabel}>{"アロマ"}</div>
              <div className={styles.listItemValue}>5</div>
            </div>
            <div className={`${styles.listItemAftertaste}`}>
              <div className={styles.listItemLabel}>{"キレ"}</div>
              <div className={styles.listItemValue}>4</div>
            </div>
            <div className={`${styles.listItemOverall}`}>
              <div className={styles.listItemLabel}>{"全体の好み"}</div>
              <div className={styles.listItemValue}>4</div>
            </div>
            <div className={styles.listItemChartImageBox}>
              <div className={styles.listItemChartImage}>
                <Image
                  width={200}
                  height={200}
                  src="/images/no-image.png"
                  alt="レーダーチャートのプレビュー画像"
                />
              </div>
            </div>
          </div>
          <div className={`${styles.listItemMemoArea} ${styles.listPcItem}`}>
            <div className={`${styles.listItemMemo}`}>
              <div className={styles.listItemLabel}>{"メモ"}</div>
              <div className={styles.listItemValue}>
                全体的に美味しい珈琲で、コクもキレもバランスのとれた珈琲でした。
              </div>
            </div>
            {/* <div className={`${styles.listItemRating}`}>
              <div className={styles.listItemLabel}>{"自己評価"}</div>
              <div className={styles.listItemValue}></div>
            </div> */}
          </div>
          <div
            className={`${styles.buttonContainer} ${styles.deleteButtonContainer}`}
          >
            <MainButton
              sizeValue="large"
              textValue="削除"
              buttonColor="btn-danger"
              widthValue="widthAuto"
            />
          </div>
        </>
      );
    };
    const cards = Array.from({ length: 5 });
    return (
      <>
        <div
          className={`${styles.listPageWrapper} ${styles.pageWrapper} ${styles.listPcPageWrapper}`}
        >
          {cards.map((_, index) => (
            <div
              className={`${styles.listItemCard} ${styles.listPcCard}`}
              key={index}
            >
              {pcCard((index + 1).toString())}
            </div>
          ))}
        </div>
      </>
    );
  };

  // タブレット向けのレイアウト
  const ListTabletPage = () => {
    // 画面の向きによってPC or SPレイアウトを返す
    // 画面幅が600px未満はSP、600px以上はPCとして扱う（Tailwindのmdブレイクポイント）
    // if (windowWidth < 600) {
    //   return ListMobilePage();
    // } else {
    //   return ListPcPage();
    // }
    return ListMobilePage();
  };

  // スマホ向けのレイアウト
  const ListMobilePage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRight = () => {
      if (containerRef.current) {
        containerRef.current.scrollBy({
          // コンテナの幅分だけ右へスクロール
          left: containerRef.current.clientWidth,
          behavior: "smooth",
        });
      }
    };

    const scrollLeft = () => {
      if (containerRef.current) {
        containerRef.current.scrollBy({
          // コンテナの幅分だけ左へスクロール
          left: -containerRef.current.clientWidth,
          behavior: "smooth",
        });
      }
    };

    // const spImg = "https://placehold.co/600x400/E9E9E9/252525?text=Radar+Chart";
    const MobileCard = (id: string) => {
      const checkboxId = `checkbox_${id}`;
      return (
        <>
          {/* チェックボックス */}
          <div className={styles.listCheckboxContainer}>
            <label htmlFor={checkboxId} className={styles.listCheckboxLabel}>
              <input
                type="checkbox"
                name="checkbox"
                id={checkboxId}
                title="チェックボックス"
                className={styles.listCheckboxInput}
              />
            </label>
          </div>
          {/* self */}
          <div
            className={`${styles.listItemCoffeeBeans} ${styles.listMobileItem}`}
          >
            <div className={`${styles.listItemCoffeeName}`}>
              <div className={styles.listItemLabel}>{"コーヒー名"}</div>
              <div className={styles.listItemValue}>
                パナマ エスメラルダ農園 ゲイシャ
              </div>
            </div>
            <div className={styles.listItemImageBox}>
              <div className={styles.listItemImage}>
                <Image
                  width={300}
                  height={300}
                  src="/images/no-image.png"
                  alt="レーダーチャートのプレビュー画像"
                />
              </div>
            </div>
            <div className={`${styles.listItemVariety}`}>
              <div className={styles.listItemLabel}>{"品種"}</div>
              <div className={styles.listItemValue}>アラビカ</div>
            </div>
            <div className={`${styles.listItemProductionArea}`}>
              <div className={styles.listItemLabel}>{"産地"}</div>
              <div className={styles.listItemValue}>
                コスタリカ・コフィアディベルサ・グアドループティピカ・カーボニックマセレーション
              </div>
            </div>
            <div className={`${styles.listItemRoastingDegree}`}>
              <div className={styles.listItemLabel}>{"焙煎度"}</div>
              <div className={styles.listItemValue}>中煎り</div>
            </div>
          </div>
          <div
            className={`${styles.listItemBrewingRecipe} ${styles.listMobileItem}`}
          >
            <div className={`${styles.listItemExMethod}`}>
              <div className={styles.listItemLabel}>{"抽出方法"}</div>
              <div className={styles.listItemValue}>ドリップ</div>
            </div>
            <div className={`${styles.listItemExMaker}`}>
              <div className={styles.listItemLabel}>{"抽出器具"}</div>
              <div className={styles.listItemValue}>V60</div>
            </div>
            <div className={`${styles.listItemGrindSize}`}>
              <div className={styles.listItemLabel}>{"挽き目"}</div>
              <div className={styles.listItemValue}>中挽き</div>
            </div>
            <div className={`${styles.listItemTemperature}`}>
              <div className={styles.listItemLabel}>{"温度（℃）"}</div>
              <div className={styles.listItemValue}>90</div>
            </div>
            <div className={`${styles.listItemCoffeeAmount}`}>
              <div className={styles.listItemLabel}>{"粉量（ｇ）"}</div>
              <div className={styles.listItemValue}>15</div>
            </div>
            <div className={`${styles.listItemWaterAmount}`}>
              <div className={styles.listItemLabel}>{"湯量（ｇ）"}</div>
              <div className={styles.listItemValue}>240</div>
            </div>
            <div className={`${styles.listItemMeasurementMethod}`}>
              <div className={styles.listItemLabel}>{"計測方法"}</div>
              <div className={styles.listItemValue}>抽出量</div>
            </div>
            <div className={`${styles.listItemExTime}`}>
              <div className={styles.listItemLabel}>{"抽出時間"}</div>
              <div className={styles.listItemValue}>3分20秒</div>
            </div>
          </div>
          {/* shop */}
          {/* <div className={`${styles.listItemShopData} ${styles.listMobileItem}`}>
            <div className={`${styles.listItemShopName}`}>
              <div className={styles.listItemLabel}>{"店名"}</div>
              <div className={styles.listItemValue}></div>
            </div>
            <div className={`${styles.listItemShopPrice}`}>
              <div className={styles.listItemLabel}>{"店の価格（円）"}</div>
              <div className={styles.listItemValue}></div>
            </div>
            <div className={`${styles.listItemShopDate}`}>
              <div className={styles.listItemLabel}>{"飲んだ日付"}</div>
              <div className={styles.listItemValue}></div>
            </div>
            <div className={`${styles.listItemShopAddress}`}>
              <div className={styles.listItemLabel}>{"店の住所"}</div>
              <div className={styles.listItemValue}></div>
            </div>
            <div className={`${styles.listItemShopUrl}`}>
              <div className={styles.listItemLabel}>{"店のURL"}</div>
              <div className={styles.listItemValue}></div>
            </div>
          </div>
          <div className={`${styles.listItemShopCoffee} ${styles.listMobileItem}`}>
            <div className={`${styles.listItemCoffeeName}`}>
              <div className={styles.listItemLabel}>{"コーヒー名"}</div>
              <div className={styles.listItemValue}></div>
            </div>
            <div className={`${styles.listItemVariety}`}>
              <div className={styles.listItemLabel}>{"品種"}</div>
              <div className={styles.listItemValue}></div>
            </div>
            <div className={`${styles.listItemProductionArea}`}>
              <div className={styles.listItemLabel}>{"産地"}</div>
              <div className={styles.listItemValue}></div>
            </div>
          </div> */}
          {/* 共通 */}
          <div className={`${styles.listItemTasting} ${styles.listMobileItem}`}>
            <div className={`${styles.listItemAcidity}`}>
              <div className={styles.listItemLabel}>{"酸味"}</div>
              <div className={styles.listItemValue}>3</div>
            </div>
            <div className={`${styles.listItemBitterness}`}>
              <div className={styles.listItemLabel}>{"苦味"}</div>
              <div className={styles.listItemValue}>2</div>
            </div>
            <div className={`${styles.listItemBody}`}>
              <div className={styles.listItemLabel}>{"コク"}</div>
              <div className={styles.listItemValue}>4</div>
            </div>
            <div className={`${styles.listItemAroma}`}>
              <div className={styles.listItemLabel}>{"アロマ"}</div>
              <div className={styles.listItemValue}>5</div>
            </div>
            <div className={`${styles.listItemAftertaste}`}>
              <div className={styles.listItemLabel}>{"キレ"}</div>
              <div className={styles.listItemValue}>4</div>
            </div>
            <div className={`${styles.listItemOverall}`}>
              <div className={styles.listItemLabel}>{"全体の好み"}</div>
              <div className={styles.listItemValue}>4</div>
            </div>
            <div className={styles.listItemChartImageBox}>
              <div className={styles.listItemChartImage}>
                <Image
                  width={200}
                  height={200}
                  src="/images/no-image.png"
                  alt="レーダーチャートのプレビュー画像"
                />
              </div>
            </div>
          </div>
          <div
            className={`${styles.listItemMemoArea} ${styles.listMobileItem}`}
          >
            <div className={`${styles.listItemMemo}`}>
              <div className={styles.listItemLabel}>{"メモ"}</div>
              <div className={styles.listItemValue}>
                全体的に美味しい珈琲で、コクもキレもバランスのとれた珈琲でした。
              </div>
            </div>
          </div>
          <div
            className={`${styles.buttonContainer} ${styles.deleteButtonContainer}`}
          >
            <MainButton
              sizeValue="large"
              textValue="削除"
              buttonColor="btn-danger"
              widthValue="widthAuto"
            />
          </div>
        </>
      );
    };
    const cards = Array.from({ length: 5 });
    return (
      <>
        <div className={styles.listScrollButtons}>
          <button onClick={scrollLeft}>左へスクロール</button>
          <button onClick={scrollRight}>右へスクロール</button>
        </div>
        <div
          className={`${styles.listPageWrapper} ${styles.pageWrapper} ${styles.listMobilePageWrapper}`}
          ref={containerRef}
        >
          {cards.map((_, index) => (
            <div
              className={`${styles.listItemCard} ${styles.listMobileCard}`}
              key={index}
            >
              {MobileCard((index + 1).toString())}
            </div>
          ))}
        </div>
      </>
    );
  };

  const getLayout = () => {
    if (windowWidth >= 960) {
      // PC向け (lgブレイクポイント)
      return <ListPcPage />;
    } else if (windowWidth >= 600 && windowWidth < 960) {
      // タブレット向け (mdブレイクポイント)
      return <ListTabletPage />;
    } else {
      // スマホ向け (それ以外)
      return <ListMobilePage />;
    }
  };

  return (
    <div className={`${styles.listPageContents} ${styles.pageContents}`}>
      <PageTitle listItemValue="List Page" />
      <div className={`${styles.listSearchArea}`}>
        <label htmlFor="search-input">
          <input
            type="text"
            id="search-input"
            name="search"
            placeholder="Search..."
          />
          <div
            className={`${styles.buttonContainer} ${styles.searchButtonContainer}`}
          >
            <MainButton
              sizeValue="small"
              textValue="検索"
              buttonColor="btn-secondary"
              widthValue="widthAuto"
            />
          </div>
        </label>
      </div>
      <div
        className={`${styles.buttonContainer} ${styles.sortButtonContainer}`}
      >
        <MainButton
          sizeValue="small"
          textValue="並び替え"
          buttonColor="btn-secondary"
          widthValue="widthAuto"
        />
      </div>

      {windowWidth > 0 && getLayout()}
    </div>
  );
};
export default ListPage;
