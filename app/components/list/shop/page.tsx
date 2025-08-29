// ShopMobileCard.tsx
import styles from "@/app/styles/Pages.module.css";
import * as React from "react";
import Image from "next/image";
import { MainButton } from "@/app/components/buttons/page";

interface CardProps {
  id: string;
}

export const ShopMobileCard: React.FC<CardProps> = ({ id }) => {
  const checkboxId = `checkbox_${id}`;
  return (
    <>
      <div
        className={`${styles.listCheckboxContainer} ${styles.listMobileItem} ${styles.listShop}`}
      >
        <label htmlFor={checkboxId} className={styles.listCheckboxLabel}>
          <input
            type="checkbox"
            name="checkbox"
            id={checkboxId}
            title="チェックボックス"
            className={styles.listCheckboxInput}
          />
        </label>
      </div>

      <div
        className={`${styles.listItemShopData} ${styles.listMobileItem} ${styles.listShop}`}
      >
        <div className={`${styles.listItemShopName}`}>
          <div className={styles.listItemLabel}>{"店名"}</div>
          <div className={styles.listItemValue}>コーヒーショップ</div>
        </div>
        <div className={styles.listItemImageBox}>
          <div className={styles.listItemImage}>
            <Image
              width={200}
              height={200}
              src="/images/no-image.png"
              alt="レーダーチャートのプレビュー画像"
            />
          </div>
        </div>
        <div className={`${styles.listItemShopPrice}`}>
          <div className={styles.listItemLabel}>{"店の価格（円）"}</div>
          <div className={styles.listItemValue}>500</div>
        </div>
        <div className={`${styles.listItemShopDate}`}>
          <div className={styles.listItemLabel}>{"飲んだ日付"}</div>
          <div className={styles.listItemValue}>2023-03-15</div>
        </div>
        <div className={`${styles.listItemShopAddress}`}>
          <div className={styles.listItemLabel}>{"店の住所"}</div>
          <div className={styles.listItemValue}>東京都渋谷区</div>
        </div>
        <div className={`${styles.listItemShopUrl}`}>
          <div className={styles.listItemLabel}>{"店のURL"}</div>
          <div className={styles.listItemValue}>
            https://coffee-shop.example.com
          </div>
        </div>
      </div>
      <div
        className={`${styles.listItemShopCoffee} ${styles.listMobileItem} ${styles.listShop}`}
      >
        <div className={`${styles.listItemCoffeeName}`}>
          <div className={styles.listItemLabel}>{"コーヒー名"}</div>
          <div className={styles.listItemValue}>コーヒー名</div>
        </div>
        <div className={`${styles.listItemProductionArea}`}>
          <div className={styles.listItemLabel}>{"産地"}</div>
          <div className={styles.listItemValue}>産地名</div>
        </div>
      </div>
      <div
        className={`${styles.listItemTasting} ${styles.listMobileItem} ${styles.listShop}`}
      >
        <div className={`${styles.listItemAcidity}`}>
          <div className={styles.listItemLabel}>{"酸味"}</div>
          <div className={styles.listItemValue}>3</div>
        </div>
        <div className={`${styles.listItemBitterness}`}>
          <div className={styles.listItemLabel}>{"苦味"}</div>
          <div className={styles.listItemValue}>2</div>
        </div>
        <div className={`${styles.listItemBody}`}>
          <div className={styles.listItemLabel}>{"コク"}</div>
          <div className={styles.listItemValue}>4</div>
        </div>
        <div className={`${styles.listItemAroma}`}>
          <div className={styles.listItemLabel}>{"アロマ"}</div>
          <div className={styles.listItemValue}>5</div>
        </div>
        <div className={`${styles.listItemAftertaste}`}>
          <div className={styles.listItemLabel}>{"キレ"}</div>
          <div className={styles.listItemValue}>4</div>
        </div>
        <div className={`${styles.listItemOverall}`}>
          <div className={styles.listItemLabel}>{"全体の好み"}</div>
          <div className={styles.listItemValue}>4</div>
        </div>
        <div className={styles.listItemImageBox}>
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
        className={`${styles.listItemMemoArea} ${styles.listMobileItem} ${styles.listShop}`}
      >
        <div className={`${styles.listItemMemo}`}>
          <div className={styles.listItemLabel}>{"メモ"}</div>
          <div className={styles.listItemValue}>
            全体的に美味しい珈琲で、コクもキレもバランスのとれた珈琲でした。
          </div>
        </div>
      </div>
      <div
        className={`${styles.buttonContent} ${styles.deleteButtonContent} ${styles.listShop}`}
      >
        <MainButton
          sizeValue="large"
          textValue="削除"
          buttonColor="btn-danger"
          widthValue="widthAuto"
        />
      </div>
    </>
  );
};

