import { useInterpret } from "@xstate/react";
import React, { createContext, ReactNode, useMemo } from "react";
import type { InterpreterFrom } from "xstate";
import { stateMachine } from "./index";

export const WalletStateContext = createContext({
  walletService: {} as InterpreterFrom<typeof stateMachine>,
});

interface Props {
  children: ReactNode;
}

export const WalletStateProvider = ({ children }: Props) => {
  const walletService = useInterpret(stateMachine);
  const providerValue = useMemo(() => ({ walletService }), [walletService]);

  return (
    <WalletStateContext.Provider value={providerValue}>
      {children}
    </WalletStateContext.Provider>
  );
};
