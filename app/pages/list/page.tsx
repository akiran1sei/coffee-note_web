import ButtonView from "@/app/components/buttons/view/page";
import { PageTitle } from "@/app/components/title/page";

import styles from "@/app/styles/Pages.module.css";
const ListPage = () => {
  return (
    <div className={styles.listPageContents}>
      <h1>
        <PageTitle value="List Page" />
      </h1>
      <ButtonView />
    </div>
  );
};
export default ListPage;
