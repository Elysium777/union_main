import React from "react";

import ProposalItem from "./ProposalItem";

const ProposalList = ({
  allProposal,
  link,
  isUnion = false,
  unionAddress = null,
}) => {
  return (
    <ul className="space-y-4">
      {allProposal &&
        allProposal.map((proposal, index) => (
          <ProposalItem
            key={index}
            link={link}
            daoName={proposal.address}
            proposal={proposal}
            isUnion={isUnion}
            unionAddress={unionAddress}
          />
        ))}
    </ul>
  );
};

export default ProposalList;
