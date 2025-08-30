// SelfPcCard.tsx
import styles from "@/app/styles/Pages.module.css";
import * as React from "react";
import Image from "next/image";
import { MainButton } from "@/app/components/buttons/page";

// SelfMobileCard.tsx

interface CardProps {
  id: string;
}

export const SelfMobileCard: React.FC<CardProps> = ({ id }) => {
  const checkboxId = `checkbox_${id}`;
  return (
    <div className={styles.listSelfMobileCard}>
      <div className={`${styles.listCheckboxContainer}`}>
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

      <div className={`${styles.listItemCoffeeBeans}`}>
        <div className={`${styles.listItemCoffeeName}`}>
          <div className={styles.listItemLabel}>{"コーヒー名"}</div>
          <div className={styles.listItemValue}>
            パナマ エスメラルダ農園 ゲイシャ
          </div>
        </div>
        <div className={`${styles.listItemImageBox} ${styles.beansImg}`}>
          <div className={styles.listItemImage}>
            <Image
              width={300}
              height={300}
              src="/images/no-image.png"
              alt="レーダーチャートのプレビュー画像"
            />
          </div>
        </div>
        <div className={`${styles.listItemVariety}`}>
          <div className={styles.listItemLabel}>{"品種"}</div>
          <div className={styles.listItemValue}>アラビカ</div>
        </div>
        <div className={`${styles.listItemProductionArea}`}>
          <div className={styles.listItemLabel}>{"産地"}</div>
          <div className={styles.listItemValue}>
            コスタリカ・コフィアディベルサ・グアドループティピカ・カーボニックマセレーション
          </div>
        </div>
        <div className={`${styles.listItemRoastingDegree}`}>
          <div className={styles.listItemLabel}>{"焙煎度"}</div>
          <div className={styles.listItemValue}>中煎り</div>
        </div>
      </div>
      <div className={`${styles.listItemBrewingRecipe}`}>
        <div className={`${styles.listItemExMethod}`}>
          <div className={styles.listItemLabel}>{"抽出方法"}</div>
          <div className={styles.listItemValue}>ドリップ</div>
        </div>
        <div className={`${styles.listItemExMaker}`}>
          <div className={styles.listItemLabel}>{"抽出器具"}</div>
          <div className={styles.listItemValue}>V60</div>
        </div>
        <div className={`${styles.listItemGrindSize}`}>
          <div className={styles.listItemLabel}>{"挽き目"}</div>
          <div className={styles.listItemValue}>中挽き</div>
        </div>
        <div className={`${styles.listItemTemperature}`}>
          <div className={styles.listItemLabel}>{"温度（℃）"}</div>
          <div className={styles.listItemValue}>90</div>
        </div>
        <div className={`${styles.listItemCoffeeAmount}`}>
          <div className={styles.listItemLabel}>{"粉量（ｇ）"}</div>
          <div className={styles.listItemValue}>15</div>
        </div>
        <div className={`${styles.listItemWaterAmount}`}>
          <div className={styles.listItemLabel}>{"湯量（ｇ）"}</div>
          <div className={styles.listItemValue}>240</div>
        </div>
        <div className={`${styles.listItemMeasurementMethod}`}>
          <div className={styles.listItemLabel}>{"計測方法"}</div>
          <div className={styles.listItemValue}>抽出量</div>
        </div>
        <div className={`${styles.listItemExTime}`}>
          <div className={styles.listItemLabel}>{"抽出時間"}</div>
          <div className={styles.listItemValue}>3分20秒</div>
        </div>
      </div>
      <div className={`${styles.listItemTasting}`}>
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
      <div className={`${styles.listItemMemoArea}`}>
        <div className={`${styles.listItemMemo}`}>
          <div className={styles.listItemLabel}>{"メモ"}</div>
          <div className={styles.listItemValue}>
            全体的に美味しい珈琲で、コクもキレもバランスのとれた珈琲でした。
          </div>
        </div>
      </div>
      <div className={`${styles.buttonContent} ${styles.deleteButtonContent}`}>
        <MainButton
          sizeValue="large"
          textValue="削除"
          buttonColor="btn-danger"
          widthValue="widthAuto"
        />
      </div>
    </div>
  );
};
interface CardProps {
  id: string;
}

