"use client";
import { FC, PropsWithChildren, useState } from "react";
import { AleoProvider } from "@/features/wallet/AleoProvider";
import { AleoWalletProvider } from "@/features/wallet/aleo-wallet-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Modal } from "@/features/modal/Modal";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AleoProvider>
        <AleoWalletProvider>
          {children}
          <Modal />
        </AleoWalletProvider>
      </AleoProvider>
    </QueryClientProvider>
  );
};
