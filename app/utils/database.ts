import mongoose from "mongoose";

const uri: string = process.env.MONGODB_URI || "";
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("成功: MongoDB に接続しました");
  } catch (error) {
    console.log("失敗: MongoDB に接続されていません");
    throw new Error();
  }
};
export default connectDB;
