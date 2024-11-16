import React from "react";

import ProposalId from "./ProposalId";
import ProposalStatus from "./ProposalStatus";

import { WalletAddressWithProfile } from "@/components/ui/WalletAddress";

import { ethers } from "ethers";
import config from "@/lib/config";

const ProposalHeading = ({ proposal, chainId }) => {
  const [currentBlock, setCurrentBlock] = React.useState(null);
  const currentChain = config.chains.find((chain) => chain.chainId === chainId);

  const loadCurrentBlock = async () => {
    const provider = new ethers.providers.JsonRpcProvider(currentChain.rpcUrl);

    const blockNumber = await provider.getBlockNumber();
    setCurrentBlock(blockNumber);
  };

  React.useEffect(() => {
    if (currentChain) {
      loadCurrentBlock();
    }
  }, [currentChain]);

  return (
    <div className="py-4 border border-gray-700 rounded-2xl">
      <div className="px-6 space-y-4 pb-4">
        <ProposalStatus
          status={proposal?.endBlock > currentBlock ? "active" : "executed"}
        />

        <h1 className="text-2xl font-bold">{proposal?.metadata?.title}</h1>
      </div>

      <div className="pt-4 px-6 border-t border-gray-700 flex items-center gap-4">
        <div className="flex gap-2 items-center">
          <p>By: </p>
          <WalletAddressWithProfile walletAddress={proposal?.proposer} />
        </div>

        <ProposalId
          proposalId={proposal?.metadata?.id}
          block={proposal?.startBlock}
        />
      </div>
    </div>
  );
};

export default ProposalHeading;
