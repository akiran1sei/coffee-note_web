import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ... 既存の設定を保持 ...

  // 以下の webpack 設定を追加します
  webpack: (config, { isServer }) => {
    // サーバーサイドでのみ実行されるコード
    if (isServer) {
      // Node.jsの標準モジュールである 'path' を、
      // 外部モジュール (externals) として扱い、バンドルから除外する
      config.externals.push("path");

      // Puppeteerの実行に関連するfsなどのモジュールも、念のため除外することが推奨されます
      config.externals.push("fs");
      // 他のNode.js標準モジュールも必要に応じて追加できます
    }

    return config;
  },
};

export default nextConfig;
