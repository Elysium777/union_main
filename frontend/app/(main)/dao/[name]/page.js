"use client";

import React from "react";

import DAODetails from "@/components/layout/dao/DAODetails";

import ProposalSocial from "@/components/layout/proposal/ProposalSocial";
import ProposalDAOProfile from "@/components/layout/proposal/ProposalDAOProfile";
import ProposalList from "@/components/layout/proposal/ProposalList";
import VotingPowerComponent from "@/components/layout/proposal/VotingPowerComponent";

import { useSelector } from "react-redux";
import config from "@/lib/config";
import axios from "axios";

const DAONamePage = ({ params }) => {
  const chainId = useSelector((state) => state.chain.chainId);
  const currentChain = config.chains.find((chain) => chain.chainId === chainId);
  const [daoMetadata, setDaoMetadata] = React.useState(null);
  const [allProposal, setAllProposal] = React.useState(null);

  const loadAllProposals = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          "/api/proposal/all/" +
          chainId +
          "/" +
          params.name
      );

      if (response.data.success) {
        setAllProposal(response.data.proposals);
        console.log(response.data.proposals);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadDaoMetadata = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          "/api/dao/metadata/" +
          chainId +
          "/" +
          params.name
      );

      if (response.data.success) {
        setDaoMetadata(response.data.metadata);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (params.name) {
      loadDaoMetadata();
      loadAllProposals();
    }
  }, []);

  return (
    <div className="max-w-6xl w-full mx-auto flex my-4 gap-4">
      <section className="flex-1 space-y-4">
        <DAODetails proposalLength={allProposal?.length} />

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Proposals</h1>

          <ProposalList allProposal={allProposal} link="dao" />
        </div>
      </section>

      <section className="w-72 space-y-4 sticky top-20 self-start">
        <ProposalDAOProfile
          daoName={daoMetadata?.name}
          image={daoMetadata?.image}
          chainName={currentChain?.name}
          description={daoMetadata?.description}
        />

        <ProposalSocial />
      </section>
    </div>
  );
};

export default DAONamePage;
