import styles from "@/app/styles/Button.module.css";
import Link from "next/link";
import Image from "next/image";

interface IconButtonType {
  value: string;
}

export const LinkIconButtonWithShadow: React.FC<IconButtonType> = ({
  value,
}) => {
  return (
    <Link
      href={`/pages/${value}`}
      className={`${styles.iconButton} ${styles.buttonShadow}`}
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
export const LinkIconButton: React.FC<IconButtonType> = ({ value }) => {
  if (value === "home") {
    return (
      <Link href={`/`} className={styles.iconButton}>
        <Image
          src={`/images/${value}.svg`}
          alt={`${value} Icon`}
          width={50}
          height={50}
          style={{ fill: "#D2B48C" }}
        />
      </Link>
    );
  }
  return (
    <Link href={`/pages/${value}`} className={styles.iconButton}>
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

interface MainButtonType {
  sizeValue: string;
  textValue: string;
  buttonColor: string;
}
// --color-danger → .btn-danger: 「削除」などの危険な操作に。
// --color-main → .btn-main: 「PDFをダウンロード」など、最も主要なアクションに。
// --color-warning → .btn-warning: 「編集」など、注意を促すアクションに。
// --color-success → .btn-success: 「保存」など、成功を表すアクションに。
// --color-secondary → .btn-secondary: 「リセット」「検索」「並び替え」など、控えめなサブアクションに。
//  例： <MainButton sizeValue="large" textValue="編集" buttonColor="btn-warning"/>
export const MainButton: React.FC<MainButtonType> = ({
  sizeValue,
  textValue,
  buttonColor,
}) => {
  if (sizeValue === "large") {
    return (
      <button
        type="button"
        className={`${styles.mainButton} ${styles.buttonShadow} ${styles.largeButton} ${styles[buttonColor]}`}
      >
        <span className={styles.buttonText}>{textValue}</span>
      </button>
    );
  } else if (sizeValue === "middle") {
    return (
      <button
        type="button"
        className={`${styles.mainButton} ${styles.buttonShadow} ${styles.middleButton} ${styles[buttonColor]}`}
      >
        <span className={styles.buttonText}>{textValue}</span>
      </button>
    );
  } else if (sizeValue === "small") {
    return (
      <button
        type="button"
        className={`${styles.mainButton} ${styles.buttonShadow} ${styles.smallButton} ${styles[buttonColor]}`}
      >
        <span className={styles.buttonText}>{textValue}</span>
      </button>
    );
  }
};

interface MainLinkButtonType {
  sizeValue: string;
  textValue: string;
  urlValue: string;
  buttonColor: string;
}
export const MainLinkButton: React.FC<MainLinkButtonType> = ({
  sizeValue,
  textValue,
  urlValue,
  buttonColor,
}) => {
  if (sizeValue === "large") {
    return (
      <Link
        href={`${urlValue}`}
        className={`${styles.mainButton} ${styles.buttonShadow} ${styles.largeButton} ${styles[buttonColor]}`}
        passHref
      >
        <span className={styles.buttonText}>{textValue}</span>
      </Link>
    );
  } else if (sizeValue === "middle") {
    return (
      <Link
        href={`${urlValue}`}
        className={`${styles.mainButton} ${styles.buttonShadow} ${styles.middleButton} ${styles[buttonColor]}`}
        passHref
      >
        <span className={styles.buttonText}>{textValue}</span>
      </Link>
    );
  } else if (sizeValue === "small") {
    return (
      <Link
        href={`${urlValue}`}
        className={`${styles.mainButton} ${styles.buttonShadow} ${styles.smallButton} ${styles[buttonColor]}`}
        passHref
      >
        <span className={styles.buttonText}>{textValue}</span>
      </Link>
    );
  }
};
