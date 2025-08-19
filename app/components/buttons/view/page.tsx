import { MainButton, MainLinkButton } from "@/app/components/buttons/page";
import { PageTitle } from "@/app/components/title/page";

import styles from "@/app/styles/Pages.module.css";
const ButtonView = () => {
  const value = `/list`;
  return (
    <div className={styles.listPageContents}>
      <h1>
        <PageTitle value="List Page" />
      </h1>
      <MainButton
        sizeValue="large"
        textValue="削除"
        buttonColor="btn-danger"
        widthValue="widthAuto;"
      />
      <MainButton
        sizeValue="middle"
        textValue="削除"
        buttonColor="btn-danger"
        widthValue="widthAuto"
      />
      <MainButton
        sizeValue="large"
        textValue="PDFをダウンロード"
        buttonColor="btn-main"
        widthValue="widthAuto"
      />
      <MainButton
        sizeValue="large"
        textValue="Switch to Self Ver."
        buttonColor="btn-success"
        widthValue="widthAuto"
      />
      <MainButton
        sizeValue="large"
        textValue="Switch to Shop Ver."
        buttonColor="btn-success"
        widthValue="widthAuto"
      />
      <MainButton
        sizeValue="large"
        textValue="編集"
        buttonColor="btn-warning"
        widthValue="widthAuto"
      />
      <MainButton
        sizeValue="large"
        textValue="保存"
        buttonColor="btn-success"
        widthValue="widthAuto"
      />
      <MainButton
        sizeValue="middle"
        textValue="リセット"
        buttonColor="btn-secondary"
        widthValue="widthAuto"
      />
      <MainButton
        sizeValue="middle"
        textValue="セルフVer"
        buttonColor="btn-success"
        widthValue="widthAuto"
      />
      <MainButton
        sizeValue="middle"
        textValue="お店Ver"
        buttonColor="btn-success"
        widthValue="widthAuto"
      />
      <MainButton
        sizeValue="small"
        textValue="並び替え"
        buttonColor="btn-secondary"
        widthValue="widthAuto"
      />
      <MainButton
        sizeValue="small"
        textValue="検索"
        buttonColor="btn-secondary"
        widthValue="widthAuto"
      />

      <MainLinkButton
        sizeValue="large"
        textValue="編集"
        buttonColor="btn-warning"
        urlValue={`/pages/${value}`}
        widthValue="widthNearlyFull"
      />
    </div>
  );
};
export default ButtonView;
