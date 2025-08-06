import { ReactNode } from "react";
import HeaderComponent from "../components/header/page";
import { UpperButton } from "@/app/components/buttons/upper/page";
export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HeaderComponent />
      <UpperButton />
      {children}
    </>
  );
}
