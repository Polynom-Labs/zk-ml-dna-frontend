import { FC, PropsWithChildren } from "react";
import cn from "classnames";
import { Wallet } from "@/features/wallet/Wallet";
import { useWallet } from "@/features/wallet/hooks/useWallet";
import styles from "./ProtectContent.module.scss";

type ProtectContentProps = {};

export const ProtectContent: FC<PropsWithChildren<ProtectContentProps>> = ({
  children,
}) => {
  const { address } = useWallet()();

  return (
    <>
      {!address ? (
        <div className={styles.container}>
          <div className={styles.content}>
            <h2 className={styles.title}>
              Please, connect wallet for create new research
            </h2>
            <div className={styles.wallet}>
              <Wallet />
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};
