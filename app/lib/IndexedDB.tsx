// IndexedDB接続、CRUD操作のロジック + 画像アップロード機能
// app/lib/indexedDB.ts
"use client";
import { IDBPDatabase, openDB } from "idb";
import { CoffeeRecord } from "../types/db";

// オブジェクトストア名を定数として定義
const COFFEE_RECORDS_STORE = "coffeeRecords";
const IMAGES_STORE = "images"; // 画像用のストア

// データベース名とバージョン
const DB_NAME = "coffeeRecordsDB";
const DB_VERSION = 3; // 画像ストア追加でバージョンアップ

// 画像データの型定義
export interface ImageData {
  id: string; // 画像の一意ID
  fileName: string; // ファイル名
  mimeType: string; // MIMEタイプ (image/jpeg, image/png等)
  size: number; // ファイルサイズ(bytes)
  data: ArrayBuffer; // 画像のバイナリデータ
  createdAt: Date; // アップロード日時
  coffeeRecordId?: string; // 関連するコーヒー記録のID（オプション）
}

// データベースのスキーマを型で定義
interface CoffeeRecordMap {
  [COFFEE_RECORDS_STORE]: CoffeeRecord;
  [IMAGES_STORE]: ImageData;
}

// データベースインスタンスのシングルトン
let db: IDBPDatabase<CoffeeRecordMap> | null = null;

/**
 * 画像アップロード結果の型
 */
export interface ImageUploadResult {
  success: boolean;
  imageId?: string;
  imageUrl?: string;
  error?: string;
}

/**
 * 画像アップロードオプション
 */
export interface ImageUploadOptions {
  maxSize?: number; // 最大ファイルサイズ (bytes) デフォルト: 5MB
  allowedTypes?: string[]; // 許可するMIMEタイプ
  quality?: number; // JPEG圧縮品質 (0.1-1.0)
  maxWidth?: number; // リサイズ時の最大幅
  maxHeight?: number; // リサイズ時の最大高さ
}

/**
 * IndexedDBデータベースを開く（または作成する）関数
 */
export async function openDb(): Promise<IDBPDatabase<CoffeeRecordMap>> {
  if (db) {
    return db;
  }

  db = await openDB<CoffeeRecordMap>(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion, newVersion, transaction, event) {
      console.log(
        `DB upgrade needed from version ${oldVersion} to ${newVersion}`
      );

      // バージョン1: コーヒー記録ストア作成
      if (oldVersion < 1) {
        console.log(
          `Creating "${COFFEE_RECORDS_STORE}" object store (version 1)`
        );
        const coffeeStore = db.createObjectStore(COFFEE_RECORDS_STORE, {
          keyPath: "id",
        });

        // インデックスの定義
        coffeeStore.createIndex("name", "name", { unique: false });
        coffeeStore.createIndex("productionArea", "productionArea", {
          unique: false,
        });
        coffeeStore.createIndex("roastingDegree", "roastingDegree", {
          unique: false,
        });
        coffeeStore.createIndex("extractionMethod", "extractionMethod", {
          unique: false,
        });
        coffeeStore.createIndex("createdAt", "createdAt", { unique: false });
        coffeeStore.createIndex("self", "self", { unique: false });
        coffeeStore.createIndex("shopName", "shopName", { unique: false });
        coffeeStore.createIndex("variety", "variety", { unique: false });
        coffeeStore.createIndex("extractionMaker", "extractionMaker", {
          unique: false,
        });
        coffeeStore.createIndex("grindSize", "grindSize", { unique: false });
        coffeeStore.createIndex("temperature", "temperature", {
          unique: false,
        });
        coffeeStore.createIndex("coffeeAmount", "coffeeAmount", {
          unique: false,
        });
        coffeeStore.createIndex("waterAmount", "waterAmount", {
          unique: false,
        });
        coffeeStore.createIndex("measurementMethod", "measurementMethod", {
          unique: false,
        });
        coffeeStore.createIndex("extractionTime", "extractionTime", {
          unique: false,
        });
        coffeeStore.createIndex("acidity", "acidity", { unique: false });
        coffeeStore.createIndex("bitterness", "bitterness", { unique: false });
        coffeeStore.createIndex("overall", "overall", { unique: false });
        coffeeStore.createIndex("body", "body", { unique: false });
        coffeeStore.createIndex("aroma", "aroma", { unique: false });
        coffeeStore.createIndex("aftertaste", "aftertaste", { unique: false });
        coffeeStore.createIndex("memo", "memo", { unique: false });
        coffeeStore.createIndex("imageUri", "imageUri", { unique: false });
        coffeeStore.createIndex("shopPrice", "shopPrice", { unique: false });
        coffeeStore.createIndex("shopDate", "shopDate", { unique: false });
        coffeeStore.createIndex("shopAddress", "shopAddress", {
          unique: false,
        });
        coffeeStore.createIndex("shopUrl", "shopUrl", { unique: false });
      }

      // バージョン2: 既存の変更
      if (oldVersion < 2) {
        console.log(
          "Upgrading DB to version 2: No new object stores or indexes needed."
        );
      }

      // バージョン3: 画像ストア追加
      if (oldVersion < 3) {
        console.log(`Creating "${IMAGES_STORE}" object store (version 3)`);
        const imageStore = db.createObjectStore(IMAGES_STORE, {
          keyPath: "id",
        });

        // 画像ストアのインデックス
        imageStore.createIndex("fileName", "fileName", { unique: false });
        imageStore.createIndex("mimeType", "mimeType", { unique: false });
        imageStore.createIndex("createdAt", "createdAt", { unique: false });
        imageStore.createIndex("coffeeRecordId", "coffeeRecordId", {
          unique: false,
        });
      }
    },
  });

  console.log("IndexedDB connection opened successfully.");
  return db;
}

