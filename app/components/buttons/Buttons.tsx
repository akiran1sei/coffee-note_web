import styles from "@/app/styles/Button.module.css";
import Link from "next/link";
import Image from "next/image";
import React, { type PropsWithChildren } from "react";
// アイコンコンポーネントの記述方法
/*    <IconButton 
          value="search" //アイコンの値 →”src={`/images/${value}.svg`}”
          iconWidth="iconMd" //アイコンのサイズ（iconWidth: "iconLg" | "iconMd" | "iconSm";）
          buttonColor="btn-warning" //ボタンの色（buttonColor: "btn-primary" | "btn-secondary" | "btn-success" | "btn-warning" | "btn-danger";）
          /> */
/*    <LinkIconButton
          value="create" 
          iconWidth="iconMd" 
          buttonColor="btn-warning" 
        />*/
/*   <LinkIconButtonWithShadow
            value="list"
            iconWidth="iconMd"
            buttonColor="btn-warning"
          /> */
interface IconButtonType {
  value: string;
  iconWidth: "iconLg" | "iconMd" | "iconSm";
  buttonColor: string;
}
export const IconButton: React.FC<IconButtonType> = ({
  value,
  iconWidth,
  buttonColor,
}) => {
  return (
    <span
      className={`${styles.iconButton} ${styles[iconWidth]} ${styles[buttonColor]}`}
    >
      <Image
        src={`/images/${value}.svg`}
        alt={`${value} Icon`}
        width={50}
        height={50}
      />
    </span>
  );
};

export const LinkIconButtonWithShadow: React.FC<IconButtonType> = ({
  value,
  iconWidth,
  buttonColor,
}) => {
  return (
    <Link
      href={`/pages/${value}`}
      className={`${styles.iconButton} ${styles.buttonShadow} ${styles[iconWidth]} ${styles[buttonColor]}`}
    >
      <Image
        src={`/images/${value}.svg`}
        alt={`${value} Icon`}
        width={50}
        height={50}
        style={{ fill: "#D2B48C" }}
      />
    </Link>
  );
};
export const LinkIconButton: React.FC<IconButtonType> = ({
  value,
  iconWidth,
}) => {
  if (value === "home") {
    return (
      <Link href={`/`} className={`${styles.iconButton} ${styles[iconWidth]}`}>
        <span className={styles.iconWrapper}>
          <Image
            src={`/images/${value}.svg`}
            alt={`${value} Icon`}
            width={50}
            height={50}
            style={{ fill: "#D2B48C" }}
          />
        </span>
      </Link>
    );
  }
  return (
    <Link
      href={`/pages/${value}`}
      className={`${styles.iconButton} ${styles[iconWidth]}`}
    >
      <span className={styles.iconWrapper}>
        <Image
          src={`/images/${value}.svg`}
          alt={`${value} Icon`}
          width={50}
          height={50}
        />
      </span>
    </Link>
  );
};
/*
 MainButtonコンポーネントの作成サンプル
 <MainButton
   onClick={関数名}//起動させるための関数
   type="submit" // この行を追加
   sizeValue="large" ボタンのサイズ （large & middle & small）
   textValue="削除" ボタンに表示するテキスト
   buttonColor="btn-warning" ボタンの色（buttonColor: "btn-primary" | "btn-secondary" | "btn-success" | "btn-warning" | "btn-danger";）
   widthValue="widthAuto" ボタンの幅（widthValue: "widthAuto" | "widthNearlyFull";）
 />
*/

interface MainButtonType extends PropsWithChildren {
  // interface MainButtonType {
  onClick?: () => void | Promise<void>;
  type?: "button" | "submit" | "reset"; // `type`プロパティをオプションとして追加
  sizeValue: string; //large & middle & small
  // textValue: string; // 表示したいテキスト
  buttonColor: string; // buttonColor: "btn-primary" | "btn-secondary" | "btn-success" | "btn-warning" | "btn-danger";
  widthValue: string; // width: "widthAuto" | "widthNearlyFull";
  disabled?: boolean; // ← 追加
  style?: React.CSSProperties;
}

