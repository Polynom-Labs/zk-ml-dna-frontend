import { FC, useMemo } from "react";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";

export const AleoProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "Leo Wallet",
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
      {children}
    </WalletProvider>
  );
};
