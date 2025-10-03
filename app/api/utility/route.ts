import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { CoffeeModel } from "@/app/utils/schemaModels";
// search & sort 機能
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    console.log("GET: データベースに接続しました");
    const { searchParams } = new URL(request.url);
    const getData = searchParams.get("data");

    // パラメータがない場合はエラーを避ける（オプション）
    if (getData) {
      const searchCondition = new RegExp(getData, "i");
      const coffeeName = await CoffeeModel.find({
        name: searchCondition,
      });
      // 結果をクライアントに返す
      return NextResponse.json({ data: coffeeName });
    } else if (!getData) {
      return NextResponse.json(
        { error: "Data parameter is missing" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("GET: データベースエラー:", error);
    const errorMessage =
      error instanceof Error ? error.message : "不明なエラーが発生しました";
    return NextResponse.json(
      { error: "エラー", details: errorMessage }, // ✅ 型安全にエラーメッセージを取得
      { status: 500 }
    );
  }
}
