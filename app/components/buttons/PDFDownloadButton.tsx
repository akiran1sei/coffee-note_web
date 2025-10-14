// PdfDownloadButton.tsx (Client Component: 'use client' が必要)
"use client";

import { useRef } from "react";
import { MainButton } from "./Buttons";
import { CoffeeRecord } from "@/app/types/db";
// import { useRef, useState } from "react"; // ロード中表示が不要ならuseStateは削除
interface pdfValueProps {
  pdfValue: CoffeeRecord;
}
export const PdfDownloadButton: React.FC<pdfValueProps> = ({ pdfValue }) => {
  // HTML要素を参照するためのrefを、型引数付きで定義（より安全）
  const contentRef = useRef<HTMLDivElement>(null);
  console.log(pdfValue);
  const handleDownload = async () => {
    // refがDOM要素を指していない場合は処理を中断

    if (!contentRef.current) {
      console.error("PDFコンテンツの参照が見つかりません。");
      return;
    }
    console.log("PDF生成を開始します。参照要素:", contentRef.current);
    try {
      console.log("pdf:::", pdfValue);
      // 標準の動的インポートでモジュールをロード
      // mod.default が html2pdf 関数を返します
      // ※ .d.ts ファイルが正しく設定されていれば、型エラーは出ません
      const { default: html2pdf } = await import("html2pdf.js");

      // PDF生成オプションの設定
      const options = {
        margin: 10,
        filename: `coffee_report.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: {
          scale: 2, // 解像度を高める
          useCORS: true, // 外部画像取り込みのために重要
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }, // A4サイズで縦向き
      };

      // PDFの生成とダウンロード実行
      html2pdf().from(contentRef.current).set(options).save();
    } catch (error) {
      console.error("PDF生成エラー:", error);
    }
  };
  return (
    <div>
      {/* 修正1: MainButtonを使用する (あるいはそのままのbuttonを使う場合はMainButtonのimportを削除) */}

      <MainButton
        onClick={handleDownload}
        sizeValue="large" // ← 必須プロパティは追加する必要があります
        buttonColor="btn-primary" // ← 必須プロパティ
        widthValue="widthNearlyFull" // ← 必須プロパティ
      >
        PDFをダウンロード!
      </MainButton>
      {/* -------------------------------------------------------- */}
      {/* <button
        onClick={handleDownload}
        // Tailwindを使わないシンプルなボタンのスタイル
        style={{
          padding: "20px 100px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        PDFをダウンロード!
      </button> */}
      {/* -------------------------------------------------------- */}
      {/* ★ PDFに出力したいコンテンツ本体 ★ */}
      {/* -------------------------------------------------------- */}
      <div
        ref={contentRef}
        // 修正2: 画面に表示しない設定を適用
        // display: "none" はhtml2pdf.jsで問題を起こす場合があるため、より確実な方法として非表示スタイルを適用
        style={{
          position: "absolute",
          left: "-9999px", // 画面外に移動
          // display: "none", // こちらでも動作する可能性あり
          width: "210mm",
          padding: "10mm",
          boxSizing: "border-box",
          fontFamily: "sans-serif",
          color: "#333",
        }}
      >
        {/* PDFレイアウトのヘッダー */}
        <h1>コーヒーレポート</h1> {/* 例として追加 */}
        {/* メインコンテンツ */}
        {pdfValue ? (
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
            {/* ★★★ この部分に、CoffeeRecordの他のプロパティをすべて追加する ★★★ */}
            <p>あきら</p>
            <p>生産地: {pdfValue.productionArea}</p>
            {/* CoffeeRecordにあると仮定 */}
            <p>焙煎度: {pdfValue.roastingDegree}</p>
            {/* CoffeeRecordにあると仮定 */}
          </>
        ) : (
          <p>データを読み込み中...</p>
        )}
      </div>
    </div>
  );
};
