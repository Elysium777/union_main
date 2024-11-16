"use client";

import React from "react";

import ProposalHeading from "@/components/layout/proposal/proposalDetails/ProposalHeading";
import ProposalBreadcrumps from "@/components/layout/proposal/proposalDetails/ProposalBreadcrumps";
import VotingResults from "@/components/layout/proposal/proposalDetails/votes/VotingResults";
import ProposalHistory from "@/components/layout/proposal/proposalDetails/ProposalHistory";
import { useSelector } from "react-redux";
import axios from "axios";

const DAOProposalsPage = ({ params }) => {
  const chainId = useSelector((state) => state.chain.chainId);
  const [proposal, setProposal] = React.useState(null);

  const loadProposal = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          "/api/proposal/metadata/" +
          chainId +
          "/" +
          params.name +
          "/" +
          params.id
      );

      console.log(response.data);

      if (response.data.success) {
        setProposal(response.data.proposal);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (chainId) loadProposal();
  }, [chainId]);

  return (
    <div className="max-w-6xl w-full mx-auto my-4 space-y-4">
      <ProposalBreadcrumps
        links={[
          { name: params.name, url: `/dao/${params.name}` },
          {
            name: "Proposal",
            url: `/dao/${params.name}/proposal/${params.id}`,
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
        </section>

        <section className="w-72 space-y-4">
          <VotingResults proposal={proposal} />
          <ProposalHistory proposal={proposal} chainId={chainId} />
        </section>
      </div>
    </div>
  );
};

export default DAOProposalsPage;
