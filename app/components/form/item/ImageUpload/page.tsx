"use client";
import React, {
  useState,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Image from "next/image";
import { uploadImageFromFile, createImageUrl } from "@/app/lib/IndexedDB";
import type { ImageUploadResult } from "@/app/lib/IndexedDB";
import styles from "@/app/styles/Form.module.css";

// 画像データの型定義
export interface ImageFormData {
  imageId: string | null;
  imageUrl: string;
  imageAlt: string;
  hasImage: boolean;
}

// 新しいpropsの型定義
export interface ImageUploadComponentProps {
  value: ImageFormData;
  onChange: (imageData: ImageFormData) => void;
  onUploadError?: (error: string) => void;
  disabled?: boolean;
  required?: boolean;
}

// 外部から呼び出すための関数を定義
export interface ImageUploadRef {
  triggerUpload: () => Promise<ImageFormData | null>;
  reset: () => void;
}

interface ModalProps {
  show: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

interface MessageBoxProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

// モーダルコンポーネント
const Modal: React.FC<ModalProps> = ({
  show,
  title,
  message,
  onClose,
  onConfirm,
}) => {
  if (!show) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
        </div>
        <div className={styles.modalBody}>
          <p>{message}</p>
        </div>
        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.modalCancelButton}>
            キャンセル
          </button>
          <button onClick={onConfirm} className={styles.modalConfirmButton}>
            アップロード
          </button>
        </div>
      </div>
    </div>
  );
};

// メッセージボックスコンポーネント
const MessageBox: React.FC<MessageBoxProps> = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div className={styles.messageOverlay}>
      <div className={styles.messageContent}>
        <div className={styles.messageHeader}>
          <h2>通知</h2>
        </div>
        <div className={styles.messageBody}>
          <p>{message}</p>
        </div>
        <div className={styles.messageFooter}>
          <button onClick={onClose} className={styles.messageCloseButton}>
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

const ImageUploadComponent = forwardRef<
  ImageUploadRef,
  ImageUploadComponentProps
>(
  (
    { value, onChange, onUploadError, disabled = false, required = false },
    ref
  ) => {
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>(value.imageAlt || "");
    const [uploadStatus, setUploadStatus] = useState<
      "idle" | "uploading" | "success" | "error"
    >("idle");
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [showMessageBox, setShowMessageBox] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [previewUrl, setPreviewUrl] = useState<string>("");

    useEffect(() => {
      if (value.hasImage && value.imageUrl) {
        setUploadStatus("success");
        setFileName(value.imageAlt || "");
      } else {
        setUploadStatus("idle");
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
          const nameWithoutExtension = selectedFile.name
            .split(".")
            .slice(0, -1)
            .join(".");
          const defaultAlt = nameWithoutExtension || selectedFile.name;
          setFileName(defaultAlt);
          const reader = new FileReader();
          reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string);
          };
          reader.readAsDataURL(selectedFile);
          // 修正: この部分を削除
          // if (value.hasImage) {
          //   notifyParent({
          //     imageId: null,
          //     imageUrl: "",
          //     imageAlt: defaultAlt,
          //     hasImage: false,
          //   });
          // }
          setUploadStatus("idle");
        }
      },
      []
    );

    // Alt テキスト変更ハンドラー
    const handleAltTextChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAlt = e.target.value;
        setFileName(newAlt);
        if (value.hasImage) {
          notifyParent({ imageAlt: newAlt });
        }
      },
      [value.hasImage, notifyParent]
    );

    // 新規追加: 外部から呼び出すためのアップロード処理
    const triggerUpload =
      useCallback(async (): Promise<ImageFormData | null> => {
        if (!file || !fileName.trim()) {
          const message = "ファイルと代替テキストは必須です。";
          setMessage(message);
          setShowMessageBox(true);
          if (onUploadError) onUploadError(message);
          return null;
        }

        setUploadStatus("uploading");

        try {
          const uploadResult = await uploadImageFromFile(file, {
            maxSize: 5 * 1024 * 1024,
            allowedTypes: [
              "image/jpeg",
              "image/png",
              "image/webp",
              "image/gif",
            ],
            quality: 0.8,
            maxWidth: 1920,
            maxHeight: 1920,
          });

          if (uploadResult.success && uploadResult.imageId) {
            const imageUrl = await createImageUrl(uploadResult.imageId);
            if (imageUrl) {
              const uploadedData = {
                imageId: uploadResult.imageId,
                imageUrl: imageUrl,
                imageAlt: fileName,
                hasImage: true,
              };
              notifyParent(uploadedData);
              setUploadStatus("success");
              setPreviewUrl("");
              setMessage("アップロードが成功しました！");
              setShowMessageBox(true);
              return uploadedData;
            } else {
              throw new Error("画像URLの生成に失敗しました");
            }
          } else {
            const errorMessage =
              uploadResult.error || "アップロードに失敗しました。";
            throw new Error(errorMessage);
          }
        } catch (error) {
          console.error("Error uploading file:", error);
          setUploadStatus("error");
          const errorMsg = `アップロードに失敗しました: ${
            error instanceof Error ? error.message : "不明なエラー"
          }`;
          setMessage(errorMsg);
          setShowMessageBox(true);
          if (onUploadError) onUploadError(errorMsg);
          return null;
        }
      }, [file, fileName, notifyParent, onUploadError]);

    // リセット関数
    const reset = useCallback(() => {
      setFile(null);
      setFileName("");
      setUploadStatus("idle");
      setPreviewUrl("");
      setMessage("");
      setShowMessageBox(false);

      notifyParent({
        imageId: null,
        imageUrl: "",
        imageAlt: "",
        hasImage: false,
      });

      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    }, [notifyParent]);

    // forwardRefとuseImperativeHandleを使って、親コンポーネントに関数を公開
    useImperativeHandle(ref, () => ({
      triggerUpload,
      reset,
    }));

    const isUploading = uploadStatus === "uploading";
    const hasUploadedImage = value.hasImage && Boolean(value.imageUrl);
    const hasPreview = Boolean(previewUrl) && !hasUploadedImage;
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
                disabled={disabled || isUploading}
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
                disabled={disabled || isUploading}
              />
            </label>
          </div>

          {/* 独立したアップロードボタンを削除しました */}

          {(hasUploadedImage || isFileSelected) && (
            <button
              onClick={reset}
              type="button"
              disabled={disabled || isUploading}
              className={styles.upload_form_button_reset}
            >
              リセット
            </button>
          )}
        </div>

        {/* 通知メッセージボックス */}
        <MessageBox
          show={showMessageBox}
          message={message}
          onClose={() => setShowMessageBox(false)}
        />

        {/* プレビュー画像を表示する部分 */}
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

        {/* アップロード成功後の画像表示 */}
        {hasUploadedImage && (
          <div className={styles.uploadedImageContainer}>
            <p>アップロード済み:</p>
            <div className={styles.uploadedImage}>
              <Image
                src={value.imageUrl}
                width={300}
                height={300}
                alt={value.imageAlt || "アップロード済み画像"}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        )}

        {/* ステータス表示 */}
        {uploadStatus === "uploading" && (
          <div className={styles.info_message}>アップロード中...</div>
        )}
        {uploadStatus === "error" && (
          <div className={styles.error_message}>
            アップロードでエラーが発生しました
          </div>
        )}
      </div>
    );
  }
);

ImageUploadComponent.displayName = "ImageUploadComponent";

export default ImageUploadComponent;
