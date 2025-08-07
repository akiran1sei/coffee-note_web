import "./globals.css";
import styles from "@/app/styles/Layout.module.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tasting Note App",
  description: "コーヒーをテイスティングするときに使用するアプリです。",
};

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className={styles.l_container}>
          <main className={styles.l_main}>
            <div className={styles.l_pagesContainer}>{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
