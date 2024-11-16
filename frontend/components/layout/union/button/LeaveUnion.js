"use client";
import useCapsule from "@/hooks/useCapsule";
import useUnion from "@/hooks/useUnion";
import config from "@/lib/config";
import { CircleMinus, MoveUpRight } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";

export default function LeaveUnionButton({
  chainId,
  members,
  unionMetadata,
  unionAddress,
}) {
  const { address } = useAccount();
  const { getAddress } = useCapsule();
  const currentChain = config.chains.find((c) => c.chainId === chainId);
  const [isMember, setIsMember] = React.useState(false);
  const isLoading = useSelector((state) => state.modal.isLoading);
  const isConnected = useSelector((state) => state.capsule.isLoggedIn);
  const { leaveUnion } = useUnion();

  const checkMember = async () => {
    const address = await getAddress(currentChain.rpcUrl);
    if (members.includes(address)) {
      setIsMember(true);
    }
  };

  React.useEffect(() => {
    checkMember();
  }, [members, address, isLoading, isConnected]);

  if (!isMember) return null;

  return (
    <div className="border border-gray-700 rounded-2xl bg-red-500 font-bold hover:cursor-pointer text-white overflow-hidden p-4">
      <div
        onClick={() => {
          leaveUnion(chainId, unionAddress);
        }}
      >
        <div className="text-base flex justify-between items-center">
          <div className="flex-center gap-1.5">
            <CircleMinus size={20} />
            <h3>Leave Union</h3>
          </div>

          <MoveUpRight size={20} />
        </div>
      </div>
    </div>
  );
}
