// =========================
// utils/useCoffeeValidation.ts
// =========================
import { useState, useCallback } from "react";
import type {
  CoffeeInfo,
  SelfInfo,
  ExtractionInfo,
  ShopInfo,
  ReviewInfo,
  ValidationRule,
  ValidationResult,
} from "@/app/types/validation";

const validationRules = {
  coffee: [
    {
      field: "imageUrl",
      message: "コーヒー豆の画像パスを入力してください。",
      validator: (value: unknown): boolean =>
        typeof value === "string" && !value.trim(),
    },
    {
      field: "imageAlt",
      message: "コーヒー豆の画像の代替テキストを入力してください。",
      validator: (value: unknown): boolean =>
        typeof value === "string" && !value.trim(),
    },
    {
      field: "coffeeName",
      message: "コーヒー豆の名前を入力してください。",
      validator: (value: unknown): boolean =>
        typeof value === "string" && !value.trim(),
    },
    {
      field: "productionArea",
      message: "生産地を入力してください。",
      validator: (value: unknown): boolean =>
        typeof value === "string" && !value.trim(),
    },
  ] as ValidationRule<CoffeeInfo>[],

  self: [
    {
      field: "variety",
      message: "品種を選択してください。",
      validator: (value: unknown): boolean => value === "選択していません。",
    },
    {
      field: "roastingDegree",
      message: "焙煎度を選択してください。",
      validator: (value: unknown): boolean => value === "選択していません。",
    },
  ] as ValidationRule<SelfInfo>[],

  extraction: [
    {
      field: "extractionMethod",
      message: "抽出方法を選択してください。",
      validator: (value: unknown): boolean => value === "選択していません。",
    },
    {
      field: "extractionMaker",
      message: "抽出器具のメーカーを選択してください。",
      validator: (value: unknown): boolean => value === "選択していません。",
    },
    {
      field: "measurementMethod",
      message: "計測方法を入力してください。",
      validator: (value: unknown): boolean =>
        typeof value === "string" && !value.trim(),
    },
    {
      field: "grindSize",
      message: "挽き目を選択してください。",
      validator: (value: unknown): boolean => value === "選択していません.",
    },
    {
      field: "extractionTime",
      message: "抽出時間（秒）を入力してください。",
      validator: (value: unknown): boolean =>
        typeof value === "number" && (value <= 0 || isNaN(value)),
    },
    {
      field: "temperature",
      message: "温度（℃）を入力してください。",
      validator: (value: unknown): boolean =>
        typeof value === "number" && (value <= 0 || isNaN(value)),
    },
    {
      field: "coffeeAmount",
      message: "粉量（g）を入力してください。",
      validator: (value: unknown): boolean =>
        typeof value === "number" && (value <= 0 || isNaN(value)),
    },
    {
      field: "waterAmount",
      message: "湯量（g）を入力してください。",
      validator: (value: unknown): boolean =>
        typeof value === "number" && (value <= 0 || isNaN(value)),
    },
  ] as ValidationRule<ExtractionInfo>[],

  shop: [
    {
      field: "shopName",
      message: "店名を入力してください。",
      validator: (value: unknown): boolean =>
        typeof value === "string" && !value.trim(),
    },
    {
      field: "shopDate",
      message: "お店で飲んだ日付を選択してください。",
      validator: (value: unknown): boolean =>
        !(value instanceof Date) || !value,
    },
  ] as ValidationRule<ShopInfo>[],

  review: [
    {
      field: "acidity",
      message: "酸味の評価を入力してください。",
      validator: (value: unknown): boolean =>
        typeof value === "number" && (value === 0 || isNaN(value)),
    },
    {
      field: "bitterness",
      message: "苦味の評価を入力してください。",
      validator: (value: unknown): boolean =>
        typeof value === "number" && (value === 0 || isNaN(value)),
    },
    {
      field: "overall",
      message: "全体の好みの評価を入力してください。",
      validator: (value: unknown): boolean =>
        typeof value === "number" && (value === 0 || isNaN(value)),
    },
    {
      field: "body",
      message: "コクの評価を入力してください。",
      validator: (value: unknown): boolean =>
        typeof value === "number" && (value === 0 || isNaN(value)),
    },
    {
      field: "aroma",
      message: "香りの評価を入力してください。",
      validator: (value: unknown): boolean =>
        typeof value === "number" && (value === 0 || isNaN(value)),
    },
    {
      field: "aftertaste",
      message: "キレの評価を入力してください。",
      validator: (value: unknown): boolean =>
        typeof value === "number" && (value === 0 || isNaN(value)),
    },
  ] as ValidationRule<ReviewInfo>[],
};