export const SelfPcCard: React.FC<CardProps> = ({ id }) => {
  const checkboxId = `checkbox_${id}`;
  return (
    <div className={styles.listSelfPcCard}>
      <div className={`${styles.listCheckboxContainer}`}>
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
      <div className={`${styles.listItemCoffeeBeans}`}>
        <div className={`${styles.listItemCoffeeName}`}>
          <div className={styles.listItemLabel}>{"コーヒー名"}</div>
          <div className={styles.listItemValue}>
            パナマ エスメラルダ農園 ゲイシャ
          </div>
        </div>
        <div className={`${styles.listItemImageBox} ${styles.beansImg}`}>
          <div className={styles.listItemImage}>
            <Image
              width={200}
              height={200}
              src="/images/no-image.png"
              alt="レーダーチャートのプレビュー画像"
            />
          </div>
        </div>
        <div className={`${styles.listItemVariety}`}>
          <div className={styles.listItemLabel}>{"品種"}</div>
          <div className={styles.listItemValue}>アラビカ</div>
        </div>
        <div className={`${styles.listItemProductionArea}`}>
          <div className={styles.listItemLabel}>{"産地"}</div>
          <div className={styles.listItemValue}>
            コスタリカ・コフィアディベルサ・グアドループティピカ・カーボニックマセレーション
          </div>
        </div>
        <div className={`${styles.listItemRoastingDegree}`}>
          <div className={styles.listItemLabel}>{"焙煎度"}</div>
          <div className={styles.listItemValue}>中煎り</div>
        </div>
      </div>
      <div className={`${styles.listItemBrewingRecipe}`}>
        <div className={`${styles.listItemExMethod}`}>
          <div className={styles.listItemLabel}>{"抽出方法"}</div>
          <div className={styles.listItemValue}>ドリップ</div>
        </div>
        <div className={`${styles.listItemExMaker}`}>
          <div className={styles.listItemLabel}>{"抽出器具"}</div>
          <div className={styles.listItemValue}>V60</div>
        </div>
        <div className={`${styles.listItemGrindSize}`}>
          <div className={styles.listItemLabel}>{"挽き目"}</div>
          <div className={styles.listItemValue}>中挽き</div>
        </div>
        <div className={`${styles.listItemTemperature}`}>
          <div className={styles.listItemLabel}>{"温度（℃）"}</div>
          <div className={styles.listItemValue}>90</div>
        </div>
        <div className={`${styles.listItemCoffeeAmount}`}>
          <div className={styles.listItemLabel}>{"粉量（ｇ）"}</div>
          <div className={styles.listItemValue}>15</div>
        </div>
        <div className={`${styles.listItemWaterAmount}`}>
          <div className={styles.listItemLabel}>{"湯量（ｇ）"}</div>
          <div className={styles.listItemValue}>240</div>
        </div>
        <div className={`${styles.listItemMeasurementMethod}`}>
          <div className={styles.listItemLabel}>{"計測方法"}</div>
          <div className={styles.listItemValue}>抽出量</div>
        </div>
        <div className={`${styles.listItemExTime}`}>
          <div className={styles.listItemLabel}>{"抽出時間"}</div>
          <div className={styles.listItemValue}>3分20秒</div>
        </div>
      </div>
      <div className={`${styles.listItemTasting}`}>
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
      <div className={`${styles.listItemMemoArea}`}>
        <div className={`${styles.listItemMemo}`}>
          <div className={styles.listItemLabel}>{"メモ"}</div>
          <div className={styles.listItemValue}>
            全体的に美味しい珈琲で、コクもキレもバランスのとれた珈琲でした。
          </div>
        </div>
      </div>
      <div className={`${styles.buttonContainer}`}>
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
    </div>
  );
};
