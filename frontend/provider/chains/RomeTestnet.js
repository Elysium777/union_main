import { defineChain } from "viem";

export const romeTestnet = defineChain({
  id: 200002,
  name: "Rome Testnet",
  nativeCurrency: { name: "Rome", symbol: "Rome", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rome.testnet.romeprotocol.xyz"] },
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://rome.testnet.romeprotocol.xyz:1000",
    },
  },
  contracts: {
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    },
    ensUniversalResolver: {
      address: "0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da",
      blockCreated: 16773775,
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14353601,
    },
  },
});
