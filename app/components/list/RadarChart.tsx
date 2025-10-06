import { ResponsiveRadar } from "@nivo/radar";
import React from "react";
import styles from "@/app/styles/Form.module.css";
interface TastingValue {
  acidity?: number;
  bitterness?: number;
  body?: number;
  aroma?: number;
  aftertaste?: number;
  overall?: number;
}

interface RadarChartProps {
  value: TastingValue;
}

const RadarChart: React.FC<RadarChartProps> = ({ value }) => {
  // 軸の項目名と対応する値をNivoが要求する配列形式に変換
  // indexBy で指定するキー（ここでは 'criteria'）が各オブジェクトに必要です。
  const data = [
    { criteria: "酸味", score: value.acidity || 0 }, // 未定義の場合は 0 を使用
    { criteria: "苦味", score: value.bitterness || 0 },
    { criteria: "コク", score: value.body || 0 },
    { criteria: "アロマ", score: value.aroma || 0 },
    { criteria: "キレ", score: value.aftertaste || 0 },
  ];

  return (
    <div className={styles.radarChartBox}>
      <ResponsiveRadar
        data={data}
        keys={["score"]} // データセットのキー。データ配列の 'score' プロパティを使う。
        indexBy="criteria" // 軸（レーダーの角）として、データ配列の 'criteria' プロパティを使う。
        // maxValueは、与えられる値の最大値に合わせて調整してください
        maxValue={5}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        curve="linearClosed"
        // スタイル設定
        borderWidth={2}
        borderColor={{ from: "color" }}
        gridLevels={5}
        gridShape="circular"
        // ★軸ラベルの表示を有効化する設定★
        // gridLabelOffset: 軸ラベルとグリッドの中心からの距離
        gridLabelOffset={10}
        // 凡例は今回はスペースがないので無効化
        legends={[]}

        // 軸のテキストをカスタマイズしたい場合は axis プロパティを使用
        // 例: ラベルのフォントサイズや色を変更
        // gridLabel={(label) => <text fontSize={10} fill="#333">{label}</text>}
      />
    </div>
  );
};

export default RadarChart;