// ShopPcCard.tsx

interface CardProps {
  id: string;
}

export const ShopPcCard: React.FC<CardProps> = ({ id }) => {
  const checkboxId = `checkbox_${id}`;
  return (
    <>
      <div
        className={`${styles.listCheckboxContainer} ${styles.listPcItem} ${styles.listShop}`}
      >
        <label htmlFor={checkboxId} className={styles.listCheckboxLabel}>
          <input
            id={checkboxId}
            type="checkbox"
            name="checkbox"
            title="チェックボックス"
            className={styles.listCheckboxInput}
          />
        </label>
      </div>
      <div
        className={`${styles.listItemShopData} ${styles.listPcItem} ${styles.listShop}`}
      >
        <div className={`${styles.listItemShopName}`}>
          <div className={styles.listItemLabel}>{"店名"}</div>
          <div className={styles.listItemValue}>コーヒーショップ</div>
        </div>
        <div className={styles.listItemImageBox}>
          <div className={styles.listItemImage}>
            <Image
              width={200}
              height={200}
              src="/images/no-image.png"
              alt="レーダーチャートのプレビュー画像"
            />
          </div>
        </div>
        <div className={`${styles.listItemShopPrice}`}>
          <div className={styles.listItemLabel}>{"店の価格（円）"}</div>
          <div className={styles.listItemValue}>500</div>
        </div>
        <div className={`${styles.listItemShopDate}`}>
          <div className={styles.listItemLabel}>{"飲んだ日付"}</div>
          <div className={styles.listItemValue}>2023-03-15</div>
        </div>
        <div className={`${styles.listItemShopAddress}`}>
          <div className={styles.listItemLabel}>{"店の住所"}</div>
          <div className={styles.listItemValue}>東京都渋谷区</div>
        </div>
        <div className={`${styles.listItemShopUrl}`}>
          <div className={styles.listItemLabel}>{"店のURL"}</div>
          <div className={styles.listItemValue}>
            https://coffee-shop.example.com
          </div>
        </div>
      </div>
      <div
        className={`${styles.listItemShopCoffee} ${styles.listPcItem} ${styles.listShop}`}
      >
        <div className={`${styles.listItemCoffeeName}`}>
          <div className={styles.listItemLabel}>{"コーヒー名"}</div>
          <div className={styles.listItemValue}>コーヒー名</div>
        </div>
        <div className={`${styles.listItemProductionArea}`}>
          <div className={styles.listItemLabel}>{"産地"}</div>
          <div className={styles.listItemValue}>産地名</div>
        </div>
      </div>
      <div
        className={`${styles.listItemTasting} ${styles.listPcItem} ${styles.listShop}`}
      >
        <div className={`${styles.listItemAcidity}`}>
          <div className={styles.listItemLabel}>{"酸味"}</div>
          <div className={styles.listItemValue}>3</div>
        </div>
        <div className={`${styles.listItemBitterness}`}>
          <div className={styles.listItemLabel}>{"苦味"}</div>
          <div className={styles.listItemValue}>2</div>
        </div>
        <div className={`${styles.listItemBody}`}>
          <div className={styles.listItemLabel}>{"コク"}</div>
          <div className={styles.listItemValue}>4</div>
        </div>
        <div className={`${styles.listItemAroma}`}>
          <div className={styles.listItemLabel}>{"アロマ"}</div>
          <div className={styles.listItemValue}>5</div>
        </div>
        <div className={`${styles.listItemAftertaste}`}>
          <div className={styles.listItemLabel}>{"キレ"}</div>
          <div className={styles.listItemValue}>4</div>
        </div>
        <div className={`${styles.listItemOverall}`}>
          <div className={styles.listItemLabel}>{"全体の好み"}</div>
          <div className={styles.listItemValue}>4</div>
        </div>
        <div className={styles.listItemImageBox}>
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
        className={`${styles.listItemMemoArea} ${styles.listPcItem} ${styles.listShop}`}
      >
        <div className={`${styles.listItemMemo}`}>
          <div className={styles.listItemLabel}>{"メモ"}</div>
          <div className={styles.listItemValue}>
            全体的に美味しい珈琲で、コクもキレもバランスのとれた珈琲でした。
          </div>
        </div>
      </div>
      <div className={`${styles.buttonContainer} ${styles.listShop}`}>
        <div
          className={`${styles.buttonContent} ${styles.deleteButtonContent}`}
        >
          <MainButton
            sizeValue="large"
            textValue="削除"
            buttonColor="btn-danger"
            widthValue="widthAuto"
          />
        </div>
      </div>
    </>
  );
};
