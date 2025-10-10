"use client";
import styles from "@/app/styles/Pages.module.css";
import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

import { IconButton, MainButton } from "@/app/components/buttons/Buttons";
import { SelfPcCard, SelfMobileCard } from "@/app/components/list/Self";
import { ShopPcCard, ShopMobileCard } from "@/app/components/list/Shop";
import { CoffeeRecord } from "@/app/types/db";
import { PdfDownloadButton } from "@/app/components/buttons/PDFDownloadButton";
interface PageTitleProps {
  listItemValue: string;
}
type CheckboxChangeData = { id: string; isChecked: boolean };

// タイトルコンポーネントのモック
const PageTitle: React.FC<PageTitleProps> = ({ listItemValue }) => (
  <h1>{listItemValue}</h1>
);

// ✅ Next.js App Router用のページコンポーネント
export default function ListPage() {
  // モックデータ（実際の開発では、ここでAPIからデータを取得）
  const [localRecords, setLocalRecords] = useState<CoffeeRecord[]>([]);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  // ウィンドウ幅の状態を管理
  const [windowWidth, setWindowWidth] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [pdfValue, setPdfValue] = useState<CoffeeRecord[]>([]);
  // ★ 修正点 1: sortObject の型を Record<string, 1 | -1> に修正し、JSON文字列をStateから除外
  const [sortObject, setSortObject] = useState<Record<string, 1 | -1>>({
    createdAt: -1,
  });

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isSortFadingIn, setIsSortFadingIn] = useState(false);
  const [isPdfFadingIn, setIsPdfFadingIn] = useState(false);

  // NOTE: window.confirm/alert は、動作環境によっては表示されないため、
  // 実際のプロダクションコードではカスタムモーダルを使用してください。
  const handleSortPopup = () => {
    try {
      setIsSortOpen(!isSortOpen);
    } catch (error) {
      console.error("エラーです。", error);
    }
  };
  const handlePdfPopup = () => {
    try {
      setIsPdfOpen(!isPdfOpen);
    } catch (error) {
      console.error("エラーです。", error);
    }
  };

  const handleDeleteClick = async (id: string) => {
    const recordToDelete = localRecords.find((record) => record.id === id);
    if (!recordToDelete) return;

    // ユーザーに削除の確認を求める
    const isConfirmed = window.confirm(
      `"${recordToDelete.name || "この記録"}"を削除してもよろしいですか？`
    );

    if (isConfirmed) {
      try {
        const response = await fetch(`/api/controllers`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }), // 単一IDを送信
        });

        const data = await response.json();
        console.log("DELETE response data:", data);

        if (response.ok) {
          // ローカルの状態から削除
          setLocalRecords((prev) => prev.filter((record) => record.id !== id));
          alert("レコードが正常に削除されました。");
        } else {
          alert(
            `レコードの削除に失敗しました: ${data.message || "Unknown error"}`
          );
        }
      } catch (error) {
        alert("レコードの削除に失敗しました。");
        console.error("単一削除エラー:", error);
      }
    }
  };

  const handleDownloadClick = async (value: Partial<CoffeeRecord>) => {
    // ...
    // id が undefined の可能性があるため、ここでチェックが必要です
    if (!value.id) {
      console.error("IDが欠落しています");
      return;
    }
    const response = await fetch(`/api/controllers?id=${value.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    console.log("GET response data:", [data.data]);
    setPdfValue([data.data]);
    const isConfirmed = window.confirm(
      `"${value.name || "この記録"}"をダウンロードしてもよろしいですか？`
    );

    const pdf_value = async () => {
      await handlePdfPopup();
    };
    if (isConfirmed) {
      try {
        await pdf_value();
        return;
      } catch (error) {
        alert("レコードのダウンロードに失敗しました。");
        console.error("単一ダウンロードエラー:", error);
      }
    }
  };

  const handleMultiDeleteClick = async (idArray: string[]) => {
    if (idArray.length === 0) {
      alert("削除対象のIDが指定されていません。");
      return;
    }

    // 最初のレコード名を表示用に取得
    const recordToDelete = localRecords.find(
      (record) => record.id === idArray[0]
    );
    const name = recordToDelete ? recordToDelete.name : "この記録";

    // ユーザーに削除の確認を求める
    const isConfirmed = window.confirm(
      `"${name}"を含む、合計${idArray.length}件の記録を削除してもよろしいですか？`
    );

    if (isConfirmed) {
      try {
        const response = await fetch(`/api/controllers`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: idArray }), // IDの配列を送信
        });

        const data = await response.json();
        console.log("Multi DELETE response data:", data);

        if (response.ok) {
          // 💡 ローカルの状態から「idArrayに含まれるすべてのID」を削除
          setLocalRecords((prev) =>
            prev.filter((record) => !idArray.includes(record.id))
          );
          // チェックリストをクリア
          setCheckedIds([]);
          alert("複数レコードが正常に削除されました。");
        } else {
          alert(
            `レコードの削除に失敗しました: ${data.message || "Unknown error"}`
          );
        }
      } catch (error) {
        alert("レコードの削除に失敗しました。");
        console.error("複数削除エラー:", error);
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
  );

  const getLayout = () => {
    if (windowWidth >= 960) {
      return <ListPcPage />;
    } else if (windowWidth >= 600 && windowWidth < 960) {
      return <ListTabletPage />;
    } else {
      return <ListMobilePage />;
    }
  };

  /**
   * 並び替えオプションのリスト。
   * label: ユーザーに表示する文字列
   * sort: Mongoose の .sort() にそのまま渡せるオブジェクト (Record<string, 1 | -1>)
   */
  const listSortItem = [
    { label: "酸味 昇順", sort: { acidity: 1 } },
    { label: "酸味 降順", sort: { acidity: -1 } },
    { label: "苦味 昇順", sort: { bitterness: 1 } },
    { label: "苦味 降順", sort: { bitterness: -1 } },
    { label: "コク 昇順", sort: { body: 1 } },
    { label: "コク 降順", sort: { body: -1 } },
    { label: "香り 昇順", sort: { aroma: 1 } },
    { label: "香り 降順", sort: { aroma: -1 } },
    { label: "キレ 昇順", sort: { sharpness: 1 } },
    { label: "キレ 降順", sort: { sharpness: -1 } },
    { label: "全体 昇順", sort: { overall: 1 } },
    { label: "全体 降順", sort: { overall: -1 } },
    { label: "作成日時 昇順", sort: { createdAt: 1 } },
    { label: "作成日時 降順", sort: { createdAt: -1 } },
  ] as const;

  // ★ 修正点 2: handleSort の引数型を Record<string, 1 | -1> に修正
  const handleSort = (itemSortObject: Record<string, 1 | -1>) => {
    setSortObject(itemSortObject); // オブジェクトをStateに保存
    setIsSortOpen(false); // ポップアップを閉じる
  };

  // PC向けのレイアウト (簡略化)
  const ListPcPage = () => {
    const pcCard = (record: CoffeeRecord) => {
      const isRecordChecked = checkedIds.includes(record.id ?? "");
      return record.self === "self" ? (
        <SelfPcCard
          value={record}
          onClickDelete={handleDeleteClick}
          onClickDownload={handleDownloadClick}
          onCheckboxChange={handleCheckboxChange}
          isChecked={isRecordChecked}
        />
      ) : record.self === "shop" ? (
        <ShopPcCard
          value={record}
          onClickDelete={handleDeleteClick}
          onClickDownload={handleDownloadClick}
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
    // タブレットのレイアウトはモバイルとPCの中間またはPCに準拠することが多いため、
    // ここでは簡略化のため、PC/モバイルのいずれかにフォールバックさせます。
    return windowWidth >= 960 ? <ListPcPage /> : <ListMobilePage />;
  };

  // スマホ向けのレイアウト (簡略化)
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
          onClickDownload={handleDownloadClick}
          onCheckboxChange={handleCheckboxChange}
          isChecked={isRecordChecked}
        />
      ) : record.self === "shop" ? (
        <ShopMobileCard
          value={record}
          onClickDelete={handleDeleteClick}
          onClickDownload={handleDownloadClick}
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

  useEffect(() => {
    setIsSortFadingIn(isSortOpen);
  }, [isSortOpen]);
  useEffect(() => {
    setIsPdfFadingIn(isPdfOpen);
  }, [isPdfOpen]);

  // ★ 修正点 3: データ取得の useEffect を一つに統合（古い空の依存配列のものは削除）
  useEffect(() => {
    const handleFetchData = async () => {
      // ソートオブジェクトをAPIに送信するためにJSON文字列に変換
      const sortString = JSON.stringify(sortObject);

      try {
        const response = await fetch(
          `/api/controllers?search=${searchValue}&sort=${sortString}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        // サーバーエラーの場合、JSONパースを避ける
        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Error:", response.status, errorText);
          // エラーが発生した場合はデータの更新を行わない
          return;
        }

        // JSONをパース
        const getData = await response.json();

        // データが存在するか確認
        if (getData.data) {
          setLocalRecords(getData.data);
        }
      } catch (error) {
        console.error("データ取得中にエラーが発生しました:", error);
      }
    };

    // マウント時と依存値が変更されたときに実行
    handleFetchData();

    // NOTE: checkedIdsのログ出力はデバッグ用であり、依存配列に入れると無駄なfetchを発生させるため除外
  }, [searchValue, sortObject]); // searchValue または sortObject が変わったら再取得

  return (
    <div className={`${styles.listPageContents} ${styles.pageContents}`}>
      <PageTitle listItemValue="List Page" />
      <div className={`${styles.listSearchArea}`}>
        <label htmlFor="search-input">
          <div className={styles.listSearchImage}>
            <Image
              width={30}
              height={30}
              src={"/images/search.svg"}
              alt="検索アイコン"
            />
          </div>
        </label>
        <div className={` ${styles.listSearchInput}`}>
          <input
            type="text"
            id="search-input"
            name="search"
            placeholder="店名 or コーヒー名"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className={`${styles.listMultiButtonArea}`}>
        <div className={`${styles.listButtonContainer} `}>
          <div
            className={`${styles.buttonContent} ${styles.deleteButtonContent}`}
            onClick={() => {
              handleMultiDeleteClick(checkedIds);
            }}
          >
            <MainButton
              sizeValue="large"
              textValue="チェック削除"
              buttonColor="btn-danger"
              widthValue="widthAuto"
            />
          </div>
          <div
            className={`${styles.buttonContent} ${styles.pdfButtonContent}`}
            onClick={handlePdfPopup}
          >
            <MainButton
              sizeValue="large"
              textValue="PDFダウンロード"
              buttonColor="btn-secondary"
              widthValue="widthAuto"
            />
          </div>
        </div>
      </div>
      <div
        className={`${styles.buttonContent} ${styles.sortButtonContent}`}
        onClick={handleSortPopup}
      >
        <MainButton
          sizeValue="small"
          textValue="並び替え"
          buttonColor="btn-secondary"
          widthValue="widthAuto"
        />
      </div>
      <div
        className={`${styles.modal} ${styles.modalSort} ${
          !isSortFadingIn ? styles.fade_out : styles.fade_in
        }`}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>並び替え基準を選択</div>
          <div className={styles.modalBody}>
            <ul className={styles.modalList}>
              {listSortItem.map((item, index) => {
                return (
                  <li
                    className={styles.modalListItem}
                    key={index}
                    onClick={() => handleSort(item.sort)} // ★ オブジェクトを直接渡す
                  >
                    {item.label}
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            className={`${styles.modalFooter} ${styles.modalClose}`}
            onClick={handleSortPopup}
          >
            <IconButton
              value="close"
              iconWidth="iconMd"
              buttonColor="btn-secondary"
            />
          </div>
        </div>
      </div>
      <div
        className={`${styles.modal} ${styles.modalPdf} ${
          !isPdfFadingIn ? styles.fade_out : styles.fade_in
        }`}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>PDFダウンロード</div>
          <div className={styles.modalBody}>
            <div className={`${styles.buttonContent}`}>
              {pdfValue ? (
                <PdfDownloadButton pdfValue={pdfValue[0]} />
              ) : (
                <p>データを読み込み中...</p>
              )}
            </div>
          </div>
          <div
            className={`${styles.modalFooter} ${styles.modalClose}`}
            onClick={handlePdfPopup}
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
