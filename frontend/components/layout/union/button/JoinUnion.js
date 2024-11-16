import useCapsule from "@/hooks/useCapsule";
import useUnion from "@/hooks/useUnion";
import config from "@/lib/config";
import { CirclePlus, MoveUpRight } from "lucide-react";

import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useAccount } from "wagmi";

const JoinUnionButton = ({ chainId, members, unionMetadata, unionAddress }) => {
  const { address } = useAccount();
  const { getAddress } = useCapsule();
  const currentChain = config.chains.find((c) => c.chainId === chainId);
  const [isMember, setIsMember] = React.useState(false);
  const [tokenToDelegate, setTokenToDelegate] = React.useState("");
  const { joinUnionCommon, joinConvictionUnion } = useUnion();
  const isLoading = useSelector((state) => state.modal.isLoading);
  const isConnected = useSelector((state) => state.capsule.isLoggedIn);
  const [timeToLock, setTimeToLock] = React.useState("");

  const checkMember = async () => {
    const address = await getAddress(currentChain.rpcUrl);
    if (members.includes(address)) {
      setIsMember(true);
    }
  };

  React.useEffect(() => {
    checkMember();
  }, [members, address, isLoading, isConnected]);

  if (isMember) return null;

  return (
    <div className="border border-gray-700 rounded-2xl  overflow-hidden p-4 space-y-4">
      {unionMetadata?.type === "conviction" && (
        <>
          <h1 className="ml-1">Time to Lock</h1>

          <input
            list="multiplier"
            className="border border-gray-700 rounded-2xl bg-black overflow-hidden p-2 text-white"
            placeholder={"Enter time to lock"}
            value={timeToLock}
            onChange={(e) => setTimeToLock(e.target.value)}
          ></input>
          <datalist id="multiplier">
            <option value="1 Day" style={{ color: "#e2e8f0" }} />
            <option value="1 Week" style={{ color: "#e2e8f0" }} />
            <option value="1 Month" style={{ color: "#e2e8f0" }} />
            <option value="1 Year" style={{ color: "#e2e8f0" }} />
          </datalist>
        </>
      )}

      <h1 className="ml-1">Votes to delegate</h1>

      <input
        className="border border-gray-700 rounded-2xl bg-black overflow-hidden p-2 text-white"
        placeholder={"0.00"}
        value={tokenToDelegate}
        onChange={(e) => setTokenToDelegate(e.target.value)}
      ></input>

      <div className="border border-gray-700 rounded-2xl bg-white font-bold hover:cursor-pointer text-black overflow-hidden p-4">
        <div
          onClick={() => {
            if (isNaN(tokenToDelegate)) {
              toast.error("Please enter a valid number");
              return;
            }

            if (unionMetadata?.type !== "conviction") {
              joinUnionCommon(chainId, unionAddress, tokenToDelegate);
            } else {
              joinConvictionUnion(
                chainId,
                unionAddress,
                tokenToDelegate,
                timeToLock
              );
            }
          }}
        >
          <div className="text-base flex justify-between items-center">
            <div className="flex-center gap-1.5">
              <CirclePlus size={20} />
              <h3>Join Union</h3>
            </div>

            <MoveUpRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUnionButton;
