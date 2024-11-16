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
          projectId: "32c27f9ae960e76b42818bcc3a60ea05",
          appName: "Union",
          chains: [
            flareTestnet,
            romeTestnet,
            flowTestnet,
            scrollSepolia,
            baseSepolia,
            rootstockTestnet,
            zircuitTestnet,
          ],
          transports: {
            [flareTestnet.id]: http(),
            [romeTestnet.id]: http(),
            [flowTestnet.id]: http(),
            [scrollSepolia.id]: http(),
            [baseSepolia.id]: http(),
            [rootstockTestnet.id]: http(),
            [zircuitTestnet.id]: http(),
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
