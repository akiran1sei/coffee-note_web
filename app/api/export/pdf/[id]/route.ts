// app/api/export/pdf/[id]/route.ts

import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { CoffeeModel } from "@/app/utils/schemaModels";
import path from "path";
import ejs from "ejs";

// puppeteer-core の型定義をインポート
import puppeteer, { Browser } from "puppeteer-core";
import chromium from "@sparticuz/chromium";

// URLパラメータの型定義 (Next.js App Router)

export async function GET(
  req: Request,
  // { params }: { params: { id: string } }
  context: { params: { id: string } }
) {
  let browser: Browser | null = null;

  try {
    // 1. Puppeteerの起動設定
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true, // サーバーレス環境向けに true に固定
    });

    // 2. データベース接続とデータ取得
    await connectDB();

    const { id } = context.params;

    // _id が id のいずれかに含まれるドキュメントを検索
    const data = await CoffeeModel.find({ _id: { $in: [id] } });

    // ユーザー名を取得 (既存ロジックを維持)
    const username = data.length > 0 ? data[0].username : "";

    // 3. EJSテンプレートのレンダリング
    // EJSのrenderFileはコールバックを受け取るため、Promiseでラップしてawait可能にする
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
      // 'networkidle0': ネットワーク接続が0になるまで (500ms以上) 待つ
      // 'networkidle2': ネットワーク接続が2未満になるまで (500ms以上) 待つ
      waitUntil: "networkidle0",
    });
    // 必要であれば、レンダリングを安定させるために、さらに強制的に待機を入れる
    // await page.waitForTimeout(500);
    await page.screenshot({ path: "debug_report.png", fullPage: true });
    console.log("デバッグ用のスクリーンショットを保存しました。");
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      landscape: false, // 縦向きに戻しました (必要に応じて true に変更してください)
      // タイムアウト設定を追加することを検討 (例: 30秒)
      timeout: 30000,
    });

    // 5. レスポンスとしてPDFを返す
    return new Response(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf", // text/html;charset=utf-8 は削除
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
