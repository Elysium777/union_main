"use client";

import {
  CapsuleEvmProvider,
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  zerionWallet,
} from "@usecapsule/evm-wallet-connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  baseSepolia,
  flareTestnet,
  flowTestnet,
  lineaSepolia,
  rootstockTestnet,
  scrollSepolia,
  zircuitTestnet,
} from "wagmi/chains";
import { http } from "wagmi";
import { romeTestnet } from "./chains/RomeTestnet";

const queryClient = new QueryClient();

const CapsuleProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CapsuleEvmProvider
        config={{
          projectId: "dbc7bab3406fc9f7af721202c77dbf3c",
          appName: "Test",
          chains: [
            flareTestnet,
            romeTestnet,
            flowTestnet,
            scrollSepolia,
            baseSepolia,
            rootstockTestnet,
            zircuitTestnet,
            lineaSepolia,
          ],
          transports: {
            [flareTestnet.id]: http(),
            [romeTestnet.id]: http(),
            [flowTestnet.id]: http(),
            [scrollSepolia.id]: http(),
            [baseSepolia.id]: http(),
            [rootstockTestnet.id]: http(),
            [zircuitTestnet.id]: http(),
            [lineaSepolia.id]: http(),
          },
          wallets: [
            metaMaskWallet,
            rainbowWallet,
            walletConnectWallet,
            zerionWallet,
            coinbaseWallet,
          ],
        }}
      >
        {children}
      </CapsuleEvmProvider>
    </QueryClientProvider>
  );
};

export default CapsuleProvider;
