// app/components/pdf/PDF_Contents.tsx
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { CoffeeRecord } from "@/app/types/db";

// 日本語フォントの登録（オプションだが推奨）
Font.register({
  family: "NotoSansJP",
  src: "/fonts/NotoSansJP-Regular.ttf",
});

const styles = StyleSheet.create({
  page: {
    // ⬇️ 修正: width, height の auto を削除（PageのデフォルトはA4サイズいっぱい）
    // 修正: 要素のセンタリングを削除し、標準の縦並びFlexboxに戻す
    padding: 30,
    backgroundColor: "#ffffff",
    flexDirection: "column",
    // 削除: justify-content: "space-between",
    // 削除: align-items: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    // ⬇️ 追加: 親要素いっぱい（paddingを除いた幅）に広げる
    width: "100%",
    textAlign: "left", // 左寄せを明確にする
  },
  coffeeContainer: {
    width: "100%", // 親要素（Page）の幅いっぱいに広げる
    // ⬇️ 修正: height: "100%" を削除。コンテンツの高さに合わせて自動調整させる
    // height: "100%",
    marginBottom: 30,
    borderBottom: "1pt solid #cccccc",
    paddingBottom: 20,
  },
  coffeeTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 8,
  },
  label: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 2,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  image: {
    maxWidth: 200,
    maxHeight: 200,
    marginTop: 10,
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  ratingLabel: {
    fontSize: 11,
    width: 80,
    color: "#666666",
  },
  ratingValue: {
    fontSize: 11,
    fontWeight: "bold",
  },
  metadata: {
    fontSize: 10,
    color: "#666666",
    marginTop: 5,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#999999",
  },
});

interface PDFDocumentProps {
  coffees: CoffeeRecord[];
  // documentTitle?: string;
}

export const PDF_Contents = ({ coffees }: PDFDocumentProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* <Text style={styles.title}>{documentTitle}</Text> */}

        {coffees.map((coffee, index) => (
          // coffeeContainerの幅が100%になり、Pageのpadding内いっぱいに広がる
          <View key={coffee.id} style={styles.coffeeContainer}>
            {/* タイトル */}
            <Text style={styles.coffeeTitle}>
              {index + 1}. {coffee.name}
            </Text>

            {/* 基本情報 */}
            <View style={styles.section}>
              <Text style={styles.label}>品種・産地</Text>
              <Text style={styles.text}>
                {coffee.variety} / {coffee.productionArea}
              </Text>
            </View>

            {/* 自分で淹れた場合 */}
            {coffee.self === "self" && (
              <>
                <View style={styles.section}>
                  <Text style={styles.label}>焙煎・抽出情報</Text>
                  <Text style={styles.text}>
                    焙煎度: {coffee.roastingDegree} / 抽出方法:{" "}
                    {coffee.extractionMethod}
                  </Text>
                  <Text style={styles.text}>
                    粉量: {coffee.coffeeAmount}g / 湯量: {coffee.waterAmount}g /
                    温度: {coffee.temperature}℃
                  </Text>
                </View>
              </>
            )}

            {/* 店で飲んだ場合 */}
            {coffee.self === "shop" && coffee.shopName && (
              <View style={styles.section}>
                <Text style={styles.label}>店舗情報</Text>
                <Text style={styles.text}>
                  {coffee.shopName} / ¥{coffee.shopPrice}
                </Text>
                {coffee.shopAddress && (
                  <Text style={styles.text}>{coffee.shopAddress}</Text>
                )}
              </View>
            )}

            {/* 評価 */}
            <View style={styles.section}>
              <Text style={styles.label}>評価</Text>
              <View style={styles.ratingRow}>
                <Text style={styles.ratingLabel}>総合:</Text>
                <Text style={styles.ratingValue}>{coffee.overall}/10</Text>
              </View>
              <View style={styles.ratingRow}>
                <Text style={styles.ratingLabel}>酸味:</Text>
                <Text style={styles.ratingValue}>{coffee.acidity}/10</Text>
              </View>
              <View style={styles.ratingRow}>
                <Text style={styles.ratingLabel}>苦味:</Text>
                <Text style={styles.ratingValue}>{coffee.bitterness}/10</Text>
              </View>
              <View style={styles.ratingRow}>
                <Text style={styles.ratingLabel}>コク:</Text>
                <Text style={styles.ratingValue}>{coffee.body}/10</Text>
              </View>
            </View>

            {/* メモ */}
            {coffee.memo && (
              <View style={styles.section}>
                <Text style={styles.label}>メモ</Text>
                <Text style={styles.text}>{coffee.memo}</Text>
              </View>
            )}

            {/* 画像 */}
            {coffee.imageUri && (
              <Image src={coffee.imageUri} style={styles.image} />
            )}

            {/* 作成日 */}
            <Text style={styles.metadata}>
              作成日:{" "}
              {coffee.createdAt
                ? new Date(coffee.createdAt).toLocaleString("ja-JP")
                : ""}
            </Text>
          </View>
        ))}

        <Text style={styles.footer} fixed>
          生成日時: {new Date().toLocaleString("ja-JP")}
        </Text>
      </Page>
    </Document>
  );
};
