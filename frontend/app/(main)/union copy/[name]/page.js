"use client";

import React from "react";
import ProposalList from "@/components/layout/proposal/ProposalList";
import ProposalDAOProfile from "@/components/layout/proposal/ProposalDAOProfile";

import UnionDetails from "@/components/layout/union/UnionDetails";
import NotificationsButton from "@/components/layout/union/button/NotificationsButton";
import ContractAndParameter from "@/components/layout/union/button/ContractAndParameter";
import VotingPowerComponent from "@/components/layout/proposal/VotingPowerComponent";
import { useSelector } from "react-redux";
import config from "@/lib/config";
import useUnion from "@/hooks/useUnion";
import { ethers } from "ethers";
import axios from "axios";
import JoinUnionButton from "@/components/layout/union/button/JoinUnion";
import LeaveUnionButton from "@/components/layout/union/button/LeaveUnion";
import NounsUnion from "@/components/layout/union/NounsUnion";
import ChatPopup from "@/components/layout/chat/ChatPopup";

const UnionName = ({ params }) => {
  const [daoMetadata, setDaoMetadata] = React.useState({});
  const [unionMetadata, setUnionMetadata] = React.useState({});
  const [proposals, setProposals] = React.useState([]);
  const chainId = useSelector((state) => state.chain.chainId);
  const currentChain = config.chains.find((c) => c.chainId === chainId);
  const [members, setMembers] = React.useState([]);
  const { daoAttachedToUnion, loadUnionMembers } = useUnion();

  const loadDao = async () => {
    const dao = await daoAttachedToUnion(chainId, params.name);

    if (!dao || dao === ethers.constants.AddressZero) {
      return;
    }

    const metadataResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dao/metadata/${chainId}/${dao}`
    );

    setDaoMetadata(metadataResponse.data.metadata);

    loadProposals(dao);
  };

  const loadUnion = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/union/metadata/${chainId}/${params.name}`
    );

    setUnionMetadata(response.data.metadata);
  };

  const loadProposals = async (daoAddress) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/proposal/all/${chainId}/${daoAddress}`
    );

    setProposals(response.data.proposals);
  };

  const loadMembers = async () => {
    const members = await loadUnionMembers(chainId, params.name);

    setMembers(members);
  };

  React.useEffect(() => {
    loadDao();
    loadUnion();
    loadMembers();
  }, [chainId]);

  return (
    <>
      <div className="max-w-6xl w-full mx-auto flex my-4 gap-4">
        <section className="flex-1 space-y-4">
          <UnionDetails
            proposalLength={proposals?.length}
            daoMetadata={daoMetadata}
            unionMetadata={unionMetadata}
          />

          {unionMetadata?.type === "nft" && <NounsUnion />}

          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Proposals</h1>

            <ProposalList
              allProposal={proposals}
              link="union"
              isUnion
              unionAddress={params.name}
            />
          </div>
        </section>

        <section className="w-72 space-y-4 sticky top-20 self-start">
          <ProposalDAOProfile
            daoName={unionMetadata?.title}
            image={unionMetadata?.image}
            chainName={currentChain?.name}
            description={unionMetadata?.description}
          />

          <JoinUnionButton
            chainId={chainId}
            members={members}
            unionMetadata={unionMetadata}
            unionAddress={params.name}
          />

          <VotingPowerComponent
            chainId={chainId}
            unionAddress={params.name}
            unionMetadata={unionMetadata}
          />

          <LeaveUnionButton
            chainId={chainId}
            members={members}
            unionMetadata={unionMetadata}
            unionAddress={params.name}
          />
          <ContractAndParameter unionAddress={params.name} />
          <NotificationsButton union={params.name} />
        </section>

        <ChatPopup
          title={unionMetadata.title}
          chatId={
            unionMetadata.chatId ||
            "ba0198f42165e5117ead89f74c66a716c121affd93cbf5e244dfed6030af7c37"
          }
        />
      </div>
    </>
  );
};

export default UnionName;
