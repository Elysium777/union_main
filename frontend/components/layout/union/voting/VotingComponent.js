"use client";

import { MousePointerClick } from "lucide-react";
import React, { useState } from "react";
import VotingPower from "./VotingPower";
import useUnion from "@/hooks/useUnion";
import config from "@/lib/config";
import { ethers } from "ethers";
import useCapsule from "@/hooks/useCapsule";
import { useAccount } from "wagmi";
import { useSelector } from "react-redux";

const VotingComponent = ({
  onVote,
  chainId,
  daoAddress,
  unionAddress,
  proposalId,
  proposal,
  unionMetadata,
}) => {
  const [selectedVote, setSelectedVote] = useState(null);
  const [currentBlock, setCurrentBlock] = React.useState(null);
  const currentChain = config.chains.find((chain) => chain.chainId === chainId);
  const { hasAddressVoted } = useUnion();
  const [isUnionVoted, setIsUnionVoted] = useState(false);
  const isConnected = useSelector((state) => state.capsule.isLoggedIn);
  const [votingPower, setVotingPower] = React.useState(0);
  const [hasVoted, setHasVoted] = React.useState(false);
  const { address } = useAccount();
  const { getAddress } = useCapsule();
  const { getVotingPower, voteInternal, hasAddressVotedUnion } = useUnion();
  const [value, setValue] = useState(5);

  const handleSliderChange = (event) => {
    setValue(event.target.value);
  };

  const loadVotingPower = async () => {
    const address = await getAddress(currentChain.rpcUrl);

    const votingPower = await getVotingPower(chainId, unionAddress, address);

    setVotingPower(votingPower);
  };

  const checkIfVotedInternal = async () => {
    const address = await getAddress(currentChain.rpcUrl);

    const voted = await hasAddressVotedUnion(
      chainId,
      unionAddress,
      address,
      proposalId
    );
    setHasVoted(voted);
  };

  React.useEffect(() => {
    if (isConnected && currentChain) {
      loadVotingPower();
      checkIfVotedInternal();
    }
  }, [isConnected, address, currentChain]);

  const checkIfVoted = async () => {
    const voted = await hasAddressVoted(
      chainId,
      daoAddress,
      unionAddress,
      proposalId
    );

    setIsUnionVoted(voted);
  };

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

  React.useEffect(() => {
    if (chainId && daoAddress && unionAddress && proposalId) {
      checkIfVoted();
    }
  }, [chainId, daoAddress, unionAddress, proposalId]);

  const handleVoteSelection = (vote) => {
    setSelectedVote(vote);
  };

  const handleVoteSubmit = () => {
    if (selectedVote) {
      voteInternal(
        chainId,
        unionAddress,
        proposalId,
        selectedVote,
        unionMetadata?.type === "quadratic" ? value : null
      );
      setSelectedVote(null);
    }
  };

  return (
    <div className="py-6 px-6 border border-gray-700 rounded-2xl transition-colors space-y-4">
      <div className="space-y-1">
        <div className="flex gap-2 items-center">
          <MousePointerClick size={20} />
          <h2 className="text-lg font-medium">Cast your vote</h2>
        </div>

        <div className="flex gap-1 items-center text-sm">
          {unionMetadata?.type !== "quadratic" ? (
            <p className="text-gray-400">Voting Power:</p>
          ) : (
            <p className="text-gray-400">Voting Credits:</p>
          )}

          <span>
            {unionMetadata?.type !== "quadratic"
              ? unionMetadata?.type === "nft" || unionMetadata?.type === "equal"
                ? Number(votingPower)
                : Number(votingPower / 10 ** 18)
              : 10}
          </span>
        </div>
      </div>

      {hasVoted && !isUnionVoted && (
        <div className="p-3 bg-white/10 border border-gray-700 rounded-lg cursor-default hover:border-gray-400">
          <p className="text-center">You have already voted</p>
        </div>
      )}

      {isUnionVoted && (
        <div className="p-3 bg-white/10 border border-gray-700 rounded-lg cursor-default hover:border-gray-400">
          <p className="text-center">Union has already voted</p>
        </div>
      )}

      {!hasVoted && !isUnionVoted && (
        <>
          {" "}
          <div>
            <div className="space-y-2">
              {unionMetadata?.type === "quadratic" && (
                <div className="flex items-center w-full max-w-md">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={value}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer hover:bg-gray-600"
                  />
                  <div className="ml-4 text-lg font-semibold">{value}</div>
                </div>
              )}

              <div
                className={`py-2.5 px-5 bg-white/10 rounded-full border ${
                  selectedVote === "yay" ? "border-gray-400" : "border-gray-700"
                } font-medium cursor-pointer hover:border-gray-400`}
                onClick={() => handleVoteSelection("yay")}
              >
                Yay
              </div>

              <div
                className={`py-2.5 px-5 bg-white/10 rounded-full border ${
                  selectedVote === "nay" ? "border-gray-400" : "border-gray-700"
                } font-medium cursor-pointer hover:border-gray-400`}
                onClick={() => handleVoteSelection("nay")}
              >
                Nay
              </div>

              <div
                className={`py-2.5 px-5 bg-white/10 rounded-full border ${
                  selectedVote === "abstain"
                    ? "border-gray-400"
                    : "border-gray-700"
                } font-medium cursor-pointer hover:border-gray-400`}
                onClick={() => handleVoteSelection("abstain")}
              >
                Abstain
              </div>
            </div>

            <button
              onClick={handleVoteSubmit}
              className="w-full px-4 py-2.5 mt-4 text-black font-medium border-2 shadow-white/30 bg-gray-100 rounded-full hover:bg-white hover:shadow-sm hover:border-gray-400 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={
                !selectedVote ||
                isUnionVoted ||
                !proposal ||
                currentBlock > proposal.endBlock
              }
            >
              Submit Vote
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VotingComponent;