// ========================
// 画像アップロード関連の関数
// ========================

/**
 * ファイルから画像をアップロードする関数
 */
export async function uploadImageFromFile(
  file: File,
  options: ImageUploadOptions = {}
): Promise<ImageUploadResult> {
  try {
    // デフォルトオプション
    const defaultOptions: Required<ImageUploadOptions> = {
      maxSize: 5 * 1024 * 1024, // 5MB
      allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
      quality: 0.8,
      maxWidth: 1920,
      maxHeight: 1920,
    };

    const config = { ...defaultOptions, ...options };

    // ファイルタイプチェック
    if (!config.allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: `許可されていないファイルタイプです: ${file.type}`,
      };
    }

    // ファイルサイズチェック
    if (file.size > config.maxSize) {
      return {
        success: false,
        error: `ファイルサイズが大きすぎます: ${(
          file.size /
          1024 /
          1024
        ).toFixed(2)}MB (上限: ${(config.maxSize / 1024 / 1024).toFixed(2)}MB)`,
      };
    }

    // 画像を処理（リサイズ・圧縮）
    const processedImage = await processImage(file, config);

    // IndexedDBに保存
    const imageId = `img_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const imageData: ImageData = {
      id: imageId,
      fileName: file.name,
      mimeType: processedImage.type,
      size: processedImage.size,
      data: processedImage.arrayBuffer,
      createdAt: new Date(),
    };

    await addImageToStore(imageData);

    // Base64 URLを生成（プレビュー用）
    const imageUrl = (await createImageUrl(imageId)) ?? undefined;

    return {
      success: true,
      imageId,
      imageUrl,
    };
  } catch (error) {
    console.error("画像アップロードエラー:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "画像アップロードに失敗しました",
    };
  }
}

/**
 * 画像をリサイズ・圧縮する関数
 */
async function processImage(
  file: File,
  options: Required<ImageUploadOptions>
): Promise<{ arrayBuffer: ArrayBuffer; type: string; size: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Canvas context not available"));
      return;
    }

    img.onload = () => {
      // リサイズ計算
      let { width, height } = img;
      const { maxWidth, maxHeight } = options;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      // Canvasにリサイズして描画
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Blobに変換
      canvas.toBlob(
        async (blob) => {
          if (!blob) {
            reject(new Error("画像の変換に失敗しました"));
            return;
          }

          const arrayBuffer = await blob.arrayBuffer();
          resolve({
            arrayBuffer,
            type: blob.type,
            size: blob.size,
          });
        },
        file.type.startsWith("image/jpeg") ? "image/jpeg" : file.type,
        file.type.startsWith("image/jpeg") ? options.quality : undefined
      );
    };

    img.onerror = () => reject(new Error("画像の読み込みに失敗しました"));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * 画像データをIndexedDBに保存
 */
export async function addImageToStore(imageData: ImageData): Promise<void> {
  const database = await openDb();
  const tx = database.transaction(IMAGES_STORE, "readwrite");
  const store = tx.objectStore(IMAGES_STORE);
  await store.add(imageData);
  await tx.done;
  console.log("Image added to store:", imageData.id);
}

/**
 * 画像IDから画像URLを生成
 */
export async function createImageUrl(imageId: string): Promise<string | null> {
  try {
    const imageData = await getImageById(imageId);
    if (!imageData) return null;

    const blob = new Blob([imageData.data], { type: imageData.mimeType });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("画像URL生成エラー:", error);
    return null;
  }
}

/**
 * IDで画像データを取得
 */
export async function getImageById(id: string): Promise<ImageData | undefined> {
  const database = await openDb();
  const tx = database.transaction(IMAGES_STORE, "readonly");
  const store = tx.objectStore(IMAGES_STORE);
  const imageData = await store.get(id);
  await tx.done;
  return imageData;
}

/**
 * 全ての画像データを取得
 */
export async function getAllImages(): Promise<ImageData[]> {
  const database = await openDb();
  const tx = database.transaction(IMAGES_STORE, "readonly");
  const store = tx.objectStore(IMAGES_STORE);
  const images = await store.getAll();
  await tx.done;
  return images;
}

/**
 * 画像を削除
 */
export async function deleteImage(id: string): Promise<void> {
  const database = await openDb();
  const tx = database.transaction(IMAGES_STORE, "readwrite");
  const store = tx.objectStore(IMAGES_STORE);
  await store.delete(id);
  await tx.done;
  console.log("Image deleted:", id);
}

/**
 * コーヒー記録に関連付けられた画像を取得
 */
export async function getImagesByCoffeeRecordId(
  coffeeRecordId: string
): Promise<ImageData[]> {
  const database = await openDb();
  const tx = database.transaction(IMAGES_STORE, "readonly");
  const store = tx.objectStore(IMAGES_STORE);
  const index = store.index("coffeeRecordId");
  const images = await index.getAll(coffeeRecordId);
  await tx.done;
  return images;
}

// ========================
// 既存のCRUD操作（修正なし）
// ========================

/**
 * コーヒー記録アイテムを追加する関数
 */
export async function addCoffeeRecord(record: CoffeeRecord): Promise<void> {
  const database = await openDb();
  const tx = database.transaction(COFFEE_RECORDS_STORE, "readwrite");
  const store = tx.objectStore(COFFEE_RECORDS_STORE);
  await store.add(record);
  await tx.done;
  console.log("Coffee record added:", record);
}

/**
 * 全てのコーヒー記録アイテムを取得する関数
 */
export async function getCoffeeRecords(): Promise<CoffeeRecord[]> {
  const database = await openDb();
  const tx = database.transaction(COFFEE_RECORDS_STORE, "readonly");
  const store = tx.objectStore(COFFEE_RECORDS_STORE);
  const records = await store.getAll();
  await tx.done;
  return records;
}

/**
 * 特定のIDのコーヒー記録を取得する関数
 */
export async function getCoffeeRecordById(
  id: string
): Promise<CoffeeRecord | undefined> {
  const database = await openDb();
  const tx = database.transaction(COFFEE_RECORDS_STORE, "readonly");
  const store = tx.objectStore(COFFEE_RECORDS_STORE);
  const record = await store.get(id);
  await tx.done;
  return record;
}

/**
 * コーヒー記録を更新する関数
 */
export async function updateCoffeeRecord(record: CoffeeRecord): Promise<void> {
  const database = await openDb();
  const tx = database.transaction(COFFEE_RECORDS_STORE, "readwrite");
  const store = tx.objectStore(COFFEE_RECORDS_STORE);
  await store.put(record);
  await tx.done;
  console.log("Coffee record updated:", record);
}

/**
 * 特定のIDのコーヒー記録を削除する関数
 */
export async function deleteCoffeeRecord(id: string): Promise<void> {
  const database = await openDb();
  const tx = database.transaction(COFFEE_RECORDS_STORE, "readwrite");
  const store = tx.objectStore(COFFEE_RECORDS_STORE);
  await store.delete(id);
  await tx.done;
  console.log("Coffee record deleted with ID:", id);
}

/**
 * 全てのコーヒー記録を削除する関数
 */
export async function clearCoffeeRecords(): Promise<void> {
  const database = await openDb();
  const tx = database.transaction(COFFEE_RECORDS_STORE, "readwrite");
  const store = tx.objectStore(COFFEE_RECORDS_STORE);
  await store.clear();
  await tx.done;
  console.log("All coffee records cleared.");
}

// ========================
// 統合的な操作関数
// ========================

/**
 * 画像付きでコーヒー記録を保存する関数
 */
export async function addCoffeeRecordWithImage(
  record: Omit<CoffeeRecord, "imageUri">,
  imageFile?: File,
  imageOptions?: ImageUploadOptions
): Promise<{
  success: boolean;
  recordId: string;
  imageId?: string;
  error?: string;
}> {
  try {
    let imageId: string | undefined;
    let imageUrl = "";

    // 画像がある場合はアップロード
    if (imageFile) {
      const uploadResult = await uploadImageFromFile(imageFile, imageOptions);
      if (!uploadResult.success) {
        return { success: false, recordId: "", error: uploadResult.error };
      }
      imageId = uploadResult.imageId;
      imageUrl = uploadResult.imageUrl || "";
    }

    // コーヒー記録を保存（画像URLを含む）
    const completeRecord: CoffeeRecord = {
      ...record,
      imageUri: imageUrl,
    };

    await addCoffeeRecord(completeRecord);

    // 画像にコーヒー記録IDを関連付け
    if (imageId) {
      const imageData = await getImageById(imageId);
      if (imageData) {
        const updatedImageData: ImageData = {
          ...imageData,
          coffeeRecordId: completeRecord.id,
        };

        const database = await openDb();
        const tx = database.transaction(IMAGES_STORE, "readwrite");
        const store = tx.objectStore(IMAGES_STORE);
        await store.put(updatedImageData);
        await tx.done;
      }
    }

    return { success: true, recordId: completeRecord.id, imageId };
  } catch (error) {
    console.error("コーヒー記録の保存エラー:", error);
    return {
      success: false,
      recordId: "",
      error: error instanceof Error ? error.message : "保存に失敗しました",
    };
  }
}
