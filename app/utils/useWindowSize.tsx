"use client"; // クライアントコンポーネントであることを明示

import { useState, useEffect } from "react";

// ウィンドウサイズの型定義
interface WindowSize {
  width: number | undefined;
  // height: number | undefined;
}

export function useWindowSize(): WindowSize {
  // 画面サイズの初期状態を設定。サーバーサイドではundefined
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    // height: undefined,
  });

  useEffect(() => {
    // リサイズイベントハンドラ
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        // height: window.innerHeight,
      });
    }

    // 初回レンダリング時とリサイズ時にハンドラを実行
    handleResize();

    // イベントリスナーの追加
    window.addEventListener("resize", handleResize);

    // クリーンアップ関数
    return () => window.removeEventListener("resize", handleResize);
  }, []); // 空の依存配列で、コンポーネントマウント時に一度だけ実行

  return windowSize;
}
