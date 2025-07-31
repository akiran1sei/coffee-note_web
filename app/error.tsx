// Error components must be Client Components
"use client";
import styles from "@/app/styles/Error_404.module.css";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className={styles.error_404_page}>
      <h1 className={styles.error_404_title}>
        Something
        <br className={styles.error_404_break} /> went
        <br className={styles.error_404_break} /> wrong!
      </h1>
      <div className={styles.error_404_BtnBox}>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className={styles.error_404_button}
        >
          Try again
        </button>
        <button
          onClick={() => (window.location.href = "/")}
          className={styles.error_404_button}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
