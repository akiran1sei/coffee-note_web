"use client";
import React, { useEffect, useState } from "react";
import {
  InputComponent,
  NumberComponent,
} from "@/app/components/form/InputComponent/page";
import { ChartComponent } from "@/app/components/form/ChartComponent/page";
import { translationMap } from "@/app/utils/translations";
const CreatePage = () => {
  const [formValue, setFormValue] = useState({
    coffeeName: "",
    temperature: 0,
    coffeeAmount: 0,
    waterAmount: 0,
    chart: {
      acidity: 0,
      bitterness: 0,
      overall: 0,
      body: 0,
      aroma: 0,
      aftertaste: 0,
    },
  });

  return (
    <div>
      <h1>Create Page</h1>
      <InputComponent
        dataTitle="コーヒー名"
        value={formValue.coffeeName}
        onChange={(value: string) => {
          setFormValue({ ...formValue, coffeeName: value });
        }}
        labelText="coffeeName"
      />
      <NumberComponent
        dataTitle="温度（℃）"
        value={formValue.temperature}
        onChange={(value: number) => {
          setFormValue({
            ...formValue,
            temperature: value,
          });
        }}
        labelText="temperature"
      />
      <NumberComponent
        dataTitle="粉量（ｇ）"
        value={formValue.coffeeAmount}
        onChange={(value: number) => {
          setFormValue({
            ...formValue,
            coffeeAmount: value,
          });
        }}
        labelText="coffeeAmount"
      />
      <NumberComponent
        dataTitle="湯量（ｇ）"
        value={formValue.waterAmount}
        onChange={(value: number) => {
          setFormValue({
            ...formValue,
            waterAmount: value,
          });
        }}
        labelText="waterAmount"
      />
      <ChartComponent
        dataTitle="酸味"
        value={formValue.chart.acidity}
        onChange={(value: number) => {
          setFormValue({
            ...formValue,
            chart: { ...formValue.chart, acidity: value },
          });
        }}
        labelText="acidity"
        min={0}
        max={5}
        step={0.5}
      />
    </div>
  );
};
export default CreatePage;
