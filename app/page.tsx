// app/page.tsx
"use client"; // このコンポーネントがクライアントサイドで実行されることを宣言

import React, { useEffect, useState } from "react";
import { openDb, addCoffeeRecord, getCoffeeRecords } from "./lib/IndexedDB"; // lib/IndexedDB.ts から関数と型をインポート
import { CoffeeRecord } from "./types/db"; // 型定義をインポート
// CoffeeRecordの必須プロパティのみをフォーム入力用に抽出
type NewCoffeeRecordInput = Pick<
  CoffeeRecord,
  | "name"
  | "productionArea"
  | "roastingDegree"
  | "extractionMethod"
  | "rating"
  | "memo"
  | "self"
  | "shopName"
>;

export default function Home() {
  const [records, setRecords] = useState<CoffeeRecord[]>([]);
  const [newRecordData, setNewRecordData] = useState<NewCoffeeRecordInput>({
    name: "",
    productionArea: "",
    roastingDegree: "",
    extractionMethod: "",
    rating: 3, // デフォルト値
    memo: "",
    self: true, // デフォルトで自分で淹れたに設定
    shopName: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dbConnected, setDbConnected] = useState(false); // DB接続状態を示すステート

  // コンポーネントがマウントされたときにIndexedDBに接続し、データをロードする
  useEffect(() => {
    const initializeDbAndLoadRecords = async () => {
      try {
        setLoading(true);
        setError(null);
        await openDb(); // ここでデータベースに接続（初回は作成も兼ねる）
        setDbConnected(true); // 接続成功
        const initialRecords = await getCoffeeRecords(); // 既存のコーヒー記録を読み込む
        setRecords(initialRecords);
      } catch (err) {
        console.error("Failed to initialize DB or load records:", err);
        setError(
          "データの読み込みに失敗しました。詳細: " + (err as Error).message
        );
        setDbConnected(false); // 接続失敗
      } finally {
        setLoading(false);
      }
    };

    initializeDbAndLoadRecords();
  }, []); // 空の依存配列なので、コンポーネントマウント時に一度だけ実行される

  // フォーム入力値の変更をハンドル
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setNewRecordData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "rating"
          ? parseInt(value, 10)
          : value,
    }));
  };

  // 新しいコーヒー記録の追加をハンドル
  const handleAddRecord = async () => {
    // 必須項目の簡易的なバリデーション
    if (
      !newRecordData.name ||
      !newRecordData.productionArea ||
      !newRecordData.roastingDegree ||
      !newRecordData.extractionMethod
    ) {
      setError("名称、産地、焙煎度、抽出方法は必須項目です。");
      return;
    }

    try {
      setError(null); // エラーをクリア
      const newRecord: CoffeeRecord = {
        id: crypto.randomUUID(), // ユニークなIDを生成
        createdAt: new Date(), // 現在の日時
        // フォームからのデータ
        ...newRecordData,
        // その他の必須プロパティで、フォームにないものにデフォルト値や空文字列を設定
        variety: "", // 品種
        extractionMaker: "", // 抽出器具
        grindSize: "", // 挽き目
        temperature: "", // 温度
        coffeeAmount: "", // 粉量
        waterAmount: "", // 湯量
        measurementMethod: "", // 計測方法
        extractionTime: "", // 抽出時間
        acidity: 0, // 酸味
        bitterness: 0, // 苦味
        overall: 0, // 全体の好み
        body: 0, // コク
        aroma: 0, // 香り
        aftertaste: 0, // キレ
        imageUri: "", // 画像のパス
        shopPrice: "", // 店の価格
        shopDate: "", // 店で飲んだ日付
        shopAddress: "", // 店の住所
        shopUrl: "", // 店のURL
      };

      await addCoffeeRecord(newRecord); // IndexedDBに追加
      setRecords((prev) => [...prev, newRecord]); // UIを更新
      // フォームをクリア
      setNewRecordData({
        name: "",
        productionArea: "",
        roastingDegree: "",
        extractionMethod: "",
        rating: 3,
        memo: "",
        self: true,
        shopName: "",
      });
    } catch (err) {
      console.error("Failed to add coffee record:", err);
      setError(
        "コーヒー記録の追加に失敗しました。詳細: " + (err as Error).message
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          私のコーヒー記録アプリ
        </h1>

        {/* DB接続ステータス表示 */}
        <div className="mb-6 text-center">
          {dbConnected ? (
            <p className="text-green-600 font-semibold">
              IndexedDBに接続済みです。
            </p>
          ) : (
            <p className="text-red-600 font-semibold">
              IndexedDBへの接続に失敗しました。
            </p>
          )}
          {loading && (
            <p className="text-blue-500 mt-2">データを読み込み中...</p>
          )}
          {error && (
            <p className="text-red-500 mt-2 p-2 bg-red-100 rounded-md">
              エラー: {error}
            </p>
          )}
        </div>

        {/* 新しい記録を追加セクション */}
        <section className="mb-8 p-6 border border-gray-200 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            新しい記録を追加
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                名称:
              </label>
              <input
                type="text"
                name="name"
                value={newRecordData.name}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                産地:
              </label>
              <input
                type="text"
                name="productionArea"
                value={newRecordData.productionArea}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                焙煎度:
              </label>
              <input
                type="text"
                name="roastingDegree"
                value={newRecordData.roastingDegree}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                抽出方法:
              </label>
              <input
                type="text"
                name="extractionMethod"
                value={newRecordData.extractionMethod}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                評価 (1-10):
              </label>
              <input
                type="number"
                name="rating"
                value={newRecordData.rating}
                onChange={handleInputChange}
                min="1"
                max="10"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                name="self"
                checked={newRecordData.self}
                onChange={handleInputChange}
                className="mr-2 leading-tight"
                id="selfBrewed"
              />
              <label
                htmlFor="selfBrewed"
                className="text-gray-700 text-sm font-bold"
              >
                自分で淹れた
              </label>
            </div>
            {!newRecordData.self && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  店名:
                </label>
                <input
                  type="text"
                  name="shopName"
                  value={newRecordData.shopName}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              メモ:
            </label>
            <textarea
              name="memo"
              value={newRecordData.memo}
              onChange={handleInputChange}
              rows={3}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <button
            onClick={handleAddRecord}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            記録を追加
          </button>
        </section>

        <hr className="my-8" />

        {/* これまでの記録セクション */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
            これまでの記録
          </h2>
          {records.length === 0 ? (
            <p className="text-gray-600 text-center">
              まだ記録がありません。上のフォームから追加してみましょう！
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {record.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    <strong>産地:</strong> {record.productionArea}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>焙煎度:</strong> {record.roastingDegree}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>抽出方法:</strong> {record.extractionMethod}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>評価:</strong> {record.rating} / 10
                  </p>
                  {record.memo && (
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>メモ:</strong> {record.memo}
                    </p>
                  )}
                  {record.self ? (
                    <p className="text-sm text-gray-600">
                      自分で淹れたコーヒー
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600">
                      店で飲んだコーヒー: {record.shopName}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    記録日時: {new Date(record.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
