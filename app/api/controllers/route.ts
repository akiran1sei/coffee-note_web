import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { CoffeeModel } from "@/app/utils/schemaModels";

// ソートパラメータをパースし、失敗時にデフォルト値を返すヘルパー関数
const getParsedSort = (sortString: string | null) => {
  // デフォルトは作成日時降順 (新しい順)
  const defaultSort = { createdAt: -1 };

  if (!sortString) {
    return defaultSort;
  }

  try {
    // JSON文字列をパース
    return JSON.parse(sortString);
  } catch (e) {
    console.error("SortパラメータのJSONパースエラー:", e);
    return defaultSort;
  }
};

// GET - データの取得
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    console.log("GET: データベースに接続しました");
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const getSearch = searchParams.get("search");
    const getSort = searchParams.get("sort");

    console.log("getSearch::getSort", getSearch, "::", getSort);

    // 1. ID指定による単一レコード取得
    if (id) {
      const coffeeRecord = await CoffeeModel.findOne({ id: id });

      return NextResponse.json({
        success: true,
        data: coffeeRecord,
        message: "データの取得に成功しました",
      });
    }

    // 2. 検索 (Search) または 全件取得の処理

    // Mongooseのソートオブジェクトを取得
    const sortObject = getParsedSort(getSort);

    let findCondition = {};
    if (getSearch && getSearch !== "") {
      // 検索文字列が空でない場合
      const searchCondition = new RegExp(getSearch, "i");
      findCondition = {
        $or: [{ name: searchCondition }, { shopName: searchCondition }],
      };
    }
    // else: 検索文字列が空 ("") の場合、findCondition は {} のままとなり、全件検索になる

    // 検索条件とソート条件を適用してデータを取得
    const coffeeRecords = await CoffeeModel.find(findCondition).sort(
      sortObject
    );

    return NextResponse.json({
      success: true,
      data: coffeeRecords,
      message: "データの取得に成功しました",
    });
  } catch (error) {
    // 5. エラーハンドリング
    console.error("GET: データベースエラー:", error);
    const errorMessage =
      error instanceof Error ? error.message : "不明なエラーが発生しました";

    // サーバーエラーが発生した場合は、500 ステータスコードとエラー情報を返す
    return NextResponse.json(
      { error: "エラー", details: errorMessage },
      { status: 500 }
    );
  }
}

// POST - データの作成
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    console.log("POST: データベースに接続しました");

    const body = await request.json();
    const { data } = body;

    if (!data) {
      return NextResponse.json({ error: "データが必要です" }, { status: 400 });
    }

    // データの作成処理
    const newData = {
      id: Date.now().toString(), // MongooseのIDとは別に、クライアント側で利用するIDとして文字列化
      ...data,
      createdAt: new Date(),
    };
    await CoffeeModel.create(newData);
    return NextResponse.json(
      {
        success: true,
        data: newData,
        message: "データの作成に成功しました",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST: データベースエラー:", error);
    const errorMessage =
      error instanceof Error ? error.message : "不明なエラーが発生しました";
    return NextResponse.json(
      { error: "エラー", details: errorMessage },
      { status: 500 }
    );
  }
}

// PUT - データの更新
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    console.log("PUT: データベースに接続しました");

    const body = await request.json();
    const { data } = body;

    if (!data) {
      return NextResponse.json({ error: "データが必要です" }, { status: 400 });
    }

    // データの更新処理
    const updataItem = await CoffeeModel.updateOne(
      // idフィールドで検索
      { id: data.id },

      // $set オペレーターを使い、data の内容をセット
      { $set: data }
    );
    return NextResponse.json(
      {
        success: true,
        data: updataItem,
        message: "データの更新に成功しました",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("PUT: データベースエラー:", error);
    const errorMessage =
      error instanceof Error ? error.message : "不明なエラーが発生しました";
    return NextResponse.json(
      { error: "エラー", details: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE - データの削除
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    console.log("DELETE: データベースに接続しました");

    const body = await request.json();
    const { id } = body;

    // ★ 修正点: IDが指定されていない場合のチェックを最初に行う
    if (!id || (Array.isArray(id) && id.length === 0)) {
      return NextResponse.json(
        { success: false, message: "削除対象のIDが指定されていません" },
        { status: 400 } // Bad Request
      );
    }

    if (Array.isArray(id)) {
      // 💡 配列として渡された場合 (複数削除)
      console.log("IDは配列として渡されました。件数:", id.length);
      const deleteResult = await CoffeeModel.deleteMany({
        // idフィールドの値が id 配列に含まれているドキュメントをすべて削除
        id: { $in: id },
      });

      if (deleteResult.deletedCount === 0) {
        return NextResponse.json(
          {
            success: false,
            message: `データは見つかりませんでした`,
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: deleteResult,
        message: `${deleteResult.deletedCount} 件のデータ削除に成功しました`,
      });
    } else if (typeof id === "string") {
      // 💡 単一の文字列として渡された場合 (単一削除)
      console.log("IDは単一の値として渡されました:", id);
      const deletedRecord = await CoffeeModel.findOneAndDelete({ id: id });

      if (!deletedRecord) {
        return NextResponse.json(
          {
            success: false,
            message: `ID: ${id} に一致するデータは見つかりませんでした`,
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: deletedRecord,
        message: "データの削除に成功しました",
      });
    } else {
      // 💡 予期しない型の場合
      console.error("無効なID形式です:", id);
      return NextResponse.json(
        { success: false, message: "無効なID形式が指定されました" },
        { status: 400 }
      );
    }
  } catch (error) {
    // 5. エラーハンドリング
    console.error("DELETE: データベースエラー:", error);

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
