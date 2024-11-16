import React from "react";

const VotingCalculation = ({
  proposal,
  isUnion = false,
  unionVotes = null,
  unionMetadata = null,
}) => {
  const votes = {
    yay: isUnion
      ? unionMetadata?.type === "flare"
        ? Number(unionVotes?.forVotes / 10 ** 7)
        : unionMetadata?.type === "equal" ||
          unionMetadata?.type === "nft" ||
          unionMetadata?.type === "quadratic"
        ? Number(unionVotes?.forVotes)
        : Number(unionVotes?.forVotes / 10 ** 18)
      : Number(proposal?.forVotes / 10 ** 18),
    nay: isUnion
      ? unionMetadata?.type === "flare"
        ? Number(unionVotes?.againstVotes / 10 ** 7)
        : unionMetadata?.type === "equal" ||
          unionMetadata?.type === "nft" ||
          unionMetadata?.type === "quadratic"
        ? Number(unionVotes?.againstVotes)
        : Number(unionVotes?.againstVotes / 10 ** 18)
      : Number(proposal?.againstVotes / 10 ** 18),
    abstain: isUnion
      ? unionMetadata?.type === "flare"
        ? Number(unionVotes?.abstainVotes / 10 ** 7)
        : unionMetadata?.type === "equal" ||
          unionMetadata?.type === "nft" ||
          unionMetadata?.type === "quadratic"
        ? Number(unionVotes?.abstainVotes)
        : Number(unionVotes?.abstainVotes / 10 ** 18)
      : Number(proposal?.abstainVotes / 10 ** 18),
  };

  const totalVotes = votes.yay + votes.nay + votes.abstain;

  const yayPercentage =
    totalVotes !== 0 ? ((votes.yay / totalVotes) * 100).toFixed(2) : 0;
  const nayPercentage =
    totalVotes !== 0 ? ((votes.nay / totalVotes) * 100).toFixed(2) : 0;
  const abstainPercentage =
    totalVotes !== 0 ? ((votes.abstain / totalVotes) * 100).toFixed(2) : 0;

  return (
    <div className="space-y-4">
      <div className="p-3 bg-white/10 border border-gray-700 rounded-lg cursor-default hover:border-gray-400">
        <div className="flex justify-between items-center mb-2">
          <p className="font-bold">Yay</p>

          <div className="flex gap-2">
            <p>{votes.yay.toLocaleString()}</p>
            <p>{yayPercentage}%</p>
          </div>
        </div>

        <div className="relative w-full h-2 bg-green-100 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
            style={{ width: `${yayPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="p-3 bg-white/10 border border-gray-700 rounded-lg cursor-default hover:border-gray-400">
        <div className="flex justify-between items-center mb-2">
          <p className="font-bold">Nay</p>

          <div className="flex gap-2">
            <p>{votes.nay.toLocaleString()}</p>
            <p>{nayPercentage}%</p>
          </div>
        </div>

        <div className="relative w-full h-2 bg-red-100 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-red-500 rounded-full"
            style={{ width: `${nayPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="p-3 bg-white/10 border border-gray-700 rounded-lg cursor-default hover:border-gray-400">
        <div className="flex justify-between items-center mb-2">
          <p className="font-bold">Abstain</p>

          <div className="flex gap-2">
            <p>{votes.abstain.toLocaleString()}</p>
            <p>{abstainPercentage}%</p>
          </div>
        </div>

        <div className="relative w-full h-2 bg-yellow-100 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-yellow-500 rounded-full"
            style={{ width: `${abstainPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default VotingCalculation;
