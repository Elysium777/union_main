"use client";

import { Hourglass, Pause, Play, Plus, Rocket, Timer, Zap } from "lucide-react";
import { ethers } from "ethers";
import React from "react";
import config from "@/lib/config";
import useUnion from "@/hooks/useUnion";

const ProposalHistory = ({
  proposal,
  chainId,
  isUnion = false,
  daoAddress = null,
  unionAddress = null,
  proposalId = 0,
}) => {
  const [currentBlock, setCurrentBlock] = React.useState(null);
  const currentChain = config.chains.find((chain) => chain.chainId === chainId);
  const [isVoted, setIsVoted] = React.useState(false);
  const { hasAddressVoted } = useUnion();

  const checkIfVoted = async () => {
    const voted = await hasAddressVoted(
      chainId,
      daoAddress,
      unionAddress,
      proposalId
    );

    setIsVoted(voted);
  };

  React.useEffect(() => {
    if (chainId && daoAddress && unionAddress && proposalId) {
      checkIfVoted();
    }
  }, [chainId, daoAddress, unionAddress, proposalId]);

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

  const steps = [
    {
      id: 1,
      label: "Draft created",
      icon: <Plus />,
      isActive: true,
    },
    {
      id: 2,
      label: "Published onchain",
      icon: <Rocket />,
      isActive: true,
    },
    {
      id: 3,
      label: isUnion
        ? "Internal Voting Period Started"
        : "Voting period started",
      detail: "",
      icon: <Play />,
      isActive: true,
      isCurrent: proposal?.endBlock > currentBlock ? true : false,
    },
    {
      id: 4,
      label: "End voting period",
      icon: <Pause />,
      isActive: proposal?.endBlock > currentBlock ? false : true,
    },
    {
      id: 5,
      label: isUnion ? "Final Vote" : "Proposal Queued",
      detail: isUnion
        ? isVoted
          ? "Union has Voted"
          : "Union has not Voted"
        : "",
      icon: <Hourglass />,
      isActive: proposal?.endBlock > currentBlock ? false : true,
    },
    {
      id: 6,
      label: "Proposal Executed",
      detail: "",
      icon: <Zap />,
      isActive: proposal?.endBlock > currentBlock ? false : true,
      isCurrent: proposal?.endBlock > currentBlock ? false : true,
    },
  ];

  return (
    <div className="py-4 px-6 border border-gray-700 rounded-2xl transition-colors space-y-4">
      <div className="flex gap-2 items-center">
        <Timer size={20} />
        <h2 className="text-lg font-medium">History</h2>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex items-center">
            {index !== steps.length - 1 && (
              <span
                className={`absolute left-5 top-8 h-full w-0.5 ${
                  step.isActive ? "bg-gray-100" : "bg-gray-500"
                }`}
              />
            )}

            <div
              className={`relative z-10 p-2 rounded-full ${
                step.isCurrent
                  ? "bg-white text-black"
                  : step.isActive
                  ? "bg-gray-800 border border-gray-600"
                  : "bg-gray-500 text-gray-800"
              }`}
            >
              {step.icon}
            </div>

            <div className="ml-8">
              <p
                className={`text-sm ${
                  step.isCurrent
                    ? "text-white font-semibold"
                    : step.isActive
                    ? "text-gray-200"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </p>

              {step.time && (
                <p className="text-xs text-gray-500">{step.time}</p>
              )}

              {step.detail && (
                <p className="text-xs text-gray-400">{step.detail}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProposalHistory;
