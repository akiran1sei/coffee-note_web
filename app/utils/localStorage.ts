import { getCoffeeRecords } from "@/app/lib/IndexedDB";

export const displayAllRecords = async () => {
  try {
    const allRecords = await getCoffeeRecords();
    console.log("全コーヒー記録:", allRecords);
    // ここで取得したデータをUIに表示するなどの処理を行う
  } catch (error) {
    console.error("記録の取得中にエラーが発生しました:", error);
  }
};
