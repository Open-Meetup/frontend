import React, { ReactNode } from "react";
import { WalletStateProvider } from "~/content/machines/wallet/provider";
import Header from "../Header";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => (
  <WalletStateProvider>
    <Header />
    <main>{children}</main>
  </WalletStateProvider>
);

export default Layout;
