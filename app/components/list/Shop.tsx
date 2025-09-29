// ShopMobileCard.tsx
"use client";
import styles from "@/app/styles/Pages.module.css";
import React, { useEffect, useState } from "react";
import { CoffeeRecord } from "@/app/types/db";
import Image from "next/image";
import { MainButton } from "@/app/components/buttons/Buttons";
import Link from "next/link";

interface CardProps {
  value: Partial<CoffeeRecord>;
  onClick: (id: string) => void;
}

export const ShopMobileCard: React.FC<CardProps> = ({ value, onClick }) => {
  const checkboxId = `checkbox_${value.id}`;
  const [isCheck, setIsCheck] = useState(false);

  const handleOnChange = () => {
    setIsCheck(!isCheck);
  };

  return (
    <div
      className={`${styles.listShopMobileCard} ${
        styles[value.self === "shop" ? "shop" : "none"]
      }`}
    >
      <div className={`${styles.listCheckboxContainer}`}>
        <label htmlFor={checkboxId} className={styles.listCheckboxLabel}>
          <input
            type="checkbox"
            name="checkbox"
            id={checkboxId}
            title="チェックボックス"
            className={styles.listCheckboxInput}
            checked={isCheck}
            onChange={handleOnChange}
          />
        </label>
      </div>

      <div className={`${styles.listItemShopData}`}>
        <div className={`${styles.listItemShopName}`}>
          <div className={styles.listItemLabel}>{"店名"}</div>
          <div className={styles.listItemValue}>{value.shopName}</div>
        </div>
        <div className={`${styles.listItemImageBox} ${styles.beansImg}`}>
          <div className={styles.listItemImage}>
            <Image
              width={200}
              height={200}
              src={`${value.imageUri}` || "/images/no-image.png"}
              alt={`${value.imageAlt}` || "no-image"}
            />
          </div>
        </div>
        <div className={`${styles.listItemShopPrice}`}>
          <div className={styles.listItemLabel}>{"店の価格（円）"}</div>
          <div className={styles.listItemValue}>{value.shopPrice}</div>
        </div>
        <div className={`${styles.listItemShopDate}`}>
          <div className={styles.listItemLabel}>{"飲んだ日付"}</div>
          <div className={styles.listItemValue}>
            {value.shopDate instanceof Date
              ? value.shopDate.toLocaleDateString()
              : value.shopDate ?? ""}
          </div>
        </div>
        <div className={`${styles.listItemShopAddress}`}>
          <div className={styles.listItemLabel}>{"店の住所"}</div>
          <div className={styles.listItemValue}>{value.shopAddress}</div>
        </div>
        <div className={`${styles.listItemShopUrl}`}>
          <div className={styles.listItemLabel}>{"店のURL"}</div>
          <div className={styles.listItemValue}>{value.shopUrl}</div>
        </div>
      </div>
      <div className={`${styles.listItemShopCoffee}`}>
        <div className={`${styles.listItemCoffeeName}`}>
          <div className={styles.listItemLabel}>{"コーヒー名"}</div>
          <div className={styles.listItemValue}>{value.name}</div>
        </div>
        <div className={`${styles.listItemProductionArea}`}>
          <div className={styles.listItemLabel}>{"産地"}</div>
          <div className={styles.listItemValue}>{value.productionArea}</div>
        </div>
      </div>
      <div className={`${styles.listItemTasting}`}>
        <div className={`${styles.listItemAcidity}`}>
          <div className={styles.listItemLabel}>{"酸味"}</div>
          <div className={styles.listItemValue}>{value.acidity}</div>
        </div>
        <div className={`${styles.listItemBitterness}`}>
          <div className={styles.listItemLabel}>{"苦味"}</div>
          <div className={styles.listItemValue}>{value.bitterness}</div>
        </div>
        <div className={`${styles.listItemBody}`}>
          <div className={styles.listItemLabel}>{"コク"}</div>
          <div className={styles.listItemValue}>{value.body}</div>
        </div>
        <div className={`${styles.listItemAroma}`}>
          <div className={styles.listItemLabel}>{"アロマ"}</div>
          <div className={styles.listItemValue}>{value.aroma}</div>
        </div>
        <div className={`${styles.listItemAftertaste}`}>
          <div className={styles.listItemLabel}>{"キレ"}</div>
          <div className={styles.listItemValue}>{value.aftertaste}</div>
        </div>
        <div className={`${styles.listItemOverall}`}>
          <div className={styles.listItemLabel}>{"全体の好み"}</div>
          <div className={styles.listItemValue}>{value.overall}</div>
        </div>
        <div className={`${styles.listItemImageBox} ${styles.chartImg}`}>
          <div className={styles.listItemImage}>
            <Image
              width={200}
              height={200}
              src="/images/no-image.png"
              // src={value.chart}
              alt="レーダーチャートのプレビュー画像"
            />
          </div>
        </div>
      </div>
      <div className={`${styles.listItemMemoArea}`}>
        <div className={`${styles.listItemMemo}`}>
          <div className={styles.listItemLabel}>{"メモ"}</div>
          <div className={styles.listItemValue}>{value.memo} </div>
        </div>
      </div>

      <div className={`${styles.listButtonContainer}`}>
        <div
          className={`${styles.buttonContent} ${styles.deleteButtonContent}`}
          onClick={() => {
            if (value.id) {
              onClick(value.id);
            }
          }}
        >
          <MainButton
            sizeValue="large"
            textValue="削除"
            buttonColor="btn-danger"
            widthValue="widthNearlyFull"
          />
        </div>
        <div className={`${styles.buttonContent} ${styles.editButtonContent}`}>
          <Link
            href={`/pages/update/${value.id}`}
            className={styles.listItemLink}
          >
            <MainButton
              sizeValue="large"
              textValue="編集"
              buttonColor="btn-main"
              widthValue="widthNearlyFull"
            />
          </Link>
        </div>
        <div className={`${styles.buttonContent} ${styles.pdfButtonContent}`}>
          <MainButton
            sizeValue="large"
            textValue="PDFへダウンロード"
            buttonColor="btn-success"
            widthValue="widthNearlyFull"
          />
        </div>
      </div>
    </div>
  );
};