export const MainButton: React.FC<MainButtonType> = ({
  onClick,
  type = "button",
  sizeValue,
  buttonColor,
  widthValue,
  disabled,
  style,
  children,
}) => {
  if (sizeValue === "large") {
    return (
      <button
        type={type}
        className={`${styles.mainButton} ${styles.buttonShadow} ${styles.largeButton} ${styles[buttonColor]} ${styles[widthValue]}`}
        onClick={onClick}
        disabled={disabled}
        style={style}
      >
        <span className={styles.buttonText}>{children}</span>
      </button>
    );
  } else if (sizeValue === "middle") {
    return (
      <button
        type={type}
        className={`${styles.mainButton} ${styles.buttonShadow} ${styles.middleButton} ${styles[buttonColor]} ${styles[widthValue]}`}
        onClick={onClick}
        disabled={disabled}
        style={style}
      >
        <span className={styles.buttonText}>{children}</span>
      </button>
    );
  } else if (sizeValue === "small") {
    return (
      <button
        type={type}
        className={`${styles.mainButton} ${styles.buttonShadow} ${styles.smallButton} ${styles[buttonColor]} ${styles[widthValue]}`}
        onClick={onClick}
        disabled={disabled}
        style={style}
      >
        <span className={styles.buttonText}>{children}</span>
      </button>
    );
  }
};

/*
 MainLinkButtonコンポーネントの作成サンプル
  <MainLinkButton
    sizeValue="large" 
        buttonColor="btn-warning"
    urlValue={`/pages/${value}`}
    widthValue="widthAuto"
  >編集</MainLinkButton>;
*/
// 修正1: MainLinkButtonType に PropsWithChildren を適用し、textValue を削除
interface MainLinkButtonType extends PropsWithChildren {
  sizeValue: string;
  urlValue: string;
  buttonColor: string;
  widthValue: string;
}
export const MainLinkButton: React.FC<MainLinkButtonType> = ({
  sizeValue,
  // textValue, // ← 削除
  urlValue,
  buttonColor,
  widthValue,
  children, // children を受け取る
}) => {
  if (sizeValue === "large") {
    return (
      <Link
        href={`${urlValue}`}
        className={`${styles.mainButton} ${styles.buttonShadow} ${styles.largeButton} ${styles[buttonColor]} ${styles[widthValue]} ${styles.buttonText}`}
        passHref
      >
        {children}
      </Link>
    );
  } else if (sizeValue === "middle") {
    return (
      <Link
        href={`${urlValue}`}
        className={`${styles.mainButton} ${styles.buttonShadow} ${styles.middleButton} ${styles[buttonColor]} ${styles[widthValue]} ${styles.buttonText}`}
        passHref
      >
        {children}
      </Link>
    );
  } else if (sizeValue === "small") {
    return (
      <Link
        href={`${urlValue}`}
        className={`${styles.mainButton} ${styles.buttonShadow} ${styles.smallButton} ${styles[buttonColor]} ${styles[widthValue]} ${styles.buttonText}`}
        passHref
      >
        {children}
      </Link>
    );
  }
};

interface OnClickButtonType extends PropsWithChildren {
  onClick: () => void;
  textValue: string; // ← アイコンファイル名連動のため残す
  buttonColor: string;
  iconWidth: string;
}
export const OnClickButton: React.FC<OnClickButtonType> = ({
  onClick,
  textValue, // textValue は残す
  buttonColor,
  iconWidth,
  children, // children は受け取るが、今回は使用しない（またはデバッグ用として残す）
}) => {
  return (
    <button
      type="button"
      className={`${styles.iconButton} ${styles.buttonShadow} ${styles[buttonColor]}`}
      onClick={onClick}
    >
      <span className={`${styles.iconWrapper} ${styles[iconWidth]}`}>
        <Image
          // textValue をファイル名に使用（元のロジックを維持）
          src={`/images/${textValue}.png`}
          alt={`${textValue} Icon`}
          width={50}
          height={50}
        />
      </span>

      <span className={styles.srOnly}>{textValue}ボタン</span>
    </button>
  );
};
