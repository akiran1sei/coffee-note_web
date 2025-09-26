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
    console.log("ID parameter:", id); // IDパラメータの確認
    if (id) {
      const coffeeRecord = await CoffeeModel.findOne({ id: id }).then(
        (data) => {
          console.log("coffeeRecord", data);
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
      console.log("records", data);
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
// export async function PUT(request: NextRequest) {
//   try {
//     await connectDB();
//     console.log("PUT: データベースに接続しました");

//     const body = await request.json();
//     const { model, id, data } = body;

//     if (!model || !id || !data) {
//       return NextResponse.json(
//         { error: "モデル、ID、データが必要です" },
//         { status: 400 }
//       );
//     }

//     let updatedData;

//     switch (model) {
//       case "user":
//         // updatedData = await User.findByIdAndUpdate(id, data, { new: true });
//         updatedData = {
//           id,
//           ...data,
//           updatedAt: new Date(),
//         }; // サンプルデータ
//         break;

//       case "post":
//         // updatedData = await Post.findByIdAndUpdate(id, data, { new: true });
//         updatedData = {
//           id,
//           ...data,
//           updatedAt: new Date(),
//         }; // サンプルデータ
//         break;

//       default:
//         return NextResponse.json(
//           { error: "無効なモデルが指定されました" },
//           { status: 400 }
//         );
//     }

//     if (!updatedData) {
//       return NextResponse.json(
//         { error: "データが見つかりません" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       data: updatedData,
//       message: "データの更新に成功しました",
//     });
//   } catch (error) {
//     console.error("PUT: データベースエラー:", error);
//     const errorMessage =
//       error instanceof Error ? error.message : "不明なエラーが発生しました";
//     return NextResponse.json(
//       { error: "エラー", details: errorMessage }, // ✅ 型安全にエラーメッセージを取得
//       { status: 500 }
//     );
//   }
// }

// DELETE - データの削除
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    console.log("DELETE: データベースに接続しました");

    const body = await request.json();
    const { id } = body;

    const coffeeRecord = await CoffeeModel.findOneAndDelete({ id: id }).then(
      (data) => {
        console.log("削除データ:", data);
        return data;
      }
    );

    return NextResponse.json({
      success: true,
      data: coffeeRecord,
      message: "データの削除に成功しました",
    });
  } catch (error) {
    console.error("DELETE: データベースエラー:", error);
    const errorMessage =
      error instanceof Error ? error.message : "不明なエラーが発生しました";
    return NextResponse.json(
      { error: "エラー", details: errorMessage }, // ✅ 型安全にエラーメッセージを取得
      { status: 500 }
    );
  }
}
