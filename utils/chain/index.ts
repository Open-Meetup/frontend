const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY;

export type ChainName = "mumbai" | "polygon";
type Chain = {
  id: number;
  name: ChainName;
  rpcPrivateUrl: string;
  rpcPublicUrl: string;
};

const CHAINS: Record<ChainName, Chain> = {
  mumbai: {
    id: 80001,
    name: "mumbai",
    rpcPrivateUrl: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
    rpcPublicUrl: "https://matic-mumbai.chainstacklabs.com",
  },
  polygon: {
    id: 137,
    name: "polygon",
    rpcPrivateUrl: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`,
    rpcPublicUrl: "https://polygon-rpc.com",
  },
};

export const getChains = () => CHAINS;

export const getChainDetails = (chainName: ChainName) => CHAINS[chainName];

export const getSupportedChain = () =>
  getChainDetails(process.env.NEXT_PUBLIC_CHAIN_NAME as ChainName);
