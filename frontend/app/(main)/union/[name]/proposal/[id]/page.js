"use client";

import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import ProposalHeading from "@/components/layout/proposal/proposalDetails/ProposalHeading";
import ProposalHistory from "@/components/layout/proposal/proposalDetails/ProposalHistory";
import VotingResults from "@/components/layout/proposal/proposalDetails/votes/VotingResults";
import ProposalBreadcrumps from "@/components/layout/proposal/proposalDetails/ProposalBreadcrumps";
import VotingComponent from "@/components/layout/union/voting/VotingComponent";
import useUnion from "@/hooks/useUnion";
import { ethers } from "ethers";
import { MousePointerClick, MoveUpRight } from "lucide-react";
import config from "@/lib/config";

const UnionProposalPage = ({ params }) => {
  const chainId = useSelector((state) => state.chain.chainId);
  const [proposal, setProposal] = React.useState(null);
  const [daoMetadata, setDaoMetadata] = React.useState({});
  const { daoAttachedToUnion, getUnionVotes, voteFinal } = useUnion();
  const [unionVotes, setUnionVotes] = React.useState(null);
  const [unionMetadata, setUnionMetadata] = React.useState(null);
  const [currentBlock, setCurrentBlock] = React.useState(null);
  const currentChain = config.chains.find((chain) => chain.chainId === chainId);
  const [isUnionVoted, setIsUnionVoted] = React.useState(false);
  const { hasAddressVoted } = useUnion();

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

  const checkIfVoted = async () => {
    const voted = await hasAddressVoted(
      chainId,
      daoMetadata?.address,
      params.name,
      params.id
    );

    setIsUnionVoted(voted);
  };

  React.useEffect(() => {
    if (chainId && daoMetadata?.address) {
      checkIfVoted();
    }
  }, [chainId, daoMetadata]);

  const loadUnion = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/union/metadata/${chainId}/${params.name}`
    );

    setUnionMetadata(response.data.metadata);
  };

  const loadVotes = async () => {
    const votes = await getUnionVotes(chainId, params.name, params.id);

    setUnionVotes(votes);
  };

  React.useEffect(() => {
    if (chainId) loadVotes();
  }, [chainId]);

  const loadDao = async () => {
    const dao = await daoAttachedToUnion(chainId, params.name);

    if (!dao || dao === ethers.constants.AddressZero) {
      return;
    }

    const metadataResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dao/metadata/${chainId}/${dao}`
    );

    setDaoMetadata(metadataResponse.data);

    loadProposal(dao);
  };

  React.useEffect(() => {
    if (chainId) {
      loadDao();
      loadUnion();
    }
  }, [chainId]);

  const loadProposal = async (daoAddress) => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          "/api/proposal/metadata/" +
          chainId +
          "/" +
          daoAddress +
          "/" +
          params.id
      );

      if (response.data.success) {
        setProposal(response.data.proposal);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto my-4 space-y-4">
      <ProposalBreadcrumps
        links={[
          { name: params.name, url: `/union/${params.name}` },
          {
            name: "Proposal",
            url: `/union/${params.name}/proposal/${params.id}`,
          },
        ]}
      />

      <div className="flex gap-4">
        <section className="flex-1 space-y-4">
          <ProposalHeading proposal={proposal} chainId={chainId} />

          <div className="py-4 px-6 border border-gray-700 rounded-2xl hover:border-gray-400 transition-colors space-y-4">
            <h2 className="text-xl font-bold">Details</h2>
            <p>{proposal?.metadata?.description}</p>
          </div>

          {currentBlock < proposal?.endBlock && !isUnionVoted && (
            <div
              className="py-4 px-6 border border-gray-700 rounded-2xl hover:border-gray-400 hover:cursor-pointer transition-colors space-y-4"
              onClick={() => {
                voteFinal(chainId, params.name, params.id);
              }}
            >
              <div className="text-base flex justify-between w-full font-bold items-center">
                <div className="flex-center gap-1.5">
                  <MousePointerClick size={20} />
                  <h3>Cast Union Vote on Proposal</h3>
                </div>

                <MoveUpRight size={20} />
              </div>
            </div>
          )}
        </section>

        <section className="w-72 space-y-4">
          {currentBlock < proposal?.endBlock && (
            <VotingComponent
              proposal={proposal}
              chainId={chainId}
              daoAddress={daoMetadata?.address}
              unionAddress={params.name}
              proposalId={params.id}
              unionMetadata={unionMetadata}
            />
          )}
          <VotingResults
            proposal={proposal}
            isUnion
            unionVotes={unionVotes}
            unionMetadata={unionMetadata}
          />
          <ProposalHistory
            proposal={proposal}
            chainId={chainId}
            isUnion
            daoAddress={daoMetadata?.address}
            unionAddress={params.name}
            proposalId={params.id}
          />
        </section>
      </div>
    </div>
  );
};

export default UnionProposalPage;
