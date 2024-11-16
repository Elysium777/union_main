import { ChartLine } from "lucide-react";

import React from "react";

import VotingCalculation from "./VotingCalulation";

const VotingResults = ({
  proposal,
  isUnion = false,
  unionVotes = null,
  unionMetadata = null,
}) => {
  return (
    <div className="py-6 px-6 border border-gray-700 rounded-2xl transition-colors space-y-4">
      <div className="flex gap-2 items-center">
        <ChartLine size={20} />
        <h2 className="text-lg font-medium">Results</h2>
      </div>

      <VotingCalculation
        proposal={proposal}
        isUnion={isUnion}
        unionVotes={unionVotes}
        unionMetadata={unionMetadata}
      />
    </div>
  );
};

export default VotingResults;
