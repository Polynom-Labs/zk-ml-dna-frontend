import { FC, useCallback } from "react";
import cn from "classnames";
import { Address } from "./ui/address";
import { useWallet } from "./hooks/useWallet";

import "./Wallet.scss";
import { useModalStore } from "@/features/modal";

export const Wallet: FC = () => {
  const { address, icon, disconnect } = useWallet()();
  console.log("🚀 ~ address:", address);
  const showModal = useModalStore((store) => store.showModal);

  const connectClickCallback = useCallback(() => {
    showModal({
      modalState: {},
      modalType: "connectWallet",
    });
  }, [showModal]);

  const disconnectHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();

      if (disconnect) {
        disconnect();
      }
    },
    [disconnect]
  );

  return (
    <div
      onClick={connectClickCallback}
      className={cn({ connected: !!address })}
    >
      {address ? (
        <>
          <img style={{ marginLeft: 8 }} src={icon} alt="aleo" />

          <Address address={address} />

          <div onClick={disconnectHandler} className="disconnect">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1624_4744)">
                <path
                  d="M4.66634 4C3.85727 4.68318 3.27765 5.59847 3.00596 6.62196C2.73427 7.64544 2.78362 8.7277 3.14734 9.72221C3.51106 10.7167 4.17158 11.5754 5.03948 12.1822C5.90738 12.7889 6.94074 13.1142 7.99968 13.1142C9.05861 13.1142 10.092 12.7889 10.9599 12.1822C11.8278 11.5754 12.4883 10.7167 12.852 9.72221C13.2157 8.7277 13.2651 7.64544 12.9934 6.62196C12.7217 5.59847 12.1421 4.68318 11.333 4"
                  stroke="#17171A"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M8 2.66797V8.0013"
                  stroke="#17171A"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_1624_4744">
                  <rect width="16" height="16" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
        </>
      ) : (
        "Connect wallet"
      )}
    </div>
  );
};
