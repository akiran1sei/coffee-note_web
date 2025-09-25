//utils/schemaModels.js

import mongoose from "mongoose";

const Schema = mongoose.Schema;
const GroupSchema = new Schema({
  groupname: String,
  email: [{ type: String }], // 初期値を空の配列にする
});
const CoffeeSchema = new Schema(
  {
    id: String, // 一意の識別子
    name: String, // 名称
    variety: String, // 品種
    productionArea: String, // 産地

    // 焙煎・抽出情報（自分で淹れた場合）
    roastingDegree: String, // 焙煎度
    extractionMethod: String, // 抽出方法
    extractionMaker: String, // 抽出器具メーカー
    grindSize: String, // 挽き目
    temperature: Number, // 温度（℃）
    coffeeAmount: Number, // 粉量（g）
    waterAmount: Number, // 湯量（g）
    measurementMethod: String, // 計測方法
    extractionTime: Number, // 抽出時間（秒）

    // 評価項目（共通）
    acidity: Number, // 酸味（1-10）
    bitterness: Number, // 苦味（1-10）
    overall: Number, // 全体の好み（1-10） ※1-55から1-10に統一
    body: Number, // コク（1-10）
    aroma: Number, // 香り（1-10）
    aftertaste: Number, // キレ（1-10）

    // 共通情報
    memo: String, // メモ
    imageUri: String, // 画像のパス
    imageAlt: String, // 画像の代替テキスト
    self: {
      type: String,
      enum: ["self", "shop"], // 'self': 自分で淹れた, 'shop': 店で飲んだ
      required: true,
    },

    // 店舗情報（店で飲んだ場合のみ）
    shopName: String, // 店名
    shopPrice: Number, // 店の価格（円）
    shopDate: Date, // 店で飲んだ日付
    shopAddress: String, // 店の住所
    shopUrl: String, // 店のURL

    createdAt: Date,
  },
  {
    timestamps: true,
  }
);
const AccountSchema = new Schema({
  provider: String,
  type: String,
  providerAccountId: String,
  access_token: String,
  expires_at: Number,
  scope: String,
  token_type: String,
  id_token: String,
  userId: String,
  email: String,
});
//データーベースをdb変数に代入
const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

export const CoffeeModel =
  mongoose.models.Coffee || mongoose.model("Coffee", CoffeeSchema);
export const GroupModel =
  mongoose.models.Group || mongoose.model("Group", GroupSchema);
export const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);
export const AccountModel =
  mongoose.models.Account || mongoose.model("Account", AccountSchema);
