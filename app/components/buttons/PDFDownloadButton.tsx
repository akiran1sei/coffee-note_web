"use client";
import React, { CSSProperties } from "react";
import { PDFDownloadLink, View, Text, StyleSheet } from "@react-pdf/renderer";
// 相対パスはご自身のプロジェクト構造に合わせて適宜修正してください
import { PDF_Contents } from "../pdf/PDF_Contents";
import { CoffeeRecord } from "@/app/types/db";

interface PDFProps {
  value: CoffeeRecord[];
}

// ボタンのスタイル定義
const buttonStyle: CSSProperties = {
  backgroundColor: "#4f46e5", // indigo-600
  color: "white",
  fontWeight: "bold",
  padding: "8px 16px",
  borderRadius: "4px",
  transition: "background-color 150ms ease-in-out",
  textDecoration: "none", // PDFDownloadLinkはアンカータグになるため
  display: "inline-block",
};

// エラーメッセージのスタイル定義

const styles = StyleSheet.create({
  errorStyle: {
    fontSize: "0.875rem", // text-sm
    color: "#ef4444", // text-red-500
    padding: "8px",
    border: "1px solid #fecaca", // border-red-200
    borderRadius: "4px",
  },
});
const PDFDownloadButton: React.FC<PDFProps> = ({ value }) => {
  // 修正点: value配列が空でないか確認する
  const PDF_Value = value[0];
  if (!value || value.length === 0) {
    // データがない場合は代替メッセージを表示する
    return (
      <View>
        <Text style={styles.errorStyle}>
          PDF生成に必要なデータがありません。
        </Text>
      </View>
    );
  } else {
    return (
      <PDFDownloadLink
        // PDF_ContentsはCoffeeRecord[]を期待しているため、[PDF_Value]と配列で渡す
        document={<PDF_Contents coffees={[PDF_Value]} />}
        fileName="my_report.pdf" // ダウンロード時のファイル名
        // Tailwindクラスを通常のstyleに置き換え
        style={buttonStyle}
        // ホバーエフェクトはインラインstyleでは複雑になるため、ここでは省略します。
      >
        {({ loading }) => (loading ? "PDFを準備中..." : "PDFをダウンロード")}
      </PDFDownloadLink>
    );
  }

  // value配列の最初の要素を取得
  // Note: PDF_Contentsが単一のCoffeeRecordしか受け入れない場合、このロジックでOK
};

export default PDFDownloadButton;
