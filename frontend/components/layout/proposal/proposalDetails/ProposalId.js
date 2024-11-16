import React from "react";

import shortenAddress from "@/utils/shortenAddress";

const ProposalId = ({ proposalId, block }) => {
  return (
    <ul className="list-disc flex items-center gap-6 list-inside">
      <li className="text-gray-300">
        <span className="text-gray-400 mr-1">ID:</span>

        {shortenAddress(proposalId)}
      </li>

      <li className="text-gray-300">
        <span className="text-gray-400">Proposed at Block: </span> {block}
      </li>
    </ul>
  );
};

export default ProposalId;
