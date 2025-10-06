// SelfPcCard.tsx
"use client";
import styles from "@/app/styles/Pages.module.css";
import React, { useEffect, useRef, useState } from "react";
import { CoffeeRecord } from "@/app/types/db";
import Image from "next/image";
import { MainButton } from "@/app/components/buttons/Buttons";
import Link from "next/link";
import RadarChart from "./RadarChart";
// SelfMobileCard.tsx

interface CardProps {
  value: Partial<CoffeeRecord>;
  onClickDelete: (id: string) => void;
  onCheckboxChange: (data: { id: string; isChecked: boolean }) => void;
  isChecked: boolean;
}

export const SelfMobileCard: React.FC<CardProps> = ({
  value,
  onClickDelete,
  onCheckboxChange,
  isChecked,
}) => {
  const checkboxId = `checkbox_${value.id}`;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;

    // ❌ 修正: 自身の状態の更新を削除 (親の状態が真実であるため)
    // setIsChecked(newValue);

    // 修正: 親の関数を呼び出して、IDと新しいチェック状態を渡す
    if (value.id) {
      onCheckboxChange({ id: value.id, isChecked: newValue });
    }
  };

  return (
    <div
      className={`${styles.listSelfMobileCard} ${
        styles[value.self === "self" ? "self" : "none"]
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
            // 修正点3: 自身の状態を使用
            checked={isChecked}
            onChange={handleOnChange}
          />
        </label>
      </div>

      <div className={`${styles.listItemCoffeeBeans}`}>
        <div className={`${styles.listItemCoffeeName}`}>
          <div className={styles.listItemLabel}>{"コーヒー名"}</div>
          <div className={styles.listItemValue}>{value.name}</div>
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
        <div className={`${styles.listItemVariety}`}>
          <div className={styles.listItemLabel}>{"品種"}</div>
          <div className={styles.listItemValue}>{value.variety}</div>
        </div>
        <div className={`${styles.listItemProductionArea}`}>
          <div className={styles.listItemLabel}>{"産地"}</div>
          <div className={styles.listItemValue}>{value.productionArea} </div>
        </div>
        <div className={`${styles.listItemRoastingDegree}`}>
          <div className={styles.listItemLabel}>{"焙煎度"}</div>
          <div className={styles.listItemValue}>{value.roastingDegree}</div>
        </div>
      </div>
      <div className={`${styles.listItemBrewingRecipe}`}>
        <div className={`${styles.listItemExMethod}`}>
          <div className={styles.listItemLabel}>{"抽出方法"}</div>
          <div className={styles.listItemValue}>{value.extractionMethod}</div>
        </div>
        <div className={`${styles.listItemExMaker}`}>
          <div className={styles.listItemLabel}>{"抽出器具"}</div>
          <div className={styles.listItemValue}>{value.extractionMaker}</div>
        </div>
        <div className={`${styles.listItemGrindSize}`}>
          <div className={styles.listItemLabel}>{"挽き目"}</div>
          <div className={styles.listItemValue}>{value.grindSize}</div>
        </div>
        <div className={`${styles.listItemTemperature}`}>
          <div className={styles.listItemLabel}>{"温度（℃）"}</div>
          <div className={styles.listItemValue}>{value.temperature}</div>
        </div>
        <div className={`${styles.listItemCoffeeAmount}`}>
          <div className={styles.listItemLabel}>{"粉量（ｇ）"}</div>
          <div className={styles.listItemValue}>{value.coffeeAmount}</div>
        </div>
        <div className={`${styles.listItemWaterAmount}`}>
          <div className={styles.listItemLabel}>{"湯量（ｇ）"}</div>
          <div className={styles.listItemValue}>{value.waterAmount}</div>
        </div>
        <div className={`${styles.listItemMeasurementMethod}`}>
          <div className={styles.listItemLabel}>{"計測方法"}</div>
          <div className={styles.listItemValue}>{value.measurementMethod}</div>
        </div>
        <div className={`${styles.listItemExTime}`}>
          <div className={styles.listItemLabel}>{"抽出時間"}</div>
          <div className={styles.listItemValue}>{value.extractionTime}</div>
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
        <div className={`${styles.listItemChartBox} ${styles.chartImg}`}>
          <div className={styles.listItemChart}>
            <RadarChart value={value} />
          </div>
        </div>
      </div>
      <div className={`${styles.listItemMemoArea}`}>
        <div className={`${styles.listItemMemo}`}>
          <div className={styles.listItemLabel}>{"メモ"}</div>
          <div className={styles.listItemValue}>{value.memo}</div>
        </div>
      </div>

      <div className={`${styles.listButtonContainer}`}>
        <div
          className={`${styles.buttonContent} ${styles.deleteButtonContent}`}
          onClick={() => {
            if (value.id) {
              onClickDelete(value.id);
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

export const SelfPcCard: React.FC<CardProps> = ({
  value,
  onClickDelete,
  onCheckboxChange,
  isChecked,
}) => {
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

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;

    // ❌ 修正: 自身の状態の更新を削除 (親の状態が真実であるため)
    // setIsChecked(newValue);

    // 修正: 親の関数を呼び出して、IDと新しいチェック状態を渡す
    if (value.id) {
      onCheckboxChange({ id: value.id, isChecked: newValue });
    }
  };

  useEffect(() => {
    setIsFadingIn(isOpen);
  }, [isOpen]);
  return (
    <div
      className={`${styles.listSelfPcCard} ${
        styles[value.self === "self" ? "self" : "none"]
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
            // 修正点3: 自身の状態を使用
            checked={isChecked}
            onChange={handleOnChange}
          />
        </label>
      </div>
      <div className={`${styles.accordionHeader}`}>
        <Link
          href={`/pages/update/${value.id}`}
          className={styles.listItemLink}
        >
          <div className={`${styles.listItemCoffeeName}`}>
            <div className={styles.listItemLabel}>{"コーヒー名"}</div>
            <div className={styles.listItemValue}>{value.name}</div>
          </div>
        </Link>
        <div className={`${styles.accordionToggle}`} onClick={handleClick}>
          <span className={`${styles.accordionValueBox} ${openListClass}`}>
            <span className={styles.accordionLabel}>{"全体の好み:"}</span>
            <span className={styles.accordionValue}>{value.overall}</span>
          </span>
          <span className={`${styles.accordionToggleIcon} ${openListClass}`}>
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
        className={`${styles.listItemCoffeeBeans} ${openListClass} ${
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
        <div className={`${styles.listItemVariety}`}>
          <div className={styles.listItemLabel}>{"品種"}</div>
          <div className={styles.listItemValue}>{value.variety}</div>
        </div>
        <div className={`${styles.listItemProductionArea}`}>
          <div className={styles.listItemLabel}>{"産地"}</div>
          <div className={styles.listItemValue}>{value.productionArea}</div>
        </div>
        <div className={`${styles.listItemRoastingDegree}`}>
          <div className={styles.listItemLabel}>{"焙煎度"}</div>
          <div className={styles.listItemValue}>{value.roastingDegree}</div>
        </div>
      </div>
      <div
        className={`${styles.listItemBrewingRecipe} ${openListClass} ${
          !isFadingIn ? styles.fade_out : styles.fade_in
        }`}
      >
        <div className={`${styles.listItemExMethod}`}>
          <div className={styles.listItemLabel}>{"抽出方法"}</div>
          <div className={styles.listItemValue}>{value.extractionMethod}</div>
        </div>
        <div className={`${styles.listItemExMaker}`}>
          <div className={styles.listItemLabel}>{"抽出器具"}</div>
          <div className={styles.listItemValue}>{value.extractionMaker}</div>
        </div>
        <div className={`${styles.listItemGrindSize}`}>
          <div className={styles.listItemLabel}>{"挽き目"}</div>
          <div className={styles.listItemValue}>{value.grindSize}</div>
        </div>
        <div className={`${styles.listItemTemperature}`}>
          <div className={styles.listItemLabel}>{"温度（℃）"}</div>
          <div className={styles.listItemValue}>{value.temperature}</div>
        </div>
        <div className={`${styles.listItemCoffeeAmount}`}>
          <div className={styles.listItemLabel}>{"粉量（ｇ）"}</div>
          <div className={styles.listItemValue}>{value.coffeeAmount}</div>
        </div>
        <div className={`${styles.listItemWaterAmount}`}>
          <div className={styles.listItemLabel}>{"湯量（ｇ）"}</div>
          <div className={styles.listItemValue}>{value.waterAmount}</div>
        </div>
        <div className={`${styles.listItemMeasurementMethod}`}>
          <div className={styles.listItemLabel}>{"計測方法"}</div>
          <div className={styles.listItemValue}>{value.measurementMethod}</div>
        </div>
        <div className={`${styles.listItemExTime}`}>
          <div className={styles.listItemLabel}>{"抽出時間"}</div>
          <div className={styles.listItemValue}>{value.extractionTime}</div>
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
        <div className={`${styles.itemChartImageBox} ${styles.chartImg}`}>
          <div className={styles.listItemChart}>
            <RadarChart value={value} />
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
              onClickDelete(value.id);
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
