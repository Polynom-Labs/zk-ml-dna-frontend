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

class AnswersStruct {
  diseased: string;
  age: string;
  gender: string;

  constructor(diseased: number, age: number, gender: number) {
    this.diseased = diseased + "i8";
    this.age = age + "i8";
    this.gender = gender + "i8";
  }
}

class BiometricStruct {
  x0: string;
  x1: string;
  x2: string;
  x3: string;
  x4: string;
  x5: string;
  x6: string;
  x7: string;
  x8: string;
  x9: string;
  x10: string;
  x11: string;
  x12: string;
  x13: string;
  x14: string;

  constructor(
    data: Array<number>
  ) {
    this.x0 = data[0] + "i8";
    this.x1 = data[1] + "i8";
    this.x2 = data[2] + "i8";
    this.x3 = data[3] + "i8";
    this.x4 = data[4] + "i8";
    this.x5 = data[5] + "i8";
    this.x6 = data[6] + "i8";
    this.x7 = data[7] + "i8";
    this.x8 = data[8] + "i8";
    this.x9 = data[9] + "i8";
    this.x10 = data[10] + "i8";
    this.x11 = data[11] + "i8";
    this.x12 = data[12] + "i8";
    this.x13 = data[13] + "i8";
    this.x14 = data[14] + "i8";
  }
}
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

  // const { data: publicBalance, refetch: refetchPublicBalance } = useQuery({
  //   queryKey: ["publicBalance", publicKey],
  //   queryFn: () => publicKey && fetchPublicBalance(publicKey),
  //   enabled: !!publicKey,
  //   refetchInterval: 10_000,
  // });

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

  // useEffect(() => {
  //   if (publicKey) {
  //     fetchBalanceByContract(config.private.contract);
  //   }
  // }, [fetchBalanceByContract, publicKey]);

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

  const submitBiometricData = useCallback(
    async (age: number, diseased: number, gender: number, biometric_data: Array<number>) => {
        try {
            showModal({
                modalType: 'transactionLoader',
                modalState: {},
            });

            if (publicKey) {
              // struct sample:
              let answers_struct =  new AnswersStruct(diseased, age, gender);

                let biometrict_struct = new BiometricStruct(biometric_data);
                const inputs = [
                    JSON.stringify(answers_struct),
                    JSON.stringify(biometrict_struct)
                ];

                console.log('aleo inputs: ' + JSON.stringify(inputs));

                const aleoTransaction = Transaction.createTransaction(
                    publicKey,
                    WalletAdapterNetwork.Testnet,
                    "zk_ml_dna_v0.aleo",
                    "submit",
                    inputs,
                    TRANSACTION_FEE,
                    false
                );

                console.log('aleo tx: ' + JSON.stringify(aleoTransaction));

                if (requestTransaction) {
                    const txId = await requestTransaction(aleoTransaction);
                    await wait(txId);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            closeModal();
        }
    },
    [
        closeModal,
        publicKey,
        requestTransaction,
        showModal,
        wait
    ]
);

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
        submitBiometricData,
        // publicFaucet,
        // privateFaucet,
        // publicBalance,
        // publicAddLiquidity,
        disconnect,
      }}
    >
      {children}
    </AleoWalletContext.Provider>
  );
};
