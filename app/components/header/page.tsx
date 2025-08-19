// components/HeaderComponent.tsx (Next.js版)
import React from "react";
import styles from "../../styles/Header.module.css"; // CSS Modulesをインポート
import { LinkIconButton } from "../buttons/page";
const HeaderComponent = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.headerButtons}>
        {/* Home ボタン */}
        <LinkIconButton
          value="home"
          iconWidth="iconLg"
          buttonColor="btn-primary"
        />

        <div className={styles.border}></div>

        {/* Create ボタン */}
        <LinkIconButton
          value="create"
          iconWidth="iconLg"
          buttonColor="btn-primary"
        />

        <div className={styles.border}></div>

        {/* List ボタン */}
        <LinkIconButton
          value="list"
          iconWidth="iconLg"
          buttonColor="btn-primary"
        />
      </nav>
    </header>
  );
};

export default HeaderComponent;
