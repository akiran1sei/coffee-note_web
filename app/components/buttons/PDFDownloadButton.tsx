// PdfDownloadButton.tsx (Client Component: 'use client' が必要)
"use client";
import styles from "/app/styles/PDF.module.css";
import { useState } from "react"; // useRef は不要になるため削除
import { MainButton } from "./Buttons";
import { CoffeeRecord } from "@/app/types/db";

// PDFコンテンツの参照（contentRef）は不要になるため削除
// interface pdfValueProps は、IDをAPIに渡すために必要
interface pdfValueProps {
  pdfValue: CoffeeRecord; // CoffeeRecordからIDを取得
}

export const PdfDownloadButton: React.FC<pdfValueProps> = ({ pdfValue }) => {
  // contentRef は削除
  const [isGenerating, setIsGenerating] = useState(false); // 1. 生成状態を管理

  // APIルートに渡すIDを生成 (ここでは単一のレコードを想定)
  const recordId = pdfValue ? pdfValue.id : null;

  const handleDownload = async () => {
    // IDが取得できない場合はエラー処理
    if (!recordId) {
      console.error("PDF生成に必要なレコードIDが見つかりません。");
      alert("PDF生成に必要なデータがありません。");
      return;
    }

    setIsGenerating(true); // 2. 生成開始時に表示を ON にする
    console.log(`PDF生成APIを呼び出します: /api/export/pdf/${recordId}`);

    // ★★★ サーバーサイドAPIを呼び出すロジックに置き換え ★★★
    try {
      // データをAPIルートにフェッチ
      const response = await fetch(`/api/export/pdf/${recordId}`, {
        method: "GET",
        // Next.js App RouterのAPIルートには通常不要だが、念のためキャッシュ制御を設定
        headers: {
          "Cache-Control": "no-store",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        // API側でエラーメッセージがJSONで返される可能性があるため、それを取得
        const errorText = await response.text();
        throw new Error(
          `サーバーエラー: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      // 成功した場合、レスポンスをBlobとして受け取る
      const blob = await response.blob();

      // ダウンロード処理
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // ファイル名はAPIのContent-Dispositionヘッダーに依存するが、フォールバックとして設定
      link.download = `coffee_report_${Date.now()}.pdf`;
      link.style.display = "none";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log("PDFのダウンロードを開始しました。");
    } catch (error) {
      console.error("PDF生成エラー:", error);
      alert(`PDF生成に失敗しました: ${(error as Error).message.split("-")[0]}`);
    } finally {
      setIsGenerating(false); // 3. 生成完了後（またはエラー後）に非表示に戻す
    }
  };
  // ★★★ ----------------------------------------- ★★★

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
      {/* ★ PDFに出力したいコンテンツ本体（クライアントサイドの表示用）★ */}
      {/* -------------------------------------------------------- */}
      <div className={styles.pdfBody}>
        {/* Puppeteer方式では、contentRefとそれ以下のDOMはAPIに渡されません。 */}
        {/* ここは**ブラウザ表示専用**になります。 */}
        <div className={styles.pdfContainer}>
          {/* PDFレイアウトのヘッダー */}
          <h1 className={styles.pdfHeader}>コーヒーレポート</h1>
          {/* メインコンテンツ */}
          {/* サーバーサイドのEJSテンプレートでレンダリングされる内容とは**別物**です */}
          <p className={styles.pdfText}>テストデータ（ブラウザ表示用）</p>
        </div>
      </div>
    </div>
  );
};
