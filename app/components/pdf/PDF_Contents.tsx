"use client";
import { CoffeeRecord } from "@/app/types/db";
import { MainButton } from "@/app/components/buttons/Buttons";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";
import React, { useState, useEffect } from "react";

// フォント登録をより安全に実装
try {
  Font.register({
    family: "NotoSansJP",
    src: "/font/NotoSansJP-VariableFont_wght.ttf",
    fontStyle: "normal",
    fontWeight: "normal",
  });
} catch (e) {
  console.error("NotoSansJPフォントの登録に失敗しました。", e);
}

// 安全にデータを文字列に変換するヘルパー関数
const safeToString = (
  value: string | number | boolean | null | undefined
): string => {
  if (value === null || value === undefined) {
    return "N/A";
  }

  if (typeof value === "object") {
    return "N/A";
  }

  return String(value).trim() || "N/A";
};

interface CoffeeReportDocumentProps {
  data: CoffeeRecord;
}

const CoffeeReportDocument: React.FC<CoffeeReportDocumentProps> = ({
  data,
}) => {
  if (!data || typeof data !== "object") {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.header}>エラー</Text>
          <Text>有効なコーヒーレコードデータがありません。</Text>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>コーヒーレポート</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.dataTitle}>テストデータ</Text>

          <View style={styles.dataContainer}>
            <Text style={styles.dataLine}>
              豆の名前: {safeToString(data.name)}
            </Text>
            <Text style={styles.dataLine}>
              品種: {safeToString(data.variety)}
            </Text>
            <Text style={styles.dataLine}>
              生産地: {safeToString(data.productionArea)}
            </Text>
            <Text style={styles.dataLine}>
              焙煎度: {safeToString(data.roastingDegree)}
            </Text>
            <Text style={styles.dataLine}>
              抽出方法: {safeToString(data.extractionMethod)}
            </Text>
            <Text style={styles.dataLine}>
              抽出器具: {safeToString(data.extractionMaker)}
            </Text>
            <Text style={styles.dataLine}>
              挽き目: {safeToString(data.grindSize)}
            </Text>
            <Text style={styles.dataLine}>
              温度: {safeToString(data.temperature)}
            </Text>
            <Text style={styles.dataLine}>
              コーヒー豆の量: {safeToString(data.coffeeAmount)}
            </Text>
            <Text style={styles.dataLine}>
              水の量: {safeToString(data.waterAmount)}
            </Text>
            <Text style={styles.dataLine}>
              計量方法: {safeToString(data.measurementMethod)}
            </Text>
            <Text style={styles.dataLine}>
              抽出時間: {safeToString(data.extractionTime)}
            </Text>
            <Text style={styles.dataLine}>
              酸味: {safeToString(data.acidity)}
            </Text>
            <Text style={styles.dataLine}>
              苦味: {safeToString(data.bitterness)}
            </Text>
            <Text style={styles.dataLine}>
              ボディ: {safeToString(data.body)}
            </Text>
            <Text style={styles.dataLine}>
              香り: {safeToString(data.aroma)}
            </Text>
            <Text style={styles.dataLine}>
              後味: {safeToString(data.aftertaste)}
            </Text>
            <Text style={styles.dataLine}>
              総合評価: {safeToString(data.overall)}
            </Text>
            <Text style={styles.dataLine}>メモ: {safeToString(data.memo)}</Text>
            <Text style={styles.dataLine}>
              画像URI: {safeToString(data.imageUri)}
            </Text>
            <Text style={styles.dataLine}>
              画像の説明: {safeToString(data.imageAlt)}
            </Text>
            <Text style={styles.dataLine}>
              自己評価: {safeToString(data.self)}
            </Text>
            <Text style={styles.dataLine}>
              ショップ名: {safeToString(data.shopName)}
            </Text>
            <Text style={styles.dataLine}>
              ショップ価格: {safeToString(data.shopPrice)}
            </Text>
            <Text style={styles.dataLine}>
              ショップ住所: {safeToString(data.shopAddress)}
            </Text>
            <Text style={styles.dataLine}>
              ショップURL: {safeToString(data.shopUrl)}
            </Text>
          </View>

          <Text style={styles.footer}>--- レポートの終わり ---</Text>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    paddingTop: 30,
    paddingHorizontal: 30,
    fontFamily: "NotoSansJP",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#333333",
  },
  content: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 5,
  },
  dataTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1a535c",
  },
  dataContainer: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  dataLine: {
    fontSize: 12,
    marginBottom: 5,
  },
  footer: {
    fontSize: 10,
    marginTop: 30,
    textAlign: "right",
    color: "#999999",
  },
});

interface PdfValueProps {
  pdfValue: CoffeeRecord;
}

/**
 * PDFDownloadLink をクライアント専用にラップするコンポーネント
 * サーバーサイドレンダリングのエラーを回避するため useEffect で管理
 */
const PdfDownloadLinkWrapper: React.FC<{ pdfValue: CoffeeRecord }> = ({
  pdfValue,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [isPdfValue, setPdfValue] = useState<CoffeeRecord>({} as CoffeeRecord);
  useEffect(() => {
    setPdfValue(pdfValue);
    setIsClient(true);
  }, []);

  // サーバーサイドレンダリング時は何も表示しない
  if (!isClient) {
    return (
      <MainButton
        sizeValue="large"
        buttonColor="btn-primary"
        widthValue="widthNearlyFull"
        disabled={true}
      >
        読み込み中...
      </MainButton>
    );
  }
  console.log("pdfValue:", isPdfValue);
  // クライアント側でのみ PDFDownloadLink をレンダリング
  return (
    <PDFDownloadLink
      document={<CoffeeReportDocument data={isPdfValue} />}
      fileName="coffee_report_react.pdf"
    >
      {({ loading }) => (
        <MainButton
          sizeValue="large"
          buttonColor="btn-primary"
          widthValue="widthNearlyFull"
          disabled={loading}
        >
          {loading ? "PDFを生成中..." : "PDFをダウンロード!"}
        </MainButton>
      )}
    </PDFDownloadLink>
  );
};

export const PdfDownloadButton: React.FC<PdfValueProps> = ({ pdfValue }) => {
  return (
    <div>
      <PdfDownloadLinkWrapper pdfValue={pdfValue} />
      <p style={{ fontFamily: "Caveat, NotoSansJP" }}>
        @react-pdf/renderer で生成
      </p>
    </div>
  );
};
