"use client";
import React, {
  useState,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Image from "next/image";
import styles from "@/app/styles/Form.module.css";

// 画像データの型定義
export interface ImageFormData {
  imageId: string | null;
  imageUrl: string;
  imageAlt: string;
  hasImage: boolean;
}

// propsの型定義
export interface ImageUploadComponentProps {
  value: ImageFormData;
  onChange: (imageData: ImageFormData) => void;
  disabled?: boolean;
  required?: boolean;
}

// 外部から呼び出すための関数を定義
export interface ImageUploadRef {
  reset: () => void;
}

const ImageUploadComponent = forwardRef<
  ImageUploadRef,
  ImageUploadComponentProps
>(({ value, onChange, disabled = false, required = false }, ref) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>(value.imageAlt || "");
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (value.hasImage && value.imageUrl) {
      setFileName(value.imageAlt || "");
    } else {
      setFileName("");
    }
  }, [value]);

  const notifyParent = useCallback(
    (imageData: Partial<ImageFormData>) => {
      const newImageData: ImageFormData = {
        imageId: imageData.imageId ?? value.imageId,
        imageUrl: imageData.imageUrl ?? value.imageUrl,
        imageAlt: imageData.imageAlt ?? value.imageAlt,
        hasImage: imageData.hasImage ?? value.hasImage,
      };
      onChange(newImageData);
    },
    [value, onChange]
  );

  // ファイル選択ハンドラー
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        setFile(selectedFile);

        // ファイル名から拡張子を除いた部分をデフォルトのAltテキストとして設定
        const nameWithoutExtension = selectedFile.name
          .split(".")
          .slice(0, -1)
          .join(".");
        const defaultAlt = nameWithoutExtension || selectedFile.name;
        setFileName(defaultAlt);

        // FileReaderを使ってプレビュー用のData URLを生成
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          setPreviewUrl(dataUrl);

          // 親コンポーネントに画像データを通知
          notifyParent({
            imageId: Date.now().toString(),
            imageUrl: dataUrl,
            imageAlt: defaultAlt,
            hasImage: true,
          });
        };
        reader.readAsDataURL(selectedFile);
      }
    },
    [notifyParent]
  );

  // Alt テキスト変更ハンドラー
  const handleAltTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newAlt = e.target.value;
      setFileName(newAlt);

      // 画像が設定されている場合は親に通知
      if (value.hasImage || previewUrl) {
        notifyParent({ imageAlt: newAlt });
      }
    },
    [value.hasImage, previewUrl, notifyParent]
  );

  // リセット関数
  const reset = useCallback(() => {
    setFile(null);
    setFileName("");
    setPreviewUrl("");

    notifyParent({
      imageId: null,
      imageUrl: "",
      imageAlt: "",
      hasImage: false,
    });

    // ファイル入力をクリア
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  }, [notifyParent]);

  // 外部から呼び出せる関数を公開
  useImperativeHandle(ref, () => ({
    reset,
  }));

  const hasUploadedImage = value.hasImage && Boolean(value.imageUrl);
  const hasPreview = Boolean(previewUrl);
  const isFileSelected = Boolean(file);

  return (
    <div className={styles.upload_form_image}>
      <div className={styles.upload_form_wrap}>
        <div className={styles.upload_form_item}>
          <label>
            <span>
              ファイル選択
              {required && <span className={styles.required}>*</span>}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={disabled}
              title="画像ファイルを選択"
            />
          </label>
        </div>

        <div className={styles.upload_form_item}>
          <label>
            <span>
              代替テキスト
              {required && <span className={styles.required}>*</span>}
            </span>
            <input
              type="text"
              value={fileName}
              onChange={handleAltTextChange}
              placeholder="画像の説明を入力してください"
              disabled={disabled}
            />
          </label>
        </div>

        {(hasUploadedImage || isFileSelected) && (
          <button
            onClick={reset}
            type="button"
            disabled={disabled}
            className={styles.upload_form_button_reset}
          >
            リセット
          </button>
        )}
      </div>

      {/* プレビュー画像表示 */}
      {hasPreview && (
        <div className={styles.uploadedImageContainer}>
          <p>プレビュー:</p>
          <div className={styles.uploadedImage}>
            <Image
              src={previewUrl}
              width={300}
              height={300}
              alt={fileName || "プレビュー画像"}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      )}

      {/* 既存の画像表示（value.imageUrlから） */}
      {hasUploadedImage && !hasPreview && (
        <div className={styles.uploadedImageContainer}>
          <p>選択済み画像:</p>
          <div className={styles.uploadedImage}>
            <Image
              src={value.imageUrl}
              width={300}
              height={300}
              alt={value.imageAlt || "選択済み画像"}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      )}
    </div>
  );
});

ImageUploadComponent.displayName = "ImageUploadComponent";

export default ImageUploadComponent;
