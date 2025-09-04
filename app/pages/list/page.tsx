"use client";
import styles from "@/app/styles/Pages.module.css";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { IconButton, MainButton } from "@/app/components/buttons/page";
import { SelfPcCard, SelfMobileCard } from "@/app/components/list/self/page";
import { ShopPcCard, ShopMobileCard } from "@/app/components/list/shop/page";

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
    if (typeof window !== "undefined") {
      const handleResize = () => {
        // document.documentElement.clientWidth を使用
        setWindowWidth(document.documentElement.clientWidth);
      };

      // コンポーネントがマウントされた時に初期幅を設定
      setWindowWidth(document.documentElement.clientWidth);

      // リサイズイベントリスナーを追加
      window.addEventListener("resize", handleResize);

      // クリーンアップ関数
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  const [version, setVersion] = useState(true);
  // const [version, setVersion] = useState(false);
  const [load, setLoad] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);
  // PC向けのレイアウト
  const ListPcPage = () => {
    const pcCard = (id: string) => {
      // versionの状態によって、表示するコンポーネントを切り替えます
      return version ? <SelfPcCard id={id} /> : <ShopPcCard id={id} />;
    };
    const cards = Array.from({ length: 5 });
    return (
      <>
        <div
          className={`${styles.listPageWrapper} ${styles.pageWrapper} ${styles.listPcPageWrapper}`}
        >
          {cards.map((_, index) => (
            <div
              className={`${styles.listItemCard} ${styles.listPcCard} ${styles.listItemVersion}`}
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
    if (windowWidth < 960) {
      return ListMobilePage();
    } else {
      return ListPcPage();
    }
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
    const cards = Array.from({ length: 5 });
    const MobileCard = (id: string) => {
      return version ? <SelfMobileCard id={id} /> : <ShopMobileCard id={id} />;
    };
    console.log();
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
              className={`${styles.listItemCard} ${styles.listMobileCard} ${styles.listItemVersion}`}
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
  const handlePopup = () => {
    try {
      setLoad(true);
      setIsOpen(!isOpen);
    } catch (error) {
      console.error("エラーです。", error);
    } finally {
      setLoad(false);
    }
  };
  useEffect(() => {
    setIsFadingIn(isOpen);
  }, [isOpen]);
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
            className={`${styles.buttonContent} ${styles.searchButtonContent}`}
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
      <div className={`${styles.listMultiButtonArea}`}>
        <div className={`${styles.listButtonContainer} `}>
          <div
            className={`${styles.buttonContent} ${styles.deleteButtonContent}`}
          >
            <MainButton
              sizeValue="large"
              textValue="チェック削除"
              buttonColor="btn-danger"
              widthValue="widthNearlyFull"
            />
          </div>
          <div className={`${styles.buttonContent} ${styles.pdfButtonContent}`}>
            <MainButton
              sizeValue="large"
              textValue="チェックPDF"
              buttonColor="btn-success"
              widthValue="widthNearlyFull"
            />
          </div>
        </div>
      </div>
      <div
        className={`${styles.buttonContent} ${styles.sortButtonContent}`}
        onClick={handlePopup}
      >
        <MainButton
          sizeValue="small"
          textValue="並び替え"
          buttonColor="btn-secondary"
          widthValue="widthAuto"
        />
      </div>
      <div
        className={`${styles.modal} ${
          !isFadingIn ? styles.fade_out : styles.fade_in
        }`}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>並び替え基準を選択</div>
          <div className={styles.modalBody}>
            <ul className={styles.modalList}>
              <li className={styles.modalListItem}>酸味 昇順</li>
              <li className={styles.modalListItem}>酸味 降順</li>
              <li className={styles.modalListItem}>苦味 昇順</li>
              <li className={styles.modalListItem}>苦味 降順</li>
              <li className={styles.modalListItem}>コク 昇順</li>
              <li className={styles.modalListItem}>コク 降順</li>
              <li className={styles.modalListItem}>香り 昇順</li>
              <li className={styles.modalListItem}>香り 降順</li>
              <li className={styles.modalListItem}>キレ 昇順</li>
              <li className={styles.modalListItem}>キレ 降順</li>
              <li className={styles.modalListItem}>全体 昇順</li>
              <li className={styles.modalListItem}>全体 降順</li>
              <li className={styles.modalListItem}>作成日時 昇順</li>
              <li className={styles.modalListItem}>作成日時 降順</li>
            </ul>
          </div>
          <div
            className={`${styles.modalFooter} ${styles.modalClose}`}
            onClick={handlePopup}
          >
            <IconButton
              value="close"
              iconWidth="iconMd"
              buttonColor="btn-secondary"
            />
          </div>
        </div>
      </div>
      {windowWidth > 0 && getLayout()}
    </div>
  );
};
export default ListPage;
