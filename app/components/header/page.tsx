// components/HeaderComponent.tsx (Next.js版)
import React from "react";
import styles from "../../styles/Header.module.css"; // CSS Modulesをインポート
import { LinkIconButton } from "../buttons/page";
const HeaderComponent = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.headerButtons}>
        {/* Home ボタン */}
        <LinkIconButton value="home" />

        <div className={styles.border}></div>

        {/* Create ボタン */}
        <LinkIconButton value="create" />

        <div className={styles.border}></div>

        {/* List ボタン */}
        <LinkIconButton value="list" />
      </nav>
    </header>
  );
};

export default HeaderComponent;
