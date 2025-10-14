// PdfDownloadButton.tsx (Client Component: 'use client' が必要)
"use client";
import styles from "/app/styles/PDF.module.css";
import { useRef, useState } from "react"; // useState を追加
import { MainButton } from "./Buttons";
import { CoffeeRecord } from "@/app/types/db";

interface pdfValueProps {
  pdfValue: CoffeeRecord;
}

export const PdfDownloadButton: React.FC<pdfValueProps> = ({ pdfValue }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false); // 1. 生成状態を管理

  const handleDownload = async () => {
    if (!contentRef.current) {
      console.error("PDFコンテンツの参照が見つかりません。");
      return;
    }

    setIsGenerating(true); // 2. 生成開始時に表示を ON にする
    console.log("PDF生成を開始します。参照要素:", contentRef.current);

    // DOMが更新されるのを待つために、わずかな遅延を入れる（レンダリング待ち）
    await new Promise((resolve) => setTimeout(resolve, 50));

    try {
      const { default: html2pdf } = await import("html2pdf.js");

      // const options = {
      //   margin: 10,
      //   filename: `coffee_report.pdf`,
      //   image: { type: "jpeg" as const, quality: 0.98 },
      //   html2canvas: {
      //     scale: 2,
      //     useCORS: true,
      //   },
      //   jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      // };
      const options = {
        margin: 0,
        filename: `coffee_report.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },

        html2canvas: {
          scale: 2,
          useCORS: true,
          foreignObject: "disabled",
          // ★ 追加: セキュリティ上の制約を緩和し、キャプチャを試みる
          allowTaint: true,
          logging: true, // コンソールにログが出力されるか確認用
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().from(contentRef.current).set(options).save();
    } catch (error) {
      console.error("PDF生成エラー:", error);
    } finally {
      setIsGenerating(false); // 3. 生成完了後（またはエラー後）に非表示に戻す
    }
  };

  return (
    <div className={styles.pdfWrapper}>
      <div className={styles.pdfHeader}>
        <MainButton
          onClick={handleDownload}
          sizeValue="large"
          buttonColor="btn-primary"
          widthValue="widthNearlyFull"
          disabled={isGenerating} // 生成中はボタンを無効化
        >
          {isGenerating ? "PDFを生成中..." : "PDFをダウンロード!"}
        </MainButton>
      </div>
      {/* -------------------------------------------------------- */}
      {/* ★ PDFに出力したいコンテンツ本体 ★ */}
      {/* -------------------------------------------------------- */}
      <div className={styles.pdfBody}>
        <div ref={contentRef} className={styles.pdfContainer}>
          {/* PDFレイアウトのヘッダー */}
          <h1 className={styles.pdfHeader}>コーヒーレポート</h1>
          {/* メインコンテンツ */}
          {/* {pdfValue ? (
          <>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "20px",
                color: "#333",
              }}
            >
              豆の名前: {pdfValue.name}
            </p>
            <p>生産地: {pdfValue.productionArea}</p>
            <p>焙煎度: {pdfValue.roastingDegree}</p>
          </>
        ) : (
          <p>データを読み込み中...</p>
        )} */}
          <p className={styles.pdfText}>テストデータ</p>
        </div>
      </div>
    </div>
  );
};
