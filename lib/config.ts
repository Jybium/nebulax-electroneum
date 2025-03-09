"use client";

import { http, createStorage, cookieStorage } from "wagmi";
import {
  sepolia,
  bscTestnet,
  blastSepolia,
  Chain as WagmiChain,
} from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

const projectId = "87ccb211c4950e2221125586e8590227";

// Define the custom chain
const electroneum: WagmiChain = {
  id: 5201420,
  name: "Electroneum Testnet",
  nativeCurrency: {
    name: "Electroneum",
    symbol: "ETN",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.ankr.com/electroneum_testnet"] },
    public: { http: ["https://rpc.ankr.com/electroneum_testnet"] },
  },
  blockExplorers: {
    default: {
      name: "Electroneum Testnet Explorer",
      url: "https://blockexplorer.thesecurityteam.rocks/",
    },
  },
  testnet: true,
};

// Add the custom chain to the supported chains array
const supportedChains: WagmiChain[] = [electroneum];

export const config = getDefaultConfig({
  appName: "WalletConnection",
  projectId,
  chains: supportedChains as any,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: supportedChains.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http() }),
    {}
  ),
});
