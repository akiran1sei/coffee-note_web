"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/Form.module.css";
import {
  InputComponent,
  DateComponent,
} from "@/app/components/form/item/InputComponent/page";

import ImageUpload from "@/app/components/form/item/ImageUpload/page";
interface ShopCoffeeFormValue {
  imageUrl: string;
  coffeeName: string;
  productionArea: string;
  shopName: string;
  shopPrice: string;
  shopDate: string;
  shopAddress: string;
  shopUrl: string;
}
export const ShopCoffeeComponent: React.FC<ShopCoffeeFormValue> = ({
  imageUrl,
  coffeeName,
  productionArea,
  shopName,
  shopPrice,
  shopDate,
  shopAddress,
  shopUrl,
}) => {
  const [shopCoffeeFormValue, setShopCoffeeFormValue] = useState({
    imageUrl: imageUrl,
    coffeeName: coffeeName,
    productionArea: productionArea,
    shopName: shopName,
    shopPrice: shopPrice,
    shopDate: shopDate,
    shopAddress: shopAddress,
    shopUrl: shopUrl,
  });

  return (
    <>
      <div className={styles.infoContainer}>
        <h2 className={styles.infoTitle}>お店の情報</h2>
        <div className={styles.infoWrapper}>
          <ImageUpload
            onChange={(value: string) => {
              setShopCoffeeFormValue({
                ...shopCoffeeFormValue,
                imageUrl: value,
              });
            }}
          />
          <InputComponent
            dataTitle="店名"
            value={shopCoffeeFormValue.shopName}
            onChange={(value: string) => {
              setShopCoffeeFormValue({
                ...shopCoffeeFormValue,
                shopName: value,
              });
            }}
            labelText="shopName"
          />
          <InputComponent
            dataTitle="店の価格"
            value={shopCoffeeFormValue.shopPrice}
            onChange={(value: string) => {
              setShopCoffeeFormValue({
                ...shopCoffeeFormValue,
                shopPrice: value,
              });
            }}
            labelText="shopPrice"
          />
          <DateComponent
            dataTitle="飲んだ日付"
            value={shopCoffeeFormValue.shopDate}
            onChange={(value: string) => {
              setShopCoffeeFormValue({
                ...shopCoffeeFormValue,
                shopDate: value,
              });
            }}
            labelText="shopDate"
          />
          <InputComponent
            dataTitle="店の住所"
            value={shopCoffeeFormValue.shopAddress}
            onChange={(value: string) => {
              setShopCoffeeFormValue({
                ...shopCoffeeFormValue,
                shopAddress: value,
              });
            }}
            labelText="shopAddress"
          />
          <InputComponent
            dataTitle="shopUrl"
            value={shopCoffeeFormValue.shopUrl}
            onChange={(value: string) => {
              setShopCoffeeFormValue({
                ...shopCoffeeFormValue,
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
            value={shopCoffeeFormValue.coffeeName}
            onChange={(value: string) => {
              setShopCoffeeFormValue({
                ...shopCoffeeFormValue,
                coffeeName: value,
              });
            }}
            labelText="coffeeName"
          />
          <InputComponent
            dataTitle="産地"
            value={shopCoffeeFormValue.productionArea}
            onChange={(value: string) => {
              setShopCoffeeFormValue({
                ...shopCoffeeFormValue,
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
