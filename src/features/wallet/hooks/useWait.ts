import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { useCallback, useMemo, useRef, useState } from "react";

export enum TransactionStatus {
  DownloadingProverFiles = "Downloading Prover Files",
  GeneratingTransaction = "Generating Transaction",
  Broadcasting = "Broadcasting",
  Failed = "Failed",
  Completed = "Completed",
}

interface UseWaitAguments {
  poolingInterval?: number | null;
}

export const useWait = ({ poolingInterval }: UseWaitAguments) => {
  const { transactionStatus } = useWallet();
  const [status, setStatus] = useState<TransactionStatus | null>(null);
  const [error, setError] = useState<unknown>(null);
  const ref = useRef<null | NodeJS.Timer>(null);

  const wait = useCallback(
    async (transactionId: string) => {
      setError(null);

      return await new Promise((resolve, reject) => {
        try {
          if (ref.current) {
            // @ts-ignore
            clearInterval(ref.current);
          }

          if (transactionStatus) {
            ref.current = setInterval(async () => {
              const status = (await transactionStatus(
                transactionId
              )) as TransactionStatus;

              setStatus(status);

              if (
                (status === TransactionStatus.Failed ||
                  status === TransactionStatus.Completed) &&
                ref.current
              ) {
                // @ts-ignore
                clearInterval(ref.current);

                if (status === TransactionStatus.Failed) {
                  setError(status);
                  reject(status);
                }

                if (status === TransactionStatus.Completed) {
                  resolve(status);
                }
              }
            }, poolingInterval ?? 1000);
          }
        } catch (error) {
          setError(error);
          reject(error);
        }
      });
    },
    [poolingInterval, transactionStatus]
  );

  return useMemo(() => ({ status, error, wait }), [status, error, wait]);
};
