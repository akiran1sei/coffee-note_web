"use client";
import styles from "@/app/styles/Pages.module.css";
import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { IconButton, MainButton } from "@/app/components/buttons/Buttons";
import { SelfPcCard, SelfMobileCard } from "@/app/components/list/Self";
import { ShopPcCard, ShopMobileCard } from "@/app/components/list/Shop";
import { CoffeeRecord } from "@/app/types/db";

interface PageTitleProps {
  listItemValue: string;
}
type CheckboxChangeData = { id: string; isChecked: boolean };
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
  // const [isChecked, setIsChecked] = useState<CheckedValue>(false);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  // ウィンドウ幅の状態を管理
  const [windowWidth, setWindowWidth] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);

  const handleDeleteClick = async (id: string) => {
    // 該当する記録を見つける
    const response = await fetch(`/api/database?id=${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    console.log("DELETE response data:", data);
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
  const handleMultiDeleteClick = async (id: string[]) => {
    // 💡 id配列が空でないことを確認し、最初の要素を代表として使う
    const firstId = id[0];

    // id配列が空の場合の処理（重要）
    if (!firstId) {
      alert("削除対象のIDが指定されていません。");
      return;
    }

    // 該当する記録を見つける
    // record.id（string）が、firstId（string）と一致するかを比較
    const recordToDelete = localRecords.find((record) => record.id === firstId);

    // 【解説】
    // 最初のID（firstId: string）を使って検索することで、
    // string === string の比較になり、TS2367エラーが解消されます。

    if (!recordToDelete) return; // レコードが見つからない場合は処理を中断

    // ...（APIへのフェッチ処理）

    const response = await fetch(`/api/database`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }), // IDの配列をJSONとして送信
    });
    const data = await response.json();
    console.log("DELETE response data:", data);
    // ユーザーに削除の確認を求める（最初のレコード名を表示）
    const isConfirmed = window.confirm(
      `"${recordToDelete.name || "この記録"}"を含む、合計${
        id.length
      }件の記録を削除してもよろしいですか？`
    );
    if (isConfirmed) {
      try {
        // ...（APIへのDELETEリクエスト）

        // 💡 修正点: ローカルの状態から「id配列に含まれるすべてのID」を削除
        setLocalRecords((prev) =>
          prev.filter(
            (record) =>
              // id配列（string[]）に record.id（string）が含まれていない（!includes）ものを残す
              !id.includes(record.id)
          )
        );
        alert("レコードが正常に削除されました。");
      } catch (error) {
        alert("レコードの削除に失敗しました。");
        console.error("削除エラー:", error);
      }
    }
  };

  const handleCheckboxChange = useCallback(
    ({ id, isChecked }: CheckboxChangeData) => {
      console.log(
        `親コンポーネントで受け取った値 - ID: ${id}, チェック状態: ${isChecked}`
      );

      setCheckedIds((prevIds) => {
        if (isChecked) {
          // チェックされた場合: IDがまだリストになければ追加
          return Array.from(new Set([...prevIds, id]));
        } else {
          // チェックが外された場合: IDをリストから削除
          return prevIds.filter((checkedId) => checkedId !== id);
        }
      });
    },
    []
  ); // 依存配列は空のまま

  // 確認のためのログ
  useEffect(() => {
    console.log("現在チェックされているIDリスト:", checkedIds);
  }, [checkedIds]);
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
  // 確認のためのログ
  useEffect(() => {
    console.log("現在チェックされているIDリスト:", checkedIds);
  }, [checkedIds]);
  // PC向けのレイアウト
  const ListPcPage = () => {
    const pcCard = (record: CoffeeRecord) => {
      const isRecordChecked = checkedIds.includes(record.id ?? "");
      return record.self === "self" ? (
        <SelfPcCard
          value={record}
          onClickDelete={handleDeleteClick}
          onCheckboxChange={handleCheckboxChange}
          isChecked={isRecordChecked}
        />
      ) : record.self === "shop" ? (
        <ShopPcCard
          value={record}
          onClickDelete={handleDeleteClick}
          onCheckboxChange={handleCheckboxChange}
          isChecked={isRecordChecked}
        />
      ) : null;
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
      const isRecordChecked = checkedIds.includes(record.id ?? "");

      return record.self === "self" ? (
        <SelfMobileCard
          value={record}
          onClickDelete={handleDeleteClick}
          onCheckboxChange={handleCheckboxChange}
          isChecked={isRecordChecked}
        />
      ) : record.self === "shop" ? (
        <ShopMobileCard
          value={record}
          onClickDelete={handleDeleteClick}
          onCheckboxChange={handleCheckboxChange}
          isChecked={isRecordChecked}
        />
      ) : null;
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
    const fetchData = async () => {
      const records = await fetch("/api/database").then((res) => res.json());
      console.log("records", records.data);
      return setLocalRecords(records.data);
    };
    fetchData();
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
            onClick={() => {
              if (checkedIds) {
                handleMultiDeleteClick(checkedIds);
              }
            }}
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
