import { MainButton } from "@/app/components/buttons/page";

const ListPage = () => {
  return (
    <div>
      <h1>List Page</h1>
      <p>This is the list page content.</p>
      {/* 他のコンテンツやコンポーネントをここに追加 */}
      <MainButton sizeValue="large" textValue="ラージボタン" />
      <MainButton sizeValue="large" textValue="ラージボタン" />
      <MainButton sizeValue="large" textValue="ラージボタン" />
    </div>
  );
};
export default ListPage;
