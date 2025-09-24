import styles from "@/app/styles/TitleText.module.css";

interface TitleTextProps {
  value: string;
}

export const AppTitle: React.FC<TitleTextProps> = ({ value }) => {
  return (
    <div className={styles.appTitle}>
      <p className={styles.appTitleText}>{value}</p>
    </div>
  );
};

export const PageTitle: React.FC<TitleTextProps> = ({ value }) => {
  return (
    <div className={styles.pageTitle}>
      <p className={styles.pageTitleText}>{value}</p>
    </div>
  );
};
