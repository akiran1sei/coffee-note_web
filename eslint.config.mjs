import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // .d.ts ファイル内の any の使用を許可する設定
  {
    files: ["**/*.d.ts"],
    rules: {
      // @typescript-eslint/no-explicit-any を無効 (off) にする
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
