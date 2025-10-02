// app/api/database/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { CoffeeModel } from "@/app/utils/schemaModels";
// データベースモデルをインポート（例：User、Post など）

// GET - データの取得
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    console.log("GET: データベースに接続しました");
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const coffeeRecord = await CoffeeModel.findOne({ id: id }).then(
        (data) => {
          return data;
        }
      );

      return NextResponse.json({
        success: true,
        data: coffeeRecord,
        message: "データの取得に成功しました",
      });
    }
    const records = await CoffeeModel.find().then((data) => {
      return data;
    });

    return NextResponse.json({
      success: true,
      data: records,
      message: "データの取得に成功しました",
    });
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
      id: Date.now(),
      ...data,
      createdAt: new Date(),
    }; // サンプルデータ
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
      { error: "エラー", details: errorMessage }, // ✅ 型安全にエラーメッセージを取得
      { status: 500 }
    );
  }
}

// PUT - データの更新
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    console.log("POST: データベースに接続しました");

    const body = await request.json();
    const { data } = body;

    if (!data) {
      return NextResponse.json({ error: "データが必要です" }, { status: 400 });
    }

    // データの作成処理

    const updataItem = await CoffeeModel.updateOne(
      // 第1引数: _idのみで検索（一意のレコードを特定）
      { _id: data._id },

      // 第2引数: $set オペレーターを使い、data の内容をセット
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
      { error: "エラー", details: errorMessage }, // ✅ 型安全にエラーメッセージを取得
      { status: 500 }
    );
  }
}

// DELETE - データの削除
// (Next.js API Route: app/api/...)
// ※ connectDB、CoffeeModel、NextRequest、NextResponse のインポートが必要です。

export async function DELETE(request: NextRequest) {
  try {
    // 1. データベース接続
    await connectDB();
    console.log("DELETE: データベースに接続しました");

    // 2. リクエストボディの解析とIDの抽出
    const body = await request.json();
    const { id } = body; // 削除対象のID (例: プライマリキー)

    let idsToDelete: string[]; // 最終的に処理するIDの配列

    // 💡 Array.isArray() を使ってidが配列かどうかをチェックする
    if (Array.isArray(id)) {
      // id が配列の場合 (例: ['a', 'b'] または ['a'])
      idsToDelete = id;
      console.log("IDは配列として渡されました。件数:", idsToDelete.length);
      const deleteResult = await CoffeeModel.deleteMany({
        // _idフィールドの値が idsToDelete 配列に含まれているドキュメントをすべて削除
        id: { $in: idsToDelete },
      });

      // deleteResult には、削除が成功したか、何件削除されたかの情報（deletedCount）が含まれます。
      console.log(
        `${deleteResult.deletedCount} 件のレコードが正常に削除されました。`
      );

      if (!deleteResult) {
        // IDに一致するレコードが見つからなかった場合
        return NextResponse.json(
          {
            success: false,
            message: `ID: ${id} に一致するデータは見つかりませんでした`,
          },
          { status: 404 } // Not Found
        );
      }
      // 4. 成功レスポンス
      return NextResponse.json({
        success: true,
        data: deleteResult,
        message: "データの削除に成功しました",
      });
    } else if (typeof id === "string") {
      // id が単一の文字列の場合 (例: 'a')
      // 処理を配列に統一するために、単一の値を要素とする配列に変換する

      console.log("IDは単一の値として渡されました。");
      const deletedRecord = await CoffeeModel.findOneAndDelete({ id: id });
      if (!deletedRecord) {
        // IDに一致するレコードが見つからなかった場合
        return NextResponse.json(
          {
            success: false,
            message: `ID: ${id} に一致するデータは見つかりませんでした`,
          },
          { status: 404 } // Not Found
        );
      }
      // 4. 成功レスポンス
      return NextResponse.json({
        success: true,
        data: deletedRecord,
        message: "データの削除に成功しました",
      });
    } else {
      // その他の予期しない型の場合
      console.error("無効なID形式です:", id);
      return;
    }
    if (!id) {
      return NextResponse.json(
        { success: false, message: "削除対象のIDが指定されていません" },
        { status: 400 } // Bad Request
      );
    }

    // 3. データ削除の実行
    // findOneAndDeleteは削除されたドキュメントを返します
  } catch (error) {
    // 5. エラーハンドリング
    console.error("DELETE: データベースエラー:", error);

    // エラーメッセージの抽出と500 Internal Server Error レスポンスの返却
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
