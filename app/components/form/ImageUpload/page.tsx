"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/app/styles/Form.module.css";

// モーダルコンポーネントのProps型定義
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

// ImageUploadコンポーネントのProps型を定義
interface ImageUploadProps {
  onChange: (url: string) => void;
}

// ImageUploadコンポーネントの引数にpropsを追加し、型を定義
export const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
  // 状態の型を明示的に指定
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [uploadedUrl, setUploadedUrl] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  // 選択した画像のプレビュー用URLを保存する新しい状態
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // モーダルとメッセージボックスの状態
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showMessageBox, setShowMessageBox] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // uploadedUrlが更新されたらonChangeコールバックを呼び出す
  useEffect(() => {
    if (uploadedUrl) {
      onChange(uploadedUrl);
    }
  }, [uploadedUrl, onChange]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      // ファイルが選択されたらプレビューを表示
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setPreviewUrl(null);
    }
  };

  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };

  const handleUploadConfirm = async () => {
    setShowConfirmModal(false); // 確認モーダルを閉じる

    if (!file || !fileName) {
      setMessage("ファイルと代替テキストは必須です。");
      setShowMessageBox(true);
      return;
    }

    setUploadStatus("uploading");
    setUploadedUrl("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("text", fileName);

      // fetch先のパスをApp RouterのAPIルートに合わせて修正
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setUploadedUrl(data.url);
        setUploadStatus("success");
        setMessage("アップロードが成功しました！");
      } else {
        const errorMessage = data.error || "アップロードに失敗しました。";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("error");
      setMessage(
        `アップロードに失敗しました: ${
          error instanceof Error ? error.message : "不明なエラー"
        }`
      );
    } finally {
      setShowMessageBox(true);
    }
  };

  return (
    <div className={styles.upload_form_image}>
      <div className={styles.upload_form_wrap}>
        <div className={styles.upload_form_item}>
          <label>
            <span>ファイル選択</span>
            <input type="file" onChange={handleFileChange} required />
          </label>
        </div>
        <div className={styles.upload_form_item}>
          <label>
            <span>代替テキスト</span>
            <input
              type="text"
              onChange={handleFileNameChange}
              required
              value={fileName}
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
      {uploadedUrl && (
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
      )}
    </div>
  );
};

export default ImageUpload;
