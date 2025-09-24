import { ReactNode } from "react";
import HeaderComponent from "../components/header/header";
export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HeaderComponent />

      {children}
    </>
  );
}
