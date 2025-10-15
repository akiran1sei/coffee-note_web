// app/api/export/pdf/[id]/route.ts

import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { CoffeeModel } from "@/app/utils/schemaModels";
import path from "path";
import ejs from "ejs";

// puppeteer-core の型定義をインポート
import puppeteer, { Browser } from "puppeteer-core";
import chromium from "@sparticuz/chromium";

// GET関数の引数の型定義: Next.js App Routerの標準的な形式
// ★ 修正点: context全体ではなく、分割代入と同時にparamsに型を適用します。
export async function GET(
  req: Request,
  { params }: { params: { id: string } } // ★ この形式が Next.js App Router の推奨パターンです
) {
  let browser: Browser | null = null;

  // 分割代入された params から id を取得
  const { id } = params;

  // 複数のIDがカンマ区切りで渡されることを想定
  const jsonData = id.split(",");

  try {
    // 1. Puppeteerの起動設定 (サーバーレス環境向け)
    // LocalでのENOENTエラーは発生しますが、デプロイ先(Vercelなど)では
    // @sparticuz/chromium が正しくパスを解決し、動作します。
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true, // サーバーレス環境向けに true に固定
      // defaultViewport は chromium.defaultViewport が args に含まれるため省略
    });

    // 2. データベース接続とデータ取得
    await connectDB();

    // _id が jsonData のいずれかに含まれるドキュメントを検索
    const data = await CoffeeModel.find({ _id: { $in: jsonData } });

    // ユーザー名を取得 (既存ロジックを維持)
    const username = data.length > 0 ? data[0].username : "report";

    // 3. EJSテンプレートのレンダリング
    const html = await new Promise<string>((resolve, reject) => {
      ejs.renderFile(
        path.join(process.cwd(), "/src/app/components/molecules/page.ejs"),
        // テンプレートに渡すデータ
        { data, username },
        (err, str) => {
          if (err) {
            reject(err);
          } else {
            resolve(str);
          }
        }
      );
    });

    // 4. PuppeteerでのPDF生成
    const page = await browser.newPage();

    // 描画が完了するまで待つため、waitUntil: 'networkidle0'に変更
    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    // デバッグ用のスクリーンショットは**デプロイ時はコメントアウト推奨**
    // await page.screenshot({ path: "debug_report.png", fullPage: true });
    // console.log("デバッグ用のスクリーンショットを保存しました。");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      landscape: false,
      timeout: 30000,
    });

    // 5. レスポンスとしてPDFを返す (Buffer.from は必須ではないが、安全のため残します)
    return new Response(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${username}_report_${Date.now()}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF作成中にエラーが発生しました:", error);

    // エラーメッセージの型ガードと処理
    const errorMessage =
      error instanceof Error
        ? error.message
        : "予期しないエラーが発生しました。";

    // エラーハンドリングの維持
    if (errorMessage.includes("Network") || errorMessage.includes("timeout")) {
      return NextResponse.json({
        message:
          "PDFのレンダリング中にネットワークまたはタイムアウトエラーが発生しました。",
        status: 500,
      });
    } else if (errorMessage.includes("no such file")) {
      return NextResponse.json({
        message: "EJSテンプレートファイルが見つかりません。",
        status: 500,
      });
    } else {
      // 致命的なChromium起動エラーなど
      return NextResponse.json({
        message: "システムエラーが発生しました。管理者にお問い合わせください。",
        status: 500,
      });
    }
  } finally {
    // 6. ブラウザのクリーンアップ
    if (browser) {
      await browser.close();
    }
  }
}
