"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/Form.module.css";
import {
  InputComponent,
  DateComponent,
} from "@/app/components/form/item/InputComponent/page";

interface ShopCoffeeFormValue {
  coffeeInfo: {
    imageUrl: string;
    imageAlt: string;
    coffeeName: string;
    productionArea: string;
  };

  shopInfo: {
    shopName: string;
    shopPrice: string;
    shopDate: Date;
    shopAddress: string;
    shopUrl: string;
  };
  setCoffeeInfo: React.Dispatch<
    React.SetStateAction<{
      imageUrl: string;
      imageAlt: string;
      coffeeName: string;
      productionArea: string;
    }>
  >;
  setShopInfo: React.Dispatch<
    React.SetStateAction<{
      shopName: string;
      shopPrice: string;
      shopDate: Date;
      shopAddress: string;
      shopUrl: string;
    }>
  >;
}

export const ShopCoffeeComponent: React.FC<ShopCoffeeFormValue> = ({
  coffeeInfo,
  shopInfo,
  setCoffeeInfo,
  setShopInfo,
}) => {
  return (
    <>
      <div className={styles.infoContainer}>
        <h2 className={styles.infoTitle}>お店の情報</h2>
        <div className={styles.infoWrapper}>
          <InputComponent
            dataTitle="店名"
            value={shopInfo.shopName}
            onChange={(value: string) => {
              setShopInfo({
                ...shopInfo,
                shopName: value,
              });
            }}
            labelText="shopName"
          />
          <InputComponent
            dataTitle="店の価格（円）"
            value={shopInfo.shopPrice}
            onChange={(value: string) => {
              setShopInfo({
                ...shopInfo,
                shopPrice: value,
              });
            }}
            labelText="shopPrice"
          />
          <DateComponent
            dataTitle="飲んだ日付"
            value={
              shopInfo.shopDate
                ? shopInfo.shopDate.toISOString().slice(0, 10)
                : ""
            }
            onChange={(value: string) => {
              setShopInfo({
                ...shopInfo,
                shopDate: value ? new Date(value) : new Date(),
              });
            }}
            labelText="shopDate"
          />
          <InputComponent
            dataTitle="店の住所"
            value={shopInfo.shopAddress}
            onChange={(value: string) => {
              setShopInfo({
                ...shopInfo,
                shopAddress: value,
              });
            }}
            labelText="shopAddress"
          />
          <InputComponent
            dataTitle="shopUrl"
            value={shopInfo.shopUrl}
            onChange={(value: string) => {
              setShopInfo({
                ...shopInfo,
                shopUrl: value,
              });
            }}
            labelText="shopUrl"
          />
        </div>
      </div>
      <div className={styles.infoContainer}>
        <h2 className={styles.infoTitle}>珈琲の情報</h2>
        <div className={styles.infoWrapper}>
          <InputComponent
            dataTitle="コーヒー名"
            value={coffeeInfo.coffeeName}
            onChange={(value: string) => {
              setCoffeeInfo({
                ...coffeeInfo,
                coffeeName: value,
              });
            }}
            labelText="coffeeName"
          />
          <InputComponent
            dataTitle="産地"
            value={coffeeInfo.productionArea}
            onChange={(value: string) => {
              setCoffeeInfo({
                ...coffeeInfo,
                productionArea: value,
              });
            }}
            labelText="productionArea"
          />
        </div>
      </div>
    </>
  );
};
