import { ConnectWalletModal } from "./ConnectWalletModal";

export const contentFromModalType: Record<string, React.ReactNode | undefined> =
  {
    connectWallet: <ConnectWalletModal />,
  };
