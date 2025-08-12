"use client";
import React, { useEffect, useState } from "react";
import { RangeComponent } from "../../form/RangeComponent/page";
import styles from "@/app/styles/Form.module.css";
import { ResponsiveRadar } from "@nivo/radar";

// interface chartProps {}
export const TastingEvaluationComponent =
  // : React.FC<chartProps>
  ({}) => {
    const [chartFormValue, setChartFormValue] = useState({
      acidity: 0,
      bitterness: 0,
      body: 0,
      aroma: 0,
      aftertaste: 0,
      overall: 0,
    });
    const data = [
      { taste: "酸味", chardonay: chartFormValue.acidity },
      { taste: "苦味", chardonay: chartFormValue.bitterness },
      { taste: "コク", chardonay: chartFormValue.body },
      { taste: "香り", chardonay: chartFormValue.aroma },
      { taste: "キレ", chardonay: chartFormValue.aftertaste },
    ];

    const MyNivoRadar = () => {
      return (
        <div style={{ height: 400 }}>
          <ResponsiveRadar
            data={data}
            keys={["chardonay"]}
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
            // 最大値を明示的に設定
            maxValue={5}
            // 最小値を明示的に設定

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
        <h2 className={styles.infoTitle}>テイスティング・評価</h2>
        <div className={styles.infoWrapper}>
          {Radar}
          <RangeComponent
            dataTitle="酸味"
            value={chartFormValue.acidity}
            onChange={(value: number) => {
              setChartFormValue({
                ...chartFormValue,
                acidity: value,
              });
            }}
            labelText="acidity"
            min={0}
            max={5}
            step={0.5}
          />
          <RangeComponent
            dataTitle="苦味"
            value={chartFormValue.bitterness}
            onChange={(value: number) => {
              setChartFormValue({
                ...chartFormValue,
                bitterness: value,
              });
            }}
            labelText="bitterness"
            min={0}
            max={5}
            step={0.5}
          />
          <RangeComponent
            dataTitle="コク"
            value={chartFormValue.body}
            onChange={(value: number) => {
              setChartFormValue({
                ...chartFormValue,
                body: value,
              });
            }}
            labelText="body"
            min={0}
            max={5}
            step={0.5}
          />
          <RangeComponent
            dataTitle="アロマ"
            value={chartFormValue.aroma}
            onChange={(value: number) => {
              setChartFormValue({
                ...chartFormValue,
                aroma: value,
              });
            }}
            labelText="aroma"
            min={0}
            max={5}
            step={0.5}
          />
          <RangeComponent
            dataTitle="キレ"
            value={chartFormValue.aftertaste}
            onChange={(value: number) => {
              setChartFormValue({
                ...chartFormValue,
                aftertaste: value,
              });
            }}
            labelText="aftertaste"
            min={0}
            max={5}
            step={0.5}
          />
          <RangeComponent
            dataTitle="全体の評価"
            value={chartFormValue.overall}
            onChange={(value: number) => {
              setChartFormValue({
                ...chartFormValue,
                overall: value,
              });
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
