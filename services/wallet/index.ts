import { ethers } from "ethers";
import { ChainName, getChains, getSupportedChain } from "utils/chain";
import type { Web3Provider } from "@ethersproject/providers";
import type { BaseProvider } from "@metamask/providers";

const INFURA_KEY = process.env.NEXT_PUBLIC_CHAIN_ID;

export type WalletName = "metamask" | "walletConnect";

interface LocalWallet {
  name: WalletName;
}

const LOCAL_STORAGE_KEY = "wallet";
let globalProvider: Web3Provider;

async function connectToMetamask() {
  try {
    const ethereum = window.ethereum as BaseProvider;
    await ethereum.request({ method: "eth_requestAccounts" });
    ethereum.on("accountsChanged", () => window.location.reload());
    ethereum.on("chainChanged", () => window.location.reload());
    ethereum.on("connect", () => window.location.reload());
    return ethereum;
  } catch (e) {
    throw Error("CANNOT_CONNECT_TO_METAMASK");
  }
}

async function connectToWalletConnect() {
  // load library async
  try {
    const WalletConnectProvider = (await import("@walletconnect/web3-provider"))
      .default;
    const chains = getChains();
    const provider = new WalletConnectProvider({
      rpc: Object.keys(chains).reduce(
        (acc, chainName) => ({
          ...acc,
          [chains[chainName].id]: chains[chainName].rpcPrivateUrl,
        }),
        {}
      ),
      infuraId: INFURA_KEY,
    });
    await provider.enable();
    provider.on("accountsChanged", () => window.location.reload());
    provider.on("chainChanged", () => window.location.reload());
    return provider;
  } catch (e) {
    throw Error("CANNOT_CONNECT_TO_WALLETCONNECT");
  }
}

export async function getWallet() {
  const wallet: LocalWallet | null = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY)
  );
  if (!wallet) {
    throw Error("WALLET_UNCONNECTED");
  }

  return {
    walletName: wallet.name,
    wallet: globalProvider || (await connectWallet(wallet.name)),
  };
}

export async function connectWallet(name: WalletName) {
  let provider;

  switch (name) {
    case "metamask":
      provider = await connectToMetamask();
      break;
    case "walletConnect":
      provider = await connectToWalletConnect();
      break;
  }

  globalProvider = new ethers.providers.Web3Provider(provider);
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({
      name,
    })
  );
  return globalProvider;
}

export async function disconnectWallet() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  // @ts-expect-error Only some providers have disconnect method
  if (globalProvider.provider.disconnect) {
    // @ts-expect-error
    globalProvider.provider.disconnect();
  }
  globalProvider = undefined;
  Promise.resolve();
}

export async function connectToChain(name: ChainName) {
  const connectedChain = await globalProvider.getNetwork();
  const supportedChain = getSupportedChain();
  if (connectedChain.chainId === supportedChain.id) {
    return;
  }
  try {
    await globalProvider.send("wallet_switchEthereumChain", [
      {
        chainId: `0x${supportedChain.id.toString(16)}`,
      },
    ]);
    console.log(await globalProvider.send("eth_chainId", []));
  } catch (e) {
    // missing chain in wallet
    if (e.code === 4902) {
      await globalProvider.send("wallet_addEthereumChain", [
        {
          chainId: `0x${supportedChain.id.toString(16)}`,
          chainName: supportedChain.name,
          rpcUrls: [supportedChain.rpcPublicUrl],
        },
      ]);
    }
    throw Error("CANNOT_SWITCH_CHAIN");
  }
}
