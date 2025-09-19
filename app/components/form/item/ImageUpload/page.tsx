// =========================
// 完全版：画像アップロードコンポーネント例
// =========================
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { uploadImageFromFile, createImageUrl } from "@/app/lib/IndexedDB";
import type { ImageUploadResult } from "@/app/lib/IndexedDB";
import styles from "@/app/styles/Form.module.css";
interface ImageUploadComponentProps {
  onUploadSuccess?: (result: {
    imageId: string;
    imageUrl: string;
    alt: string;
  }) => void;
  onUploadError?: (error: string) => void;
}
interface ModalProps {
  show: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}
// モーダルコンポーネント
const Modal: React.FC<ModalProps> = ({
  show,
  title,
  message,
  onClose,
  onConfirm,
}) => {
  if (!show) {
    return null;
  }
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
// メッセージボックスコンポーネントのProps型定義
interface MessageBoxProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

// メッセージボックスコンポーネント
const MessageBox: React.FC<MessageBoxProps> = ({ show, message, onClose }) => {
  if (!show) {
    return null;
  }
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

const ImageUploadComponent: React.FC<ImageUploadComponentProps> = ({
  onUploadSuccess,
  onUploadError,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [uploadedUrl, setUploadedUrl] = useState<string>("");
  const [uploadedAlt, setUploadedAlt] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showMessageBox, setShowMessageBox] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // ファイル選択ハンドラー
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name.split(".")[0]); // 拡張子を除いたファイル名をデフォルトに

      // プレビュー表示
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // アップロード確認
  const handleUploadClick = () => {
    if (!file || !fileName.trim()) {
      setMessage("ファイルと代替テキストは必須です。");
      setShowMessageBox(true);
      return;
    }
    setShowConfirmModal(true);
  };

  // アップロード実行
  const handleUploadConfirm = async () => {
    setShowConfirmModal(false);

    if (!file || !fileName) {
      setMessage("ファイルと代替テキストは必須です。");
      setShowMessageBox(true);
      return;
    }

    setUploadStatus("uploading");
    setUploadedUrl("");
    setUploadedAlt("");

    try {
      // IndexedDBに画像をアップロード
      const uploadResult = await uploadImageFromFile(file, {
        maxSize: 5 * 1024 * 1024, // 5MB制限
        allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
        quality: 0.8,
        maxWidth: 1920,
        maxHeight: 1920,
      });

      if (uploadResult.success && uploadResult.imageId) {
        // 画像URLを生成
        const imageUrl = await createImageUrl(uploadResult.imageId);

        if (imageUrl) {
          setUploadedUrl(imageUrl);
          setUploadedAlt(fileName);
          setUploadStatus("success");
          setMessage("アップロードが成功しました！");

          // 成功時のコールバック
          if (onUploadSuccess) {
            onUploadSuccess({
              imageId: uploadResult.imageId,
              imageUrl: imageUrl,
              alt: fileName,
            });
          }
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

      // エラー時のコールバック
      if (onUploadError) {
        onUploadError(errorMsg);
      }
    } finally {
      setShowMessageBox(true);
    }
  };

  // リセット
  const handleReset = () => {
    setFile(null);
    setFileName("");
    setUploadStatus("idle");
    setUploadedUrl("");
    setUploadedAlt("");
    setPreviewUrl("");
    setMessage("");
    setShowMessageBox(false);
    setShowConfirmModal(false);
  };

  return (
    <div className={styles.upload_form_image}>
      <div className={styles.upload_form_wrap}>
        <div className={styles.upload_form_item}>
          <label>
            <span>ファイル選択</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploadStatus === "uploading"}
              title="画像ファイルを選択"
              placeholder="画像ファイルを選択"
            />
          </label>
        </div>
        <div className={styles.upload_form_item}>
          <label>
            <span>代替テキスト</span>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="画像の説明を入力してください"
              disabled={uploadStatus === "uploading"}
            />
          </label>
        </div>
        <div className={styles.upload_form_item}>
          <button
            type="button"
            onClick={() => setShowConfirmModal(true)}
            disabled={!file || uploadStatus === "uploading"}
            className={styles.upload_form_button_submit}
          >
            {uploadStatus === "uploading" ? "Uploading..." : "Upload to Blob"}
          </button>
          <button
            onClick={handleReset}
            type="button"
            className={styles.upload_form_button_reset}
          >
            リセット
          </button>
        </div>
      </div>

      {/* 確認モーダル */}
      <Modal
        show={showConfirmModal}
        title="アップロード確認"
        message="この画像をアップロードしますか？"
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleUploadConfirm}
      />

      {/* 通知メッセージボックス */}
      <MessageBox
        show={showMessageBox}
        message={message}
        onClose={() => setShowMessageBox(false)}
      />

      {/* プレビュー画像を表示する部分 */}
      {previewUrl && (
        <div className={styles.uploadedImageContainer}>
          <p>プレビュー:</p>
          <div className={styles.uploadedImage}>
            <Image
              src={previewUrl}
              width={300}
              height={300}
              alt={fileName || "プレビュー画像"}
            />
          </div>
        </div>
      )}

      {/* アップロード成功後の画像表示は引き続きuploadedUrlで管理 */}
      {/* {uploadedUrl && (
        <div className={styles.uploadedImageContainer}>
          <p>アップロード済み:</p>
          <div className={styles.uploadedImage}>
            <Image
              src={uploadedUrl}
              width={300}
              height={300}
              alt={fileName || "アップロード済み画像"}
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ImageUploadComponent;
