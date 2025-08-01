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
}
export const MainButton: React.FC<MainButtonType> = ({
  sizeValue,
  textValue,
}) => {
  if (sizeValue === "large") {
    return (
      <button type="button">
        <span className="buttonText">{textValue}</span>
      </button>
    );
  } else if (sizeValue === "middle") {
  } else if (sizeValue === "small") return <button>{textValue}</button>;
};

interface MainLinkButtonType {
  sizeValue: string;
  textValue: string;
  urlValue: string;
}
export const MainLinkButton: React.FC<MainLinkButtonType> = ({
  sizeValue,
  textValue,
  urlValue,
}) => {
  if (sizeValue === "large") {
    <Link href={`${urlValue}`} passHref>
      <a className="updateButton">
        <span className="buttonText">{textValue}</span>
      </a>
    </Link>;
  } else if (sizeValue === "middle") {
  } else if (sizeValue === "small") return <button>{textValue}</button>;
};

export const SearchButton = () => {};
export const SortButton = () => {};
export const SubmitButton = () => {};
export const DeleteButton = () => {};