const getNestedValue = <T>(obj: T, path: string): unknown => {
  return path.split(".").reduce((current: unknown, key: string) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
};

const validateField = <T>(
  data: T,
  field: string,
  validator: (value: unknown) => boolean,
  message: string
): ValidationResult => {
  const value = field.includes(".")
    ? getNestedValue(data, field)
    : (data as Record<string, unknown>)[field];

  if (validator(value)) {
    return { isValid: false, message };
  }
  return { isValid: true };
};

const validateRuleSet = <T>(
  data: T,
  rules: ValidationRule<T>[]
): ValidationResult => {
  for (const rule of rules) {
    const result = validateField(
      data,
      rule.field as string,
      rule.validator,
      rule.message
    );
    if (!result.isValid) {
      return result;
    }
  }
  return { isValid: true };
};

export const useCoffeeValidation = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [isValidating, setIsValidating] = useState<boolean>(false);

  const clearErrors = useCallback((): void => {
    setErrors([]);
  }, []);

  const validateCoffeeData = useCallback(
    (
      coffeeInfo: CoffeeInfo,
      selfInfo: SelfInfo,
      extractionInfo: ExtractionInfo,
      shopInfo: ShopInfo,
      reviewInfo: ReviewInfo,
      varText: string
    ): string | null => {
      try {
        // 共通のコーヒー情報をバリデーション
        const coffeeResult = validateRuleSet(
          coffeeInfo,
          validationRules.coffee
        );
        if (!coffeeResult.isValid && coffeeResult.message) {
          return coffeeResult.message;
        }

        // varTextに応じた条件付きバリデーション
        if (varText === "Self") {
          const selfResult = validateRuleSet(selfInfo, validationRules.self);
          if (!selfResult.isValid && selfResult.message) {
            return selfResult.message;
          }

          const extractionResult = validateRuleSet(
            extractionInfo,
            validationRules.extraction
          );
          if (!extractionResult.isValid && extractionResult.message) {
            return extractionResult.message;
          }
        } else if (varText === "Shop") {
          const shopResult = validateRuleSet(shopInfo, validationRules.shop);
          if (!shopResult.isValid && shopResult.message) {
            return shopResult.message;
          }
        }

        // レビュー情報のバリデーション
        const reviewRulesWithPath = validationRules.review.map((rule) => ({
          ...rule,
          field: `chart.${rule.field}`,
        }));

        const reviewResult = validateRuleSet(reviewInfo, reviewRulesWithPath);
        if (!reviewResult.isValid && reviewResult.message) {
          return reviewResult.message;
        }

        return null; // バリデーション成功
      } catch (error) {
        console.error("バリデーションエラー:", error);
        return "入力データの検証中にエラーが発生しました。";
      }
    },
    []
  );

  // 単一フィールドのバリデーション
  const validateSingleField = useCallback(
    <T>(
      value: unknown,
      fieldType: keyof typeof validationRules,
      fieldName: string
    ): ValidationResult => {
      const rules = validationRules[fieldType];
      if (!rules) return { isValid: true };

      const rule = rules.find(
        (r) => (r as ValidationRule<T>).field === fieldName
      ) as ValidationRule<T> | undefined;
      if (!rule) return { isValid: true };

      const isInvalid = rule.validator(value);
      return {
        isValid: !isInvalid,
        message: isInvalid ? rule.message : undefined,
      };
    },
    []
  );

  return {
    errors,
    isValidating,
    validateCoffeeData,
    validateSingleField,
    clearErrors,
    hasErrors: errors.length > 0,
  } as const;
};
