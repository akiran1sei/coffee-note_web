// 型定義
// types/db.d.ts
export interface CoffeeRecord {
  id: string; // 一意の識別子
  name: string; // 名称
  variety: string; // 品種
  productionArea: string; // 産地
  roastingDegree: string; // 焙煎:Date
  extractionMethod: string;
  extractionMaker: string;
  grindSize: string; // 挽き目
  temperature: number; // 温度（℃）
  coffeeAmount: number; // 粉量（g）
  waterAmount: number; // 湯量（g）
  measurementMethod: string; // 計測方法
  extractionTime: number; // 抽出時間
  acidity: number; // 酸味（1-5）
  bitterness: number; // 苦味（1-5）
  body: number; // コク（1-5）
  aroma: number; // 香り（1-5）
  aftertaste: number; // キレ（1-5）
  overall: number; // 全体の好み（1-5）
  memo: string; // メモ
  imageUri: string; // 画像のパス
  imageAlt: string; // 画像の代替テキスト
  createdAt: Date; // 追加
  self: string; // 自分で淹れたか、店で飲んだか
  shopName: string; // 店名（店で飲んだ場合のみ）
  shopPrice: number; // 店の価格（円）（店で飲んだ場合のみ）
  shopDate: Date; // 店で飲んだ日付（店で飲んだ場合のみ）
  shopAddress: string; // 店の住所（店で飲んだ場合のみ）
  shopUrl: string; // 店のURL（店で飲んだ場合のみ）
  createdAt: date;
}
