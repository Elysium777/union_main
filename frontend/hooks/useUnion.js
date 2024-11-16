"use client";

import config from "@/lib/config";
import { setLoading } from "@/redux/slice/modalSlice";
import axios from "axios";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import useCapsule from "./useCapsule";

export default function useUnion() {
  const { getSigner } = useCapsule();
  const dispatch = useDispatch();

  const getVotingPower = async (chainId, UnionAddress, address) => {
    const currentChain = config.chains.find((c) => c.chainId === chainId);

    if (!currentChain) {
      return 0;
    }

    const provider = new ethers.providers.JsonRpcProvider(currentChain.rpcUrl);

    if (!address || address === ethers.constants.AddressZero) {
      return 0;
    }

    const union = new ethers.Contract(
      UnionAddress,
      currentChain.deployments.TraditionalUnion.abi,
      provider
    );

    const votingPower = await union.getVotingPower(address);

    return votingPower;
  };

  const getUnionAdmin = async (chainId, UnionAddress) => {
    const currentChain = config.chains.find((c) => c.chainId === chainId);

    if (!currentChain) {
      return 0;
    }

    const provider = new ethers.providers.JsonRpcProvider(currentChain.rpcUrl);

    const union = new ethers.Contract(
      UnionAddress,
      currentChain.deployments.TraditionalUnion.abi,
      provider
    );

    const admin = await union.admin();

    return admin;
  };

  const daoAttachedToUnion = async (chainId, UnionAddress) => {
    const currentChain = config.chains.find((c) => c.chainId === chainId);

    if (!currentChain) {
      return false;
    }

    const provider = new ethers.providers.JsonRpcProvider(currentChain.rpcUrl);

    const union = new ethers.Contract(
      UnionAddress,
      currentChain.deployments.TraditionalUnion.abi,
      provider
    );

    const dao = await union.dao();

    return dao;
  };

  const joinUnionCommon = async (chainId, UnionAddress, tokensToDelegate) => {
    dispatch(setLoading(true));
    try {
      const currentChain = config.chains.find((c) => c.chainId === chainId);

      if (!currentChain) {
        return;
      }

      const signer = await getSigner(chainId);

      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );

      const daoTokenAddress = await daoAttachedToUnion(chainId, UnionAddress);

      const erc20Dao = new ethers.Contract(
        daoTokenAddress,
        [
          "function approve(address spender, uint256 amount) external returns (bool)",
        ],
        provider
      );

      const approveUnsignedTx = erc20Dao.interface.encodeFunctionData(
        "approve",
        [UnionAddress, Number(tokensToDelegate * 10 ** 18).toFixed(0)]
      );

      const approveTx = await signer.sendTransaction({
        to: daoTokenAddress,
        data: approveUnsignedTx,
        value: 0,
        gasLimit: 2000000,
      });

      await approveTx.wait();

      const union = new ethers.Contract(
        UnionAddress,
        currentChain.deployments.TraditionalUnion.abi,
        provider
      );

      const data = union.interface.encodeFunctionData("joinUnion", [
        Number(tokensToDelegate * 10 ** 18).toFixed(0),
      ]);

      const tx = await signer.sendTransaction({
        to: UnionAddress,
        data: data,
        value: 0,
        gasLimit: 4000000,
      });

      await tx.wait();

      const indexResponse = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/union/add/${chainId}/${UnionAddress}`,
        {
          member: await signer.getAddress(),
        }
      );

      if (indexResponse.data.success) {
        toast.success("Successfully joined union");
      }

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const joinConvictionUnion = async (
    chainId,
    UnionAddress,
    tokensToDelegate,
    timePeriod
  ) => {
    dispatch(setLoading(true));

    try {
      const currentChain = config.chains.find((c) => c.chainId === chainId);

      if (!currentChain) {
        return;
      }

      if (
        timePeriod !== "1 Day" &&
        timePeriod !== "1 Week" &&
        timePeriod !== "1 Month" &&
        timePeriod !== "1 Year"
      ) {
        toast.error("Please provide a multiplier period");
        return;
      }

      const period =
        timePeriod === "1 Day"
          ? 86400
          : timePeriod === "1 Week"
          ? 604800
          : timePeriod === "1 Month"
          ? 2592000
          : 31536000;

      const signer = await getSigner(chainId);

      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );

      const daoTokenAddress = await daoAttachedToUnion(chainId, UnionAddress);

      const erc20Dao = new ethers.Contract(
        daoTokenAddress,
        [
          "function approve(address spender, uint256 amount) external returns (bool)",
        ],
        provider
      );

      const approveUnsignedTx = erc20Dao.interface.encodeFunctionData(
        "approve",
        [UnionAddress, Number(tokensToDelegate * 10 ** 18).toFixed(0)]
      );

      const approveTx = await signer.sendTransaction({
        to: daoTokenAddress,
        data: approveUnsignedTx,
        value: 0,
        gasLimit: 2000000,
      });

      await approveTx.wait();

      const union = new ethers.Contract(
        UnionAddress,
        currentChain.deployments.ConvictionUnion.abi,
        provider
      );

      const data = union.interface.encodeFunctionData(
        "joinUnion(uint256, uint256)",
        [Number(tokensToDelegate * 10 ** 18).toFixed(0), period]
      );

      const tx = await signer.sendTransaction({
        to: UnionAddress,
        data: data,
        value: 0,
        gasLimit: 4000000,
      });

      await tx.wait();

      const indexResponse = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/union/add/${chainId}/${UnionAddress}`,
        {
          member: await signer.getAddress(),
        }
      );

      if (indexResponse.data.success) {
        toast.success("Successfully joined union");
      }

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const leaveUnion = async (chainId, UnionAddress) => {
    dispatch(setLoading(true));

    try {
      const currentChain = config.chains.find((c) => c.chainId === chainId);

      if (!currentChain) {
        return;
      }

      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );

      const signer = await getSigner(chainId);

      const union = new ethers.Contract(
        UnionAddress,
        currentChain.deployments.TraditionalUnion.abi,
        provider
      );

      const data = union.interface.encodeFunctionData("leaveUnion", []);

      const tx = await signer.sendTransaction({
        to: UnionAddress,
        data: data,
        value: 0,
        gasLimit: 2000000,
      });

      await tx.wait();

      const indexResponse = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/union/remove/${chainId}/${UnionAddress}`,
        {
          member: await signer.getAddress(),
        }
      );

      if (indexResponse.data.success) {
        toast.success("Successfully left union");
      }

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const voteInternal = async (
    chainId,
    unionAddress,
    proposalId,
    vote,
    numberOfVotes
  ) => {
    dispatch(setLoading(true));

    try {
      const currentChain = config.chains.find((c) => c.chainId === chainId);

      if (!currentChain) {
        return;
      }

      const voteResult = vote === "yay" ? 1 : vote === "nay" ? 2 : 0;

      const signer = await getSigner(chainId);

      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );

      let data;

      if (!numberOfVotes) {
        const union = new ethers.Contract(
          unionAddress,
          currentChain.deployments.TraditionalUnion.abi,
          provider
        );

        data = union.interface.encodeFunctionData("voteInternal", [
          proposalId,
          voteResult,
        ]);
      } else {
        const union = new ethers.Contract(
          unionAddress,
          currentChain.deployments.QuadraticUnion.abi,
          provider
        );

        data = union.interface.encodeFunctionData("voteInternal", [
          proposalId,
          voteResult,
          numberOfVotes,
        ]);
      }

      const tx = await signer.sendTransaction({
        to: unionAddress,
        data: data,
        value: 0,
        gasLimit: 2000000,
      });

      await tx.wait();

      toast.success("Successfully voted");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const voteFinal = async (chainId, UnionAddress, proposalId) => {
    dispatch(setLoading(true));

    try {
      const currentChain = config.chains.find((c) => c.chainId === chainId);

      if (!currentChain) {
        return;
      }

      const signer = await getSigner(chainId);

      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );

      const union = new ethers.Contract(
        UnionAddress,
        currentChain.deployments.TraditionalUnion.abi,
        provider
      );

      const data = union.interface.encodeFunctionData("voteFinal", [
        proposalId,
      ]);

      const tx = await signer.sendTransaction({
        to: UnionAddress,
        data: data,
        value: 0,
        gasLimit: 2000000,
      });

      await tx.wait();

      toast.success("Union Successfully voted");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const hasAddressVoted = async (chainId, daoAddress, address, proposalId) => {
    try {
      const currentChain = config.chains.find((c) => c.chainId === chainId);

      if (!currentChain) {
        return;
      }

      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );

      const dao = new ethers.Contract(
        daoAddress,
        currentChain.deployments.DAO.abi,
        provider
      );

      const hasVoted = await dao.hasVoted(proposalId, address);

      return hasVoted;
    } catch (error) {
      return false;
    }
  };

  const hasAddressVotedUnion = async (
    chainId,
    UnionAddress,
    address,
    proposalId
  ) => {
    try {
      const currentChain = config.chains.find((c) => c.chainId === chainId);

      if (!currentChain) {
        return;
      }

      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );

      const union = new ethers.Contract(
        UnionAddress,
        currentChain.deployments.TraditionalUnion.abi,
        provider
      );

      const hasVoted = await union.hasVoted(proposalId, address);

      return hasVoted;
    } catch (error) {
      return false;
    }
  };

  const getUnionVotes = async (chainId, UnionAddress, proposalId) => {
    try {
      const currentChain = config.chains.find((c) => c.chainId === chainId);

      if (!currentChain) {
        return;
      }

      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );

      const union = new ethers.Contract(
        UnionAddress,
        currentChain.deployments.TraditionalUnion.abi,
        provider
      );

      const internalProposal = await union.internalVotes(proposalId);

      const votes = {
        forVotes: internalProposal.forVotes,
        againstVotes: internalProposal.againstVotes,
        abstainVotes: internalProposal.abstainVotes,
      };

      return votes;
    } catch (error) {
      return {
        forVotes: 0,
        againstVotes: 0,
        abstainVotes: 0,
      };
    }
  };

  const loadUnionMembers = async (chainId, unionAddress) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/union/members/${chainId}/${unionAddress}`
      );

      return response.data.members;
    } catch (error) {
      return [];
    }
  };

  return {
    getVotingPower,
    joinUnionCommon,
    daoAttachedToUnion,
    joinUnionCommon,
    joinConvictionUnion,
    leaveUnion,
    voteFinal,
    getUnionAdmin,
    hasAddressVoted,
    hasAddressVotedUnion,
    getUnionVotes,
    loadUnionMembers,
    voteInternal,
  };
}
