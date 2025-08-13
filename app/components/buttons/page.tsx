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
    <Link href={`/pages/${value}`} className={styles.iconButton}>
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

interface MainButtonType {
  sizeValue: string;
  textValue: string;
  buttonColor: string;
}
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