export const ShopPcCard: React.FC<CardProps> = ({ value, onClick }) => {
  const checkboxId = `checkbox_${value.id}`;

  const [isOpen, setIsOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);

  const openListClass = isOpen ? styles.listItemOpen : styles.listItemClose;

  const handleClick = () => {
    try {
      setLoad(true);
      setIsOpen(!isOpen);
    } catch (error) {
      console.error("Error toggling list item:", error);
    } finally {
      setLoad(false);
    }
  };

  const [isCheck, setIsCheck] = useState(false);

  const handleOnChange = () => {
    setIsCheck(!isCheck);
  };

  useEffect(() => {
    setIsFadingIn(isOpen);
  }, [isOpen]);

  return (
    <div
      className={`${styles.listShopPcCard} ${
        styles[value.self === "shop" ? "shop" : "none"]
      }`}
    >
      <div className={`${styles.listCheckboxContainer}`}>
        <label htmlFor={checkboxId} className={styles.listCheckboxLabel}>
          <input
            id={checkboxId}
            type="checkbox"
            name="checkbox"
            title="チェックボックス"
            className={styles.listCheckboxInput}
            checked={isCheck}
            onChange={handleOnChange}
          />
        </label>
      </div>
      <div className={`${styles.accordionHeader} `}>
        <div className={`${styles.listItemShopName}`}>
          <Link
            href={`/pages/update/${value.id}`}
            className={styles.listItemLink}
          >
            <div className={styles.listItemLabel}>{"店名"}</div>
            <div className={styles.listItemValue}>{value.shopName}</div>
          </Link>
        </div>

        <div className={`${styles.accordionToggle}`}>
          <span className={`${styles.accordionValueBox} ${openListClass}`}>
            <span className={styles.accordionLabel}>{"全体の好み:"}</span>
            <span className={styles.accordionValue}>{value.overall}</span>
          </span>

          <span
            className={`${styles.accordionToggleIcon}  ${openListClass}`}
            onClick={handleClick}
          >
            <Image
              src="/images/arrow_drop_up.svg"
              alt="Toggle"
              width={48}
              height={48}
              className={`${styles.arrowImage} ${
                isFadingIn ? styles.fade_in : styles.fade_out
              }`}
            />

            <Image
              src="/images/arrow_drop_down.svg"
              alt="Toggle"
              width={48}
              height={48}
              className={`${styles.arrowImage} ${
                !isFadingIn ? styles.fade_in : styles.fade_out
              }`}
            />
          </span>
        </div>
      </div>

      <div
        className={`${styles.listItemShopData} ${openListClass} ${
          !isFadingIn ? styles.fade_out : styles.fade_in
        }`}
      >
        <div className={`${styles.listItemImageBox} ${styles.beansImg}`}>
          <div className={styles.listItemImage}>
            <Image
              width={200}
              height={200}
              src={`${value.imageUri}` || "/images/no-image.png"}
              alt={`${value.imageAlt}` || "no-image"}
            />
          </div>
        </div>
        <div className={`${styles.listItemShopPrice}`}>
          <div className={styles.listItemLabel}>{"店の価格（円）"}</div>
          <div className={styles.listItemValue}>{value.shopPrice}</div>
        </div>
        <div className={`${styles.listItemShopDate}`}>
          <div className={styles.listItemLabel}>{"飲んだ日付"}</div>
          <div className={styles.listItemValue}>
            {value.shopDate instanceof Date
              ? value.shopDate.toLocaleDateString()
              : value.shopDate ?? ""}
          </div>
        </div>
        <div className={`${styles.listItemShopAddress}`}>
          <div className={styles.listItemLabel}>{"店の住所"}</div>
          <div className={styles.listItemValue}>{value.shopAddress}</div>
        </div>
        <div className={`${styles.listItemShopUrl}`}>
          <div className={styles.listItemLabel}>{"店のURL"}</div>
          <div className={styles.listItemValue}>{value.shopUrl}</div>
        </div>
      </div>
      <div
        className={`${styles.listItemShopCoffee} ${openListClass} ${
          !isFadingIn ? styles.fade_out : styles.fade_in
        }`}
      >
        <div className={`${styles.listItemCoffeeName}`}>
          <div className={styles.listItemLabel}>{"コーヒー名"}</div>
          <div className={styles.listItemValue}>{value.name}</div>
        </div>
        <div className={`${styles.listItemProductionArea}`}>
          <div className={styles.listItemLabel}>{"産地"}</div>
          <div className={styles.listItemValue}>{value.productionArea}</div>
        </div>
      </div>
      <div
        className={`${styles.listItemTasting} ${openListClass} ${
          !isFadingIn ? styles.fade_out : styles.fade_in
        }`}
      >
        <div className={`${styles.listItemAcidity}`}>
          <div className={styles.listItemLabel}>{"酸味"}</div>
          <div className={styles.listItemValue}>{value.acidity}</div>
        </div>
        <div className={`${styles.listItemBitterness}`}>
          <div className={styles.listItemLabel}>{"苦味"}</div>
          <div className={styles.listItemValue}>{value.bitterness}</div>
        </div>
        <div className={`${styles.listItemBody}`}>
          <div className={styles.listItemLabel}>{"コク"}</div>
          <div className={styles.listItemValue}>{value.body}</div>
        </div>
        <div className={`${styles.listItemAroma}`}>
          <div className={styles.listItemLabel}>{"アロマ"}</div>
          <div className={styles.listItemValue}>{value.aroma}</div>
        </div>
        <div className={`${styles.listItemAftertaste}`}>
          <div className={styles.listItemLabel}>{"キレ"}</div>
          <div className={styles.listItemValue}>{value.aftertaste}</div>
        </div>
        <div className={`${styles.listItemOverall}`}>
          <div className={styles.listItemLabel}>{"全体の好み"}</div>
          <div className={styles.listItemValue}>{value.overall}</div>
        </div>
        <div className={`${styles.listItemImageBox} ${styles.chartImg}`}>
          <div className={styles.listItemImage}>
            <Image
              width={200}
              height={200}
              src="/images/no-image.png"
              alt="レーダーチャートのプレビュー画像"
            />
          </div>
        </div>
      </div>
      <div
        className={`${styles.listItemMemoArea} ${openListClass} ${
          !isFadingIn ? styles.fade_out : styles.fade_in
        }`}
      >
        <div className={`${styles.listItemMemo}`}>
          <div className={styles.listItemLabel}>{"メモ"}</div>
          <div className={styles.listItemValue}>{value.memo}</div>
        </div>
      </div>
      <div
        className={`${styles.listButtonContainer} ${openListClass} ${
          !isFadingIn ? styles.fade_out : styles.fade_in
        }`}
      >
        <div
          className={`${styles.buttonContent} ${styles.deleteButtonContent}`}
          onClick={() => {
            if (value.id) {
              onClick(value.id);
            }
          }}
        >
          <MainButton
            sizeValue="large"
            textValue="削除"
            buttonColor="btn-danger"
            widthValue="widthNearlyFull"
          />
        </div>
        <div className={`${styles.buttonContent} ${styles.editButtonContent}`}>
          <Link
            href={`/pages/update/${value.id}`}
            className={styles.listItemLink}
          >
            <MainButton
              sizeValue="large"
              textValue="編集"
              buttonColor="btn-main"
              widthValue="widthNearlyFull"
            />
          </Link>
        </div>
        <div className={`${styles.buttonContent} ${styles.pdfButtonContent}`}>
          <MainButton
            sizeValue="large"
            textValue="PDFへダウンロード"
            buttonColor="btn-success"
            widthValue="widthNearlyFull"
          />
        </div>
      </div>
    </div>
  );
};
