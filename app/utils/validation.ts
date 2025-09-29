// utils/validation.ts

/**
 * 文字列の必須入力チェック
 * @param value - チェックする文字列
 * @param fieldName - フィールド名
 * @returns true: 有効、false: 無効（アラート表示）
 */
export function validateString(value: string, fieldName: string): boolean {
  if (!value.trim() || value.trim() === "ー") {
    alert(`${fieldName}を入力してください`);
    return false;
  }
  return true;
}

/**
 * 数値の必須入力チェック
 * @param value - チェックする数値
 * @param fieldName - フィールド名
 * @returns true: 有効、false: 無効（アラート表示）
 */
export function validateNumber(
  value: number | null | undefined,
  fieldName: string
): boolean {
  if (value === null || value === undefined || isNaN(value)) {
    alert(`${fieldName}を入力してください`);
    return false;
  }
  return true;
}

/**
 * 数値（正の数）の必須入力チェック
 * @param value - チェックする数値
 * @param fieldName - フィールド名
 * @returns true: 有効、false: 無効（アラート表示）
 */
export function validatePositiveNumber(
  value: number | null | undefined,
  fieldName: string
): boolean {
  if (value === null || value === undefined || isNaN(value) || value <= 0) {
    alert(`${fieldName}には正の数を入力してください`);
    return false;
  }
  return true;
}

/**
 * 文字列形式の数値チェック（input要素から取得した値用）
 * @param value - チェックする文字列
 * @param fieldName - フィールド名
 * @returns true: 有効、false: 無効（アラート表示）
 */
export function validateStringNumber(
  value: string,
  fieldName: string
): boolean {
  const trimmed = value.trim();
  if (!trimmed) {
    alert(`${fieldName}を入力してください`);
    return false;
  }
  if (isNaN(Number(trimmed))) {
    alert(`${fieldName}には数値を入力してください`);
    return false;
  }
  return true;
}

/**
 * 文字列形式の正の数チェック
 * @param value - チェックする文字列
 * @param fieldName - フィールド名
 * @returns true: 有効、false: 無効（アラート表示）
 */
export function validateStringPositiveNumber(
  value: string,
  fieldName: string
): boolean {
  const trimmed = value.trim();
  if (!trimmed) {
    alert(`${fieldName}を入力してください`);
    return false;
  }
  const num = Number(trimmed);
  if (isNaN(num) || num <= 0) {
    alert(`${fieldName}には正の数を入力してください`);
    return false;
  }
  return true;
}

// 使用例
/*
// 文字列の場合
if (!validateString(coffeeInfo.coffeeName, "コーヒー名")) return;

// 数値の場合
if (!validateNumber(coffeeInfo.price, "価格")) return;

// 正の数の場合
if (!validatePositiveNumber(coffeeInfo.price, "価格")) return;

// input要素から取得した文字列形式の数値
if (!validateStringNumber(priceInput.value, "価格")) return;

// input要素から取得した文字列形式の正の数
if (!validateStringPositiveNumber(priceInput.value, "価格")) return;
*/
