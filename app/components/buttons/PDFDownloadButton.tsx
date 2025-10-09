// PdfDownloadButton.tsx (Client Component: 'use client' が必要)
"use client";

import { useRef } from "react";
// import { useRef, useState } from "react"; // ロード中表示が不要ならuseStateは削除

export default function PdfDownloadButton() {
  // HTML要素を参照するためのrefを、型引数付きで定義（より安全）
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    // refがDOM要素を指していない場合は処理を中断
    if (!contentRef.current) {
      console.error("PDFコンテンツの参照が見つかりません。");
      return;
    }
    console.log("PDF生成を開始します。参照要素:", contentRef.current);
    try {
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
      <button
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
        PDFをダウンロード
      </button>

      {/* -------------------------------------------------------- */}
      {/* ★ PDFに出力したいコンテンツ本体 ★ */}
      {/* -------------------------------------------------------- */}
      {/* <div
        ref={contentRef}
        // 普段は画面に表示しない（生成時のみ使用）
        style={{
          // display: "none",
          // PDFのサイズとマージンを意識したコンテナスタイル
          width: "210mm",
          padding: "10mm",
          boxSizing: "border-box",
          fontFamily: "sans-serif",
          color: "#333",
        }}
      > */}
      {/* PDFレイアウトのヘッダー */}

      {/* メインコンテンツ */}
      {/* </div> */}
    </div>
  );
}
