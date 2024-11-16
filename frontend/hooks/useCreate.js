"use client";

import config from "@/lib/config";
import { setLoading } from "@/redux/slice/modalSlice";
import axios from "axios";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import useChain from "./useChain";
import useCapsule from "./useCapsule";

export default function useCreate() {
  const dispatch = useDispatch();
  const router = useRouter();
  const chainId = useSelector((state) => state.chain.chainId);
  const currentChain = config.chains.find((chain) => chain.chainId === chainId);
  const daos = useSelector((state) => state.chain.daos);
  const { loadUnions } = useChain();
  const { getAddress } = useCapsule();

  const createUnion = async (
    unionName,
    description,
    image,
    selectedDAO,
    type,
    multiplierPeriod,
    nftAddress
  ) => {
    dispatch(setLoading(true));

    try {
      let initializer;

      const isValidDAO = daos.find((dao) => dao.address === selectedDAO);

      if (!isValidDAO) {
        toast.error("Invalid DAO selected");
        return;
      }

      if (
        type !== "Conviction" &&
        type !== "Equal" &&
        type !== "Traditional" &&
        type !== "NFT" &&
        type !== "Quadratic" &&
        type !== "Flare"
      ) {
        toast.error("Invalid union type selected");
        return;
      }

      const address = await getAddress(currentChain.rpcUrl);

      if (!address || address === ethers.constants.AddressZero) {
        toast.error("Please connect your wallet first");
        return;
      }

      if (type === "Traditional" || type === "Equal") {
        const provider = new ethers.providers.JsonRpcProvider(
          currentChain.rpcUrl
        );

        const union = new ethers.Contract(
          currentChain.deployments.TraditionalUnion.address,
          currentChain.deployments.TraditionalUnion.abi,
          provider
        );

        initializer = union.interface.encodeFunctionData(
          "initializeTraditionalUnion",
          [selectedDAO, selectedDAO, unionName, address]
        );
      } else if (type === "Conviction") {
        const provider = new ethers.providers.JsonRpcProvider(
          currentChain.rpcUrl
        );

        const union = new ethers.Contract(
          currentChain.deployments.ConvictionUnion.address,
          currentChain.deployments.ConvictionUnion.abi,
          provider
        );

        if (
          multiplierPeriod !== "1 Day" &&
          multiplierPeriod !== "1 Week" &&
          multiplierPeriod !== "1 Month" &&
          multiplierPeriod !== "1 Year"
        ) {
          toast.error("Please provide a multiplier period");
          return;
        }

        const period =
          multiplierPeriod === "1 Day"
            ? 86400
            : multiplierPeriod === "1 Week"
            ? 604800
            : multiplierPeriod === "1 Month"
            ? 2592000
            : 31536000;

        initializer = union.interface.encodeFunctionData(
          "initializeConvictionUnion",
          [selectedDAO, selectedDAO, unionName, address, period]
        );
      } else if (type === "NFT") {
        const provider = new ethers.providers.JsonRpcProvider(
          currentChain.rpcUrl
        );

        if (!nftAddress) {
          toast.error("Please provide an NFT address");
          return;
        }

        if (nftAddress) {
          const isValidNFT = currentChain.NFT.find(
            (nft) => nft.address === nftAddress
          );

          if (!isValidNFT) {
            toast.error("Invalid NFT address");
            return;
          }
        }

        const union = new ethers.Contract(
          currentChain.deployments.NFTUnion.address,
          currentChain.deployments.NFTUnion.abi,
          provider
        );

        initializer = union.interface.encodeFunctionData("initializeNFTUnion", [
          selectedDAO,
          selectedDAO,
          unionName,
          address,
          nftAddress,
          1,
        ]);
      } else if (type === "Quadratic") {
        const provider = new ethers.providers.JsonRpcProvider(
          currentChain.rpcUrl
        );

        const union = new ethers.Contract(
          currentChain.deployments.QuadraticUnion.address,
          currentChain.deployments.QuadraticUnion.abi,
          provider
        );

        initializer = union.interface.encodeFunctionData(
          "initializeQuadraticUnion",
          [selectedDAO, selectedDAO, unionName, address]
        );
      } else {
        const provider = new ethers.providers.JsonRpcProvider(
          currentChain.rpcUrl
        );

        const union = new ethers.Contract(
          currentChain.deployments.FlareUnion.address,
          currentChain.deployments.FlareUnion.abi,
          provider
        );

        initializer = union.interface.encodeFunctionData(
          "initializeTraditionalUnion",
          [selectedDAO, selectedDAO, unionName, address]
        );
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/union/create/${chainId}`,
        {
          title: unionName,
          description,
          image,
          initializer,
          type: type.toLowerCase(),
          admin: address,
        }
      );

      if (response.data.success) {
        await loadUnions();
        toast.success("Union created successfully");
        router.push(`/union/${response.data.proxyAddress}`);
      } else {
        toast.error("Failed to create union");
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { createUnion };
}
