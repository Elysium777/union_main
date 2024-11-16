"use client";

import { ChevronRight, Code } from "lucide-react";

import React from "react";
import { useSelector } from "react-redux";
import config from "@/lib/config";

const ContractAndParameter = ({ unionAddress }) => {
  const chainId = useSelector((state) => state.chain.chainId);
  const currentChain = config.chains.find((c) => c.chainId === chainId);

  const openModal = () => {
    window.open(
      `${currentChain.blockscoutUrl}/address/${unionAddress}?tab=contract`,
      "_blank"
    );
  };

  return (
    <button
      onClick={openModal}
      className="border border-gray-700 rounded-2xl overflow-hidden p-4 w-full"
    >
      <div className="text-base flex justify-between items-center">
        <div className="flex-center gap-1.5">
          <Code size={20} />
          <h3>Contracts and parameters</h3>
        </div>

        <ChevronRight size={20} />
      </div>
    </button>
  );
};

export default ContractAndParameter;
