import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { CoffeeModel } from "@/app/utils/schemaModels";
import path from "path";
import ejs from "ejs";
import puppeteer, { Browser } from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
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
      args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
      executablePath,
      headless: true,
    });

    // 3️⃣ DB接続
    await connectDB();

    const data = await CoffeeModel.find({ id: { $in: jsonData } });
    const name = data.length > 0 ? data[0].name : "report";

    // 4️⃣ テンプレートパスを絶対パス化
    const templatePath = path.resolve("public/templates/page.ejs");

    const html = await ejs.renderFile(templatePath, { data, name });

    // 5️⃣ PDF生成
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

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
      { status: 500 }
    );
  } finally {
    if (browser) await browser.close();
  }
}
