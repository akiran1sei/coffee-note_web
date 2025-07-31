import { ReactNode } from "react";
import HeaderComponent from "../components/header/page";

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HeaderComponent />
      {children}
    </>
  );
}
