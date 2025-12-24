import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. 既存の webpack 設定
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("path");
      config.externals.push("fs");
    }
    return config;
  },

  // 2. experimental の中に turbo を入れる
  experimental: {
    // @ts-ignore ← もしどうしても型エラーが消えない場合は、一時的にこのコメントを直上に書くと無視できます
    turbo: {
      // 空のままでもOK
    },
  },
};

export default nextConfig;
