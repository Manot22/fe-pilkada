// components/Layout.tsx
import { ReactNode } from "react";
import SideBar from "./SideBar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default Layout;
