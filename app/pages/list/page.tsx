"use client";
import styles from "@/app/styles/Pages.module.css";
import { getCoffeeRecords, deleteCoffeeRecord } from "@/app/lib/IndexedDB";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { IconButton, MainButton } from "@/app/components/buttons/page";
import { SelfPcCard, SelfMobileCard } from "@/app/components/list/self/page";
import { ShopPcCard, ShopMobileCard } from "@/app/components/list/shop/page";
import { CoffeeRecord } from "@/app/types/db";

interface PageTitleProps {
  listItemValue: string;
}
interface CoffeePageProps {
  coffeeDate: CoffeeRecord;
  listItemValue: string;
}

// タイトルコンポーネントのモック
// 本来は共通コンポーネントとして定義されていると想定
const PageTitle: React.FC<PageTitleProps> = ({ listItemValue }) => (
  <h1>{listItemValue}</h1>
);

// スタイルシートのモック
// 本来はstyles/Pages.module.cssの内容を記述

const ListPage: React.FC<CoffeePageProps> = ({ coffeeDate }) => {
  // ウィンドウ幅の状態を管理
  const [windowWidth, setWindowWidth] = useState(0);
  const [coffeeRecords, setCoffeeRecords] = useState<CoffeeRecord[]>([]);

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
  // コンポーネントがマウントされた時にデータを取得する
  useEffect(() => {
    // 非同期関数を定義し、データを取得
    const fetchRecords = async () => {
      try {
        const records = await getCoffeeRecords();
        setCoffeeRecords(records); // stateにデータをセット

        console.log("全コーヒー記録:", records); // 取得したデータをログに出力
      } catch (error) {
        console.error("記録の取得中にエラーが発生しました:", error);
      }
    };

    fetchRecords();
  }, []); // 依存配列を空にすることで、コンポーネントの初回レンダリング時のみ実行

  console.log(coffeeRecords);
  const [load, setLoad] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);
  const handleDeleteClick = async (coffee: string) => {
    // ユーザーに削除の確認を求める
    const isConfirmed = window.confirm(
      `"${coffee}"を削除してもよろしいですか？`
    );

    if (isConfirmed) {
      try {
        await deleteCoffeeRecord(coffee);
        return alert("レコードが正常に削除されました。");
        // 削除が成功したら親コンポーネントに通知し、リストを更新させる
      } catch (error) {
        alert("レコードの削除に失敗しました。");
        console.error("削除エラー:", error);
      }
    }
  };
  // PC向けのレイアウト
  const ListPcPage = () => {
    const pcCard = (record: Partial<CoffeeRecord>) => {
      // versionの状態によって、表示するコンポーネントを切り替えます
      console.log("PCカードのレコード:", record.self);
      return (
        <>
          <SelfPcCard value={record} onClick={handleDeleteClick} />
          <ShopPcCard value={record} onClick={handleDeleteClick} />
        </>
      );
    };
    const cards = Array.from({ length: 5 });
    return (
      <>
        <div
          className={`${styles.listPageWrapper} ${styles.pageWrapper} ${styles.listPcPageWrapper}`}
        >
          {coffeeRecords.map((record, index) => (
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
    // const cards = Array.from({ length: 5 });
    const MobileCard = (record: Partial<CoffeeRecord>) => {
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
          {coffeeRecords.map((record, index) => (
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
