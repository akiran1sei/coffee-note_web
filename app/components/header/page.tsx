// components/HeaderComponent.tsx (Next.js版)
import React from "react";
import Link from "next/link"; // next/linkをインポート
// import { useRouter } from 'next/router'; // Pages Routerの場合
// import { useRouter } from 'next/navigation'; // App Routerの場合
import styles from "../../styles/Header.module.css"; // CSS Modulesをインポート
import Image from "next/image";
const HeaderComponent = () => {
  // const router = useRouter(); // ナビゲーションをプログラム的に制御したい場合

  return (
    <header className={`${styles.absoluteBox} ${styles.header}`}>
      <nav className={`${styles.buttons} ${styles.headerButtons}`}>
        {/* Home ボタン */}
        <Link href="/" className={styles.button}>
          <Image
            src="./images/home.svg"
            alt="Home Icon"
            width={50}
            height={50}
            style={{ fill: "#D2B48C" }}
          />
          {/* アイコンをImageコンポーネントで表示 */}
          {/* <span className={styles.buttonText}>Home</span> */}
        </Link>

        <div className={styles.border}></div>

        {/* Create ボタン */}
        <Link href="/create" className={styles.button}>
          <Image
            src="./images/add.svg"
            alt="Add Icon"
            width={50}
            height={50}
            style={{ fill: "#D2B48C" }}
          />
          {/* アイコンをImageコンポーネントで表示 */}
          {/* plusをaddに変更 */}
          {/* <span className={styles.buttonText}>Create</span> */}
        </Link>

        <div className={styles.border}></div>

        {/* List ボタン */}
        <Link href="/list" className={styles.button}>
          <Image
            src="./images/lists.svg"
            alt="List Icon"
            width={50}
            height={50}
            style={{ fill: "#D2B48C" }}
          />
          {/* アイコンをImageコンポーネントで表示 */}
          {/* view-listをlistに変更 */}
          {/* <span className={styles.buttonText}>List</span> */}
        </Link>
      </nav>
    </header>
  );
};

export default HeaderComponent;
