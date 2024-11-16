"use client";

import React from "react";
import Link from "next/link";
import { WalletAddressWithProfile } from "@/components/ui/WalletAddress";
import ProposalStatus from "./proposalDetails/ProposalStatus";
import { useSelector } from "react-redux";
import config from "@/lib/config";
import {
  calculateAverageBlockTime,
  formatTimeDifference,
} from "@/utils/BlockUtils";

const ProposalItem = ({
  proposal,
  daoName,
  link,
  isUnion = false,
  unionAddress = null,
}) => {
  const endBlock = proposal.endBlock;
  const [currentBlock, setCurrentBlock] = React.useState(null);
  const [averageBlockTime, setAverageBlockTime] = React.useState(null);
  const chainId = useSelector((state) => state.chain.chainId);
  const currentChain = config.chains.find((chain) => chain.chainId === chainId);

  React.useEffect(() => {
    if (currentChain) {
      calculateAverageBlockTime(
        currentChain,
        setAverageBlockTime,
        setCurrentBlock
      );
    }
  }, [currentChain]);

  return (
    <li
      className={`py-4 px-6 border border-gray-700 rounded-2xl hover:border-gray-400 transition-colors `}
    >
      <Link
        href={`/${link}/${isUnion ? unionAddress : daoName}/proposal/${
          proposal.id
        }`}
        className="space-y-2"
      >
        <div className="flex justify-between">
          <WalletAddressWithProfile
            avatarSize={24}
            walletAddress={proposal.proposer}
          />

          <ProposalStatus
            status={
              currentBlock && endBlock < currentBlock ? "executed" : "active"
            }
          />
        </div>

        <h4 className="text-xl font-semibold">{proposal.metadata.title}</h4>

        <p className="text-gray-200 line-clamp-3">
          {proposal.metadata.description}
        </p>

        <div className="flex justify-between">
          <div className="text-gray-400 font-medium">
            {`${endBlock > currentBlock ? "Ends" : "Ended"}  ${
              averageBlockTime &&
              currentBlock &&
              formatTimeDifference(currentBlock, averageBlockTime, endBlock)
                ? formatTimeDifference(currentBlock, averageBlockTime, endBlock)
                : "N/A"
            }`}
          </div>

          {/* <p className="text-gray-500">
            {proposal.numberOfAddressesVoted} addresses voted
          </p> */}
        </div>
      </Link>
    </li>
  );
};

export default ProposalItem;
