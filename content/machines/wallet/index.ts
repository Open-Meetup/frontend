import { assign, createMachine, send } from "xstate";
import { ChainName } from "utils/chain";
import {
  getWallet,
  connectWallet,
  disconnectWallet,
  connectToChain,
} from "~/services/wallet";
import type { JsonRpcProvider } from "@ethersproject/providers";
import type { WalletName } from "services/wallet";
import type { DoneInvokeEvent } from "xstate";

const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME as ChainName;

interface ContextInterface {
  walletName: WalletName;
  walletAddress: string;
  wallet: JsonRpcProvider;
  error: string;
}

interface ErrorEvent {
  type: "SHOW_ERROR";
  message: string;
}

export const stateMachine = createMachine({
  predictableActionArguments: true,
  context: {
    walletName: undefined,
    walletAddress: undefined,
    wallet: undefined,
    error: undefined,
  },
  initial: "init",
  states: {
    init: {
      invoke: {
        src: getWallet,
        onDone: {
          target: "connectingChain",
          actions: assign<
            ContextInterface,
            DoneInvokeEvent<{ walletName: WalletName; wallet: JsonRpcProvider }>
          >({
            wallet: (_, event) => event.data.wallet,
            walletName: (_, event) => event.data.walletName,
          }),
        },
        onError: { target: "select" },
      },
    },
    select: {
      on: {
        WALLET_SELECTED: {
          target: "connecting",
          actions: assign<ContextInterface, DoneInvokeEvent<WalletName>>({
            walletName: (_, event) => event.data,
          }),
        },
      },
    },
    connecting: {
      invoke: {
        src: ({ walletName }: ContextInterface) => connectWallet(walletName),
        onDone: {
          target: "connectingChain",
          actions: assign<ContextInterface, DoneInvokeEvent<JsonRpcProvider>>({
            wallet: (_, event) => event.data,
          }),
        },
        onError: {
          target: "select",
          actions: send<ContextInterface, DoneInvokeEvent<ErrorEvent>>(
            (_, event) => ({
              type: "SHOW_ERROR",
              message: event.data.message,
            })
          ),
        },
      },
    },
    disconnecting: {
      invoke: {
        src: disconnectWallet,
        onDone: {
          target: "select",
          actions: assign<ContextInterface, DoneInvokeEvent<string>>({
            walletAddress: (_, event) => undefined,
            walletName: (_, event) => undefined,
            wallet: (_, event) => undefined,
          }),
        },
        onError: {
          target: "init",
          actions: send<ContextInterface, DoneInvokeEvent<ErrorEvent>>(
            (_, event) => ({
              type: "SHOW_ERROR",
              message: event.data.message,
            })
          ),
        },
      },
    },
    connectingChain: {
      invoke: {
        src: async () => connectToChain(chainName),
        onDone: {
          target: "selectingAccount",
        },
        onError: {
          target: "select",
          actions: send<ContextInterface, DoneInvokeEvent<ErrorEvent>>(
            (_, event) => ({
              type: "SHOW_ERROR",
              message: event.data.message,
            })
          ),
        },
      },
    },
    selectingAccount: {
      invoke: {
        src: async ({ wallet }: ContextInterface) => {
          const accounts = await wallet.listAccounts();
          return accounts[0];
        },
        onDone: {
          target: "connected",
          actions: assign<ContextInterface, DoneInvokeEvent<string>>({
            walletAddress: (_, event) => event.data,
          }),
        },
      },
    },
    connected: {
      on: {
        DISCONNECT: {
          target: "disconnecting",
        },
      },
    },
  },
  on: {
    SHOW_ERROR: {
      actions: assign<ContextInterface, ErrorEvent>({
        error: (_, event) => event.message,
      }),
    },
  },
});
