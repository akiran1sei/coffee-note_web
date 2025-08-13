import { MainButton, MainLinkButton } from "@/app/components/buttons/page";
import { PageTitle } from "@/app/components/title/page";

import styles from "@/app/styles/Pages.module.css";
const ListPage = () => {
  const value = `/list`;
  return (
    <div className={styles.listPageContents}>
      <h1>
        <PageTitle value="List Page" />
      </h1>
      <MainButton sizeValue="large" textValue="削除" buttonColor="btn-danger" />
      <MainButton
        sizeValue="middle"
        textValue="削除"
        buttonColor="btn-danger"
      />
      <MainButton
        sizeValue="large"
        textValue="PDFをダウンロード"
        buttonColor="btn-main"
      />
      <MainButton
        sizeValue="large"
        textValue="編集"
        buttonColor="btn-warning"
      />
      <MainButton
        sizeValue="large"
        textValue="保存"
        buttonColor="btn-success"
      />
      <MainButton
        sizeValue="middle"
        textValue="リセット"
        buttonColor="btn-secondary"
      />
      <MainButton
        sizeValue="middle"
        textValue="セルフVer"
        buttonColor="btn-success"
      />
      <MainButton
        sizeValue="middle"
        textValue="お店Ver"
        buttonColor="btn-success"
      />
      <MainButton
        sizeValue="small"
        textValue="並び替え"
        buttonColor="btn-secondary"
      />
      <MainButton
        sizeValue="small"
        textValue="検索"
        buttonColor="btn-secondary"
      />

      <MainLinkButton
        sizeValue="large"
        textValue="編集"
        buttonColor="btn-warning"
        urlValue={`/pages/${value}`}
      />
    </div>
  );
};
export default ListPage;
