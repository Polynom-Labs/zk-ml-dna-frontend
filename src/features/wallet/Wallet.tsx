"use client";
import React, { FC, useMemo } from "react";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { RequestRecords } from "./RequestRecords";
import "@demox-labs/aleo-wallet-adapter-reactui/styles.css";

export const Wallet: FC = () => {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "Polynom Labs",
      }),
    ],
    []
  );

  return (
    <WalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.UponRequest}
      network={WalletAdapterNetwork.Testnet}
      autoConnect
    >
      <WalletModalProvider>
        <RequestRecords />
      </WalletModalProvider>
    </WalletProvider>
  );
};
