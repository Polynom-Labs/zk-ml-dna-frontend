import { FC } from "react";
import { Icons } from "@/features/wallet/assets";

import "./ConnectWalletModal.scss";
import { useAleoWallet } from "@/features/wallet/aleo-wallet-provider";

export const ConnectWalletModal: FC = () => {
  const { connect: aleoConnect } = useAleoWallet();

  return (
    <div className="connectWalletModal">
      <div className="connectWalletModal-title">Connect wallet</div>

      <div className="connectWalletModal-content">
        <div onClick={aleoConnect} className="connectWalletModal-item">
          <Icons.Leo />

          <div>Leo Wallet</div>
        </div>
      </div>
    </div>
  );
};
