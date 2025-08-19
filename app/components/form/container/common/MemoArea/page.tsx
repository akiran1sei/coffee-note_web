"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/Form.module.css";
import { TextAreaComponent } from "@/app/components/form/item/TextAreaComponent/page";

export const MemoAreaComponent = () => {
  const [memoForm, setMemoForm] = useState({
    memo: "",
  });

  return (
    <div className={styles.infoContainer}>
      <h2 className={styles.infoTitle}>Memo</h2>
      <div className={styles.infoWrapper}>
        <TextAreaComponent
          dataTitle="メモ"
          labelText="memo"
          value={memoForm.memo}
          onChange={(value: string) => {
            setMemoForm({
              ...memoForm,
              memo: value,
            });
          }}
        />
      </div>
    </div>
  );
};
