import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { CoffeeModel } from "@/app/utils/schemaModels";
import * as fs from "fs/promises";
import path from "path";
import ejs from "ejs";
import puppeteer, { Browser } from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const jsonData = id.split(",");
  let browser: Browser | null = null;

  try {
    // 1️⃣ Chromiumパスのフォールバック
    const executablePath =
      (await chromium.executablePath()) || "/usr/bin/chromium-browser";

    // 2️⃣ Puppeteer起動（sandboxオフで安定）
    browser = await puppeteer.launch({
      args: [
        ...chromium.args,
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--single-process", // メモリが限られた環境で安定性を向上
      ],
      executablePath,
      headless: true,
      env: {
        LANG: "ja_JP.UTF-8",
        LC_ALL: "ja_JP.UTF-8",
      },
    });

    // 3️⃣ DB接続
    await connectDB();

    const data = await CoffeeModel.find({ id: { $in: jsonData } });
    const name = data.length > 0 ? data[0].name : "report";
    // 4️⃣ テンプレートパスを絶対パス化
    const templatePath = path.resolve("public/templates/page.ejs");

    const templateContent = await fs.readFile(templatePath, {
      encoding: "utf8",
    });
    // render() はテンプレート文字列を直接受け取るため、型エラーを回避できる
    const html = ejs.render(templateContent, { data, name });

    // 5️⃣ PDF生成
    const page = await browser.newPage();
    // 1. まずHTMLの内容をセットし、基本的な読み込み（load）を待つ
    await page.setContent(html, { waitUntil: "load" });

    // 2. そのHTML内で参照されている画像やフォントなどのネットワーク通信が完全に落ち着くまで待つ
    await page.waitForNetworkIdle();

    // 3. この後にPDF化の処理（ await page.pdf(...) など ）を実行する

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      landscape: false,
      timeout: 30000,
    });

    return new Response(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${name}_report_${Date.now()}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF作成中にエラー:", error);

    const message =
      error instanceof Error ? error.message : "不明なエラーが発生しました。";

    return NextResponse.json(
      {
        message: `PDF生成中にエラー: ${message}`,
        status: 500,
      },
      { status: 500 },
    );
  } finally {
    if (browser) await browser.close();
  }
}
