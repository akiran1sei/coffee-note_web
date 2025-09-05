"use client";
import React from "react";
import { RangeComponent } from "../../../item/RangeComponent/page";
import styles from "@/app/styles/Form.module.css";
import { ResponsiveRadar } from "@nivo/radar";

// Propsの型を定義
interface TastingEvaluationProps {
  reviewInfo: {
    chart: {
      acidity: number;
      bitterness: number;
      body: number;
      aroma: number;
      aftertaste: number;
      overall: number;
    };
    memo: string; // `CreatePage.tsx`に合わせる
  };
  setReviewInfo: React.Dispatch<
    React.SetStateAction<{
      chart: {
        acidity: number;
        bitterness: number;
        body: number;
        aroma: number;
        aftertaste: number;
        overall: number;
      };
      memo: string; // `CreatePage.tsx`に合わせる
    }>
  >;
}

// 親コンポーネントからpropsとして`reviewInfo`と`setReviewInfo`を受け取る
export const TastingEvaluationComponent: React.FC<TastingEvaluationProps> = ({
  reviewInfo,
  setReviewInfo,
}) => {
  // ローカルステートは不要になるため削除
  // const [chartFormValue, setChartFormValue] = useState(...)

  // 親から渡された `reviewInfo.chart` を使用してチャートデータを生成
  const data = [
    { taste: "酸味", value: reviewInfo.chart.acidity },
    { taste: "苦味", value: reviewInfo.chart.bitterness },
    { taste: "コク", value: reviewInfo.chart.body },
    { taste: "香り", value: reviewInfo.chart.aroma },
    { taste: "キレ", value: reviewInfo.chart.aftertaste },
  ];

  const MyNivoRadar = () => {
    return (
      <div className={styles.chartContainer} style={{ height: 400 }}>
        <ResponsiveRadar
          data={data}
          keys={["value"]}
          indexBy="taste"
          margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
          borderWidth={2}
          borderColor={{ from: "color" }}
          gridLevels={5}
          gridShape="circular"
          enableDots={true}
          dotSize={10}
          dotColor={{ theme: "background" }}
          dotBorderWidth={2}
          dotBorderColor={{ from: "color" }}
          maxValue={5}
          motionConfig="molasses"
          legends={[
            {
              anchor: "top-left",
              direction: "column",
              translateX: -50,
              translateY: -40,
              itemWidth: 80,
              itemHeight: 20,
              itemTextColor: "#999",
              symbolSize: 12,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: { itemTextColor: "#000" },
                },
              ],
            },
          ]}
        />
      </div>
    );
  };
  const Radar = MyNivoRadar();

  return (
    <div className={styles.infoContainer}>
      <h2 className={`${styles.infoTitle} ${styles.tastingTitle}`}>
        テイスティング・評価
      </h2>
      <div className={`${styles.infoWrapper} ${styles.tastingWrapper}`}>
        <RangeComponent
          dataTitle="酸味"
          value={reviewInfo.chart.acidity}
          onChange={(value: number) => {
            setReviewInfo((prev) => ({
              ...prev,
              chart: { ...prev.chart, acidity: value },
            }));
          }}
          labelText="acidity"
          min={0}
          max={5}
          step={0.5}
        />
        <RangeComponent
          dataTitle="苦味"
          value={reviewInfo.chart.bitterness}
          onChange={(value: number) => {
            setReviewInfo((prev) => ({
              ...prev,
              chart: { ...prev.chart, bitterness: value },
            }));
          }}
          labelText="bitterness"
          min={0}
          max={5}
          step={0.5}
        />
        <RangeComponent
          dataTitle="コク"
          value={reviewInfo.chart.body}
          onChange={(value: number) => {
            setReviewInfo((prev) => ({
              ...prev,
              chart: { ...prev.chart, body: value },
            }));
          }}
          labelText="body"
          min={0}
          max={5}
          step={0.5}
        />
        <RangeComponent
          dataTitle="アロマ"
          value={reviewInfo.chart.aroma}
          onChange={(value: number) => {
            setReviewInfo((prev) => ({
              ...prev,
              chart: { ...prev.chart, aroma: value },
            }));
          }}
          labelText="aroma"
          min={0}
          max={5}
          step={0.5}
        />
        <RangeComponent
          dataTitle="キレ"
          value={reviewInfo.chart.aftertaste}
          onChange={(value: number) => {
            setReviewInfo((prev) => ({
              ...prev,
              chart: { ...prev.chart, aftertaste: value },
            }));
          }}
          labelText="aftertaste"
          min={0}
          max={5}
          step={0.5}
        />
        {Radar}
        <RangeComponent
          dataTitle="全体の好み"
          value={reviewInfo.chart.overall}
          onChange={(value: number) => {
            setReviewInfo((prev) => ({
              ...prev,
              chart: { ...prev.chart, overall: value },
            }));
          }}
          labelText="overall"
          min={0}
          max={5}
          step={0.5}
        />
      </div>
    </div>
  );
};
