// app/api/export/pdf/[id]/route.ts

import { NextRequest, NextResponse } from "next/server"; // ★ NextRequestをインポート
import connectDB from "@/app/utils/database";
import { CoffeeModel } from "@/app/utils/schemaModels";
import path from "path";
import ejs from "ejs";

// puppeteer-core の型定義をインポート
import puppeteer, { Browser } from "puppeteer-core";
import chromium from "@sparticuz/chromium";

// GET関数の引数の型定義: Next.jsの型システムに厳密に合わせるために NextRequest を使用します。
export async function GET(
  req: NextRequest, // ★ Request の代わりに NextRequest を使用
  // 以前の形式（標準推奨パターン）に戻します。これでエラーが解消するはずです。
  { params }: { params: { id: string } }
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
    });

    // 2. データベース接続とデータ取得
    await connectDB();

    // _id が jsonData のいずれかに含まれるドキュメントを検索
    // $in は配列を受け取るため、id.split(",") で得た配列を渡すのは正しいです。
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

    // 5. レスポンスとしてPDFを返す
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
