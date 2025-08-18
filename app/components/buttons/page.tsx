import styles from "@/app/styles/Button.module.css";
import Link from "next/link";
import Image from "next/image";

interface IconButtonType {
  value: string;
  iconWidth: "iconLg" | "iconMd" | "iconSm";
}

export const LinkIconButtonWithShadow: React.FC<IconButtonType> = ({
  value,
  iconWidth,
}) => {
  return (
    <Link
      href={`/pages/${value}`}
      className={`${styles.iconButton} ${styles.buttonShadow} ${styles[iconWidth]}`}
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
   onClick={() => console.log("Button clicked")}
   sizeValue="large" ボタンのサイズ （large & middle & small）
   textValue="削除" ボタンに表示するテキスト
   buttonColor="btn-warning" ボタンの色（buttonColor: "btn-primary" | "btn-secondary" | "btn-success" | "btn-warning" | "btn-danger";）
   widthValue="widthAuto" ボタンの幅（widthValue: "widthAuto" | "widthNearlyFull";）
 />
*/

interface MainButtonType {
  onClick?: () => void; // オプションでクリックイベントを受け取る
  sizeValue: string; //large & middle & small
  textValue: string; // 表示したいテキスト
  buttonColor: string; // buttonColor: "btn-primary" | "btn-secondary" | "btn-success" | "btn-warning" | "btn-danger";
  widthValue: string; // width: "widthAuto" | "widthNearlyFull";
}
export const MainButton: React.FC<MainButtonType> = ({
  onClick,
  sizeValue,
  textValue,
  buttonColor,
  widthValue,
}) => {
  if (sizeValue === "large") {
    return (
      <button
        type="button"
        className={`${styles.mainButton} ${styles.buttonShadow} ${styles.largeButton} ${styles[buttonColor]} ${styles[widthValue]}`}
        onClick={onClick}
      >
        <span className={styles.buttonText}>{textValue}</span>
      </button>
    );
  } else if (sizeValue === "middle") {
    return (
      <button
        type="button"
        className={`${styles.mainButton} ${styles.buttonShadow} ${styles.middleButton} ${styles[buttonColor]} ${styles[widthValue]}`}
      >
        <span className={styles.buttonText}>{textValue}</span>
      </button>
    );
  } else if (sizeValue === "small") {
    return (
      <button
        type="button"
        className={`${styles.mainButton} ${styles.buttonShadow} ${styles.smallButton} ${styles[buttonColor]} ${styles[widthValue]}`}
      >
        <span className={styles.buttonText}>{textValue}</span>
      </button>
    );
  }
};
/*
 MainLinkButtonコンポーネントの作成サンプル
  <MainLinkButton
    sizeValue="large" ボタンのサイズ （large & middle & small）
    textValue="編集" ボタンに表示するテキスト
    buttonColor="btn-warning" ボタンの色（buttonColor: "btn-primary" | "btn-secondary" | "btn-success" | "btn-warning" | "btn-danger";）
    urlValue={`/pages/${value}`} 遷移先のURL
    widthValue="widthAuto" ボタンの幅（widthValue: "widthAuto" | "width100";）
  />;
*/
interface MainLinkButtonType {
  sizeValue: string;
  textValue: string;
  urlValue: string;
  buttonColor: string;
  widthValue: string;
}
export const MainLinkButton: React.FC<MainLinkButtonType> = ({
  sizeValue,
  textValue,
  urlValue,
  buttonColor,
  widthValue,
}) => {
  if (sizeValue === "large") {
    return (
      <Link
        href={`${urlValue}`}
        className={`${styles.mainButton} ${styles.buttonShadow} ${styles.largeButton} ${styles[buttonColor]} ${styles[widthValue]}`}
        passHref
      >
        <span className={styles.buttonText}>{textValue}</span>
      </Link>
    );
  } else if (sizeValue === "middle") {
    return (
      <Link
        href={`${urlValue}`}
        className={`${styles.mainButton} ${styles.buttonShadow} ${styles.middleButton} ${styles[buttonColor]} ${styles[widthValue]}`}
        passHref
      >
        <span className={styles.buttonText}>{textValue}</span>
      </Link>
    );
  } else if (sizeValue === "small") {
    return (
      <Link
        href={`${urlValue}`}
        className={`${styles.mainButton} ${styles.buttonShadow} ${styles.smallButton} ${styles[buttonColor]} ${styles[widthValue]}`}
        passHref
      >
        <span className={styles.buttonText}>{textValue}</span>
      </Link>
    );
  }
};
interface OnClickButtonType {
  onClick: () => void;
  textValue: string;
}
export const OnClickButton: React.FC<OnClickButtonType> = ({
  onClick,
  textValue,
}) => {
  return (
    <button
      type="button"
      className={`${styles.iconButton} ${styles.buttonShadow}`}
      onClick={onClick}
    >
      <span className={styles.iconWrapper}>
        <Image
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
