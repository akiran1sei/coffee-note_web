// app/page.tsx
"use client"; // クライアントコンポーネントとしてマーク

import React, { useEffect, useState } from "react";
import Link from "next/link"; // expo-router の Link を next/link に変更
import styles from "@/app/styles/Pages.module.css"; // CSS Modulesをインポート
import Image from "next/image";
import { LinkIconButtonWithShadow } from "./components/buttons/page";
import { AppTitle } from "./components/title/page";

// Next.jsではexpo-fontの代わりにCSSでフォントを読み込むため、useEffect内のフォント読み込みロジックは不要
// react-native-get-random-values もWebでは不要

// IconButton の代替として、シンプルなSVGアイコンを定義
// 実際には、react-icons や Material UI などのライブラリを使用するのが一般的です

// LoadingComponent の代替 (Web向けに簡易化)
const LoadingComponent: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "24px",
        color: "#6F4E37",
      }}
    >
      Loading...
    </div>
  );
};

export default function Index() {
  // Next.jsではフォントはCSSで読み込むため、useEffect内のフォント読み込みは不要
  // ただし、もしWebで非同期ロードが必要な他のリソースがあればuseEffectは残せます
  const [loading, setLoading] = useState(true); // フォント読み込みのuseEffectを削除したのでtrueに初期化
  const [switchState, setSwitchState] = useState(false);
  const handleSwitch = () => {
    setSwitchState(!switchState);
  };

  // WebではuseEffectでフォントをロードする必要がないため削除
  // 必要であれば、Webページに必要なデータフェッチなどのロジックを追加

  if (!loading) {
    return <LoadingComponent />;
  } else {
    return (
      <div className={styles.appContainer}>
        <div className={styles.pageWrapper}>
          <div className={styles.mainContents}>
            <div className={styles.pageTitle}>
              <AppTitle value="Coffee Note" />
            </div>

            <div className={styles.homeButtons}>
              {/* Create ボタン */}
              <LinkIconButtonWithShadow value="create" />
              {/* List ボタン */}
              <LinkIconButtonWithShadow value="list" />
            </div>
            <div className={styles.settingPanel}>
              {switchState ? (
                <div className={styles.settingPanelContent}>
                  <div className={styles.settingPanelItem}>
                    <Link
                      href="/settings/PrivacyPolicyJP"
                      className={styles.settingButton}
                    >
                      {/* TouchableOpacityをLinkに変更 */}
                      <span className={styles.settingButtonText}>
                        プライバシーポリシー
                      </span>
                    </Link>
                  </div>
                  <div className={styles.settingPanelItem}>
                    <Link
                      href="/settings/TermsAndConditionsJP"
                      className={styles.settingButton}
                    >
                      {/* TouchableOpacityをLinkに変更 */}
                      <span className={styles.settingButtonText}>利用規約</span>
                    </Link>
                  </div>
                  <div className={styles.settingPanelItem}>
                    <button /* TouchableOpacityをbuttonタグに変更 */
                      className={styles.settingButtonClose}
                      onClick={() => {
                        // onPressをonClickに変更
                        handleSwitch();
                      }}
                      aria-label="閉じる"
                    >
                      <Image
                        src="./images/close.svg"
                        alt="Close Icon"
                        width={30}
                        height={30}
                        style={{ fill: "#f5f5f5" }}
                      />
                    </button>
                  </div>
                </div>
              ) : (
                <button /* TouchableOpacityをbuttonタグに変更 */
                  onClick={() => {
                    // onPressをonClickに変更
                    handleSwitch();
                  }}
                  aria-label="設定アイコン"
                >
                  <Image
                    src="./images/settings.svg"
                    alt="Settings Icon"
                    width={30}
                    height={30}
                    style={{ fill: "#f5f5f5" }}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
