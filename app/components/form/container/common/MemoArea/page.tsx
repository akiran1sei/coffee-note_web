"use client";
import React from "react";
import styles from "@/app/styles/Form.module.css";
import { TextAreaComponent } from "@/app/components/form/item/TextAreaComponent/page";

// Propsの型を定義
interface MemoAreaComponentProps {
  reviewInfo: {
    chart: {
      acidity: number;
      bitterness: number;
      overall: number;
      body: number;
      aroma: number;
      aftertaste: number;
    };
    memo: string;
  };
  setReviewInfo: React.Dispatch<
    React.SetStateAction<{
      chart: {
        acidity: number;
        bitterness: number;
        overall: number;
        body: number;
        aroma: number;
        aftertaste: number;
      };
      memo: string;
    }>
  >;
}

// 親コンポーネントからpropsとして`reviewInfo`と`setReviewInfo`を受け取る
export const MemoAreaComponent: React.FC<MemoAreaComponentProps> = ({
  reviewInfo,
  setReviewInfo,
}) => {
  // ローカルステートは不要になるため削除
  // const [memoForm, setMemoForm] = useState(...)

  return (
    <div className={styles.infoContainer}>
      <h2 className={styles.infoTitle}>Memo</h2>
      <div className={styles.infoWrapper}>
        <TextAreaComponent
          dataTitle="メモ"
          labelText="memo"
          value={reviewInfo.memo} // 親から渡された値を表示
          onChange={(value: string) => {
            // 親のステートを更新
            setReviewInfo((prev) => ({
              ...prev,
              memo: value,
            }));
          }}
        />
      </div>
    </div>
  );
};
