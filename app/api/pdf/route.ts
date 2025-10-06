// GET - データの取得
import { NextRequest, NextResponse } from "next/server";
// 仮のインポート。ご自身のプロジェクトに合わせて修正してください。
import connectDB from "@/app/utils/database";
import { CoffeeModel } from "@/app/utils/schemaModels";

// ※ 実際のプロジェクトに合わせて上記のインポートを修正してください。

export async function GET(request: NextRequest) {
  try {
    // 1. データベース接続
    await connectDB();
    console.log("GET: データベースに接続しました");

    // 2. クエリパラメータから ID を取得
    // GETリクエストでは request.json() ではなく、URLSearchParamsを使用します
    const url = new URL(request.url);
    // URLSearchParams.get() は常に文字列または null を返します
    const id = url.searchParams.get("id");

    if (id) {
      // 💡 単一のIDが指定された場合 (単一取得)
      console.log("IDが指定されました。単一レコードを取得します:", id);

      // ★ MongoDBの findOne メソッドを使用してIDに一致するレコードを検索
      const record = await CoffeeModel.find({ id: id });
      // const record = await CoffeeModel.findOne({ id: id });
      console.log(record);
      if (!record) {
        return NextResponse.json(
          {
            success: false,
            message: `ID: ${id} に一致するデータは見つかりませんでした`,
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        data: record,
        message: "データの取得に成功しました",
      });
    }
  } catch (error) {
    // 3. エラーハンドリング
    console.error("GET: データベースエラー:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "不明なサーバーエラーが発生しました";

    return NextResponse.json(
      { error: "エラー", details: errorMessage },
      { status: 500 }
    );
  }
}
