"use client";
// 1. 必要なフックと型をインポート
import styles from "@/app/styles/Button.module.css";
import { useState, useRef, useEffect } from "react";

export default function UpperButton() {
  // 2. 必要なステートとuseRefを定義
  const [isMouseDragging, setIsMouseDragging] = useState(false);
  const [isTouchDragging, setIsTouchDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const mouseOffset = useRef({ x: 0, y: 0 });
  const touchOffset = useRef({ x: 0, y: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 3. マウスダウンイベントハンドラを定義
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    if (wrapperRef.current && !isTouchDragging) {
      setIsMouseDragging(true);

      const rect = wrapperRef.current.getBoundingClientRect();
      const currentPosition = {
        x: rect.left,
        y: rect.top,
      };

      // マウスカーソルとボタンの相対位置を計算
      mouseOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  // 4. タッチスタートイベントハンドラを定義
  const handleTouchStart = (e: React.TouchEvent) => {
    // e.preventDefault();

    if (wrapperRef.current && !isMouseDragging) {
      setIsTouchDragging(true);

      const rect = wrapperRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const currentPosition = {
        x: rect.left,
        y: rect.top,
      };

      // タッチ位置とボタンの相対位置を計算
      touchOffset.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
  };

  // 5. マウス操作用のuseEffect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      setPosition({
        x: e.clientX - mouseOffset.current.x,
        y: e.clientY - mouseOffset.current.y,
      });
    };

    const handleMouseUp = () => {
      setIsMouseDragging(false);
    };

    if (isMouseDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMouseDragging]);

  // 6. タッチ操作用のuseEffect
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - touchOffset.current.x,
        y: touch.clientY - touchOffset.current.y,
      });
    };

    const handleTouchEnd = () => {
      setIsTouchDragging(false);
    };

    if (isTouchDragging) {
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isTouchDragging]);

  // 現在ドラッグ中かどうかを判定
  const isDragging = isMouseDragging || isTouchDragging;

  return (
    <div
      className={`${styles.scrollButtonWrapper} ${
        isDragging ? styles.dragging : ""
      }`}
      ref={wrapperRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
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
}
