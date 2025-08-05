"use client";
// 1. 必要なフックと型をインポート
import styles from "@/app/styles/Button.module.css";
import { useState, useRef, useEffect } from "react";
export const UpperButton = () => {
  // 2. 必要なステートとuseRefを定義
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const offset = useRef({ x: 0, y: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  // 3. onMouseDownイベントハンドラを定義
  const handleInteractionStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    // オプション：ブラウザのデフォルト挙動（スクロールなど）をキャンセル

    // 4. refがnullでないかチェック
    if (wrapperRef.current) {
      setIsDragging(true);
      // 6. ボタンの現在地（DOM要素のクライアント領域）を取得
      const rect = wrapperRef.current.getBoundingClientRect();
      // イベントオブジェクトに'touches'プロパティがあるかでタッチイベントかを判定
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      // 7. マウスカーソルとボタンの左上隅の差分（オフセット）を計算
      // オフセットを計算
      const currentOffset = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
      offset.current = currentOffset;
      // ここでsetPositionも呼び出し、positionを更新する
      setPosition({
        x: clientX - currentOffset.x,
        y: clientY - currentOffset.y,
      });
    }
  };
  useEffect(() => {
    const handleInteractionMove = (e: MouseEvent | TouchEvent) => {
      // ブラウザのデフォルト挙動をキャンセル
      e.preventDefault();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      setPosition({
        x: clientX - offset.current.x,
        y: clientY - offset.current.y,
      });
    };
    const handleInteractionUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      // ドラッグ中は、documentにイベントリスナーを追加
      document.addEventListener("mousemove", handleInteractionMove);
      document.addEventListener("mouseup", handleInteractionUp);
      document.addEventListener("touchmove", handleInteractionMove);
      document.addEventListener("touchend", handleInteractionUp);
    }
    // クリーンアップ関数
    return () => {
      // isDraggingがfalseになったり、コンポーネントがアンマウントされたときに実行される
      document.removeEventListener("mousemove", handleInteractionMove);
      document.removeEventListener("mouseup", handleInteractionUp);
      document.removeEventListener("touchmove", handleInteractionMove);
      document.removeEventListener("touchend", handleInteractionUp);
    };
  }, [isDragging]);

  return (
    <div
      className={`${styles.scrollButtonWrapper} ${
        isDragging ? styles.dragging : ""
      }`}
      ref={wrapperRef}
      onMouseDown={handleInteractionStart}
      onTouchStart={handleInteractionStart}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        position: "fixed",
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      <button type="button" aria-label="上へ" className={styles.scrollButton}>
        <span className={styles.scrollButtonText}>↑</span>
      </button>
    </div>
  );
};
