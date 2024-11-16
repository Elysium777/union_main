"use client";

import useCapsule from "@/hooks/useCapsule";
import useUnion from "@/hooks/useUnion";
import config from "@/lib/config";
import React from "react";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";

const VotingPowerComponent = ({ chainId, unionAddress, unionMetadata }) => {
  const isConnected = useSelector((state) => state.capsule.isLoggedIn);
  const [votingPower, setVotingPower] = React.useState(0);
  const { address } = useAccount();
  const { getAddress } = useCapsule();
  const { getVotingPower } = useUnion();
  const currentChain = config.chains.find((c) => c.chainId === chainId);

  const loadVotingPower = async () => {
    const address = await getAddress(currentChain.rpcUrl);

    const votingPower = await getVotingPower(chainId, unionAddress, address);

    console.log(votingPower);

    setVotingPower(votingPower);
  };

  React.useEffect(() => {
    if (isConnected && currentChain) {
      loadVotingPower();
    }
  }, [isConnected, address, currentChain]);

  return (
    <div
      className="border border-gray-700 rounded-2xl overflow-hidden py-4 space-y-4"
      onClick={() => {
        loadVotingPower();
      }}
    >
      <h2 className="text-lg font-bold border-b border-gray-700 px-4 pb-2">
        My Voting Power
      </h2>

      {!isConnected && (
        <div className="px-4 space-y-4">
          <p>
            Connect your wallet to see your voting power and start delegating
          </p>
        </div>
      )}

      {isConnected && unionMetadata?.type !== "quadratic" && (
        <div className="px-4 space-y-4">
          <p>
            Your voting power in this union is{" "}
            <span className="font-bold">
              {unionMetadata?.type === "flare"
                ? Number(votingPower / 10 ** 7)
                : unionMetadata?.type === "nft" ||
                  unionMetadata?.type === "equal"
                ? Number(votingPower)
                : Number(votingPower / 10 ** 18)}
            </span>
          </p>
        </div>
      )}

      {isConnected && unionMetadata?.type === "quadratic" && (
        <div className="px-4 space-y-4">
          <p>
            Your voting credits per proposal is{" "}
            <span className="font-bold">10</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default VotingPowerComponent;
