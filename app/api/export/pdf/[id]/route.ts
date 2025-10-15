import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { CoffeeModel } from "@/app/utils/schemaModels";
import path from "path";
import ejs from "ejs";
import puppeteer, { Browser } from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // ★ Next.js 15ではPromise型
) {
  const { id } = await context.params; // ★ Promiseをawaitで解決
  const jsonData = id.split(",");
  let browser: Browser | null = null;

  try {
    // Puppeteer起動
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });

    // DB接続とデータ取得
    await connectDB();
    const data = await CoffeeModel.find({ _id: { $in: jsonData } });
    const username = data.length > 0 ? data[0].username : "report";

    // EJSテンプレートのレンダリング
    const html = await new Promise<string>((resolve, reject) => {
      ejs.renderFile(
        path.join(process.cwd(), "/src/app/components/molecules/page.ejs"),
        { data, username },
        (err, str) => {
          if (err) reject(err);
          else resolve(str);
        }
      );
    });

    // PDF生成
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      landscape: false,
      timeout: 30000,
    });

    // PDFをレスポンスとして返す
    return new Response(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${username}_report_${Date.now()}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF作成中にエラー:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "予期しないエラーが発生しました。";

    return NextResponse.json(
      {
        message:
          errorMessage.includes("Network") || errorMessage.includes("timeout")
            ? "PDFのレンダリング中にネットワークまたはタイムアウトエラーが発生しました。"
            : errorMessage.includes("no such file")
            ? "EJSテンプレートファイルが見つかりません。"
            : "システムエラーが発生しました。管理者にお問い合わせください。",
        status: 500,
      },
      { status: 500 }
    );
  } finally {
    if (browser) await browser.close();
  }
}
