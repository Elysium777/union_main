import shortenAddress from "@/utils/shortenAddress";
import Link from "next/link";
import React from "react";

const UnionDetails = ({ proposalLength, daoMetadata, unionMetadata }) => {
  return (
    <div className="flex gap-4">
      <div className="border border-gray-700 rounded-2xl overflow-hidden p-4 space-y-1 flex-1 relative">
        <h2 className="text-gray-200 text-base">Admin</h2>

        <p className="text-3xl font-bold">
          {unionMetadata && shortenAddress(unionMetadata.admin)}
        </p>

        <p className="text-gray-400 text-sm">Admin of the Union</p>
      </div>
      <div className="border border-gray-700 rounded-2xl overflow-hidden p-4 space-y-1 flex-1 relative">
        <h2 className="text-gray-200 text-base">Proposals</h2>

        <p className="text-3xl font-bold">{proposalLength}</p>

        <p className="text-gray-400 text-sm">Total number of proposals</p>
      </div>

      <Link
        href="/#"
        className="border border-gray-700 rounded-2xl overflow-hidden p-4 space-y-1 flex-1 relative"
      >
        <h2 className="text-gray-200 text-base">DAO</h2>

        <p className="text-3xl font-bold">{daoMetadata.name}</p>

        <p className="text-gray-400 text-sm line-clamp-1">
          {daoMetadata.description}
        </p>
      </Link>
    </div>
  );
};

export default UnionDetails;
