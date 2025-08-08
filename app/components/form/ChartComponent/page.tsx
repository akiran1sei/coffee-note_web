"use client";
import React, { useEffect, useState } from "react";
import { RangeComponent } from "../RangeComponent/page";
import styles from "@/app/styles/Form.module.css";

// interface chartProps {}
export const ChartComponent =
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

    return (
      <div className={styles.chartBox}>
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
          dataTitle="後味"
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
    );
  };
