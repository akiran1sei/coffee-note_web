// IndexedDB接続、CRUD操作のロジック
// app/lib/indexedDB.ts
"use client";
import { IDBPDatabase, openDB } from "idb"; // idbライブラリを使用すると、Promiseベースで扱いやすくなります
import { CoffeeRecord } from "../types/db";

// オブジェクトストア名を定数として定義すると管理しやすい
const COFFEE_RECORDS_STORE = "coffeeRecords";
//データベース名とバージョン
const DB_NAME = "coffeeRecordsDB";
const DB_VERSION = 2; // データベーススキーマのバージョン管理用

// データベースのスキーマを型で定義
// ここで、各オブジェクトストア名とそのストアに格納されるデータの型をマッピングします。
interface CoffeeRecordMap {
  [COFFEE_RECORDS_STORE]: CoffeeRecord;
  // もし将来的に他のオブジェクトストアを追加した場合、ここに追加します
  // 例: 'users': User;
}
// データベースインスタンスのシングルトン
let db: IDBPDatabase<CoffeeRecordMap> | null = null;
/**
 * IndexedDBデータベースを開く（または作成する）関数
 * @returns {Promise<IDBPDatabase>} データベースインスタンス
 */
export async function openDb(): Promise<IDBPDatabase<CoffeeRecordMap>> {
  if (db) {
    return db; // 既に開いている場合はそのまま返す
  }
  db = await openDB<CoffeeRecordMap>(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion, newVersion, transaction, event) {
      // データベースのバージョンが上がったとき、または初回作成時に実行される
      console.log(
        `DB upgrade needed from version ${oldVersion} to ${newVersion}`
      );
      // ここでオブジェクトストア（テーブルのようなもの）を定義
      // 最初のバージョン (DB_VERSION = 1) のスキーマ定義
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
      }
      // バージョン1から2へのアップグレード時の処理
      if (oldVersion < 2) {
        console.log(
          "Upgrading DB to version 2: No new object stores or indexes needed for this version."
        );
        // このケースでは、以前のインデックス定義はoldVersion < 1でカバーされているため、
        // 特に新しいcreateObjectStoreやcreateIndexの呼び出しは不要です。
        // もし今後、新しいインデックスやストアを追加する際はここに追加します。
      }
    },
  });
  console.log("IndexedDB connection opened successfully.");
  return db;
}

// 以下にCRUD操作を追加します（以前の回答で提示した内容と同じ）

/**
 * コーヒー記録アイテムを追加する関数
 * @param {CoffeeRecord} record - 追加するコーヒー記録アイテム
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
 * @returns {Promise<CoffeeRecord[]>} コーヒー記録アイテムの配列
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
