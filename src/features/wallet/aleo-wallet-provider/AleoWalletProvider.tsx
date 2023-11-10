"use client";
import { FC, useCallback, useEffect, useState } from "react";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { LeoWalletName } from "@demox-labs/aleo-wallet-adapter-leo";
import { AleoWalletContext } from "./AleoWalletProvider.hooks";
import {
  Transaction,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { Token } from "../types";
import { config } from "../config";
import { fromDecimals, toDecimals } from "../utils";
import { useWait } from "../hooks";
import { useModalStore } from "@/features/modal";
import { tokenFromTokenId } from "./AleoWalletProvider.mappers";
import { useQuery } from "@tanstack/react-query";
import { fetchPrivateSwapData, fetchPublicBalance } from "../api/aleo";
// import { useWalletStore } from 'features/wallet';
import __wbg_init, { bhp256 } from "js-snarkvm";

const TRANSACTION_FEE = 5_500_000;

// (() => {
//     __wbg_init().then(async () => {
//         const b = bhp256(
//             'aleo14k6t50pt4cul55t32nf2t3m87zj6urtlfgpe6vg6xwrxxxdh9uxqaywt03',
//         );
//         console.log(b);
//     });
// })();

export const AleoWalletProvider: FC<any> = ({ children }) => {
  const {
    publicKey,
    select,
    wallet,
    requestRecords,
    requestTransaction,
    transactionStatus,
    disconnect: aleoDisconnect,
  } = useWallet();
  const [balance, setBalance] = useState<any>({});

  const { data: publicBalance, refetch: refetchPublicBalance } = useQuery({
    queryKey: ["publicBalance", publicKey],
    queryFn: () => publicKey && fetchPublicBalance(publicKey),
    enabled: !!publicKey,
    refetchInterval: 10_000,
  });

  const fetchBalanceByContract = useCallback(
    async (contract: string) => {
      if (publicKey && requestRecords) {
        const records = await requestRecords(contract);

        const balance = records.reduce((acc, record) => {
          const newAcc = JSON.parse(JSON.stringify(acc));

          const { data, spent } = record;

          const tokenId = data.token_id.replace(".private", "");
          const token = Number(tokenFromTokenId[tokenId]);
          const amount = Number(data.amount.replace("u128.private", ""));
          // @ts-ignore
          const balance = fromDecimals(amount, config[token].decimals);

          if (spent) {
            return newAcc;
          }

          if (!newAcc[token]) {
            newAcc[token] = {
              records: [{ ...record, amount, balance }],
              tokenId,
              balance,
              amount,
            };
          } else {
            newAcc[token].balance += balance;
            newAcc[token].amount += amount;
            newAcc[token].records.push({
              ...record,
              amount,
              balance,
            });
          }

          return newAcc;
        }, {});

        setBalance(balance);
      }
    },
    [requestRecords, publicKey]
  );

  useEffect(() => {
    if (publicKey) {
      fetchBalanceByContract(config.private.contract);
    }
  }, [fetchBalanceByContract, publicKey]);

  const disconnect = useCallback(async () => {
    await aleoDisconnect();
  }, [aleoDisconnect]);

  const { wait, status } = useWait({
    poolingInterval: 1000,
  });

  const { showModal, closeModal, updateModalState, modalType } =
    useModalStore();

  useEffect(() => {
    if (modalType === "transactionLoader" && status) {
      updateModalState({ transactionStatus: status });
    }
  }, [status]);

  // const setSelectedWallet = useWalletStore(
  //     (state) => state.setSelectedWallet,
  // );

  const connect = useCallback(() => {
    try {
      select(LeoWalletName);

      closeModal();

      // setSelectedWallet('aleo');
    } catch (err) {}
  }, [select, closeModal]);

  // const privateFaucet = useCallback(
  //     async (amount: number | string, token: Token) => {
  //         try {
  //             showModal({
  //                 modalType: 'transactionLoader',
  //                 modalState: {},
  //             });

  //             if (publicKey) {
  //                 const inputs = [
  //                     publicKey,
  //                     config[token].privateKey,
  //                     `${toDecimals(
  //                         Number(amount),
  //                         config[token].decimals,
  //                     )}u128`,
  //                 ];

  //                 const aleoTransaction = Transaction.createTransaction(
  //                     publicKey,
  //                     WalletAdapterNetwork.Testnet,
  //                     config.private.contract,
  //                     config.private.mint,
  //                     inputs,
  //                     TRANSACTION_FEE,
  //                 );

  //                 if (requestTransaction) {
  //                     const txId = await requestTransaction(aleoTransaction);

  //                     await wait(txId);
  //                 }

  //                 await fetchBalanceByContract(config.private.contract);
  //             }
  //         } catch (error) {
  //         } finally {
  //             closeModal();
  //         }
  //     },
  //     [
  //         closeModal,
  //         publicKey,
  //         requestTransaction,
  //         showModal,
  //         wait,
  //         fetchBalanceByContract,
  //     ],
  // );

  // const publicFaucet = useCallback(
  //     async (amount: string, token: Token) => {
  //         try {
  //             showModal({
  //                 modalType: 'transactionLoader',
  //                 modalState: {},
  //             });

  //             const nAmount = toDecimals(
  //                 Number(amount),
  //                 config[token].decimals,
  //             );

  //             if (publicKey) {
  //                 const inputs = [
  //                     config[token].publicField,
  //                     publicKey,
  //                     `${nAmount}u128`,
  //                 ];

  //                 const aleoTransaction = Transaction.createTransaction(
  //                     publicKey,
  //                     WalletAdapterNetwork.Testnet,
  //                     config.public.contract,
  //                     config.public.mint,
  //                     inputs,
  //                     TRANSACTION_FEE,
  //                 );

  //                 if (requestTransaction) {
  //                     const txId = await requestTransaction(aleoTransaction);

  //                     await wait(txId);

  //                     await refetchPublicBalance();
  //                 }
  //             }
  //         } catch (error) {
  //             console.log(error);
  //         } finally {
  //             closeModal();
  //         }
  //     },
  //     [
  //         closeModal,
  //         publicKey,
  //         requestTransaction,
  //         showModal,
  //         wait,
  //         refetchPublicBalance,
  //     ],
  // );

  // const publicAddLiquidity = useCallback(
  //     async (
  //         amountIn: string,
  //         amountOut: string,
  //         tokenIn: Token,
  //         tokenOut: Token,
  //     ) => {
  //         try {
  //             showModal({
  //                 modalType: 'transactionLoader',
  //                 modalState: {},
  //             });

  //             const nAmountIn = toDecimals(
  //                 Number(amountIn),
  //                 config[tokenIn].decimals,
  //             );
  //             const nAmountOut = toDecimals(
  //                 Number(amountOut),
  //                 config[tokenOut].decimals,
  //             );

  //             if (publicKey) {
  //                 const inputs = [
  //                     config[tokenIn].publicField,
  //                     config[tokenOut].publicField,
  //                     `${nAmountIn}u128`,
  //                     `${nAmountOut}u128`,
  //                     `0u128`,
  //                     `0u128`,
  //                     publicKey,
  //                 ];

  //                 const aleoTransaction = Transaction.createTransaction(
  //                     publicKey,
  //                     WalletAdapterNetwork.Testnet,
  //                     config.public.contract,
  //                     config.public.addLiquidity,
  //                     inputs,
  //                     9_000_000,
  //                 );

  //                 if (requestTransaction) {
  //                     const txId = await requestTransaction(aleoTransaction);

  //                     await wait(txId);

  //                     await refetchPublicBalance();
  //                 }
  //             }
  //         } catch (error) {
  //             console.log(error);
  //         } finally {
  //             closeModal();
  //         }
  //     },
  //     [
  //         closeModal,
  //         publicKey,
  //         requestTransaction,
  //         showModal,
  //         wait,
  //         refetchPublicBalance,
  //     ],
  // );

  return (
    <AleoWalletContext.Provider
      value={{
        connect,
        address: publicKey,
        icon: wallet?.adapter.icon,
        balance,
        // publicFaucet,
        // privateFaucet,
        publicBalance,
        // publicAddLiquidity,
        disconnect,
      }}
    >
      {children}
    </AleoWalletContext.Provider>
  );
};