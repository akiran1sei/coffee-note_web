"use client";
import styles from "@/app/styles/Pages.module.css";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { IconButton, MainButton } from "@/app/components/buttons/Buttons";
import { SelfPcCard, SelfMobileCard } from "@/app/components/list/Self";
import { ShopPcCard, ShopMobileCard } from "@/app/components/list/Shop";
import { CoffeeRecord } from "@/app/types/db";

interface PageTitleProps {
  listItemValue: string;
}

// Next.js App Routerのページコンポーネント用の型
// interface PageProps {
//   params: { [key: string]: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// }

// タイトルコンポーネントのモック
const PageTitle: React.FC<PageTitleProps> = ({ listItemValue }) => (
  <h1>{listItemValue}</h1>
);

// ✅ Next.js App Router用のページコンポーネント
export default function ListPage() {
  // モックデータ（実際の開発では、ここでAPIからデータを取得）
  const [localRecords, setLocalRecords] = useState<CoffeeRecord[]>([]);

  // ウィンドウ幅の状態を管理
  const [windowWidth, setWindowWidth] = useState(0);

  // ウィンドウのリサイズイベントを監視
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
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

  const [isOpen, setIsOpen] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);

  const handleDeleteClick = async (id: string) => {
    // 該当する記録を見つける
    const recordToDelete = localRecords.find((record) => record.id === id);
    if (!recordToDelete) return;

    // ユーザーに削除の確認を求める
    const isConfirmed = window.confirm(
      `"${recordToDelete.name || "この記録"}"を削除してもよろしいですか？`
    );

    if (isConfirmed) {
      try {
        // ローカルの状態から削除
        setLocalRecords((prev) => prev.filter((record) => record.id !== id));
        alert("レコードが正常に削除されました。");
      } catch (error) {
        alert("レコードの削除に失敗しました。");
        console.error("削除エラー:", error);
      }
    }
  };

  // PC向けのレイアウト
  const ListPcPage = () => {
    const pcCard = (record: CoffeeRecord) => {
      console.log("PCカードのレコード:", record.self);
      return (
        <>
          <SelfPcCard value={record} onClick={handleDeleteClick} />
          <ShopPcCard value={record} onClick={handleDeleteClick} />
        </>
      );
    };

    return (
      <>
        <div
          className={`${styles.listPageWrapper} ${styles.pageWrapper} ${styles.listPcPageWrapper}`}
        >
          {localRecords.map((record, index) => (
            <div
              className={`${styles.listItemCard} ${styles.listPcCard} ${styles.listItemVersion}`}
              key={record.id ?? index}
            >
              {pcCard(record)}
            </div>
          ))}
        </div>
      </>
    );
  };

  // タブレット向けのレイアウト
  const ListTabletPage = () => {
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
          left: containerRef.current.clientWidth,
          behavior: "smooth",
        });
      }
    };

    const scrollLeft = () => {
      if (containerRef.current) {
        containerRef.current.scrollBy({
          left: -containerRef.current.clientWidth,
          behavior: "smooth",
        });
      }
    };

    const MobileCard = (record: CoffeeRecord) => {
      return (
        <>
          <SelfMobileCard value={record} onClick={handleDeleteClick} />
          <ShopMobileCard value={record} onClick={handleDeleteClick} />
        </>
      );
    };

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
          {localRecords.map((record, index) => (
            <div
              className={`${styles.listItemCard} ${styles.listMobileCard} ${styles.listItemVersion}`}
              key={record.id ?? index}
            >
              {MobileCard(record)}
            </div>
          ))}
        </div>
      </>
    );
  };

  const getLayout = () => {
    if (windowWidth >= 960) {
      return <ListPcPage />;
    } else if (windowWidth >= 600 && windowWidth < 960) {
      return <ListTabletPage />;
    } else {
      return <ListMobilePage />;
    }
  };

  const handlePopup = () => {
    try {
      setIsOpen(!isOpen);
    } catch (error) {
      console.error("エラーです。", error);
    }
  };

  useEffect(() => {
    setIsFadingIn(isOpen);
  }, [isOpen]);

  // ✅ データ取得の例（実際のプロジェクトでは適切なAPIを呼び出し）
  useEffect(() => {
    // ここで実際のデータを取得
    // const fetchData = async () => {
    //   const records = await getCoffeeRecords();
    //   setLocalRecords(records);
    // };
    // fetchData();
  }, []);

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
}
