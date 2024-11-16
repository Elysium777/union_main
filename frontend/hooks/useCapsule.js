"use client";

import config from "@/lib/config";
import { setIsLoggedIn } from "@/redux/slice/capsuleSlice";
import { useEthersSigner } from "@/utils/ethersSigner";
import { CapsuleEthersV5Signer } from "@usecapsule/ethers-v5-integration";
import Capsule, { Environment } from "@usecapsule/react-sdk";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useAccount } from "wagmi";

const capsule = new Capsule(
  Environment.BETA,
  process.env.NEXT_PUBLIC_CAPSULE_API_KEY
);

export default function useCapsule() {
  const { address, chainId } = useAccount();
  const dispatch = useDispatch();
  const signer = useEthersSigner();
  const isLoggedIn = async () => {
    const isLoggedIn = await capsule.isFullyLoggedIn();

    return isLoggedIn;
  };
  const isConnected = useSelector((state) => state.capsule.isLoggedIn);

  const getAddress = async (rpcUrl) => {
    try {
      if (!isConnected) return ethers.constants.AddressZero;

      if (address) return address;

      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

      const ethersSigner = new CapsuleEthersV5Signer(capsule, provider);

      return await ethersSigner.getAddress();
    } catch (error) {
      return ethers.constants.AddressZero;
    }
  };

  const getSigner = async (chainID) => {
    if (chainId !== chainID) {
      const currentChain = config.chains.find((c) => c.chainId === chainID);

      toast.error(`Please switch to the ${currentChain.name} network`);

      throw new Error("Network mismatch");
    }

    if (!address) {
      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );
      const ethersSigner = new CapsuleEthersV5Signer(capsule, provider);
      return ethersSigner;
    }

    return signer;
  };

  const logout = async () => {
    await capsule.logout();
    dispatch(setIsLoggedIn(false));
  };

  return {
    capsule,
    isLoggedIn,
    logout,
    getAddress,
    getSigner,
  };
}
