import { getCoffeeRecords } from "@/app/lib/IndexedDB";
import { Span } from "next/dist/trace";

export const displayAllRecords = async () => {
  try {
    const allRecords = await getCoffeeRecords();
    console.log("全コーヒー記録:", allRecords);
    // ここで取得したデータをUIに表示するなどの処理を行う
    const allItems = allRecords.map((item) => console.log(item.id));
    return;
  } catch (error) {
    console.error("記録の取得中にエラーが発生しました:", error);
  }
};
