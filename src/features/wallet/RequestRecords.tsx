"use client";
import React, { FC } from "react";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletNotConnectedError } from "@demox-labs/aleo-wallet-adapter-base";

export const RequestRecords: FC = () => {
  const { publicKey, requestRecords } = useWallet();

  const onClick = async () => {
    const program = "credits.aleo";
    if (!publicKey) throw new WalletNotConnectedError();
    if (requestRecords) {
      const records = await requestRecords(program);
      console.log("Records: " + records);
    }
  };

  return <button onClick={onClick}>Request Records</button>;
};
